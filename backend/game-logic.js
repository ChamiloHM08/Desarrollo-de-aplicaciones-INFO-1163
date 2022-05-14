
/**
 * Aquí es donde debemos registrar los detectores y emisores de eventos.
 */
var io
var gameSocket
// gamesInSession almacena una matriz de todas las conexiones de socket activas
var gamesInSession = []


const initializeGame = (sio, socket) => {

    // inicializa las variables globales.
    io = sio 
    gameSocket = socket 

    
    // empuja este socket a una matriz que almacena todos los sockets activos
    gamesInSession.push(gameSocket)

    
    // Ejecuta el código cuando el cliente se desconecta de su sesión de socket.
    gameSocket.on("disconnect", onDisconnect)
    // Envía un nuevo movimiento a la otra sesión de socket en la misma habitación.
    gameSocket.on("new move", newMove)

    // El usuario crea una nueva sala de juegos después de hacer clic en 'enviar' en la interfaz
    gameSocket.on("createNewGame", createNewGame)

    
    // El usuario se une a GameRoom después de ir a una URL con '/game/:gameId' 
    gameSocket.on("playerJoinGame", playerJoinsGame)

    gameSocket.on('request username', requestUserName)

    gameSocket.on('recieved userName', recievedUserName)

    // registrar detectores de eventos para la aplicación de chat de video:
    videoChatBackend()
}


function videoChatBackend() {
   // oyentes de la función principal
    gameSocket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    gameSocket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
}   



function playerJoinsGame(idData) {
    /**
     * Une el socket dado a una sesión con su gameId
     */

    // Una referencia al objeto de socket Socket.IO del jugador
    var sock = this
    
    // Busque el ID de la habitación en el objeto del administrador Socket.IO.
    var room = io.sockets.adapter.rooms[idData.gameId]
   // consola.log(room)

    // Si la habitación existe...
    if (room === undefined) {
        this.emit('status' , "This game session does not exist." );
        return
    }
    if (room.length < 2) {
        // adjunte la identificación del socket al objeto de datos.
        idData.mySocketId = sock.id;

        // Únete a la sala
        sock.join(idData.gameId);

        console.log(room.length)

        if (room.length === 2) {
            io.sockets.in(idData.gameId).emit('start game', idData.userName)
        }

        // Emite un evento notificando a los clientes que el jugador se ha unido a la sala.
        io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);

    } else {
        
    // De lo contrario, envía un mensaje de error al jugador.
        this.emit('status' , "There are already 2 people playing in this room." );
    }
}


function createNewGame(gameId) {
    // Devuelve la ID de la sala (gameId) y la ID del socket (mySocketId) al cliente del navegador
    this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});

    // Únete a la Sala y espera al otro jugador
    this.join(gameId)
}


function newMove(move) {
    /**
     * Primero, necesitamos obtener la ID de la sala en la que enviar este mensaje.
     * A continuación, enviamos este mensaje a todos menos al remitente
     * En ésta habitación.
     */
    
    const gameId = move.gameId 
    
    io.to(gameId).emit('opponent move', move);
}

function onDisconnect() {
    var i = gamesInSession.indexOf(gameSocket);
    gamesInSession.splice(i, 1);
}


function requestUserName(gameId) {
    io.to(gameId).emit('give userName', this.id);
}

function recievedUserName(data) {
    data.socketId = this.id
    io.to(data.gameId).emit('get Opponent UserName', data);
}

exports.initializeGame = initializeGame