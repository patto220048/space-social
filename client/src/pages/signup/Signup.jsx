import "./signup.scss"

import { init } from 'ityped'
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

//icon
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

function Signup() {
    //itype
    const textRef = useRef()
    //handle signup
    // const [fullname, setFullname] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [err, setErr] = useState('')


    //valid 
    const [watchPassword, setWatchPassword] = useState(false)
    const [focused1, setFocused1] = useState(false)
    const [focused2, setFocused2] = useState(false)
    const [focused3, setFocused3] = useState(false)


    useEffect(()=>{
        init(textRef.current, { 
            showCursor: true,
            strings: ['.SOCIAL','.PROJECT','.APPLICATION',],
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
                        <h2 className="err"></h2>
                        <form className="signup-form" >
                            <div className="signup-input">
                                <div className="username">
                                    <input 
                                    type="text" 
                                    name="username" 
                                    placeholder="username" 
                                    required pattern="^[A-Za-z]*$" 
                                    minLength={3} 
                                    maxLength={16}
                                    onBlur ={()=>setFocused1(true)}
                                    focused = {focused1.toString()} 
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

                                    />
                                    <span className="valid">Password not valid ( min "8" characters or number, and one "A" and one "a" )</span>  
                                    <span className="watchPass" onClick={() =>setWatchPassword(!watchPassword)}>
                                        {watchPassword ? <RemoveRedEyeRoundedIcon/>:<VisibilityOffRoundedIcon/>}
                                        </span>
                                </div>                 

                                                    

                            </div>
                            <button type="submit" className="submit">
                                Sign up
                            </button>
                            <span className="forgot-pw">
                                <Link to="/login">
                                <a href="#">Login</a>
                                </Link>
                            </span>
                        </form>
                        <span>&</span>
                        <div className="signup-social">
                            <button className="google">
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

export default Signup;