import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat';
import { useEffect} from 'react';
import Axios from 'axios'
import ReactDOM from 'react-dom';

const socket = io.connect("http://localhost:3001")
export default function ChatHome() {
    const [username,setUsername] = useState("");
    const [room,setRoom] = useState("");
    const [showChat,setShowChat] = useState(false); 
    const [userDb,setUserDb] = useState("");
    const [LoginStatus, setLoginStatus] = useState("");

    const joinRoom = (e) =>{
        if(username !== "" && room != ""){
            Axios.post("http://localhost:4002/chatlogin", {
            username: username,
            }).then((response) => {
                if(response.data.message){
                setLoginStatus(response.data.message)
                }else{
                e.preventDefault();
                console.log(response.data[0].Username)
                socket.emit("join_room",room);
                setShowChat(true);
                e.preventDefault();
          
            }
        })
          
            
        }
    }
    
    return (
        <div className="App">
            {LoginStatus}
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
