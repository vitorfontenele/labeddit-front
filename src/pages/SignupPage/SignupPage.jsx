import "./style.css";
import { useEffect } from "react";
import InputBox from "../../components/InputBox";
import useForm from "../../hooks/useForm";
import useActiveFields from "../../hooks/useActiveFields";

const SignupPage = () => {
    const [form, onChange] = useForm({username: "", email: "", password: ""});
    const [activeFields, onActivation] = useActiveFields({username: false, email: false, password: false});

    useEffect(() => {
        onActivation(form);
    }, [form]);

    return (
        <div className="container">
            <h1 className="page-title">{"Olá, boas-vindas ao LabEddit ;)"}</h1>
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
            </form>
        </div>
        
    )
}

export default SignupPage;