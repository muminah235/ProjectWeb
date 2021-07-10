const express = require('express');
const app = express();
const mysql =  require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "us12062557",
    database: "pharmaDelivery"
})
db.connect((error)=>{
    if (error){
        console.log(error)
    }else{
        console.log("Mysql Connected")
    }
})

app.post('/create',(req,res)=>{
    const Username = req.body.username;
    const Password = req.body.password;
    const User_fname = req.body.name;
    const User_lname = req.body.surname;
    const User_birthday = req.body.birthday;
    const User_address = req.body.address;
    const User_tel = req.body.tel;

    console.log(Username);

    db.query("INSERT INTO customer(Username,Password,User_fname,User_lname,User_birthday,User_address,User_tel) VALUES(?,?,?,?,?,?,?)",
    [Username,Password,User_fname,User_lname,User_birthday,User_address,User_tel],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            
            res.send("Values insert");
        }
    }
    );
})

app.listen('8080',()=>{
    console.log('Sever is running on port 8080');
})