
import { init } from 'ityped'
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import {signInWithPopup} from "firebase/auth";
import { auth,providerGG } from "../../firebase/firebase";

import "./login.scss"
//icon
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';



function Login() {
    const textRef = useRef() // itype
    //handle login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    //watch password
    const [watchPassword, setWatchPassword] = useState(false)



    const handlelogin = (e) =>{
        e.preventDefault();
        dispatch(loginStart())
        const fecthLogin = async () =>{
        try {
            const res = await axios.post('/auth/login',{email,password})
            dispatch(loginSuccess(res.data))
            navigate(`/`)
            }
        catch (err) {
                setErr(err.response.data)
                dispatch(loginFail("fail"))
            }
        }
        fecthLogin()
      
             
    }
    const handleloginwithGG = () => {
        dispatch(loginStart())
        signInWithPopup(auth, providerGG)
            .then((result)=>{
                axios.post('/auth/withgg',{
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
                    setErr("error from api")
                    console.log(err)
                    dispatch(loginFail())
                }) 
             
            })  
            
            .catch (err => {
                setErr("error from google")
                console.log(err)
            })
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
                        <h1>LOGIN</h1>
                        <h2 className="err">{err}</h2>
                        <form className="login-form" >
                            <div className="loign-input">
                                <div className="email">
                                    <input 
                                    type="text" 
                                    className="email" 
                                    placeholder="email" 
                                    onChange={(e)=>setEmail(e.target.value)} />
                                </div>
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
                            </div>
                            <button type="submit" className="submit" onClick={handlelogin} >
                                LOGIN
                            </button>
                            <span className="forgot-pw">
                                <a href="#">I forget my password?</a>
                                <br />
                                <Link to='/signup'>
                                <span>Sign up</span>
                                </Link>
                                
                            </span>
                        </form>
                        <span>&</span>
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