import './search.scss'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";


import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';


function Search() {

    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 

    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    useEffect(()=>{
        const fecthUser = async()=>{
            try {   
                const res = await axios.get(`/user/search?q=${query}`) 
                setUsers(res.data.map(data=>data))
            } catch (err) {
                console.log(err.message)
            }
        }
        if( query.length === 0 ||query.length > 2){
            fecthUser() 
        }
        setUsers([])
    },[query])

    const handleClose = ()=>{
        setUsers([])
        setQuery('')
    }
    
    return (
        <div className="search"  >
                    <input 
                        value={query}
                        className="nav-input" 
                        placeholder='Search' 
                        type="text" 
                        onChange={(e)=>setQuery(e.target.value)}
                    />
                    
                   { !query ?   
                    <button className="search-icon" ><SearchIcon fontSize='medium'/></button>
                   :
                    <button className='close-icon' onClick={handleClose}><CloseIcon fontSize='medium' /></button>}
                    { query ?
                        <div className='data-result'>
                           {users.length === 0 ?
                            <div className="data-items">
                                <div className="notFound">
                                    <span >Not found</span>
                                </div>
                            </div>
                            :
                            <div  className="data-items">
                                    { users?.map((user,index)=>(
                                        <Link to={`/profile/${user._id}`} style={{textDecoration:'none'}} onClick={handleClose}>
                                       <div className="items" key={index}>
                                            <img src={user.userImg || noAvatar } alt="" />
                                            <span>@{user.username}</span>
                                        </div>
                                        </Link>

                                        ))
                                    }   
                                    

                            </div>}
                               
                        </div>
                        :
                        <></>
                    }

        </div>
     );
}

export default Search;