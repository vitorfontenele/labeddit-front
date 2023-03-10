import axios from "axios";
import upvoteSrc from "/upvote.svg";
import downvoteSrc from "/downvote.svg";
import commentSrc from "/comment.svg";
import { goToPostPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { BASE_URL, TOKEN_NAME } from "../../constants/urls";

const PostBox = (props) => {
    const { username , content , upvotes , downvotes , commentsNumber , postId , vote , entity } = props;

    const navigate = useNavigate();

    const formatNumber = (num) => {
        if (num >= 1000) {
          const formattedNum = (num / 1000).toFixed(1);
          return `${formattedNum}k`;
        } else {
          return num?.toString();
        }
    }
      
    const netVotes = upvotes - downvotes;

    const renderCommentBox = () => {
        if (commentsNumber !== undefined){
            return (
                <div className="postbox-comment-box" onClick={() => {goToPostPage(navigate, postId)}}>
                    <img src={commentSrc} alt="Comment" />
                    <span className="postbox-comment">{formatNumber(commentsNumber)}</span>
                </div>
            )
        } else {
            return <></>
        }
    }

    return (
        <article className="postbox-box">
            <span className="postbox-user">Enviada por: {username}</span>
            <h1 className="postbox-title">{content}</h1>
            <div className="postbox-info-box">
                <div className="postbox-votes-box">
                    <img src={upvoteSrc} alt="Upvote" className="vote" onClick={() => {vote(true, postId, entity)}}/>
                    <span className="postbox-votes">{formatNumber(netVotes)}</span>
                    <img src={downvoteSrc} alt="Downvote" className="vote" onClick={() => {vote(false, postId, entity)}} />
                </div>
                {renderCommentBox()}
            </div>
        </article>
    )
}

export default PostBox;