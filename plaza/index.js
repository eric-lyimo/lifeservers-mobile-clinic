var http = require('http')
var express= require('express')
var socketio=require('socket.io')
var path= require ('path')

var app =express()
var server=http.createServer(app)
var io=socketio(server)

var port=process.env.PORT || 8000
app.use(express.static(path.join(__dirname,'public')))

io.on('connection',(socket)=>{
    console.log('new connection')
    socket.emit('messages','welcome')

    socket.on('sendMsg',(msg)=>{
        socket.broadcast.emit('messages',msg)
    })
})

server.listen(port,()=>{
    console.log(`up and running on port`,port)
})

module.exports=server