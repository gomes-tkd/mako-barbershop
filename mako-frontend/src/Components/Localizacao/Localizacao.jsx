import styles from "./Localizacao.module.css";

const Localizacao = () => {
    return (
        <div id={"localizacao"}>
            <h1 className={"title"}>Nossa Localização</h1>
            <div className={styles.mapResponsive}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d875.4237213871703!2d-53.10078653040159!3d-28.638905321447627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94fd689d2b847b8b%3A0x205db36a1c4fc80e!2sR.%20Rio%20de%20Janeiro%2C%20442%20-%20Jardim%2C%20Ibirub%C3%A1%20-%20RS%2C%2098200-000!5e0!3m2!1spt-BR!2sbr!4v1711690225307!5m2!1spt-BR!2sbr"
                    width={"800"}
                    height={"400"}
                    allowFullScreen
                    loading={"lazy"}
                    style={{border: "none"}}
                    referrerPolicy={"no-referrer-when-downgrade"}
                    title={"Nossa localização na cidade de Ibirubá - RS"}
                ></iframe>
            </div>
        </div>
    );
};

export default Localizacao;
