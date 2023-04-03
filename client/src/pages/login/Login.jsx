
import { init } from 'ityped'
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {signInWithPopup} from "firebase/auth";
import { auth,providerGG } from "../../firebase/firebase";
import ReactLoading from 'react-loading';
import { v4 as uuidv4 } from 'uuid';
import "./login.scss"
//icon
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import IsLoading from "../../components/loading/IsLoading";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Login({socket}) {
    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL
    })  
    const isLoading = useSelector((state) => state.user.loading)
    const [resetPass, setResetPass] = useState(false)
    const [verifyEmail, setVerifyEmail] = useState(false)
    const [emailId, setEmailId] = useState('')
    const textRef = useRef() // itype
    
    //handle login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [focusPass, setFocusPass] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //watch password
    const [watchPassword, setWatchPassword] = useState(false)


    const generateSessionId = () =>{
        const sessionId = uuidv4(); // generate a random UUID
        return sessionId;
    }

    const handlelogin = (e) =>{
        e.preventDefault();
        dispatch(loginStart())
        // soket connection
        const sessionId =  generateSessionId()
        localStorage.setItem("sessionID", sessionId);
        socket.auth = { sessionId };
        socket.emit('sessionId', sessionId);
        socket.connect();

        const fecthLogin = async () =>{
           
        try {
            const res = await axiosInstance.post('/auth/login',{email,password})
                dispatch(loginSuccess(res.data))
                navigate(`/`)
            }
        catch (err) {
                setErr(err.response.data)
                dispatch(loginFail())
            }
        }
        fecthLogin()
      
             
    }
    const handleloginwithGG = () => {
        dispatch(loginStart())
         // soket connection
         const sessionId =  generateSessionId()
         localStorage.setItem("sessionID", sessionId);
         socket.auth = { sessionId };
         socket.emit('sessionId', sessionId);
         socket.connect()
        signInWithPopup(auth, providerGG)
            .then((result)=>{
                axiosInstance.post('/auth/withgg',{
                    username: result.user.displayName,
                    email: result.user.email,
                    userImg: result.user.photoURL,
                    emailVerified : result.user.emailVerified,
                    password : result.user.email,
                })
                .then((res)=>{
                   dispatch(loginSuccess(res.data))
                   navigate('/')
                })
                .catch(err => {
                    setErr("LOGIN FAILED !")
                    dispatch(loginFail())
                }) 
             
            })  
            
            .catch (err => {
                setErr("LOGIN FAILED !")
                dispatch(loginFail())
                console.log(err)
            })
    }

    const hanldeResetPassword = async(e) =>{
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/reset',{email})
            setEmailId(res.data)
            setVerifyEmail(true)
           
            }
        catch (err) {
            setErr("EMAIL NOT FOUND !")
            }
        
    }
    const hanldeSubmitNewPass = async (e) =>{
        e.preventDefault();
        try {
            const res = await axiosInstance.put(`/user/edit/${emailId}`,{password: newPassword})
            alert("Password changed successfully!")
            navigate('/')
            }
        catch (err) {
            console.log(err.message)
        }

    }
    const handleForget = () =>{
        setResetPass(true)
        setErr('')
    }

    useEffect(()=>{
        init(textRef.current, { 
            showCursor: true,
            strings: ['.SPACE','.PROJECT','.APPLICATION',],
            backDelay:1500,
            typeSpeed:  150,
            cursorChar: "|",

        })
    },[])
    return ( 
        <div className="login-container">
            <div className="login-wapper">
                <div className="login-item">
                    <div className="left">
                        <p className="text" >Wellcome to my 
                        <br />
                        <span ref={textRef}></span>
                        </p>
                        <img src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />

                    </div>
                    <div className="right">
                       { resetPass ? <h1>reset</h1>:<h1>LOGIN</h1>}
                        <h2 className="err">{err}</h2>
                        <form className="login-form" >
                            <div className="loign-input">
                                <div className="email">
                                    <input 
                                    type="text" 
                                    className="email" 
                                    placeholder="email" 
                                    onChange={(e)=>setEmail(e.target.value)} />
                                    {verifyEmail &&
                                        <div className="verify">
                                        <CheckCircleIcon />
                                    </div>}
                                </div>
                                {verifyEmail &&
                                <div className="pass">
                                    <input 
                                    type={ watchPassword ? "text":"password"} 
                                    className="password" 
                                    placeholder="new password" 
                                    onBlur={()=>setFocusPass(true)}
                                    focused = {focusPass.toString()}
                                    required 
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    onChange={(e)=>setNewPassword(e.target.value)} 
                                    />
                                    
                                    <span className="watchPass" onClick= {()=>setWatchPassword(!watchPassword)}>
                                        { watchPassword ?<RemoveRedEyeRoundedIcon/>:<VisibilityOffRoundedIcon/>}
                                    </span>
                                    <p className="valid">Password not valid ( min "8" characters or number, and one "A" and one "a" )</p>
                                </div>
                                
                                }
                                {!resetPass && 
                                <div className="pass">
                                    <input 
                                    type={watchPassword ? "text":"password"} 
                                    className="password" 
                                    placeholder="password" 
                                    onChange={(e)=>setPassword(e.target.value)} 
                                    />
                                    <div className="watchPass" onClick= {()=>setWatchPassword(!watchPassword)}>
                                   { watchPassword ?<RemoveRedEyeRoundedIcon/>:<VisibilityOffRoundedIcon/>}
                                    </div>
                                </div>
                                }
                            </div>
                                { isLoading ?
                                <div className="loading-item">
                                    <ReactLoading type='cylon' color='#000000'/>
                                </div>
                                :
                                <>

                                {resetPass ?
                                <>
                                {verifyEmail ?
                                    <button type="submit" className="submit" onClick={hanldeSubmitNewPass}> 
                                        Change
                                    </button> 
                                    :
                                     <button type="submit" className="submit" onClick={hanldeResetPassword}> 
                                     OK
                                    </button>
                                }
                                   
                                </>
                                
                                :
                                <button type="submit" className="submit" onClick={handlelogin} >  
                                    LOGIN
                                </button>
                                }
                                </>
                                }
                            <span className="forgot-pw">

                               {!resetPass ?
                                <span onClick={handleForget}>I forget my password?</span>
                                :
                                <Link to='/'>
                                <span>Login?</span>
                                </Link>
                                }
                                <br />
                                <Link to='/signup'>
                                <span>Sign up</span>
                                </Link>
                                
                            </span>
                        </form>
                        <span >&</span>
                        <div className="login-social">
                            <button className="google" onClick={handleloginwithGG}>
                                <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="" />
                                Google
                            </button>
                            {/* <button className="facebook">
                                Facebook
                            </button> */}
                        </div>
                        <div className="other">
                            <span></span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
     );
}

export default Login;