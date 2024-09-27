import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import JoinRoomStyle from '../componentsCss/JoinRoomStyle.module.css'
import socket from "../socket"

const JoinRoom = () => {
    const [nickname, setNickname] = useState('')
    const [roomId, setRoomId] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const createRoom = () => {
        if(nickname){
            setError('')
            window.localStorage.setItem('nickname', nickname)
            socket.emit('create-room', nickname, true)
        }else{
            setError(`You don't set your nickname!`)
        }
    }

    const joinRoom = () => {
        if(nickname){
            setError('')
            if(roomId){
                window.localStorage.setItem('nickname', nickname)
                socket.emit('join-room', {roomId, nickname})
            }else{
                setError('Enter room id!')
            }
        }else{
            setError(`You don't set your nickname!`)
        }
    }

    useEffect(() => {
        socket.on('owner-join-to-room', (roomIdFromServer) => {
            navigate(`/game/${roomIdFromServer}`)
        })

        socket.on('new-player-join-to-room', ({validationStatus, roomIdFromServer})=>{
            if(validationStatus){
                navigate(`/game/${roomIdFromServer}`)
            }else{
                setError('Bad room Id')
            }
            
        })
    }, [socket])

    return (
        <div>
            <div className={JoinRoomStyle.content}>
                <div className={JoinRoomStyle.section}>
                    <label htmlFor="nickname" className={JoinRoomStyle.label}>Set your nickname:</label>
                    <input type="text" placeholder="Player" id="nickname" 
                    className={JoinRoomStyle.input}
                    value={nickname}
                    onChange={(event)=>{setNickname(event.target.value)}}/>
                </div>
                <div className={JoinRoomStyle.section}>
                    <span className={JoinRoomStyle.button}
                    onClick={()=>{createRoom()}}>Create room</span>
                </div>
                <div className={JoinRoomStyle.section}>
                    <label htmlFor="roomId" className={JoinRoomStyle.label}>Set room id:</label>
                    <input type="text" placeholder="1234" id="roomId" 
                    className={JoinRoomStyle.input}
                    value={roomId}
                    onChange={(event)=>{setRoomId(event.target.value)}}/>
                    <span className={JoinRoomStyle.button}
                    onClick={()=>{joinRoom()}}>Join</span>
                </div>
                <div className={JoinRoomStyle.error}>
                    {error}
                </div>
            </div>
        </div>
    )
}

export default JoinRoom