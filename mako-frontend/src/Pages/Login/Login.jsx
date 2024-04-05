import { Routes, Route } from "react-router-dom";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm/LoginForm.jsx";
import LoginCreate from "./LoginCreate/LoginCreate.jsx";

const Login = () => {
    return (
        <section className={styles.login}>
            <div className={styles.forms}>
                <Routes>
                    <Route path={"/"} element={<LoginForm />} />
                    <Route path={"/criar"} element={<LoginCreate />} />
                </Routes>
            </div>
        </section>
    );
};

export default Login;
