import "./style.css";

const HomePage = () => {
    return (
        <div className="container">
            <textarea 
                name="" 
                id="" 
                className="textbox"
                placeholder="Escreva seu post..."
            ></textarea>
            <button id="post-button" className="button primary-button">Postar</button>
            <div id="home-divider" className="divider"></div>
        </div>
    )
}

export default HomePage;