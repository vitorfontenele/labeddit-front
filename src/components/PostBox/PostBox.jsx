import upvoteSrc from "/upvote.svg";
import downvoteSrc from "/downvote.svg";
import commentSrc from "/comment.svg";

const PostBox = (props) => {
    const { username , content , upvotes , downvotes , commentsNumber } = props;

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
                <div className="postbox-comment-box">
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
                    <img src={upvoteSrc} alt="Upvote" />
                    <span className="postbox-votes">{formatNumber(netVotes)}</span>
                    <img src={downvoteSrc} alt="Downvote" />
                </div>
                {renderCommentBox()}
            </div>
        </article>
    )
}

export default PostBox;