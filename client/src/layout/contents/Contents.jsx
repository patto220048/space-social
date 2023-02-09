import "./contents.scss"
import Share from "../../components/share/Share";
import Post from "../../components/post/Post";

function Contents() {
    
      return (  
          <div className="container-contents">
            <div className="wapper-contents">
                <Share/>
                <Post/>

                

            </div>
            
          </div>
      );
  
  }
  
  export default Contents;