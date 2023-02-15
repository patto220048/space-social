

const registerRoute = require('./register')
const userRoute = require('./user')
const postRoute = require('./post')

function route(app){

    app.use('/api',registerRoute)
    app.use('/api/user',userRoute)
    app.use('/api/post',postRoute)
    

}
module.exports = route;