import io from "socket.io-client"
const url = 'localhost:3001'
if(!url){
    throw new Error("REACT_APP_SERVER_URL is not defined")
}
const socket = io(url)

export default socket