import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "./UsuarioDadosInfo.module.css";
import { EditInfoSvg, LogOutSvg } from "../../../assets/svgImageList.jsx";
import { Context } from "../../../Context/UserContext";

const UsuarioDadosInfo = ({ userData }) => {
    const { logout } = React.useContext(Context);

    return (
        <div className={styles.usuario}>
            <h1 className={"title"}>Sua Conta</h1>
            <NavLink
                to={"/login"}
                onClick={logout}
                className={styles.btnLogout}
            >
                Sair <LogOutSvg />
            </NavLink>
            <div className={styles.userInfo}>
                <h2 className={"subtitle"}>Suas Informações</h2>
                <p>Nome: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Contato: {userData.phone}</p>
                <NavLink className={styles.btnEdit} to={"editar-conta"}>
                Editar dados <EditInfoSvg />
                </NavLink>
            </div>
        </div>
    );
};

export default UsuarioDadosInfo;
