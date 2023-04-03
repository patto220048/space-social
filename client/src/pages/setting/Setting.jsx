import "./setting.scss"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";





import Warning from "../../components/warningSetting/Warning";
import Rightbar from "../../layout/rightbar/Rightbar";
function Setting() {
    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL
    })  
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const warningRef = useRef()
    ///// edit handle
    const  {currentUser} = useSelector((state) => state.user)
    const [ editUsername, setEditUsername] = useState(false)
    const [ editCountry, setEditCountry] = useState(false)
    const [ editAge, setEditAge] = useState(false)
    const [ editPass, setEditPass] = useState(false)
    // const [ openEdit, setOpenEdit] = useState(false)
    //// input handle
    const [ inputUsername, setInputUsername] = useState('')
    const [ inputCountry, setInputCountry] = useState('')
    const [ inputAge, setInputAge] = useState('')
    const [ inputPass, setInputPass] = useState('')
    //// warning handle
    const [openWarning, setOpenWarning] = useState(false)



    // useEffect(()=>{
    //     warningRef.current?.scrollIntoView({ block: "start" })   
    // },[warningRef])


    const handleDelAcc = () => {
        const fetchDelAcc = async() =>{
            try {
                await axiosInstance.delete(`/user/delete/${currentUser._id}`)
                navigate('/login')
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchDelAcc()
    }

    const handleSubmitUsername=() =>{
        const fetchEditUser = async() =>{
            try {
                const res = await axiosInstance.put(`/user/edit/${currentUser._id}`,{
                    username:inputUsername,
                })  
                dispatch(loginSuccess(res.data))
                setEditUsername(false)
                // window.location.reload() 
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchEditUser()            
    }
    const handleSubmitCountry=() =>{
        const fetchEditUser = async() =>{
            try {
                const res = await axiosInstance.put(`/user/edit/${currentUser._id}`,{
                    region : inputCountry,
                })  
                dispatch(loginSuccess(res.data))
                setEditCountry(false)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchEditUser()            
    }

    const handleSubmitAge=() =>{
        const fetchEditUser = async() =>{
            try {
                const res = await axiosInstance.put(`/user/edit/${currentUser._id}`,{
                    age:inputAge,
                })  
                dispatch(loginSuccess(res.data))
                setEditAge(false) 
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchEditUser()           
    }
    const handleSubmitPass=() =>{
        const fetchEditUser = async() =>{
            try {
                const res = await axiosInstance.put(`/user/edit/${currentUser._id}`,{
                    password : inputPass
                })  
                dispatch(loginSuccess(res.data))
                setEditPass(false)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchEditUser()           
    }

    const handleCancel = () =>{
        setEditUsername(false)
        setInputUsername('')
        setEditCountry(false)
        setEditAge(false)
        setEditPass(false)
    }





    return ( 
       <>
        <div className="container-setting">
         
         <span>SETTING</span>
         <div className="wapper-setting">
             <div className="left">

                 <div className="left-items">
                     <img src={currentUser.userImg || noAvatar} alt="" />
                     <span>{'@'+currentUser.username} </span>
                 </div>

             </div>
             <div className="right">
                 <div className="right-items">
                     <div className="fullname">
                         <div className="name">USERNAME :</div>
                         {editUsername ?
                         <div className="name-items">
                             <input 
                             value={inputUsername}
                                className="name-input"
                              type="text" 
                              placeholder={currentUser.username} 
                              onChange={(e)=>setInputUsername(e.target.value)}
                              required
                              maxLength={30}
                               />
                            <div className="btn-list">
                                 <button className="btn" onClick={handleCancel}>Cancel</button>
                                 <button className="btn" onClick={handleSubmitUsername}>OK</button>
                            </div>
                         </div>
                         :
                         <div className="name-items">
                             <input className="name-input" disabled type="text" placeholder={currentUser.username} />
                             <button className="btn-edit"  onClick={()=>setEditUsername(true)}>EDIT</button>
                         </div>
                         }
                     </div>
                     <div className="fullname">
                         <div className="name">COUNTRY :</div>
                         {editCountry ?
                         <div className="name-items">
                             <input className="name-input" type="text" onChange={(e)=>setInputCountry(e.target.value)} />
                             <div className="btn-list">
                                 <button className="btn" onClick={handleCancel}>Cancel</button>
                                 <button className="btn" onClick={handleSubmitCountry}>OK</button>
                             </div>
                         </div>
                         :
                         <div className="name-items">
                             <input className="name-input" disabled type="text" placeholder={currentUser.region}/>
                             <button className="btn-edit"  onClick={()=>setEditCountry(true)}>EDIT</button>
                         </div>
                         }
                     </div>
                     <div className="fullname">
                         <div className="name">BIRTHDAY :</div>
                         {editAge ?
                         <div className="name-items">
                             <input className="name-input" type="date" onChange={(e)=>setInputAge(e.target.value)} />
                             <div className="btn-list">
                                 <button className="btn" onClick={handleCancel}>Cancel</button>
                                 <button className="btn" onClick={handleSubmitAge}>OK</button>
                             </div>
                         </div>
                         :
                         <div className="name-items">
                             <input className="name-input"  disabled type="number" placeholder={currentUser.age} />
                             <button className="btn-edit"  onClick={()=>setEditAge(true)}>EDIT</button>
                         </div>
                         }
                     </div>
                     <div className="fullname">
                         <div className="name">EMAIL :</div>
                         <div className="name-items">
                             <input disabled className="name-input" type="text" placeholder={currentUser.email}/>
                             {/* <button disabled className="btn">EDIT</button> */}
                         </div>
                     </div>
                     {!currentUser.fromGoogle
                      &&
                     <div className="fullname">
                         <div className="name">PASSWORD :</div>
                         {editPass
                         ?
                         <div className="name-items">
                             <input  className="name-input" type="password" onChange={(e)=>setInputPass(e.target.value)}/>
                             <div className="btn-list">
                                 <button className="btn" onClick={handleCancel}>Cancel</button>
                                 <button className="btn" onClick={handleSubmitPass}>OK</button>

                             </div>
                         </div>
                         :
                         <div className="name-items">
                             <input disabled className="name-input" type="password" placeholder="********"/>
                             <button className="btn-edit"  onClick={()=>setEditPass(true)}>EDIT</button>

                         </div>
                         }
                     </div>
                     }
                     <button className="del-acc" onClick={()=>setOpenWarning(true)}>DELETE ACCOUNT</button>
                         
                 </div>
                   
             </div>
         </div>

         
        </div>

        {openWarning &&
            <Warning openWarning={openWarning} setOpenWarning={setOpenWarning} handleDelAcc={handleDelAcc} />
        }

    

       
        

    </>
        

     );
}

export default Setting;