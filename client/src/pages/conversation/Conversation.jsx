import FriendMsg from '../../components/friendMsg/FriendMsg';
import Chat from '../../components/chat/Chat';
import './conversation.scss'
import Navbar from '../../layout/navbar/Navbar';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../layout/sidebar/Sidebar';




function Message({socket}) {
  const sessionId = localStorage.getItem("sessionID");

    const [conversation , setConversation] = useState([])
    const  {currentUser} = useSelector((state) => state.user)
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrMessage, setArrMessage] = useState(null)
    const scrollRef = useRef()


    useEffect(()=>{
        const getConversation = async () => {
            try {
                const res = await axios.get(`/conversation/${currentUser._id}`)
                setConversation(res.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getConversation()

    },[currentUser._id])

    useEffect(() => {

        const getMessage = async () => {
            try {
                const res = await axios.get(`/message/${currentChat?._id}`)
                setMessages(res.data)
            } catch (err) {
                console.log(err.message)
                
            }
        }
        getMessage()

    },[currentChat])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            conversationId: currentChat._id ,
            sender: currentUser._id ,
            text: newMessage ,
        }
        //socket io send data to sv
        const receiverId = currentChat.members.find(member => member !== currentUser._id)
        socket?.emit('sendMessage', {
            senderId: currentUser._id,
            receiverId: receiverId,
            text: newMessage,
        })



        try {
            const res = await axios.post(`/message`,message )
            setMessages([...messages, res.data])
        } catch (err) {
            console.log(err.message)  
        }
        setNewMessage('')

    }
    // get data from server
    useEffect(()=>{
        socket?.on('getMessage', data =>{
            setArrMessage({
                sender:data.senderId,
                text:data.text,
                createdAt: Date.now(),
            })
        })
    },[])

    useEffect(()=>{
        arrMessage  && currentChat?.members.includes(arrMessage.sender) && 
        setMessages(prev => [...prev, arrMessage])
    },[arrMessage, currentChat])

    
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })   
    },[messages])


    return ( 
        <>
        <div className="conversation-container">
            <div className="conversation-wapper">
                <div className="conversation-items">
                    <div className="left">
                        <h1>Friends</h1>
                        {conversation.map((conversation, index)=>(
                            <div onClick={()=>setCurrentChat(conversation)} key={index}>
                                <FriendMsg conversation = {conversation}/>
                            </div>
                        ))}
                    </div>
                    <div className="right">
                        {currentChat ?

                           <div className="chat-container">
                            {messages.map((message, index)=>(
                                <div ref={scrollRef} key= {index}>
                                    <Chat message={message} owner = {message.sender === currentUser._id} 
                                        friendId = {currentChat.members.find(member => member !== currentUser._id)}
                                        />
                                </div>

                            ))}
                              

                                <div className="input">
                                    <div className="text-message">
                                        <textarea 
                                         value={newMessage}
                                         name="" id=""
                                         placeholder='Write something here !'
                                         onChange={(e)=> setNewMessage(e.target.value)}
                                         >
                                        </textarea>
                                       { newMessage 
                                       ?
                                       <button className="btn-submit" onClick={handleSubmit}>SEND</button>
                                       :
                                       <button className="btn-submit" disabled>SEND</button>
                                    }
                                    </div>
                                </div>
                            </div>
                            :
                            <h1 className='conversation-text'>Open something chatbox to start chat</h1>
                        }

                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default Message;