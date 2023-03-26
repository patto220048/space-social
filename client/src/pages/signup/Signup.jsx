import "./signup.scss"

import { init } from 'ityped'
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";


import { loginFail, loginStart, loginSuccess } from "../../redux/userSlice";

//icon
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

function Signup() {
    //itype
    const textRef = useRef()
    //handle signup
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignup= (e) => {
        e.preventDefault();
        dispatch(loginStart())
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage )
            });
        try {
                const fecthSignup = async() => {
                try {
                    const res = await axios.post('/auth/signup',{username,email,password})
                    dispatch(loginSuccess(res.data))
                    navigate(`/`)
                    
                } catch (er) {
                    setErr("Error")
                    dispatch(loginFail())
                }
                
                
            }  
            fecthSignup()
        }
        catch(err){}
       
    }

   




    //valid 
    const [watchPassword, setWatchPassword] = useState(false)
    const [focused1, setFocused1] = useState(false)
    const [focused2, setFocused2] = useState(false)
    const [focused3, setFocused3] = useState(false)


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
        <div className="signup-container">
            <div className="signup-wapper">
                <div className="signup-item">
                    <div className="left">
                        <p className="text" >Wellcome to my 
                        <br />
                        <span ref={textRef}></span>
                        </p>
                        <img src="https://images.unsplash.com/photo-1614724723656-457e78e0b50b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1117&q=80" alt="" />

                    </div>
                    <div className="right">
                        <h1>signup</h1>
                        <h2 className="err">{err}</h2>
                        <form className="signup-form" >
                            <div className="signup-input">
                                <div className="username">
                                    <input 
                                    type="text" 
                                    name="username" 
                                    placeholder="username" 
                                    required
                                    // pattern="" 
                                    minLength={3} 
                                    maxLength={16}
                                    onBlur ={()=>setFocused1(true)}
                                    focused = {focused1.toString()} 
                                    onChange={(e)=>{setUsername(e.target.value)}}
                                    />  
                                    <span className="valid">Username not valid ( min "3" characters ,"A", "a")</span> 
                                </div>                     
                                <div className="email">
                                    <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="email" 
                                    required 
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                                    onBlur ={()=>setFocused2(true)}
                                    focused = {focused2.toString()}
                                    onChange={(e)=>{setEmail(e.target.value)}}

                                    
                                    />                     
                                    <span className="valid">Email not valid ( @,"." )</span> 
                                </div>    
                                <div className="password">
                                    <input 
                                    type={watchPassword ? "text" : "password"} 
                                    name="password" 
                                    placeholder="password" 
                                    required 
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    onBlur ={()=>setFocused3(true)}
                                    focused = {focused3.toString()}
                                    onChange={(e)=>{setPassword(e.target.value)}}


                                    />
                                    <span className="valid">Password not valid ( min "8" characters or number, and one "A" and one "a" )</span>  
                                    <span className="watchPass" onClick={() =>setWatchPassword(!watchPassword)}>
                                        {watchPassword ? <RemoveRedEyeRoundedIcon/>:<VisibilityOffRoundedIcon/>}
                                        </span>
                                </div>                 

                                                    

                            </div>
                            <button type="submit" className="submit" onClick={handleSignup}>
                                Sign up
                            </button>
                            <span className="forgot-pw">
                                <Link to="/login">
                                <span href="#">Login</span>
                                </Link>
                            </span>
                        </form>
                        <div className="other">
                            <span></span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
     );
}

export default Signup;