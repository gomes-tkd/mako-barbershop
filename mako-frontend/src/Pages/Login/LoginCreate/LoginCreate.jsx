import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../../../Firebase/Firebase.js";
import Input from "../../../Components/Input/Input.jsx";
import Button from "../../../Components/Button/Button.jsx";
import styles from "../LoginCreate/LoginCreate.module.css";
import stylesBtn from "../../../Components/Button/Button.module.css";
import useForm from "../../../Hook/useForm/useForm.js";

const LoginCreate = () => {
    const username = useForm();
    const email = useForm();
    const password = useForm();

    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);


    // NÃO MEXER NESSA CARALHA, DE ALGUMA FORMA FINALMENTE FUNCIONOU ESSA
    // DESGRAÇA DA PORRA
    async function handleSubmit(e) {
        e.preventDefault();
        await createUser(email.value, password.value);
        navigate("/conta/editar-conta");
    }

    return (
        <section className={"animeLeft"}>
            <h1 className={"title"}>Cadastre-se</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input label={"Email"} type={"email"} name={"email"} {...email} />
                <Input label={"Senha"} type={"password"} name={"password"} {...password} />
                {loading ? (
                    <Button>Cadastrando...</Button>
                ) : (
                    <Button>Cadastrar</Button>
                )}
                {error && <p>{error}</p>}
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
