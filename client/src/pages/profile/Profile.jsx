import { useState } from 'react';
import Post from '../../components/post/Post';
import Navbar from '../../layout/navbar/Navbar';
import Sidebar from '../../layout/sidebar/Sidebar';
import './profile.scss'


function Profile({openSearch,setOpenSearch}) {


    return ( 
        <>
         <Navbar openSearch={openSearch} setOpenSearch={setOpenSearch}/>
        <div className="profile-container">
            <Sidebar/>
            <div className="profile-warpper">
                <div className="profile-item">
                    
                </div>
            </div>
        </div>
        </>
     );
}

export default Profile;