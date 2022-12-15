import { React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Autentication } from "../services/Autentication";
import "../styles/Register.css";

export const Register = () => {

    const { registerService } = Autentication();

    const [registerName, setRegisterName] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e, email, password, username, name, last_name) => {
        e.preventDefault();
        
        await registerService(email, password, username, name, last_name);
        navigate('/login');
    }

    return(
        <div id="registerPage">
            <form onSubmit={(e) => handleSubmit(e, registerEmail, registerPassword, registerUsername, registerName, registerLastName)} id="register-form">
                <h2>Registrate</h2>
                <div className="register-info">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" onChange={(event) => setRegisterName(event.target.value)}/>
                </div>
                <div className="register-info">
                    <label htmlFor="last_name" >Apellido</label>
                    <input type="text" name="last_name" onChange={(event) => setRegisterLastName(event.target.value)}/>
                </div>
                <div className="register-info">
                    <label htmlFor="email" >Email</label>
                    <input type="email" name="email" onChange={(event) => setRegisterEmail(event.target.value)}/>
                </div>
                <div className="register-info">
                    <label htmlFor="username">Usuario</label>
                    <input type="text" name="username" onChange={(event) => setRegisterUsername(event.target.value)}/>
                </div>
                <div className="register-info">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" onChange={(event) => setRegisterPassword(event.target.value)}/>
                </div>
                <button id="register-btn">Registrarse</button>
            </form> 
        </div>
    )
}