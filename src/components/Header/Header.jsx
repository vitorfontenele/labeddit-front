import { useLocation, useNavigate, useParams } from "react-router-dom";
import { goToHomePage, goToLoginPage } from "../../routes/coordinator";
import { TOKEN_NAME , USER_ID } from "../../constants/urls";
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
        window.localStorage.removeItem(USER_ID);
        goToLoginPage(navigate);
    }

    const renderEquis = () => {
        if (location.pathname.match(/^\/post\/[a-zA-Z0-9-]+$/)){
            return <a className="equis" onClick={() => {goToHomePage(navigate)}} />
        } else {
            return <></>
        }
    }

    const renderAnchor = () => {
        if (location.pathname.match(/^\/post\/[a-zA-Z0-9-]+$/)){
            return <a className="anchor anchor-strong header-anchor" onClick={() => {logout()}}>Logout</a>
        }

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
            {renderEquis()}
            <img className="header-logo" src={logoSrc} alt="Labeddit Logo" />
            {renderAnchor()}
        </header>
    )
}

export default Header;