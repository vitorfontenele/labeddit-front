import { useLocation, useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../routes/coordinator";
import { TOKEN_NAME } from "../../constants/urls";
import logoSrc from "/logo.svg";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    let visibleClass = "";
    if (location.pathname === "/login"){
        visibleClass = "invisible";
    }

    const logout = () => {
        window.localStorage.removeItem(TOKEN_NAME);
        goToLoginPage(navigate);
    }

    const renderAnchor = () => {
        switch(location.pathname){
            case "/login":
                return <></>
            case "/signup":
                return <a className="anchor anchor-strong header-anchor" onClick={() => {goToLoginPage(navigate)}}>Entrar</a>
            case "/":
                return <a className="anchor anchor-strong header-anchor" onClick={() => {logout()}}>Logout</a>
        }
    }

    return (
        <header className={`header ${visibleClass}`}>
            <img className="header-logo" src={logoSrc} alt="Labeddit Logo" />
            {renderAnchor()}
        </header>
    )
}

export default Header;