import React from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updatePassword,
    updateEmail,
    reauthenticateWithCredential, EmailAuthProvider
} from "firebase/auth";
import {addDoc, collection, setDoc, doc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {db} from "../Firebase";

export default function UserAuthentication(user) {
    const auth = getAuth();
    const navigate = useNavigate();
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const [cancelled, setCancelled] = React.useState(false);

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    async function createUserInfo({ nome, email, contato}) {
        const docRef = collection(db, "usuarios");

        return await addDoc(docRef, {
            userId: auth.currentUser?.uid,
            nome: auth.currentUser?.displayName || null,
            contato,
            email: auth.currentUser?.email || null
        });
    }

    async function changePassword(senha) {
        checkIfIsCancelled();

        setError(null);
        try {
            const user = auth.currentUser;
            await updatePassword(user, senha).then(() => {
                setMsg("Senha alterada com sucesso!");
            }).catch((e) => {
                setError("Alguma coisa deu errado, por favor tente mais tarde.");
            });
        } catch (e) {
            if (e.message.includes("6")) {
                setError("A senha deve conter no mínimo 6 caracteres.")
            }
        }

        setError(null);
    }


    // const reauthenticateUser = async (password) => {
    //     const credential = EmailAuthProvider.credential(user?.email, password);
    //
    //     try {
    //         await reauthenticateWithCredential(user, credential);
    //         console.log("Reautenticação bem-sucedida!");
    //         return true; // Retorna true se a reautenticação for bem-sucedida
    //     } catch (error) {
    //         setError(error.message);
    //         return false; // Retorna false se houver um erro na reautenticação
    //     }
    // };


    // async function changeEmail(emailNovo, senha) {
    //         const reauthenticated = await reauthenticateUser(senha);
    //         if (reauthenticated) {
    //             // Reautenticação bem-sucedida, agora podemos atualizar o email
    //             await updateEmail(user, emailNovo);
    //             console.log("Email atualizado com sucesso.");
    //             setError(null);
    //         } else {
    //             // Reautenticação falhou
    //             setError("Falha na reautenticação. Verifique suas credenciais.");
    //         }
    // }


    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);

        try {
            if (data.password !== data.confirmPassword) {
                setError("As senhas precisam ser iguais.");
                setLoading(false);
                return false;
            }

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            ).then(
                async (resultado) => {
                    try {
                        const ref = doc(db, "usuarios", resultado.user.uid);
                        const docRef = await setDoc(ref, data);
                        alert("Novo usuário registrado com sucesso!");
                    } catch (e) {
                        console.log(`Erro ao adicionar o documento: ${e.message}`)
                    }
                    navigate("/conta/editar-conta");
                }
            );

            await updateProfile(user, {
                displayName: data.displayName,
            });

            if (user) {
                navigate("/conta/editar-conta");
            }

            return user;
        } catch (error) {
            let systemErrorMessage = "";

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            setError(systemErrorMessage);
        }

        setLoading(false);
    };

    async function signInUser(email, password) {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);
        try {
            const logged = await signInWithEmailAndPassword(auth, email, password);

            if (logged) {
                navigate("/conta");
            }
        } catch (e) {
            let msg = "";

            if (e.message.includes("user-not-found")) {
                msg = "Usuário não encontrado.";
            } else if (e.message.includes("wrong-password")) {
                msg = "Senha incorreta.";
            } else {
                msg = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            setError(msg);
        } finally {
            setError(null);
            setLoading(false);
        }
    }

    async function userLogout() {
        checkIfIsCancelled();

        const saiu = await signOut(auth);

        if (saiu) {
            navigate("/login");
        }
    }

    React.useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        loading,
        error,
        msg,
        createUser,
        userLogout,
        signInUser,
        createUserInfo,
        updateProfile,
        changePassword,
        // changeEmail,
    }
}
