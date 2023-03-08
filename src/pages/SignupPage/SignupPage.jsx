import "./style.css";
import { useEffect, useState } from "react";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameActive, setIsUsernameActive] = useState(false);
    const [isEmailActive, setIsEmailActive] = useState(false);
    const [isPasswordActive, setIsPasswordActive] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value); 
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        setIsUsernameActive(username !== "");
        setIsEmailActive(email !== "");
        setIsPasswordActive(password !== "");
    }, [username, email, password]);

    const getClass = (isFieldActive) => {
        if (isFieldActive){
            return "active";
        } else {
            return "";
        }
    }

    return (
        <div className="container">
            <h1 className="page-title">{"Olá, boas-vindas ao LabEddit ;)"}</h1>
            <form className="form" action="" method="post">
                <div className="form-input-box">
                    <input 
                        className="form-input" 
                        type="email" 
                        value={email}
                        onChange={handleEmailChange}
                    />  
                    <label 
                        htmlFor="email-login" 
                        className={`form-input-label ${getClass(isEmailActive)}`}>E-mail</label>
                </div>
            </form>
        </div>
        
    )
}

export default SignupPage;