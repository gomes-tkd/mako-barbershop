import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header.jsx";
import Home from "./Pages/Home/Home.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Login from "./Pages/Login/Login.jsx";
import {AuthProvider} from "./UserContext/UserContext.jsx";
import Usuario from "./Pages/Usuario/Usuario.jsx";

function App() {
  const [user, setUser] = React.useState(undefined);
  const auth = getAuth();

  React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
  }, [auth]);

  return (
    <>
      <AuthProvider value={{ user }}>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route path={"/login/*"} element={<Login />} />
                  <Route path={"/conta/*"} element={<Usuario />} />
              </Routes>
              <Footer />
          </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App
