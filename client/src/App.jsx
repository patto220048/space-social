import { useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";


import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Signup from './pages/signup/Signup';

import Navbar from './layout/navbar/Navbar';
import Rightbar from './layout/rightbar/Rightbar';
import Sidebar from './layout/sidebar/Sidebar';
import Home from './pages/home/Home';
import { useSelector} from 'react-redux';

function App() {
  const  {currentUser} = useSelector((state) => state.user)
  const [openSearch, setOpenSearch] = useState(false)

 
  
  const Layout= () => {
    return (
      <>
      <Navbar openSearch={openSearch} setOpenSearch={setOpenSearch}/>
      <div style={{display:"flex", backgroundColor:"aliceblue"}}>
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
          element: <Home />
        },
        // {
        //   path:"/profile/:id",
        //   element: <Profile/>
        // }
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
      path: "/profile/:id",
      element: <ProtectRoute><Profile openSearch={openSearch} setOpenSearch={setOpenSearch}/></ProtectRoute>,
    },
  ]);


  return (   
   
    <RouterProvider router={router} />
   
  );
}

export default App;
