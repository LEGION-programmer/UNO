import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import socket from "../socket"

const JoinFromLink = () => {
    const { roomId } = useParams()
    const [nickname, setNickname] = useState<string>('')
    const [submitted, setSubmitted] = useState<boolean>(false)
    const navigate = useNavigate()
    
    const JoinRoom = () => {
        if (nickname.trim()) {
            window.localStorage.setItem('nickname', nickname)
            socket.emit('join-room', {roomId, nickname})
            setSubmitted(true)
        }
    }

    useEffect(()=>{
        socket.on('new-player-join-to-room', ({validationStatus, roomIdFromServer})=>{
            if(validationStatus){
                navigate(`/game/${roomIdFromServer}`)
            }
        })
    }, [socket])

    return (
        <div>
            {!submitted ? (
                <div>
                    <label htmlFor="nickname">Enter your nickname:</label>
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                    <button type="submit" onClick={JoinRoom}>Join Room</button>
                </div>
            ) : null}
        </div>
    )
}

export default JoinFromLink