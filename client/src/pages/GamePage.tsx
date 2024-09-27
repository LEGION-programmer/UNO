import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import JoinFromLink from "../components/JoinFromLink"
import LobbyComponent from "../components/LobbyComponent"
import socket from "../socket"

interface Player{
    id:number
    nickname:string
    isOwner:boolean
    hisTour:boolean
}

const GamePage = () => {
    const [nickname, setNickname] = useState(window.localStorage.getItem('nickname'))
    const [player, setPlayer] = useState<Player>()
    const { roomId } = useParams<{ roomId: string }>()
    const navigate = useNavigate()

    const leaveGame = () => {
        if(player){
            const isOwner = player.isOwner
            const playerId = player.id
            socket.emit('player-disconnet', {roomId, isOwner, playerId})
            window.localStorage.clear()
        }
    }

    useEffect(()=>{
        socket.on('owner-leave-the-game', ()=>{
            navigate('/')
        })
        socket.on('player-data', (player)=>{
            setPlayer(player)
        })
    }, [socket])
    window.addEventListener('beforeunload', leaveGame)
    return (
        <div>
            {nickname === null ? (<JoinFromLink />) : null}
            <div>
                <LobbyComponent />
            </div>
        </div>
    )
}

export default GamePage