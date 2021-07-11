const express = require('express')
const app = express()                            //creating express object

const mainServer = require('http').Server(app)  //setting up express server
const cors = require("cors");

//Connecting socket to main server
const io = require("socket.io")(mainServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const { v4: uuidV4 } = require('uuid')  //importing uuid to create unique random urls


const prompt = require('prompt-sync')()

app.use(cors());

app.set('view engine', 'ejs')           //setting up templating engine for ejs
app.use(express.static('public'))       //accessing all static files 

//redirecting users to unique url
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

//sending room.ejs to client
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})


io.on('connection', socket => {
  //socket listening to joining room event

  socket.on('joining-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-is-connect', userId);

    //socket listening for message event
    socket.on('message', message => {
      //socket emiting message to all users
      socket.broadcast.to(roomId).emit('message', message)
    })

    //socket listening for disconnect event
    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-is-disconnects', userId)
    })

  })
})

// Listening to port
const port = process.env.PORT || 3030
mainServer.listen(port);