import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.jpeg";
import styles from "./Header.module.css";
import { LocationSvg, CommentsSvg } from "../../assets/svgImageList.jsx";
import { useAuthValue } from "../../UserContext/UserContext.jsx";

const Header = () => {
    const { user } = useAuthValue();
    const location = useLocation();

    React.useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location.hash]);

    return (
        <header className={styles.header}>
            <nav className={`container ${styles.nav}`}>
                <NavLink to={"/"}>
                    <img className={styles.logo} src={`${Logo}`} alt="Logo" />
                </NavLink>
                <div className={styles.navLinks}>
                    <NavLink to={"/#comentarios"} className={styles.link}>
                        Comentários <CommentsSvg />
                    </NavLink>
                    <NavLink to={"/#localizacao"} className={styles.link}>
                        Localização <LocationSvg />
                    </NavLink>
                    {user ? (
                        <NavLink
                            className={styles.login} to={"/conta"}
                        >
                            Conta
                        </NavLink>
                    ) : (
                        <NavLink
                            className={styles.login} to={"/login"}>
                            Entrar | Criar
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
