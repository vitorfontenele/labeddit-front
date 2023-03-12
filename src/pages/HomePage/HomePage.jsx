import axios from "axios";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, TOKEN_NAME } from "../../constants/urls";
import "./style.css";
import PostBox from "../../components/PostBox/PostBox";
import { goToLoginPage } from "../../routes/coordinator";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_NAME);

        if (!token){
            goToLoginPage(navigate);
        } else {
            fetchPosts();
        }
    }, []);

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const token = window.localStorage.getItem(TOKEN_NAME);

            const config = {
                headers: {
                    Authorization: token
                }
            }

            const response = await axios.get(BASE_URL + "/posts", config);

            setPosts(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error?.response?.data);
            window.alert(error?.response?.data);
        }
    }

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
            {posts.map((post, index) => {
                const {content, upvotes, downvotes} = post;
                return (
                    <PostBox 
                        username={post.creator.username}
                        content={content}
                        upvotes={upvotes}
                        downvotes={downvotes}
                        commentsNumber={0}
                        key={index}
                    />
                )
            })}
        </div>
    )
}

export default HomePage;