import "./style.css";
import { useState , useEffect } from "react";
import InputBox from "../../components/InputBox/InputBox";
import useForm from "../../hooks/useForm";
import useActiveFields from "../../hooks/useActiveFields";
import { BASE_URL , TOKEN_NAME , USER_ID } from "../../constants/urls";
import { goToHomePage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BigLoadingModal from "../../components/BigLoadingModal/BigLoadingModal";

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, onChange] = useForm({username: "", email: "", password: ""});
    const [activeFields, onActivation] = useActiveFields({username: false, email: false, password: false});
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        onActivation(form);
    }, [form]);

    const handleCheck = (e) => {setChecked(previousState => !previousState)};

    const navigate = useNavigate();

    useEffect(() => {
        checkForToken();
    }, []);

    const checkForToken = async () => {
        try {
            const token = window.localStorage.getItem(TOKEN_NAME);
            
            if (token){  
                const response = await axios.get(BASE_URL + `/users/verify-token/${token}`);
                
                if (response.data.isTokenValid){
                    goToHomePage(navigate);
                } else {
                    return;
                }
            } else {
                return;
            }
            
        } catch (error) {
            console.error(error?.response?.data);
            window.alert(error?.response?.data);
        }
    }

    const signup = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true);

            const body = {
                username: form.username,
                email: form.email,
                password: form.password,
                receiveEmails: checked
            }

            const response = await axios.post(BASE_URL + "/users/signup", body);
            window.localStorage.setItem(TOKEN_NAME, response.data.token);
            window.localStorage.setItem(USER_ID, response.data.userId);

            setIsLoading(false);
            goToHomePage(navigate);
        } catch (error) {
            setIsLoading(false);
            console.error(error?.response?.data);
            window.alert(error?.response?.data)
        }
    }

    return (
        <div className="container">
            <h1 id="title-signup" className="page-title">{"Olá, boas-vindas ao LabEddit ;)"}</h1>
            <form className="form" onSubmit={signup}>
                <InputBox 
                    id={"username-signup"} 
                    name={"username"}
                    type={"text"}
                    value={form.username}
                    handleChange={onChange}
                    label={"Apelido"}
                    isFieldActive={activeFields.username}
                />
                <InputBox 
                    id={"email-signup"}
                    name={"email"}
                    type={"email"}
                    value={form.email}
                    handleChange={onChange}
                    label={"Email"}
                    isFieldActive={activeFields.email}
                />
                <InputBox
                    id={"password-signup"}
                    name={"password"}
                    type={"password"}
                    value={form.password}
                    handleChange={onChange}
                    label={"Senha"}
                    isFieldActive={activeFields.password}
                />
                <span id="policy-warning">Ao continuar, você concorda com nosso <a className="anchor anchor-weak" href="#">Contrato de usuário</a> e nossa <a className="anchor anchor-weak" href="#">Política de Privacidade</a></span>
                <div id="policy-checkbox-box">   
                    <input type="checkbox" name="" id="policy-checkbox" checked={checked} onChange={handleCheck} />
                    <label id="policy-checkbox-label" htmlFor="policy-checkbox">Eu concordo em receber emails sobre coisas legais no Labeddit</label>
                </div>
                <button type="submit" className="button primary-button" >Cadastrar</button>
            </form>
            {isLoading && <BigLoadingModal />}
        </div>
    )
}

export default SignupPage;