import "./style.css";
import { useEffect, useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailActive, setIsEmailActive] = useState(false);
    const [isPasswordActive, setIsPasswordActive] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value); 
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        setIsEmailActive(email !== "");
        setIsPasswordActive(password !== "");
    }, [email, password]);
      
    const getClass = (isFieldActive) => {
        if (isFieldActive){
            return "active";
        } else {
            return "";
        }
    }

    return (
        <div className="container">
            <div id="heading-group">
                <img src="logo.svg" alt="LabEddit Logo" />
                <h1 id="title-login" className="page-title">LabEddit</h1>
                <h4 id="subtitle-login">O projeto de rede social da Labenu</h4>
            </div>
            <form className="form" action="" method="post">
                <div className="form-input-box">
                    <input 
                        id="email-login" 
                        className="form-input" 
                        type="email" 
                        value={email}
                        onChange={handleEmailChange}
                    />  
                    <label 
                        htmlFor="email-login" 
                        className={`form-input-label ${getClass(isEmailActive)}`}>E-mail</label>
                </div>
                <div className="form-input-box">
                    <input 
                        id="password-login" 
                        className="form-input" 
                        type="password" 
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <label 
                        htmlFor="password-login" 
                        className={`form-input-label ${getClass(isPasswordActive)}`}>Senha</label>
                </div>
                <button id="primary-button-login" className="button primary-button" type="submit">Continuar</button>
            </form>
            <div id="divider-login" className="divider"></div>
            <button className="button secondary-button">Crie uma conta</button>
        </div>
    )
}

export default LoginPage;