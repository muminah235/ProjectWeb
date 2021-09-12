import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import ScrollToBottom from "react-scroll-to-bottom";
import Axios from 'axios'

export default function Chat({socket,username,room}) {
    
    const [currentMessage,setCurrentMessage] = useState("")
    const [messageList,setMessageList] = useState([]);   
    const sendMessage = async () =>{
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + 
                ":" +
                new Date(Date.now()).getMinutes(),
            }
        
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }
    
    const history = (room) =>{
        console.log(room)
        Axios.put('http://localhost:4007/history',{
            room: room
        }).then((response) => {
            console.log(response.data);
            setMessageList(response.data);
        })

    }
    
 
    // Write a text file
    

    console.log(messageList)
    if(messageList.length !== 0){
        console.log("not null")
        socket.emit("send_messageList",messageList,room);
    }
    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            console.log(data)
            setMessageList((list) => [...list,data]);
        })
    },[socket])

    /*if(messageList.length !== 0){
        console.log("not null")
        socket.emit("send_messageList",messageList,room);
    }*/
    
    return (
        <div className="chat-window">
            <div>
            <div className="chat-header">
                <p>Live Chat</p>
                
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                <button onClick={() => {history(room)}}>history</button>
                {messageList.map((messageContent)=>{
                    return (
                    <div className="message" id={username === messageContent.author ? "you": "other"}>
                        <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                        </div>      
                    </div>)
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                
                <input type="text" 
                placeholder="Hey..." 
                onChange={(event) => { setCurrentMessage(event.target.value)}}
                onKeyPress={(event)=>{
                    event.key =="Enter" && sendMessage();
                }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
            </div>
        </div>
    )
}

