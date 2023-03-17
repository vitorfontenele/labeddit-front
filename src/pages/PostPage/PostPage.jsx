import axios from "axios";
import { useState , useEffect} from "react";
import { useNavigate , useParams } from "react-router-dom";
import { BASE_URL, TOKEN_NAME , USER_ID } from "../../constants/urls";
import "./style.css";
import PostBox from "../../components/PostBox/PostBox";
import BigLoadingModal from "../../components/BigLoadingModal/BigLoadingModal";
import { goToHomePage, goToLoginPage, goToNotFoundPage } from "../../routes/coordinator";

const PostPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingVote, setIsLoadingVote] = useState(false);
    const [post, setPost] = useState({});
    const [commentContent, setCommentContent] = useState("");
    const { id } = useParams();
    const [postVotes, setPostVotes] = useState([]);
    const [commentVotes, setCommentVotes] = useState([]);
    const [loggedUserId, setLoggedUserId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_NAME);

        if (!token){
            goToLoginPage(navigate);
        } else {
            fetchPost(setIsLoading);
        }
    }, []);

    const fetchPost = async (setLoadingFunction) => {
        try {
            setLoadingFunction(true);
            const token = window.localStorage.getItem(TOKEN_NAME);
            
            const config = {
                headers: {
                    Authorization: token
                }
            }

            const responsePost = await axios.get(BASE_URL + `/posts/${id}`, config);
            const responsePostsVotes = await axios.get(BASE_URL + "/posts/votes", config);
            const responseCommentsVotes = await axios.get(BASE_URL + "/comments/votes", config);

            setTimeout(() => {
                setLoggedUserId(window.localStorage.getItem(USER_ID));
                setPostVotes(responsePostsVotes.data);
                setCommentVotes(responseCommentsVotes.data);
                setPost(responsePost.data);
                setLoadingFunction(false);
            }, 500);
        } catch (error) {
            if (error?.response?.status === 404){
                goToNotFoundPage(navigate);
                return;
            }
            setLoadingFunction(false);
            console.error(error?.response?.data);
            window.alert(error?.response?.data);
        }
    }

    const handleContentChange = (event) => {
        setCommentContent(event.target.value);
    }

    const createComment = async (event) => {
        event.preventDefault();

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
            fetchPost(setIsLoading);
        } catch (error) {
            console.error(error?.response?.data);
            window.alert(error?.response?.data);
        }
    }

    const onVote = async (vote, postId, entity) => {
        if (isLoadingVote){
            return;
        }

        try {
            setIsLoadingVote(true);
            // entity é 'posts' ou 'comments'
            const token = window.localStorage.getItem(TOKEN_NAME);

            const config = {
                headers: {
                    Authorization: token
                }
            }; 

            const body = {
                vote: vote
            };

            await axios.put(BASE_URL + `/${entity}/${postId}/vote`, body, config);

            fetchPost(setIsLoadingVote);
        } catch (error) {
            setIsLoadingVote(false);
            console.error(error?.response?.data);
            window.alert(error?.response?.data); 
        }
    }

    const matchPostVotes = postVotes.find(vote => vote.userId == loggedUserId && vote.postId == id);
    const postUpvotesSafe = postVotes.filter(vote => vote.postId === id && vote.vote === 1);
    const postDownvotesSafe = postVotes.filter(vote => vote.postId === id && vote.vote === 0);
    
    return (
        <div className="container">
            <PostBox
                username={post.creator?.username}
                content={post.content}
                upvotes={postUpvotesSafe.length}
                downvotes={postDownvotesSafe.length}
                commentsNumber={post.comments?.length}
                postId={id}
                entity={"posts"}
                onVote={onVote}
                matchVote={matchPostVotes}
                isClickable={"non-clickable"}
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
                const { content } = comment;
                const commentId = comment.id;
                const matchCommentVotes = commentVotes.find(vote => vote.userId === loggedUserId && vote.commentId === commentId);
                const commentUpvotesSafe = commentVotes.filter(vote => vote.commentId === commentId && vote.vote === 1);
                const commentDownvotesSafe = commentVotes.filter(vote => vote.commentId === commentId && vote.vote === 0);
                
                return (
                    <PostBox 
                        postId={commentId}
                        username={comment.creator.username}
                        content={content}
                        upvotes={commentUpvotesSafe?.length}
                        downvotes={commentDownvotesSafe?.length}
                        key={index}
                        entity={"comments"}
                        matchVote={matchCommentVotes}
                        onVote={onVote}
                        isClickable={"non-clickable"}
                    />
                )
            })}
            {isLoading && <BigLoadingModal/>}
        </div>
    )
}

export default PostPage;