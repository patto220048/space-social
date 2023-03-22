

const registerRoute = require('./register')
const userRoute = require('./user')
const postRoute = require('./post')
const commentRoute = require('./comment')
const notificationRoute = require('./notification')
const conversationRoute = require('./conversation')
const messageRoute = require('./message')

function route(app){
    app.use('/api/notification',notificationRoute)
    app.use('/api/auth',registerRoute)
    app.use('/api/user',userRoute)
    app.use('/api/post',postRoute)
    app.use('/api/comment',commentRoute)
    app.use('/api/conversation',conversationRoute)
    app.use('/api/message',messageRoute)



}
module.exports = route;