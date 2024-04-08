import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import UsuarioDadosInfo from "./UsuarioDadosInfo/UsuarioDadosInfo.jsx";
import UsuarioEditarDados from "./UsuarioEditarDados/UsuarioEditarDados.jsx";
import styles from "./Usuario.module.css";
import api from "../../Api/api";

const Usuario = () => {
    const [userData, setUserData] = React.useState({});
    const [token, setToken] = React.useState(window.localStorage.getItem("token") || "");

    // recupera os dados do usuário
    useEffect(() => {
        try {
            api.get("/user/checkuser/", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then(response => {
                setUserData(response.data);
            });
        } catch (e) {
            console.log(e);
        }

    }, [token]);

    return (
        <section className={`container ${styles.usuario}`}>
            <Routes>
                <Route path={"/"} element={<UsuarioDadosInfo userData={userData} />} />
                <Route path={"/editar-conta"} element={<UsuarioEditarDados userData={userData} token={token}/>} />
            </Routes>
        </section>
    );
};

export default Usuario;
