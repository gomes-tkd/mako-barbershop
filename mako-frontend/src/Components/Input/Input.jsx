import React from 'react';
import styles from "./Input.module.css";

const Input = ({ label, type, name, value, onChange, onBlur }) => {
    return (
        <div className={styles.wrapper}>
            <label htmlFor={name} className={styles.label}>{label}</label>
            <input
                className={styles.input}
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Input;
