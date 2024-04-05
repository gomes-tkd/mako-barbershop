import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import Input from "../../../Components/Input/Input.jsx";
import Button from "../../../Components/Button/Button.jsx";
import styles from "./LoginForm.module.css";
import stylesBtn from "../../../Components/Button/Button.module.css";
import useForm from "../../../Hook/useForm/useForm.js";
import { logIn } from "../../../Firebase/Firebase.js";

const LoginForm = () => {
    const username = useForm();
    const password = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        try {
          const { userResponse } = await logIn(username.value, password.value);

          if (userResponse) {
              navigate("/conta");
          }

        } catch(e) {
            setLoading(false);
            setError(e.message);
        } finally {
            setLoading(false);
            setError(null);
        }
    }

    return (
        <div className={"animeLeft"}>
            <h1 className={"title"}>Entrar</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input label={"Usuário"} type={"text"} name={"username"} {...username} />
                <Input label={"Senha"} type={"password"} name={"password"} {...password} />
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
