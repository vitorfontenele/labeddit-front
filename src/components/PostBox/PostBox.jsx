const PostBox = (props) => {
    const { username , content , upvotes , downvotes , commentsNumber } = props;

    const formatNumber = (num) => {
        if (num >= 1000) {
          const formattedNum = (num / 1000).toFixed(1);
          return `${formattedNum}k`;
        } else {
          return num.toString();
        }
    }
      
    const netVotes = upvotes - downvotes;

    return (
        <article className="postbox-box">
            <span className="postbox-user">Enviada por: {username}</span>
            <h1 className="postbox-title">{content}</h1>
            <div className="postbox-info-box">
                <div className="postbox-votes-box">
                    <img src="upvote.svg" alt="Upvote" />
                    <span className="postbox-votes">{formatNumber(netVotes)}</span>
                    <img src="downvote.svg" alt="Downvote" />
                </div>
                <div className="postbox-comment-box">
                    <img src="comment.svg" alt="Comment" />
                    <span className="postbox-comment">{formatNumber(commentsNumber)}</span>
                </div>
            </div>
        </article>
    )
}

export default PostBox;