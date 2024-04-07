import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "./UsuarioDadosInfo.module.css";
import {EditInfoSvg, LogOutSvg} from "../../../assets/svgImageList.jsx";
import UserAuthentication from "../../../Firebase/UserAuthentication/UserAuthentication";

const UsuarioDadosInfo = ({ data }) => {
    const { userLogout } = UserAuthentication();

    return (
        <div className={styles.usuario}>
            <h1 className={"title"}>Sua Conta</h1>
            <NavLink
                onClick={userLogout}
                to={"/login"}
                className={styles.btnLogout}
            >
                Sair <LogOutSvg />
            </NavLink>
            <div className={styles.userInfo}>
                <h2 className={"subtitle"}>Suas Informações</h2>
                {data && (
                    <>
                        <p>Nome: {data?.displayName}</p>
                        <p>Contato: {data?.contato}</p>
                        <p>Nome: {data?.email}</p>
                    </>
                )}
                <NavLink className={styles.btnEdit} to={"editar-conta"}>
                Editar dados <EditInfoSvg />
                </NavLink>
            </div>
            <div className={styles.googleCalendar}>
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FSao_Paulo&bgcolor=%23ffffff&src=amdvbWVzdGtkQGdtYWlsLmNvbQ&src=cHQuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043&color=%2333B679"
                     width="900" height="600" frameBorder="0" scrolling="no"></iframe>
            </div>
        </div>
    );
};

export default UsuarioDadosInfo;
