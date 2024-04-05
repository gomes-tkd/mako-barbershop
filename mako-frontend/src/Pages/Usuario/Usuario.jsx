import { Routes, Route } from "react-router-dom";
import UsuarioDadosInfo from "./UsuarioDadosInfo/UsuarioDadosInfo.jsx";
import UsuarioEditarDados from "./UsuarioEditarDados/UsuarioEditarDados.jsx";
import styles from "./Usuario.module.css";
import {useAuthValue} from "../../UserContext/UserContext.jsx";
import React from "react";
import {getUserDataFirebase} from "../../Firebase/Firebase.js";

const Usuario = ({ dataUser }) => {



    return (
        <section className={`container ${styles.usuario}`}>
            <Routes>
                <Route path={"/"} element={<UsuarioDadosInfo dataUser={dataUser} />} />
                <Route path={"editar-conta"} element={<UsuarioEditarDados dataUser={dataUser} />} />
            </Routes>
        </section>
    );
};

export default Usuario;
