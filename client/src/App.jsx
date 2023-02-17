import { useState } from 'react';
import './app.scss'


import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Signup from './pages/signup/Signup';



function App() {
  const [openSearch, setOpenSearch] = useState(false)

  return (   
    <Home openSearch={openSearch} setOpenSearch={setOpenSearch} />
    // <Login/>
    // <Signup/>
    // <Profile/>
   
  );
}

export default App;
