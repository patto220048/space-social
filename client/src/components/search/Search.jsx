import './search.scss'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";


import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';


function Search() {
    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL
    })
    const  {currentUser} = useSelector((state) => state.user)

    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const inputRef = useRef(null)
    useEffect(()=>{
        const fecthUser = async()=>{
            try {   
                const res = await axiosInstance.get(`/user/search?q=${query}`) 
                setUsers(res.data.map(data=>data))
            } catch (err) {
                console.log(err.message)
            }
        }
        if( query.length === 2 || query.length > 2 ){
            fecthUser() 
        }
        setUsers([])
    },[query])

    const handleClose = ()=>{
        setUsers([])
        setQuery("")
    }
 
    
    return (
        <div className="search"  >
                <input 
                        value={query}
                        className="nav-input" 
                        placeholder='Search' 
                        type="text" 
                        onChange={(e)=>setQuery(e.target.value)}
                       
                        ref={inputRef}
                 />
                    
                   { !query ?   
                    <button className="search-icon" ><SearchIcon fontSize='medium'/></button>
                   :
                    <button className='close-icon' onClick={handleClose}><CloseIcon fontSize='medium' /></button>}
                    { query.length > 2 ?
                        <div className='data-result'>
                           {!users.length > 0 ?
                            <div className="data-items">
                                <div className="notFound">
                                    <span >Not found</span>
                                </div>
                            </div>
                            :
                            <div  className="data-items">
                                    { users?.map((user,index)=>(
                                        <Link key={index} to={`/profile/${user._id}`} style={{textDecoration:'none'}} onClick={handleClose}>
                                        <div className="items" >
                                            <img src={user.userImg || noAvatar } alt="" />
                                            <span>
                                                @{user.username + (user.username === currentUser.username ? '  (you)' : '')}</span>
                                            
                                        </div>
                                        </Link>

                                        ))
                                    }   
                                    

                            </div>
                            
                            }
                               
                        </div>
                        :
                        <></>
                    }

        </div>
     );
}

export default Search;