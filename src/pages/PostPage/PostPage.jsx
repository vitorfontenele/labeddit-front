import axios from "axios";
import { useState , useEffect} from "react";
import { useNavigate , useParams } from "react-router-dom";
import { BASE_URL, TOKEN_NAME } from "../../constants/urls";
import "./style.css";
import PostBox from "../../components/PostBox/PostBox";

const PostPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState({});

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

    return (
        <div className="container">
            <PostBox
                username={post.creator.username}
                content={post.content}
                upvotes={post.upvotes}
                downvotes={post.downvotes}
                commentsNumber={post.comments.length}
            />
        </div>
    )
}

export default PostPage;