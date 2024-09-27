import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import socket from "../socket"

interface player{
    playerNickanme:string
}

const LobbyComponent = () => {
    const roomId = useParams()
    const [playersArray, setPlayersArray] = useState<Array<player>>([])
    useEffect(()=>{
        console.log(roomId)
        socket.emit('get-players-list', roomId)
        socket.on('players-list-from-server', (res:Array<player>)=>{
            setPlayersArray(res)
        })

        return () => {
            socket.off('players-list-from-server')
        }
    }, [roomId])
    return (
        <div>
            <ul>
            {playersArray.map((player, index) => (
                    <li key={index}>{player.playerNickanme}</li> 
                ))}
            </ul>
        </div>
    )
}

export default LobbyComponent