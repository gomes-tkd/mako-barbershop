import React from 'react';
import styles from "./UsuarioEditarDados.module.css";
import Input from "../../../Components/Input/Input.jsx";
import Button from "../../../Components/Button/Button.jsx";
import Error from "../../../Helpers/Error";

const UsuarioEditarDados = () => {

    return (
        <section className={styles.usuarioEditar}>
            <h1 className={"title"}>Editar Dados</h1>
            <form className={styles.usuarioEdit}>
                <h2 className={"subtitle"}>Informações</h2>
                <Input
                    label={"Nome"}
                    type={"text"}
                    name={"nome"}
                />
                <Input
                    label={"Contato"}
                    type={"text"}
                    name={"contato"}
                />
                <Button>Editar</Button>
            </form>
            <form className={styles.usuarioEdit}>
                <h2 className={"subtitle"}>Senha</h2>
                <Input
                    label={"Senha"}
                    type={"text"}
                    name={"password"}
                />
                <Input
                    label={"Confirmar Senha"}
                    type={"text"}
                    name={"confirmPassword"}
                />
                <Button>Editar</Button>
            </form>

        </section>
    );
};

export default UsuarioEditarDados;
