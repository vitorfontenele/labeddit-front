import "./style.css";
import { useEffect , useState } from "react";
import InputBox from "../../components/InputBox/InputBox";
import useForm from "../../hooks/useForm";
import useActiveFields from "../../hooks/useActiveFields";
import axios from "axios";
import { BASE_URL , TOKEN_NAME , USER_ID } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import { goToHomePage, goToSignupPage } from "../../routes/coordinator";
import BigLoadingModal from "../../components/BigLoadingModal/BigLoadingModal";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, onChange] = useForm({email: "", password: ""});
    const [activeFields, onActivation] = useActiveFields({email: false, password: false});

    const navigate = useNavigate();

    useEffect(() => {
        checkForToken();
    }, []);

    const checkForToken = async () => {
        try {
            const token = window.localStorage.getItem(TOKEN_NAME);
            
            if (token){  
                const response = await axios.get(BASE_URL + `/users/verify-token/${token}`);
                console.log(response);

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
    
    useEffect(() => {
        onActivation(form);
    }, [form]);

    const login = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true);

            const body = {
                email: form.email,
                password: form.password
            }

            const response = await axios.post(BASE_URL + "/users/login", body);
            window.localStorage.setItem(TOKEN_NAME, response.data.token);
            window.localStorage.setItem(USER_ID, response.data.userId);

            setIsLoading(false);
            goToHomePage(navigate);
        } catch (error) {
            setIsLoading(false);
            console.error(error?.response?.data);
            window.alert(error?.response?.data);
        }
    }
      
    return (
        <div className="container">
            <div id="heading-group">
                <img src="logo.svg" alt="LabEddit Logo" />
                <h1 id="title-login" className="page-title">LabEddit</h1>
                <h4 id="subtitle-login">O projeto de rede social da Labenu</h4>
            </div>
            <form className="form" onSubmit={login}>
                <InputBox 
                    id={"email-login"}
                    name={"email"}
                    type={"email"}
                    value={form.email}
                    handleChange={onChange}
                    label={"Email"}
                    isFieldActive={activeFields.email}
                />
                <InputBox
                    id={"password-login"}
                    name={"password"}
                    type={"password"}
                    value={form.password}
                    handleChange={onChange}
                    label={"Senha"}
                    isFieldActive={activeFields.password}
                />
                <button id="primary-button-login" className="button primary-button" type="submit">Continuar</button>
            </form>
            <div id="divider-login" className="divider"></div>
            <button className="button secondary-button" onClick={() => {goToSignupPage(navigate)}}>Crie uma conta</button>
            {isLoading && <BigLoadingModal />}
        </div>
    )
}

export default LoginPage;