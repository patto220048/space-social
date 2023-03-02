

const registerRoute = require('./register')
const userRoute = require('./user')
const postRoute = require('./post')
const commentRoute = require('./comment')
const notificationRoute = require('./notification')


function route(app){
    app.use('/api/notification',notificationRoute)
    app.use('/api/auth',registerRoute)
    app.use('/api/user',userRoute)
    app.use('/api/post',postRoute)
    app.use('/api/comment',commentRoute)



}
module.exports = route;