import CreatePlayer from "./createPlayer"

interface Room{
    roomId: string
    players: Array<CreatePlayer>
}

export const playersInRoom:Array<Room> = new Array()

export const createRoom = (nickname:string, isOwner:boolean) => {
    const roomId:string = (Math.floor(Math.random()*10000)).toString()
        playersInRoom.forEach((el)=>{
            if(el.roomId===roomId){
                createRoom(nickname, isOwner)
            }
        })
        const date = new Date()
        const id = date.getTime()
        const player = new CreatePlayer(id, nickname, isOwner, false)
        const players:Array<CreatePlayer> = [player]
        const newRoom = {
            roomId,
            players

        }
        playersInRoom.push(newRoom)
        const dataToReturn = {roomId, player}
        return dataToReturn
}

const checkIfRoomExists = (roomId:string) => {
    let roomExists = false
    playersInRoom.forEach((el)=>{
        if(el.roomId==roomId){
            roomExists = true
        }
    })
    
    return roomExists
}

const getRoomIndex = (roomId:string):number => {
    let index:number = 0
    playersInRoom.forEach((el, i)=>{
        if(el.roomId===roomId){
            index = i
        }
    })
    return index
}

export const joinRoom = (roomId:string, player:CreatePlayer) => {
    const roomExists = checkIfRoomExists(roomId)
    if(!roomExists){
        return false
    }

    const roomIndex:number = getRoomIndex(roomId)
    playersInRoom[roomIndex].players.push(player)

    return true
}

export const getPlayersFromRoom = (roomId:string) => {
    const roomExists = checkIfRoomExists(roomId)
    if(!roomExists){
        return false
    }

    const roomIndex:number = getRoomIndex(roomId)
    const playersArray = playersInRoom[roomIndex].players
    return playersArray
}

export const playerDisconnet = (roomId:string, isOwner:boolean, playerId:number) => {
    const roomExists = checkIfRoomExists(roomId)
    if(roomExists){
        let index:number = 0
        if(isOwner){
            playersInRoom.forEach((el, i) => {
                if(el.roomId==roomId){
                  index = i  
                }
            })
            playersInRoom.splice(index)
            return true
        }else{
            playersInRoom.forEach((el, i) => {
                if(el.roomId==roomId){
                  index = i
                  
                }
            })
            const room = playersInRoom[index]
            room.players.forEach((el, i) => {
                if(el.id === playerId){
                    room.players.slice(i)
                }
            })
            playersInRoom[index] = room
        }
        return false
    }
}