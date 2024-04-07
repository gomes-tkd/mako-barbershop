import React from 'react';
import styles from "./UsuarioEditarDados.module.css";
import Input from "../../../Components/Input/Input.jsx";
import Button from "../../../Components/Button/Button.jsx";
import UserAuthentication from "../../../Firebase/UserAuthentication/UserAuthentication";
import Error from "../../../Helpers/Error";

const confirmarEmail = (email, confirmarEmail, setError, setMsg) => {
    if (email === confirmarEmail) {
        // setMsg("Email alterado com sucesso!");
        return true;
    } else {
        // setError("Os emails devem ser iguais!");
        return false;
    }
}

const confirmarSenha = (senha, confirmarSenha, setError, setMsg) => {
    if (senha.isEqual(confirmarSenha.toString()).toString()) {
        setMsg("Senha alterada com sucesso!");
        return true;
    } else {
        setError("As senhas devem ser iguais!");
        return false;
    }
}

const UsuarioEditarDados = ({ data }) => {

    const [nome, setNome] = React.useState(data?.displayName);
    const [email, setEmail] = React.useState(data?.email);
    const [confirmEmail, setConfirmEmail] = React.useState(data?.email);
    const [contato, setContato] = React.useState(data?.contato);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const [error, setError] = React.useState("");

    const [senhaAtual, setSenhaAtual] = React.useState("");

    const {
        changePassword,
        // changeEmail,
        onReaAuth
    } = UserAuthentication();

    async function atualizarDados(e) {
        e.preventDefault();


    }

    async function handleChangePassword(e) {
        e.preventDefault();
        // const saoSenhasIguais = confirmarSenha(password, confirmPassword, setError, setMsg);
        //
        // if (saoSenhasIguais) {
            await changePassword(password);
        // }
    }

    async function handleChangeEmail(e) {
        e.preventDefault();
        // const saoEmailsIguais = confirmarEmail(email, setEmail, setError, setMsg);

        console.log(`Olá da função changeEmail dentro do handleChangeEmail`);
        // if (saoEmailsIguais) {
        //     changeEmail(email, senhaAtual);

        // }
    }

    return (
        <section className={styles.usuarioEditar}>
            <h1 className={"title"}>Editar Dados</h1>
            <form onSubmit={atualizarDados} className={styles.usuarioEdit}>
                <h2 className={"subtitle"}>Informações</h2>
                <Input
                    label={"Nome"}
                    type={"text"}
                    name={"nome"}
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
                {error && <Error error={error}  />}
                <Button>Editar</Button>
            </form>
            <form className={styles.usuarioEdit}>
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
                {error && <Error error={error}  />}
                <Button onClick={handleChangePassword}>Editar</Button>
            </form>
            {/*<form onSubmit={handleChangeEmail} className={`${styles.usuarioEdit} ${styles.usuarioEditEmail}`}>*/}
            {/*    <h2 className={"subtitle"}>Email</h2>*/}
            {/*    <Input*/}
            {/*        label={"Email"}*/}
            {/*        type={"email"}*/}
            {/*        name={"email"}*/}
            {/*        value={email}*/}
            {/*        onChange={({ target }) => setEmail(target.value)}*/}
            {/*    />*/}
            {/*    <Input*/}
            {/*        label={"Confirmar Email"}*/}
            {/*        type={"email"}*/}
            {/*        name={"confirmEmail"}*/}
            {/*        value={confirmEmail}*/}
            {/*        onChange={({ target }) => setConfirmEmail(target.value)}*/}
            {/*    />*/}
            {/*    <p>Para atualizar o email informe a atual senha</p>*/}
            {/*    <Input*/}
            {/*        type={"text"}*/}
            {/*        label={"Senha atual"}*/}
            {/*        value={senhaAtual}*/}
            {/*        onChange={({ target }) => setSenhaAtual(target.value)}*/}
            {/*    />*/}
            {/*    {error && <Error error={error}  />}*/}
            {/*    <Button>Editar</Button>*/}
            {/*</form>*/}

            {/*<button onClick={getUserDataFirebase}>mostrar email</button>*/}
        </section>
    );
};

export default UsuarioEditarDados;
