const port = process.env.PORT || 3001
import { server, io } from './serverSettings/serverSettings'
import { createRoom, playersInRoom, joinRoom, getPlayersFromRoom, 
    playerDisconnet } from './actions/operations'
import CreatePlayer from './actions/createPlayer'

io.on('connect', (socket)=>{
    socket.on('create-room', (nickname:string, isOwner:boolean)=>{
        const data = createRoom(nickname, isOwner)
        socket.emit('owner-join-to-room', data.roomId)
        socket.emit('player-data', data.player)
    })

    socket.on('join-room', ({roomId, nickname}:{roomId:string, nickname:string})=>{
        const date = new Date()
        const id = date.getTime()
        const player = new CreatePlayer(id, nickname, false, false)
        const data = {roomId, player}
        const validationStatus = joinRoom(data.roomId, data.player)
        socket.emit('new-player-join-to-room', {validationStatus, roomIdFromServer:roomId})
        socket.emit('player-data', player)
    })

    socket.on('get-players-list', ({roomId}:{roomId:string})=>{
        const playersArray = getPlayersFromRoom(roomId)
        io.sockets.emit('players-list-from-server', playersArray)
    })

    socket.on('player-disconnet', ({roomId, isOwner, playerId}:{roomId:string, isOwner:boolean, playerId:number})=>{
        console.log(playersInRoom)
        const ownerLeave = playerDisconnet(roomId, isOwner, playerId)
        console.log(playersInRoom)
        if(ownerLeave){
            io.sockets.emit('owner-leave-the-game')
        }else{
            io.sockets.emit('players-list-from-server', playersInRoom)
        }
    })
})

server.listen(port, () => {
    console.log(`Serwer working on port: ${port}`)
})