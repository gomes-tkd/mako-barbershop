import React from 'react';
import Localizacao from "../../Components/Localizacao/Localizacao.jsx";
import styles from "./Home.module.css";
import Comentarios from "../../Components/Comentarios/Comentarios.jsx";
import Sobre from "../../Components/Sobre/Sobre.jsx";

const Home = () => {
    return (
        <div className={`container ${styles.home}`}>
            <Sobre />
            <Comentarios />
            <Localizacao />
        </div>
    );
};

export default Home;
