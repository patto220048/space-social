import './chat.scss'

import { format } from 'timeago.js'; 


function Chat({message,owner}) {
    return ( 
            <div className={owner ? "contents owner" :"contents" }>
                
                <div className= "item">
                    <img src="https://images.unsplash.com/photo-1674574124475-16dd78234342?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                    <div className="message">
                        <p className="msg">{message.text}</p>
                        <span className="time">{format(message.createdAt)}</span>
                    </div>
                </div>
            </div>
     );
}

export default Chat;    