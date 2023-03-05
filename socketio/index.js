

const io = require('socket.io')(8000,{
    cors: { 
        origin:"http://localhost:3000",
    }

})

let users=[]
let notification = []
const addUser = (userId, socketId)=>{
    !users.some((user)=> user.userId === userId) && 
    users.push({userId,socketId})
}
const removeUser = (socketId) =>{
    users = users.filter((user)=>{user.socketId !== socketId})

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
        io.emit('getUsers', users)
        
   })


   // get comment from client
   socket.on('getCmt', ({userId, decs ,postId})=>{
        const user = getUser(userId)
        //respon cmt data for client
        io.emit("getDecs", {
            user, decs ,postId
        })
        
   })
   //like handle
   socket.on('sendNotification',({senderId,receiverId,senderName,senderImg,type})=>{
        const receiver = getUser(receiverId)
            io.to(receiver?.socketId).emit("getNotification",{
                senderId,
                senderName,
                senderImg,
                type,
    
            }) 
   })
   
    ///disconnect
   socket.on('disconnect',()=>{
        console.log('some body disconn')
        removeUser(socket.id)
        io.emit('getUsers', users)

    })

    
   

   


});   

