import "./style.css";
import { useEffect, useState } from "react";
import InputBox from "../../components/InputBox/InputBox";
import useForm from "../../hooks/useForm";
import useActiveFields from "../../hooks/useActiveFields";

const LoginPage = () => {
    const [form, onChange] = useForm({email: "", password: ""});
    const [activeFields, onActivation] = useActiveFields({email: false, password: false});

    useEffect(() => {
        onActivation(form);
    }, [form]);
      
    return (
        <div className="container">
            <div id="heading-group">
                <img src="logo.svg" alt="LabEddit Logo" />
                <h1 id="title-login" className="page-title">LabEddit</h1>
                <h4 id="subtitle-login">O projeto de rede social da Labenu</h4>
            </div>
            <form className="form" action="" method="post">
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
            <button className="button secondary-button">Crie uma conta</button>
        </div>
    )
}

export default LoginPage;