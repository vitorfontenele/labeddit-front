import "./style.css";
import { useState , useEffect } from "react";
import InputBox from "../../components/InputBox/InputBox";
import useForm from "../../hooks/useForm";
import useActiveFields from "../../hooks/useActiveFields";

const SignupPage = () => {
    const [form, onChange] = useForm({username: "", email: "", password: ""});
    const [activeFields, onActivation] = useActiveFields({username: false, email: false, password: false});
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        onActivation(form);
    }, [form]);

    const handleCheck = (e) => {setChecked(previousState => !previousState)};

    return (
        <div className="container">
            <h1 id="title-signup" className="page-title">{"Olá, boas-vindas ao LabEddit ;)"}</h1>
            <form className="form" action="" method="post">
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
        </div>
    )
}

export default SignupPage;