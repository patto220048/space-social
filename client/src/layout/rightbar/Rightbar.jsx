
import Online from "../../components/onlineUser/Online";
import "./rightbar.scss"

function Rightbar() {
    return ( 
        <div className="rightbar-container">
            <div className="rightbar-wapper">
                <h1 className="suggest-name">Suggest</h1>
                <div className="suggest-friend">
                    <div className="friend-items">
                        <img className="friend-img" src="https://images.unsplash.com/photo-1675969268999-2c36d2589d65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="" />
                        <span className="friend-name">Name</span>
                    </div>
                    <div className="button">
                        <button >Argee</button>
                        <button>Reject</button>
                    </div>

                </div>
                <div className="suggest-friend">
                    <div className="friend-items">
                        <img className="friend-img" src="https://images.unsplash.com/photo-1675969268999-2c36d2589d65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="" />
                        <span className="friend-name">Name</span>
                    </div>
                    <div className="button">
                        <button>Argee</button>
                        <button>Reject</button>
                    </div>

                </div>
                <div className="suggest-friend">
                    <div className="friend-items">
                        <img className="friend-img" src="https://images.unsplash.com/photo-1675969268999-2c36d2589d65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="" />
                        <span className="friend-name">Name</span>
                    </div>
                    <div className="button">
                        <button>Argee</button>
                        <button>Reject</button>
                    </div>

                </div>
                <div className="suggest-friend">
                    <div className="friend-items">
                        <img className="friend-img" src="https://images.unsplash.com/photo-1675969268999-2c36d2589d65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="" />
                        <span className="friend-name">Name</span>
                    </div>
                    <div className="button">
                        <button className="argee-btn">Argee</button>
                        <button className="reject-btn">Reject</button>
                    </div>

                </div>    
               
            </div>
            <div className="user-online">
                <h1 className="user-online-name">Online</h1>
                <Online/>  
            </div>
          
        </div>
     );
}

export default Rightbar;