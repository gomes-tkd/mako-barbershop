import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "./UsuarioDadosInfo.module.css";
import { logOut, getUserDataFirebase } from "../../../Firebase/Firebase.js";
import {EditInfoSvg, LogOutSvg} from "../../../assets/svgImageList.jsx";
import {useAuthValue} from "../../../UserContext/UserContext.jsx";

const UsuarioDadosInfo = ({ dataUser }) => {

    const nome = dataUser?.nome;
    console.log(nome)

    return (
        <div className={styles.usuario}>
            <h1 className={"title"}>Sua Conta</h1>
            <NavLink
                onClick={async () => logOut()}
                to={"/login"}
                className={styles.btnLogout}
            >
                Sair <LogOutSvg />
            </NavLink>
            {/*<button onClick={testere}>teste</button>*/}
            <div className={styles.userInfo}>
                <h2 className={"subtitle"}>Suas Informações</h2>

                <NavLink className={styles.btnEdit} to={"editar-conta"}>
                    Editar dados <EditInfoSvg />
                </NavLink>
            </div>
        </div>
    );
};

export default UsuarioDadosInfo;
