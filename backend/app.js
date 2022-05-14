const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const gameLogic = require('./game-logic')
const app = express()

const server = http.createServer(app)
const io = socketio(server)

    // get the gameID encoded in the URL. 
    // se obtiene la id del juego con la direccion URL
    // se verifica si la id del juego coincide con todos los juegos actualmente en sesion
    // Se une a la sesion de juego existente
    // crea una nueva sesion
    // ejecutar cuando el cliente se conecta

io.on('connection', client => {
    gameLogic.initializeGame(io, client)
})

// por lo general, aquí es donde tratamos de conectarnos a nuestra base de datos.
server.listen(process.env.PORT || 8000)