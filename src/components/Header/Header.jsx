import { useLocation, useNavigate } from "react-router-dom";
// import { goToLoginPage } from "../../routes/coordinator";

const Header = () => {
    const location = useLocation();
    // const navigate = useNavigate();

    if (location.pathname === "/login"){
        return <></>
    }

    const renderAnchor = () => {
        switch(location.pathname){
            case "/signup":
                return <a className="anchor anchor-strong header-anchor" href="/login">Entrar</a>
            case "/":
                return <a className="anchor anchor-strong header-anchor">Logout</a>
        }
    }

    return (
        <header className="header">
            <img className="header-logo" src="logo.svg" />
            {renderAnchor()}
        </header>
    )
}

export default Header;