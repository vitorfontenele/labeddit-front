const PostBox = (props) => {
    const { username , title , upvotes , downvotes , commentsNumber } = props;
    
    return (
        <article className="postbox-box">
            <span className="postbox-user">Enviada por: {username}</span>
            <h1 className="postbox-title">{title}</h1>
            <div>
                <div>
                    <img></img>
                    <span></span>
                    <img></img>
                </div>
                <div>
                    <img src="" alt="" />
                    <span></span>
                </div>
            </div>
        </article>
    )
}

export default PostBox;