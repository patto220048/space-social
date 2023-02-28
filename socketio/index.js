const io = require('socket.io')(8000,{
    cors: { 
        origin:"http://localhost:3000",
    }

})

let users = []
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
   console.log('user connected')
    // take currentUserId and soketid
   socket.on('addUser', userId =>{
        addUser(userId, socket.id)
        io.emit('getUsers', users)
   })


   // get comment from client
   socket.on("getCmt" , ({userId, decs ,postId, cmtId})=>{
        const user = getUser(userId)
        //respon data for client
        io.emit("getDecs", {
            user, decs ,postId,cmtId
        })
   })
   //
    

    ///disconnect
   socket.on('disconnect',()=>{
        console.log('some body disconn')
        removeUser(socket.id)
        io.emit('getUsers', users)

    })


  });