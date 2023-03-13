import axios from "axios";
import { useState , useEffect} from "react";
import { useNavigate , useParams } from "react-router-dom";
import { BASE_URL, TOKEN_NAME } from "../../constants/urls";
import "./style.css";
import PostBox from "../../components/PostBox/PostBox";

const PostPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState({});
    const [commentContent, setCommentContent] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_NAME);

        if (!token){
            goToLoginPage(navigate);
        } else {
            fetchPost();
        }
    }, []);

    const fetchPost = async () => {
        try {
            setIsLoading(true);
            const token = window.localStorage.getItem(TOKEN_NAME);
            
            const config = {
                headers: {
                    Authorization: token
                }
            }

            const response = await axios.get(BASE_URL + `/posts/${id}`, config);

            setPost(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error?.response?.data);
            window.alert(error?.response?.data);
        }
    }

    const handleContentChange = (event) => {
        setCommentContent(event.target.value);
    }

    const createComment = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        try {
            const token = window.localStorage.getItem(TOKEN_NAME);

            const config = {
                headers: {
                    Authorization: token
                }
            }

            const body = {
                content: commentContent,
                postId: id
            }

            await axios.post(BASE_URL + "/comments", body, config);

            setCommentContent("");
            setIsLoading(false);
            fetchPost();
        } catch (error) {
            console.error(error?.response?.data);
            window.alert(error?.response?.data);
        }
    }

    const vote = async (upvote, postId, entity) => {
        try {
            // entity é 'posts' ou 'comments'
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

            fetchPost();
        } catch (error) {
            console.error(error?.response?.data);
            window.alert(error?.response?.data); 
        }
    }
    
    return (
        <div className="container">
            <PostBox
                username={post.creator?.username}
                content={post.content}
                upvotes={post.upvotes}
                downvotes={post.downvotes}
                commentsNumber={post.comments?.length}
                postId={id}
                entity={"posts"}
                vote={vote}
            />
            <form onSubmit={createComment}>
                <textarea 
                    id="comment-textbox"
                    className="textbox" 
                    placeholder="Adicionar comentário"
                    value={commentContent} 
                    onChange={handleContentChange}
                />
                <button type="submit" className="button primary-button">Responder</button>
            </form>
            <div id="post-divider" className="divider"></div>
            {post.comments?.map((comment, index) => {
                return (
                    <PostBox 
                        postId={comment.id}
                        username={comment.creator.username}
                        content={comment.content}
                        upvotes={comment.upvotes}
                        downvotes={comment.downvotes}
                        key={index}
                        entity={"comments"}
                        vote={vote}
                    />
                )
            })}
        </div>
    )
}

export default PostPage;