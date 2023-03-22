
import './app.scss'

import { useEffect, useRef, useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {io} from 'socket.io-client'


import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Signup from './pages/signup/Signup';
import Setting from './pages/setting/Setting';
import Navbar from './layout/navbar/Navbar';
import Rightbar from './layout/rightbar/Rightbar';
import Sidebar from './layout/sidebar/Sidebar';
import Home from './pages/home/Home';
import Friends from './pages/friend/Friends';
import Conversation from './pages/conversation/Conversation';


function App() {
  const  {currentUser} = useSelector((state) => state.user)
  const [openSideBarMb, setOpenSideBarMb] = useState(false)
  const [openRightbar, setOpenRightbar] = useState(false)
  const socketio = useRef() 
  useEffect(()=> {
    socketio.current = (io('ws://localhost:4000'))
  },[])
  useEffect(()=>{
    socketio.current.emit('addUser',currentUser?._id)

    socketio.current.on('getUsers' , user => {
      console.log(user)
    })
    
  },[currentUser])  


  const Layout= () => {
    return (
      <>
      <Navbar socket={socketio.current} setOpenSideBarMb= {setOpenSideBarMb} openSideBarMb={openSideBarMb} openRightbar={openRightbar} setOpenRightbar={setOpenRightbar}  />
        <div className='main'>
         <Sidebar openSideBarMb ={openSideBarMb} setOpenSideBarMb={setOpenSideBarMb} />
            <Outlet/>
          {/* <Rightbar openRightbar={openRightbar}/> */}

      </div>

      </>
    )
  }

  const ProtectRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to ="/login"/>   
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectRoute><Layout/></ProtectRoute>,
      children:[
        {
          path:"/",
          element: <Home socket={socketio.current} openRightbar={openRightbar} type="random"  />
        },
        {
          path:"/newpost",
          element: <Home  type="newpost"/>
        },
        {
          path:"/random",
          element: <Home  type="random"/>
        },
        {
          path:"/followed",
          element: <Home  type="folowed"/>
        },
        {
          path:"/profile/:userId",
          element: <Profile openRightbar={openRightbar}/>
        },
        {
          path:"/setting",
          element: <Setting/>
        },
        { 
          path:"/friend/:friendId", 
          element: <Friends type= 'friend'/>
        },
        { 
          path:"/follower/:friendId", 
          element: <Friends type= 'follower'/>
        },
        { 
          path:"/following/:friendId", 
          element: <Friends type= 'following'/>
        },
      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    }, 
    { 
      path:"/message", 
      element: <Conversation/>
    }
  
  ]);


  return (   
   
    <RouterProvider router={router} />
   
  );
}

export default App;
