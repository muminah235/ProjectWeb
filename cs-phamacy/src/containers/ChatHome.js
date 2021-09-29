import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat';
import { useEffect} from 'react';
import Axios from 'axios'
import ReactDOM from 'react-dom';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';

const socket = io.connect("http://localhost:3006")
export default function ChatHome() {
    const [username,setUsername] = useState("");
    const [room,setRoom] = useState("");
    const [showChat,setShowChat] = useState(false); 
    const [userDb,setUserDb] = useState("");
    const [LoginStatus, setLoginStatus] = useState("");

    const joinRoom = (e) =>{
        if(username !== "" && room != ""){
            Axios.post("http://localhost:4007/chatlogin", {
            username: username,
            room: room
            }).then((response) => {
                if(response.data.message){
                setLoginStatus(response.data.message)
                }else{
                e.preventDefault();
                socket.emit("join_room",room);
                setShowChat(true);
                e.preventDefault();
                setLoginStatus("")
            }
        })
          
            
        }
    }
    
    function AlertDismissible() {
        const [show, setShow] = useState(true);
      
        return (
          <>
            <Alert show={show} variant="success">
              <Alert.Heading>คำแนะนำในการเข้าสู่การแชท</Alert.Heading>
              <p>1.ป้อนชื่อ ( username ) กับรหัสห้อง(โดยรหัสห้องต้องตรงกับรหัสห้องของตนเองหรือเป็นรหัสห้องของเภสัชกรเท่านั้น)</p>
              <p>2.กรณีต้องปรึกษากับเภสัชกรให้ส่งข้อความไปในห้องของเภสัชกร ด้วยคำว่า ”ต้องการคำปรึกษา ” </p>
              <p>3.รอการตอบกลับจากเภสัชกรในรหัสห้องของตนเอง </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                  ปิด
                </Button>
              </div>
            </Alert>
      
            {!show && <Button onClick={() => setShow(true)}>แสดงข้อความ</Button>}
          </>
        );
    }

    return (
        <div className="App">
            {LoginStatus}
            {!showChat ? (
            <div><h3>Join A chat</h3>
            <h3>ห้องของเภสัชกร : 1234</h3>
            <input type="text" placeholder="Username.." onChange={(event) => { setUsername(event.target.value)}} />
            <input type="text" placeholder="Room Id.." onChange={(event) => { setRoom(event.target.value)}} />
            <button onClick={joinRoom}>Join a room</button>
            </div>)
            : 
            (<div>
                <Chat socket={socket} username={username} room={room}/>
            </div>)
        }   
        <AlertDismissible />
        </div>
        
    )
}
