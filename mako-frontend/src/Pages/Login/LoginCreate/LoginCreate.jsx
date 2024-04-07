import React from "react";
import { NavLink } from "react-router-dom";
import Input from "../../../Components/Input/Input.jsx";
import Button from "../../../Components/Button/Button.jsx";
import styles from "../LoginCreate/LoginCreate.module.css";
import stylesBtn from "../../../Components/Button/Button.module.css";
import UserAuthentication from "../../../Firebase/UserAuthentication/UserAuthentication";
import Error from "../../../Helpers/Error";

const LoginCreate = () => {
    const [displayName, setDisplayName] = React.useState("");
    const [contato, setContato] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [error, setError] = React.useState("");

    const { createUser, error: authError, loading } = UserAuthentication();

    async function handleSubmit(e) {
        e.preventDefault();

        const user = {
            displayName,
            contato,
            email,
            password,
            confirmPassword
        };
        await createUser(user);
    }

    React.useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <section className={"animeLeft"}>
            <h1 className={"title"}>Cadastre-se</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label={"Nome"}
                    type={"text"}
                    name={"name"}
                    value={displayName}
                    onChange={({ target }) => setDisplayName(target.value)}
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
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <Input
                    label={"Confirmar senha"}
                    type={"password"}
                    name={"passwordConfirm"}
                    value={confirmPassword}
                    onChange={({ target }) => setConfirmPassword(target.value)}
                />
                { loading ? (
                    <Button disabled={true}>Cadastrando...</Button>
                ) : (
                    <Button>Cadastrar</Button>
                )}
                {error && <Error error={error} /> }
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
