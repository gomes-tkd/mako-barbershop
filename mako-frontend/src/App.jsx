import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header.jsx";
import Home from "./Pages/Home/Home.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Login from "./Pages/Login/Login.jsx";
import {AuthProvider, useAuthValue} from "./UserContext/UserContext.jsx";
import Usuario from "./Pages/Usuario/Usuario.jsx";
import {getUserDataFirebase} from "./Firebase/Firebase.js";

function App() {
  const [user, setUser] = React.useState(undefined);
  const auth = getAuth();

  const isAuth = useAuthValue();
  const uid = isAuth?.user.uid;
  const [dataUser, setDataUser] = React.useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });

  }, [auth]);

    React.useEffect(() => {
        getUserDataFirebase(uid, setDataUser);
    }, []);

  return (
    <>
      <AuthProvider value={{ user }}>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route path={"/login/*"} element={<Login />} />
                  <Route path={"/conta/*"} element={<Usuario dataUser={dataUser} />} />
              </Routes>
              <Footer />
          </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App
