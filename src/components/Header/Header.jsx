import { useLocation, useNavigate } from "react-router-dom";
// import { goToLoginPage } from "../../routes/coordinator";

const Header = () => {
    const location = useLocation();
    // const navigate = useNavigate();
    let visibleClass = "";
    if (location.pathname === "/login"){
        visibleClass = "invisible";
    }

    const renderAnchor = () => {
        switch(location.pathname){
            case "/login":
                return <></>
            case "/signup":
                return <a className="anchor anchor-strong header-anchor" href="/login">Entrar</a>
            case "/":
                return <a className="anchor anchor-strong header-anchor" href="#">Logout</a>
        }
    }

    return (
        <header className={`header ${visibleClass}`}>
            <img className="header-logo" src="logo.svg" />
            {renderAnchor()}
        </header>
    )
}

export default Header;