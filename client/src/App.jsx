import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useSelector} from 'react-redux';
import axios from 'axios';


import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Signup from './pages/signup/Signup';
import Setting from './pages/setting/Setting';
import Navbar from './layout/navbar/Navbar';
import Rightbar from './layout/rightbar/Rightbar';
import Sidebar from './layout/sidebar/Sidebar';
import Home from './pages/home/Home';


function App() {
  const  {currentUser} = useSelector((state) => state.user)
  const [openSearch, setOpenSearch] = useState(true)
  const [openUpload, setOpenUpload] = useState(false)

  
  
  const Layout= () => {
    return (
      <>
      <Navbar openSearch={openSearch} setOpenSearch={setOpenSearch}/>
      <div style={{
        display:"flex",
        backgroundColor:"aliceblue",
        gap:'30px',
        // paddingTop: '10px',
        }}>
        <Sidebar/>
          <Outlet/>
        <Rightbar/>

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
          element: <Home openUpload = {openUpload} setOpenUpload={setOpenUpload} type="random"/>
        },
        {
          path:"/profile/:userId",
          element: <Profile openUpload = {openUpload} setOpenUpload={setOpenUpload}/>
        },
        {
          path:"/setting",
          element: <Setting/>
        }
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
    // {
    //   path: "/profile/:id",
    //   element: <ProtectRoute><Profile openSearch={openSearch} setOpenSearch={setOpenSearch}/></ProtectRoute>,
    // },
  ]);


  return (   
   
    <RouterProvider router={router} />
   
  );
}

export default App;
