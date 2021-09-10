import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat';

const socket = io.connect("http://localhost:3001")
export default function ChatHome() {
    const [username,setUsername] = useState("");
    const [room,setRoom] = useState("");
    const [showChat,setShowChat] = useState(false); 
    

    const joinRoom = () =>{
        if(username !== "" && room != ""){
            socket.emit("join_room",room);
            setShowChat(true);
        }
    }
    
    return (
        <div className="App">
            {!showChat ? (
            <div><h3>Join A chat</h3>
            <input type="text" placeholder="John.." onChange={(event) => { setUsername(event.target.value)}} />
            <input type="text" placeholder="Room Id.." onChange={(event) => { setRoom(event.target.value)}} />
            <button onClick={joinRoom}>Join a room</button>
            </div>)
            : 
            (<div>
                <Chat socket={socket} username={username} room={room}/>
            </div>)
        }   
        
        </div>
        
    )
}
