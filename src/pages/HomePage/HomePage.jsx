import axios from "axios";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, TOKEN_NAME , USER_ID } from "../../constants/urls";
import "./style.css";
import PostBox from "../../components/PostBox/PostBox";
import { goToLoginPage } from "../../routes/coordinator";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [votes, setVotes] = useState([]);
    const [loggedUserId, setLoggedUserId] = useState("");

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

            const responsePosts = await axios.get(BASE_URL + "/posts", config);
            const responseVotes = await axios.get(BASE_URL + "/posts/vote", config);

            setLoggedUserId(window.localStorage.getItem(USER_ID));
            setVotes(responseVotes.data);
            setPosts(responsePosts.data);
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

    const vote = async (upvote, postId, entity) => {
        if (isLoading){
            return;
        }

        try {
            // entity é 'posts' ou 'comments'
            setIsLoading(true);
            const token = window.localStorage.getItem(TOKEN_NAME);

            const config = {
                headers: {
                    Authorization: token
                }
            }; 

            const body = {
                upvote: upvote
            };
            
            await axios.put(BASE_URL + `/${entity}/${postId}/vote`, body, config);

            fetchPosts();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
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
                const postId = post.id;
                const matchVote = votes.find(vote =>  vote.userId === loggedUserId && vote.postId === postId);
                const upvotesSafe = votes.filter(vote => vote.postId === postId && vote.upvote === 1);
                const downvotesSafe = votes.filter(vote => vote.postId === postId && vote.upvote === 0);
                
                return (
                    <PostBox 
                        username={post.creator.username}
                        postId={postId}
                        content={content}
                        upvotes={upvotesSafe.length}
                        downvotes={downvotesSafe.length}
                        commentsNumber={post.comments.length}
                        key={index}
                        vote={vote}
                        matchVote={matchVote}
                        entity={"posts"}
                    />
                )
            })}
        </div>
    )
}

export default HomePage;