import axios from "axios";
import upvoteSrc from "/upvote.svg";
import upvoteActiveSrc from "/upvote-active.svg";
import downvoteSrc from "/downvote.svg";
import downvoteActiveSrc from "/downvote-active.svg";
import commentSrc from "/comment.svg";
import { goToPostPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { BASE_URL, TOKEN_NAME } from "../../constants/urls";

const PostBox = (props) => {
    const { username , content , upvotes , downvotes , commentsNumber , postId , onVote , matchVote , entity , isClickable } = props;

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

    const goToPage = () => {
        if (entity === "posts"){
            goToPostPage(navigate, postId);
        } else {
            return;
        }
    }

    return (
        <article className={`postbox-box ${isClickable}`} onClick={() => {goToPage()}}>
            <span className="postbox-user">Enviada por: {username}</span>
            <h1 className="postbox-title" >{content}</h1>
            <div className="postbox-info-box">
                <div className="postbox-votes-box">
                    <img 
                        src={matchVote?.vote === 1 ? upvoteActiveSrc : upvoteSrc} 
                        alt="Upvote" 
                        className="vote" 
                        onClick={(event) => {onVote(true, postId, entity, event)}}/>
                    <span className="postbox-votes">{formatNumber(netVotes)}</span>
                    <img 
                        src={matchVote?.vote === 0 ? downvoteActiveSrc : 
                        downvoteSrc} 
                        alt="Downvote"
                        className="vote"
                        onClick={(event) => {onVote(false, postId, entity, event)}}
                    />
                </div>
                {renderCommentBox()}
            </div>
        </article>
    )
}

export default PostBox;