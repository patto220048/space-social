import "./post.scss"

function Post() {
    return ( 
        <div className="post-container">
            <div className="post-wapper">
                <div className="post-items">
                    <div className="user-info">
                        <img src="" alt="" />
                        <div className="name-user">
                            <span>PHAT</span>
                            <div className="time">6 hour ago</div>
                        </div>

                    </div>
                    <div className="post-img">
                        <img src="" alt="" />
                    </div>
                    <div className="post-info">
                        <div className="like-number">

                        </div>
                        <div className="comment-number">

                        </div>
                        <div className="share-number">

                        </div>

                    </div>
                    <div className="post-action">
                        <div className="like">

                        </div>
                        <div className="comments">
                        
                        </div>
                        <div className="share">

                        </div>
                    </div>


                </div>
            </div>
        </div>
     );
}

export default Post;