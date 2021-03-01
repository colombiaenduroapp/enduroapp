const express = require('express')
const app = express()
const http = require('http').createServer(app)
const port = process.env.PORT || 5000
const ip = require('ip');
const host = ip.address()
const morgan = require('morgan')
const cors = require('cors')
const io = require('socket.io')(http, {
    path:"/socket/"
})

app.use(express.urlencoded({ extended: false, limit: (52428800) }))
app.use(morgan('dev'))
app.use(cors())

// socket's
io.on("connection", (socket) => {
    socket.emit('event', "Lo logramos" )
})

//routes
app.use('/', require('./routes/index.route'))

http.listen(port, host, (error) => {
    if (error) {
        console.log(`An error has occurred: ${error}`)
    } else {
        console.log(`Server is running on http://${host}:${port}`)
    }
});