import React from 'react';
import {useNavigate} from "react-router-dom";
import styles from "./UsuarioEditarDados.module.css";
import Input from "../../../Components/Input/Input.jsx";
import Button from "../../../Components/Button/Button.jsx";
import Error from "../../../Helpers/Error";
import api from "../../../Api/api";

const UsuarioEditarDados = ({ userData, token }) => {
    const [name, setName] = React.useState(userData.name);
    const [phone, setPhone] = React.useState(userData.phone);
    const [email, setEmail] = React.useState(userData.email);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const navigate = useNavigate();

    async function handleSubmitNamePhone(e) {
        e.preventDefault();

        const userNewInfo = {
            name: name,
            phone: phone,

            // Gambiarra pra alterar nome e contato...
            email: email
        };

        const data = await api.patch(`/user/edit/${userData._id}`, userNewInfo, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                "Content-Type": "multipart/form-data"
            }
        });

        navigate("/conta/");
    }

    async function handleSubmitPassword(e) {
        e.preventDefault();

        // gambiarra
        const userNewInfo = {
            name: name,
            phone: phone,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

            const data = await api.patch(`/user/edit/${userData._id}`, userNewInfo, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "multipart/form-data"
                }
            });
    }

    return (
        <section className={styles.usuarioEditar}>
            <h1 className={"title"}>Editar Dados</h1>
            <form onSubmit={handleSubmitNamePhone} className={styles.usuarioEdit}>
                <h2 className={"subtitle"}>Informações</h2>
                <Input
                    label={"Nome"}
                    type={"text"}
                    name={"nome"}
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
                <Input
                    label={"Contato"}
                    type={"text"}
                    name={"contato"}
                    value={phone}
                    onChange={({ target }) => setPhone(target.value)}
                />
                <Button>Editar</Button>
            </form>
            <form onSubmit={handleSubmitPassword} className={styles.usuarioEdit}>
                <h2 className={"subtitle"}>Senha</h2>
                <Input
                    label={"Senha"}
                    type={"text"}
                    name={"password"}

                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <Input
                    label={"Confirmar Senha"}
                    type={"text"}
                    name={"confirmPassword"}

                    value={confirmPassword}
                    onChange={({ target }) => setConfirmPassword(target.value)}
                />
                <Button>Editar</Button>
            </form>

        </section>
    );
};

export default UsuarioEditarDados;
