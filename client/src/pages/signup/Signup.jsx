import "./signup.scss"

import { init } from 'ityped'
import { useEffect, useRef } from "react";

function Signup() {
    const textRef = useRef()
 

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
                        <img src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />

                    </div>
                    <div className="right">
                        <h1>signup</h1>
                        <h2 className="err"></h2>
                        <form className="signup-form" >
                            <div className="user-name">
                                <input type="text" className="fisrt-name" placeholder="fisrt name" />
                                <input type="text" className="last-name" placeholder="last name" />
                            </div>
                            <div className="signup-input">
                                <input type="text" className="email" placeholder="email" />
                                <input type="text" className="password" placeholder="password"  />
                            </div>
                            <button type="submit" className="submit">
                                Sign up
                            </button>
                            <span className="forgot-pw">
                
                                <a href="#">Login</a>
                                
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