import { Routes, Route } from "react-router-dom";
import UsuarioDadosInfo from "./UsuarioDadosInfo/UsuarioDadosInfo.jsx";
import UsuarioEditarDados from "./UsuarioEditarDados/UsuarioEditarDados.jsx";
import styles from "./Usuario.module.css";
import React from "react";
import { useAuthValue } from "../../UserContext/UserContext";
import { UseGetData } from "../../Firebase/UserGetData/UseGetData";

const Usuario = () => {
    const { user } = useAuthValue();
    const uid = user?.uid;
    const [dataInfo, setDataInfo] = React.useState({});

    const { data } = UseGetData("usuarios", uid);

    React.useEffect(() => {
        setDataInfo(data);
    }, [data]);

    return (
        <section className={`container ${styles.usuario}`}>
            <Routes>
                <Route path={"/"} element={<UsuarioDadosInfo data={dataInfo} />} />
                <Route path={"editar-conta"} element={<UsuarioEditarDados data={dataInfo} />} />
            </Routes>
        </section>
    );
};

export default Usuario;
