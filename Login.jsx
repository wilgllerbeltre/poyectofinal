import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Autentication } from "../services/Autentication";

import "../styles/Login.css";
import { Register } from "./Register";

export const Login = () => {

    const navigate = useNavigate();

    const { loginService } = Autentication();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleSubmitLogin = async(e, email, password) => {
        e.preventDefault();
        
        await loginService(email, password).then((message) => {
            if(message === 'success'){
                navigate('/');
            }
        })
    }

    return(
        <div id="loginPage">
            <section id="log-in">
                <form onSubmit={(e) => handleSubmitLogin(e, loginEmail, loginPassword)}>
                    <h2>Bienvenido</h2>
                    <h4>¡Por favor completa la información!</h4>
                    <div className="log-info">
                        <label htmlFor="email" id="first-one">Email</label>
                        <input type="text" name="email" onChange={(event) => setLoginEmail(event.target.value)}/>
                    </div>
                    <div className="log-info">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" onChange={(event) => setLoginPassword(event.target.value)}/>
                    </div>
                    <button id="sign-in-btn">Login</button>
                    <p>¿No tienes una cuenta aún?<Link to='/register' id="link-registro"> Registrarse</Link></p>
                </form>
            </section>
            <section id="image">
                <div id="cuadrate"></div>
                <div id="top">
                    <div id="top-cuadrate"></div>
                </div>
                <div id="bottom">
                    <div id="bottom-cuadrate"></div>
                </div>
            </section>
        </div>
    )
}