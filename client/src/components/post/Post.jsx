import "./post.scss"
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Comments from "../comments/Comments";
function Post() {
    return ( 
        <div className="post-container">
            <div className="post-wapper">
                <div className="post-items">
                    <div className="user-info">
                        <div className="user">
                            <img className="user-img" src="https://images.unsplash.com/photo-1675372339768-14ed0300cd37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                            <div className="name">
                                <span>PHAT</span>
                                <div className="time">6 hour ago</div>
                            </div>
                        </div>
                        <div className="option">
                            <CloseIcon/>
                            <DragIndicatorIcon/>

                        </div>
                    </div>
                    <div className="line"></div>
                    <span className="desc">
                        Có lần tôi cũng nghĩ đến chuyện lai chim bán hàng trên tóp tóp kiếm thêm thu nhập cho gia đình. Sau đó tôi chợt nhận ra các thượng đế của mình có thể sẽ phải nghe những âm thanh như là…
                        Có lần tôi cũng nghĩ đến chuyện lai chim bán hàng trên tóp tóp kiếm thêm thu nhập cho gia đình. Sau đó tôi chợt nhận ra các thượng đế của mình có thể sẽ phải nghe những âm thanh như là…
                    </span>
                    <div className="post-img">
                        <img src="https://images.unsplash.com/photo-1675750317991-26b1183e87fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80" alt="" />
                    </div>
                    <div className="post-info">
                      <span className="like-count">123 like</span>
                      <span className="comment-count">14 comments</span>
                      <span className="share-count">3 share</span>

                    </div>
                    <div className="line"></div>
                    <div className="post-action">
                        <div className="action-btn">
                            <button className="likeBtn">
                                <img src="https://cdn-icons-png.flaticon.com/512/8359/8359645.png" alt="" />
                                <span>Like</span>
                            </button>
                            <button className="likeBtn">
                                <img src="https://cdn-icons-png.flaticon.com/512/4470/4470922.png" alt="" />
                                <span>Comment</span>
                            </button>
                            <button className="likeBtn">
                                <img src="https://cdn-icons-png.flaticon.com/512/2936/2936774.png" alt="" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                    <div className="line"></div>
                    <Comments/>


                </div>
            </div>
        </div>
     );
}

export default Post;