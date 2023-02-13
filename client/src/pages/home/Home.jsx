import { useState } from 'react';
import Contents from '../../layout/contents/Contents';
import Navbar from '../../layout/navbar/Navbar';
import Rightbar from '../../layout/rightbar/Rightbar';
import Sidebar from '../../layout/sidebar/Sidebar';

import "./home.scss"

function Home({openSearch,setOpenSearch}) {

    
  
    return ( 
        <>
            <Navbar openSearch={openSearch} setOpenSearch={setOpenSearch}/>
            <div className="container-home">
                <Sidebar/>
                <Contents/>
                <Rightbar/>


            </div>
        </>

       
    );

}

export default Home;