import { Routes, Route } from "react-router-dom";
import UsuarioDadosInfo from "./UsuarioDadosInfo/UsuarioDadosInfo.jsx";
import UsuarioEditarDados from "./UsuarioEditarDados/UsuarioEditarDados.jsx";
import styles from "./Usuario.module.css";
import React from "react";

const Usuario = () => {

    return (
        <section className={`container ${styles.usuario}`}>
            <Routes>
                <Route path={"/"} element={<UsuarioDadosInfo />} />
                <Route path={"editar-conta"} element={<UsuarioEditarDados />} />
            </Routes>
        </section>
    );
};

export default Usuario;
