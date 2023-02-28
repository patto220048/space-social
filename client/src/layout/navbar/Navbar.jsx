import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function Navbar() {

    const [openSearch, setOpenSearch] = useState(false)

    return (  
        <div className="nav-container">
            <div className="navbar">
               <Link to="/" style={{textDecoration:'none'}}>
                    <h1 className="logo">.SPACE</h1>
               </Link> 
                <div className="search" onClick={()=>setOpenSearch(!openSearch)} >
                    <input 
                        className="nav-input" 
                        placeholder='Search' 
                        type="text" 
                        />
                    
                    <button className="search-icon"><SearchIcon style={{fontSize:"40px"}}/></button>
                 
              { openSearch ?
                <div className='data-result'>
                        <div className="data-items">
                            <img src="https://images.unsplash.com/photo-1677508259126-aaa7e0ab008d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                            <span>name</span>
                        </div>
                        
                </div>
                :
                <></>
                }

                </div>
                <div className="nav-items">
                    <div className="nav-user">
                        <div className="nav-link">
                            <button className='nav-link-btn'><MessageRoundedIcon/></button>
                            <div className='count-left'>1</div>
                            <button className='nav-link-btn'><NotificationsIcon/></button>
                            <div className='count-right'>1</div>
                        

                        </div>
                        {/* <img src="https://images.unsplash.com/photo-1675372339768-14ed0300cd37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                        <div className="menu-icon">
                            <ArrowDropDownIcon/>
                        </div>
                        <div className="menu-options">
                            <div className="menu-items">
                                <p>hello</p>
                                <p>123</p>
                                <p>123</p>
                                <p>123</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;