import "./feed.scss"

import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postFail, postStart, postSuccess } from "../../redux/postSlice";
import ReactLoading from 'react-loading';




import Upload from "../upload/Upload";
import Warning from "../warningSetting/Warning"
import IsLoading from "../loading/IsLoading";



function Feed({type,paramId,socket,setOpenUpload,setOpenWarningPost,openMenuPost,setOpenMenuPost}) {
    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL
    })
    const  {currentUser} = useSelector((state) => state.user)

    const  {currentPost} = useSelector((state) => state.post)
    const  isLoading = useSelector((state) => state.post.loading)
 

    const   dispatch = useDispatch()

    const [posts, setPosts] = useState(null)
    const [activeTab, setActiveTab] = useState(0)
    // const [page, setPage] = useState(0)
    // console.log(page)
    useEffect(()=>{
        currentPost && setPosts(currentPost)

    },[currentPost])
    const btnList = [{
        name: "#all",
        link : '/random' 
    },{
        name: "#newpost",
        link : '/newpost' 
    },{
        name: "#followed",
        link : '/followed'
    }]
    
    useEffect(()=>{
      const fecthPost = async() => {
        dispatch(postStart())
          try {
            const res = paramId 
                    ? await axiosInstance.get(`/post/profile/${paramId}`)
                    : await axiosInstance.get(`/post/${type}`)
                        // setPosts(res.data)
            
            dispatch(postSuccess(res.data))
          } 
          catch (err) {
              console.log(err.message)
              dispatch(postFail(err.message))
              
            }
            
        } 
        fecthPost()
       
  },[paramId,type])
  
//   useEffect(()=>{
//       let fetching = false
//       const onScroll = (event)=>{
//         const {scrollHeight, scrollTop, clientHeight} = event.target.scrollingElement

//         if(!fetching && scrollHeight - scrollTop <= clientHeight * 1.5){
//             fetching = true
//             setPage(page => page + 1)
//             fetching=false


//         }
//     }
//     document.addEventListener('scroll', onScroll);
//     return () =>{
//         document.removeEventListener('scroll', onScroll);
//     }
//   },[])

    return ( 
        <>
        <div className="feed-container">
            
            <div className="feed-wapper">
             {currentUser._id === paramId && <Share setOpenUpload={setOpenUpload}/>}
             {type &&  
                <div className="tab-btn ">
                    {btnList.map((list,index)=>(
                    <Link to={list.link} style={{textDecoration:'none'}} key={index}>
                       <button  className={"tab-btn "+ (activeTab === index ? "active": "")} onClick={()=>setActiveTab(index)}>{list.name}</button>    
                    </Link>
                    ))}
                 
                </div>}
                
                    {   
                    isLoading ?
                    <div className="loading-item">
                        <ReactLoading type='cylon'/>
                    </div>
                     :
                    <>
                    {posts?.length === 0
                        ?
                        <div className="notFound">
                            <p>Not found post</p>
                        </div>
                        :
                        posts?.map((post,index)=>(
                            <Post post={post}
                            key={index} 
                            socket={socket} 
                            setOpenWarningPost={setOpenWarningPost}
                            openMenuPost={openMenuPost}
                            setOpenMenuPost={setOpenMenuPost}
                            />
                        ))

                    }
                   </>
                     } 
            </div>
        </div>
        </>
    );
}

export default Feed;