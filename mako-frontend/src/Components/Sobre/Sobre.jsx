import React from 'react';
import styles from "./Sobre.module.css";

const Sobre = () => {
    return (
        <section className={styles.sobre}>
            <div className={styles.sobreInfo}>
                <h2 className={"subtitle"}>Sobre nós</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac odio lobortis, auctor mi eu, varius nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse ut auctor arcu. Aliquam tempus dolor quis tincidunt vestibulum. Aliquam erat volutpat. Aliquam tincidunt turpis ac felis ullamcorper porttitor. Cras mauris diam, molestie at dolor nec, imperdiet sollicitudin dolor. Aenean mollis, dui a varius venenatis, nunc diam pellentesque elit, ac posuere libero orci vitae tortor. Suspendisse gravida commodo orci, eget imperdiet lacus semper ac. Vivamus a pulvinar urna.
                </p>
            </div>
        </section>
    );
};

export default Sobre;
