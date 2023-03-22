const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const docenv = require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 8000
const route = require('./route');


//socket io
let users=[]

const http = require('http')

const { Server } = require('socket.io')

const server = http.createServer(app)


const io = new Server(server, {
  cors:{
    origin:'http://localhost:3000',
  }
})

const addUser = (userId, socketId)=>{
  !users.some((user)=> user.userId === userId) && users.push({userId,socketId})
}
const checkUser = (userId, socketId) =>{
  users.includes(userId) && users.push({userId,socketId})
}
const removeUser = (socketId) =>{
  users = users.filter((user)=>{user.socketId == socketId})


}
const getUser = (userId) =>{
  return users.find(user => user.userId === userId)

}

io.on("connection", (socket) => {
  ///connect
 console.log('user connected '+ socket.id)
  // take currentUserId and soketid
 socket.on('addUser', userId =>{
        addUser(userId, socket.id)
        // checkUser(userId, socket.id)
      socket.emit('getUsers', users)  
      
 })
  socket.on('getCmt', ({userId, decs ,postId})=>{
      const user = getUser(userId)
      //respon cmt data for client
      io.emit("getDecs", {
          user, decs ,postId
      })
        
  })
     socket.on('sendNotification',({senderId,receiverId,senderName,senderImg,type})=>{
      addUser(receiverId, socket.id)
        const receiver = getUser(receiverId)
            io.to(receiver?.socketId).emit("getNotification",{
                senderId,
                senderName,
                senderImg,
                type,
    
            }) 
   })

   socket.on('disconnect',()=>{
        console.log('some body disconnect')
        removeUser(socket.id)    
    })
})



// cors config
const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,  
  }
// app use libraries
app.use(cors(corsConfig))
app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded())
// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next();
//     });

// connect to database
const db = require('./db')
db.connect()


// app routes
route(app);


// app listening on port
server.listen(PORT ,() => {
    console.log(`Sever listen http://localhost:${PORT}`)
})
