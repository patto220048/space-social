import { useState } from 'react';
import Navbar from '../../layout/navbar/Navbar';
import Sidebar from '../../layout/sidebar/Sidebar';
import "./home.scss"

function Home() {
  
    return ( 
        <div className="warpper-heading">
                <Navbar/>
            <div className='heading'>
            <Sidebar />
            </div>
           

        </div>
    );

}

export default Home;