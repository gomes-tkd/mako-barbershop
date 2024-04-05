import React from 'react';
import styles from "./UsuarioEditarDados.module.css";

import useForm from "../../../Hook/useForm/useForm.js";
import Input from "../../../Components/Input/Input.jsx";
import {getAuth} from "firebase/auth";
import Button from "../../../Components/Button/Button.jsx";
import {useAuthValue} from "../../../UserContext/UserContext.jsx";
import {getUserDataFirebase} from "../../../Firebase/Firebase.js";
const UsuarioEditarDados = () => {

    const { user } = useAuthValue();
    const uid = user?.uid;
    return (
        <section className={styles.usuarioEditar}>
            <h1 className={"title"}>Editar Dados</h1>

        </section>
    );
};

export default UsuarioEditarDados;
