import React from "react";
import { NavLink } from "react-router-dom";
import Input from "../../../Components/Input/Input.jsx";
import Button from "../../../Components/Button/Button.jsx";
import styles from "../LoginCreate/LoginCreate.module.css";
import stylesBtn from "../../../Components/Button/Button.module.css";

const LoginCreate = () => {

    return (
        <section className={"animeLeft"}>
            <h1 className={"title"}>Cadastre-se</h1>
            <form className={styles.form}>
                <Input
                    label={"Nome"}
                    type={"text"}
                    name={"name"}
                />
                <Input
                    label={"Contato"}
                    type={"text"}
                    name={"contato"}
                />
                <Input
                    label={"Email"}
                    type={"email"}
                    name={"email"}
                />
                <Input
                    label={"Senha"}
                    type={"password"}
                    name={"password"}
                />
                <Input
                    label={"Confirmar senha"}
                    type={"password"}
                    name={"passwordConfirm"}
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
