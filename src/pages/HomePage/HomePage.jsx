import "./style.css";
import PostBox from "../../components/PostBox/PostBox";

const HomePage = () => {
    const propsMock = {
        username: "labaluno83",
        title: "Por que a maioria dos desenvolvedores usam Linux? Ou as empresas de tecnologia usam Linux?",
        upvotes: 1300,
        downvotes: 100,
        commentsNumber: 132
    }

    const {username, title, upvotes, downvotes, commentsNumber} = propsMock;

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
            <PostBox
                username={username}
                title={title}
                upvotes={upvotes}
                downvotes={downvotes}
                commentsNumber={commentsNumber}
            />
        </div>
    )
}

export default HomePage;