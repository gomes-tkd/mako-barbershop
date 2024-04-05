import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    getDoc,
    getDocs,
    getFirestore,
    collection,
    doc,
    deleteDoc,
    query,
    where,
    updateDoc, onSnapshot
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDb8BB1tDux9H13sllXVI7I5wIbBgcIdiI",
    authDomain: "makos-barbershop.firebaseapp.com",
    projectId: "makos-barbershop",
    storageBucket: "makos-barbershop.appspot.com",
    messagingSenderId: "358775876284",
    appId: "1:358775876284:web:bda086e640d42ced763eb9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const userCollectionRef = collection(db, "usuarios");


// NÃO MEXER NESSA CARALHA, DE ALGUMA FORMA FINALMENTE FUNCIONOU ESSA
// DESGRAÇA DA PORRA
export async function createUser(email, password) {

    if (auth.currentUser) {
        throw new Error("Usuário já existe.");
    }

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);

        const userResponse = (await response).user;

        if(!userResponse) {
            throw new Error("Algo deu errado ao criar o usuário.");
        }

        const userUID = userResponse.uid;

        if (!userUID) {
            throw new Error("Algo deu errado ao criar o UID.");
        }

        return true;
    } catch (e) {
        console.log(e.message)
    }
}

export async function logIn(email, password) {
    if (!email || !password) {
        throw new Error("Email ou senha inválidos.");
    }

    if (auth.currentUser) {
        throw new Error("Usuário já logado");
    }

    const response = await signInWithEmailAndPassword(auth, email, password);


    const userResponse = (await response).user;

    if (!userResponse) {
        throw new Error("Algo deu errado.");
    }

    const userUID = userResponse.uid;
    if (!userUID) {
        throw new Error("Algo deu errado com o uid");
    }

    return {
        userResponse
    };
}

export async function logOut() {
    await signOut(auth);
}

export async function getUserDataFirebase(id, setData) {
    const docRef = doc (db, "usuarios", id);

   const docSnap = await getDoc(docRef);

   return docSnap.data();
}

export async function addUser(data) {
    await addDoc(userCollectionRef, {
        userId: auth.currentUser.uid,
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        contato: data.contato
    });
}

export async function userUpdatePassword(password) {
    await updatePassword(auth.currentUser, password);
}

export async function getUserCortesByUid() {
    const uidUser = auth.currentUser?.uid;
    const usuarioData = await getDoc(
        db,
        userCollectionRef,
        uidUser
    );

    return usuarioData;
}

/*
export async function addUser(data) {
    const usuario = {
        userId: auth.currentUser?.uid,
        nome: data?.nome || null,
        email: data?.email || null,
        senha: data?.senha || null,
        contato: data?.contato || null
    };

    await addDoc(userCollectionRef, {
       ...usuario,
       userId: auth.currentUser.uid,
    });
}

export async function getCurrentUserByUid() {

}

export async function getUserCortesByUid() {
    const uidUser = auth.currentUser?.uid;
    const usuarioData = await getDoc(
        db,
        userCollectionRef,
        uidUser
    );

    return usuarioData;
}
*/
