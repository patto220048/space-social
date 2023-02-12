
import Comment from "../comment/Comment";
import "./comments.scss"

function Comments() {
    return ( 
        <div className="comments-container">
            <div className="comments-wapper">
                <div className="comments-item">
                    <img className="comments-img" src="https://images.unsplash.com/photo-1675372339768-14ed0300cd37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                    <input 
                        className="comments-input"
                        type="text" 
                        placeholder="comments"
                    />
                    <button className="comments-button">Comment</button>

                </div>
                
            </div>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                
        
        </div>
        

    
        

     );
}

export default Comments;