const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');



app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "us12062557",
    database: "pharmaDelivery"
})
db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Mysql Connected")
    }
})

app.post('/register', (req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;
    const User_fname = req.body.name;
    const User_lname = req.body.surname;
    const User_birthday = req.body.birthday;
    const User_address = req.body.address;
    const User_tel = req.body.tel;

    db.query("INSERT INTO customer(Username,Password,User_fname,User_lname,User_birthday,User_address,User_tel) VALUES(?,?,?,?,?,?,?)",
        [Username, Password, User_fname, User_lname, User_birthday, User_address, User_tel],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values insert");
            }
        }
    );
})

app.post("/login", (req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;
    console.log(Username);
    if( !Username || !Password){
        res.status(401).render('/');
        res.send({message:"Username or Password is incorrect"});
    }

    db.query("SELECT * FROM customer WHERE Username = ? AND Password = ? ", [Username, Password], (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username/password" });
            }
        }


    })
})
app.listen('4005', () => {
        console.log('Sever is running on port 4005');
})