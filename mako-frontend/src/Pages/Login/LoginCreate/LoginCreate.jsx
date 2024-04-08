import React from "react";
import { NavLink } from "react-router-dom";
import Input from "../../../Components/Input/Input.jsx";
import Button from "../../../Components/Button/Button.jsx";
import styles from "../LoginCreate/LoginCreate.module.css";
import stylesBtn from "../../../Components/Button/Button.module.css";
import { Context } from "../../../Context/UserContext";

const LoginCreate = () => {
    const [nome, setNome] = React.useState("");
    const [contato, setContato] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [confirmarSenha, setConfirmarSenha] = React.useState("");

    const { register } = React.useContext(Context);

    function handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: nome,
            phone: contato,
            email: email,
            password: senha,
            confirmPassword: confirmarSenha
        }

        register(user);
    }

    return (
        <section className={"animeLeft"}>
            <h1 className={"title"}>Cadastre-se</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label={"Nome"}
                    type={"text"}
                    name={"name"}
                    value={nome}
                    onChange={({ target }) => setNome(target.value)}
                />
                <Input
                    label={"Contato"}
                    type={"text"}
                    name={"contato"}
                    value={contato}
                    onChange={({ target }) => setContato(target.value)}
                />
                <Input
                    label={"Email"}
                    type={"email"}
                    name={"email"}
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
                <Input
                    label={"Confirmar senha"}
                    type={"password"}
                    name={"passwordConfirm"}
                    value={confirmarSenha}
                    onChange={({ target }) => setConfirmarSenha(target.value)}
                />
                <Button disabled={true}>Cadastrando...</Button>
                <Button>Cadastrar</Button>
            </form>
            <div className={styles.cadastro}>
            <h2 className={"subtitle"}>Já possui cadastro?</h2>
                <p>Faça login na nossa página.</p>
                <NavLink
                    className={stylesBtn.button}
                    to={"/login"}
                >
                    Login
                </NavLink>
            </div>
        </section>
    );
};

export default LoginCreate;
