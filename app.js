require('./src/db/mongoose')
var express = require('express')
var path = require('path')
var adminRouters=require('./routes/admin')
var usersRoutes=require('./routes/users')
var doctRoutes=require('./routes/doctor')
var session = require('express-session')
var http=require('http')
var socketio =require('socket.io')
var mongoDBSession = require('connect-mongodb-session')(session)
var app = express();

var port=process.env.PORT

var app =express()
var server=http.createServer(app)
var io=socketio(server)

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'));

//set express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let store=new mongoDBSession({
   uri:'mongodb://127.0.0.1:27017/LifeServers',
   collection:'sessions'
})


//sessions
app.use(
   session({
      secret:'lifeserversMobileClinic',
      resave:true,
      saveUninitialized:true,
      store:store
   })
)

io.on('connection',(socket)=>{
   socket.emit('messages','welcome')

   socket.on('sendMsg',(msg)=>{
      console.log(msg)
       socket.broadcast.emit('messages',msg)
   })
})

//routes & middlewares
app.use('/',doctRoutes)
app.use('',adminRouters)
app.use(usersRoutes)

server.listen(port,()=>{
   console.log('server is up in port'+ port)
})
module.exports = app;