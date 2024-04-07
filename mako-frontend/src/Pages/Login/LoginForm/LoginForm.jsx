import React from 'react';
import { NavLink } from "react-router-dom";
import Input from "../../../Components/Input/Input.jsx";
import Button from "../../../Components/Button/Button.jsx";
import styles from "./LoginForm.module.css";
import stylesBtn from "../../../Components/Button/Button.module.css";
import UserAuthentication from "../../../Firebase/UserAuthentication/UserAuthentication";

const LoginForm = () => {
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");

    const {signInUser} = UserAuthentication();

    async function handleSubmit(e) {
        e.preventDefault();
        await signInUser(email, senha);
    }

    return (
        <div className={"animeLeft"}>
            <h1 className={"title"}>Entrar</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label={"Usuário"}
                    type={"text"}
                    name={"username"}
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                />
                <Input
                    label={"Senha"}
                    type={"password"}
                    name={"password"}
                    value={senha}
                    onChange={({ target }) => setSenha(target.value)}
                />
                <Button>Entrar</Button>
            </form>
            <NavLink
                className={styles.perdeu}
                to={"/login/perdeu"}
            >
                Perdeu a senha?
            </NavLink>
            <div className={styles.cadastro}>
                <h2 className={"subtitle"}>Cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
                <NavLink
                    className={stylesBtn.button}
                    to={"/login/criar"}
                >
                    Cadastro
                </NavLink>
            </div>
        </div>
    );
};

export default LoginForm;
