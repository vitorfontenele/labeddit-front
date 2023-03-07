import "./style.css";

const LoginPage = () => {
    return (
        <div className="container">
            <div id="heading-group">
                <img src="logo.svg" alt="LabEddit Logo" />
                <h1 id="title-login" className="page-title">LabEddit</h1>
                <h4 id="subtitle-login">O projeto de rede social da Labenu</h4>
            </div>
            <form className="form" action="" method="post">
                <input className="form-input" type="email" placeholder="E-mail" />
                <input className="form-input" type="password" placeholder="Senha" />
                <button id="primary-button-login" className="button primary-button" type="submit">Continuar</button>
            </form>
            <div id="divider-login" className="divider"></div>
            <button className="button secondary-button">Crie uma conta</button>
        </div>
    )
}

export default LoginPage;