const jwt = require('jsonwebtoken')

const  verifiToken={
    verifyUser: (req, res, next)=>{
        const token = req.cookies.access_token
        if(!token) return res.status(403).json('You are not authenticated')
        
        jwt.verify(token, process.env.JWT_PW, (err ,user)=>{
            if(err) return res.status(403).json('You are not vailid');
            req.user = user;
            next()
        })

    },
    verifyAdmin:(req, res, next)=>{
        verifiToken.verifyUser(req, res, ()=>{
            if (req.user.admin){
                next();
            }
            else res.status(403).json('You are not admin')
        })
    }
    

}

module.exports =  verifiToken
