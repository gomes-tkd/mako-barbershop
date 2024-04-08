// faz as chamadas da API pra tratar da autenticação
import api from "../../Api/api";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const [authenticated, setAuthenticated] = React.useState(false);
    const navigate = useNavigate();

    // Tenta "garantir" que o usuário permaneça logado
    React.useEffect(() => {
       const token = window.localStorage.getItem("token");

       if (token) {
           api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
           setAuthenticated(true);
       }
    }, []);

    async function register(user) {
        console.log(user);
        try {
            const data = await api.post("/user/register/", user).then(response => response.data);

            // autentica o usuário
            await authUser(data);
            console.log("autenticado");
        } catch (e) {
            // trata o erro
            console.log(e.message);
        }
    }

   async function login(user) {
        try {
            const data = await api.post("/user/login/", user).then(response => response.data);

            await authUser(data);
            return;
        } catch (e) {
            console.log(e.message);
        }
   }

    async function authUser(data) {
        setAuthenticated(true);
        window.localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/conta/");
    }

    function logout() {
        setAuthenticated(false);
        window.localStorage.removeItem("token");
        api.defaults.headers.Authorization = undefined;
        navigate("/login/");
    }

    return {
        register,
        authenticated,
        logout,
        login
    }
}
