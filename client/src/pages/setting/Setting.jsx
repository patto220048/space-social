import "./setting.scss"

function Setting() {
    return ( 
        <div className="container-setting">
         
            <span>SETTING</span>
            <div className="wapper-setting">
                <div className="left">

                    <div className="left-items">
                        <img src="https://images.unsplash.com/photo-1677529460205-c5ab2354ec99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                        <span>Phattayto </span>
                        
                    </div>

                </div>
                <div className="right">
                    <div className="right-items">
                        <div className="fullname">
                            <div className="name">FULLNAME :</div>
                            <div className="name-items">
                                <input className="name-input" type="text" />
                                <button className="btn">EDIT</button>
                            </div>
                        </div>
                        <div className="fullname">
                            <div className="name">COUNTRY :</div>
                            <div className="name-items">
                                <input className="name-input" type="text" />
                                <button className="btn">EDIT</button>
                            </div>
                        </div>
                        <div className="fullname">
                            <div className="name">AGE :</div>
                            <div className="name-items">
                                <input className="name-input" type="text" />
                                <button className="btn">EDIT</button>
                            </div>
                        </div>
                        <div className="fullname">
                            <div className="name">EMAIL :</div>
                            <div className="name-items">
                                <input disabled className="name-input" type="text" />
                                {/* <button disabled className="btn">EDIT</button> */}
                            </div>
                        </div>
                        <div className="fullname">
                            <div className="name">PASSWORD :</div>
                            <div className="name-items">
                                <input className="name-input" type="password" />
                                <button className="btn">EDIT</button>
                            </div>
                        </div>
                        <button className="del-acc">DELETE ACCOUNT</button>
                       
                    </div>
                      
                </div>
            </div>
        </div>
     );
}

export default Setting;