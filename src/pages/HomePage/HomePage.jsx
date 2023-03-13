import axios from "axios";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, TOKEN_NAME } from "../../constants/urls";
import "./style.css";
import PostBox from "../../components/PostBox/PostBox";
import { goToLoginPage } from "../../routes/coordinator";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [postContent, setPostContent] = useState("");
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

    const handleContentChange = (event) => {
        setPostContent(event.target.value);
    }

    const createPost = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        
        try {
            const token = window.localStorage.getItem(TOKEN_NAME);

            const config = {
                headers: {
                    Authorization: token
                }
            };

            const body = {
                content: postContent
            }

            await axios.post(BASE_URL + "/posts", body, config);
            
            setPostContent("");
            setIsLoading(false);
            fetchPosts();
        } catch (error) {
            console.error(error?.response?.data);
            window.alert(error?.response?.data);
        }
    }

    return (
        <div className="container">
            <form onSubmit={createPost}>
                <textarea 
                    className="textbox"
                    placeholder="Escreva seu post..."
                    value={postContent}
                    onChange={handleContentChange}
                ></textarea>
                <button type="submit" id="post-button" className="button primary-button">Postar</button>
            </form>
            <div id="home-divider" className="divider"></div>
            {posts.map((post, index) => {
                const {content, upvotes, downvotes} = post;
                return (
                    <PostBox 
                        username={post.creator.username}
                        content={content}
                        upvotes={upvotes}
                        downvotes={downvotes}
                        commentsNumber={post.comments.length}
                        key={index}
                    />
                )
            })}
        </div>
    )
}

export default HomePage;