const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const publicDirectory=path.join(__dirname,'./public')

app.use(express.static(publicDirectory));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());

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

app.get("/",(req,res)=>{
    res.send("hello wolrd");
})


app.get('/customer',(req ,res)=>{
    db.query("SELECT DATE_FORMAT(User_birthday, '%Y-%m-%d') AS User_birthday,Admin_ID,Chat_ID,Order_ID,User_ID,Username,Password,User_fname,User_lname,User_address,User_tel from customer ",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.put('/edit',(req ,res)=>{
    const id = req.body.User_ID;
    console.log(id);
    db.query("SELECT DATE_FORMAT(User_birthday, '%Y-%m-%d') AS User_birthday,Admin_ID,Chat_ID,Order_ID,User_ID,Username,Password,User_fname,User_lname,User_address,User_tel from customer WHERE User_ID = ?"  ,[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
   
});

app.put('/update',(req,res)=>{
    const id = req.body.User_ID;
    const username = req.body.Username;
    const password = req.body.Password;
    const fname = req.body.User_fname;
    const surname = req.body.User_lname;
    const birthday = req.body.User_birthday;
    const address = req.body.User_address;
    const tel = req.body.User_tel;
    console.log("id: "+ id);
    console.log("username: "+ username);
    console.log("password: "+ password);
    console.log("fname: "+ fname);
    console.log("surname: "+ surname);
    console.log("birthday: "+ birthday);
    console.log("address: "+ address);
    console.log("tel: "+ tel);

    /*db.query("SELECT * from customer WHERE Username = ? ",[username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result.Username);
        }
    })*/
    /*if(username == ''){
        db.query("SELECT Username FROM customer WHERE User_ID =? ",[id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })
        const username = result.data;
        console.lon("New Username: " + username);
    }*/

    db.query("UPDATE customer SET Username = ? ,Password = ?,User_fname = ? ,User_lname = ? ,User_birthday = ?,User_address = ?,User_tel =?  WHERE User_ID = ?",[username,password,fname,surname,birthday,address,tel,id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
    
   
    
    
    
})

app.delete('/delete/:User_ID',(req,res) =>{
    const id = req.params.User_ID;
    db.query("DELETE FROM customer WHERE User_ID = ?",id,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.post('/register', (req, res) => {
    const { username, name, surname, tel ,birthday, address, password, PasswordConfirm } = req.body;
    console.log(req.body)
    /*const Username = req.body.username;
    const Password = req.body.password;
    const passwordConfirm = req.body.PasswordConfirm
    const User_fname = req.body.name;
    const User_lname = req.body.surname;
    const User_birthday = req.body.birthday;
    const User_address = req.body.address;
    const User_tel = req.body.tel;*/
    

    db.query("SELECT Username FROM customer WHERE Username = ?", [username], async (error, results) => {
        console.log(results)
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            console.log("That username is already in use");
            res.send({message: "That username is already in use"});
        }else if (password !== PasswordConfirm) {
            console.log("Password do not match");
            res.send({message: "Password do not match"});
        }else if((username !== results) && (password == PasswordConfirm)){
            console.log("correct")
            db.query("INSERT INTO customer(Username,Password,User_fname,User_lname,User_birthday,User_address,User_tel) VALUES(?,?,?,?,?,?,?)",
            [username, password, name, surname, birthday, address, tel],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({message:"Register complete"});
                }
            }
        );
        } 
        
        
        
    });

    /*db.query("INSERT INTO customer(Username,Password,User_fname,User_lname,User_birthday,User_address,User_tel) VALUES(?,?,?,?,?,?,?)",
        [Username, Password, User_fname, User_lname, User_birthday, User_address, User_tel],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values insert");
            }
        }
    );*/

    /*db.query("INSERT INTO customer SET ?",{Username:Username,Password: Password,User_fname: User_fname,User_lname: User_lname,User_address: User_address,User_tel:User_tel},
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values insert");
            }
        }
    );*/
})

app.post("/login",  (req, res) => {

    const Username = req.body.username;
    const Password = req.body.password;
    
    if (!Username || !Password) {
        console.log("no username/password");
        res.send({message: "no username/password"});
        return;
    }

    db.query("SELECT * FROM customer WHERE Username = ? AND Password = ? ", [Username, Password], (err, result) => {
        console.log(result);
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

app.post("/adminlogin",  (req, res) => {

    const Username = req.body.username;
    const Password = req.body.password;
    
    if (!Username || !Password) {
        console.log("no username/password");
        res.send({message: "no username/password"});
        return;
    }

    db.query("SELECT * FROM admin WHERE Username = ? AND Password = ? ", [Username, Password], (err, result) => {
        console.log(result);
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
app.listen('4001', () => {
    console.log('Sever is running on port 4001');
})


/*db.query("INSERT INTO customer(Username,Password,User_fname,User_lname,User_birthday,User_address,User_tel) VALUES(?,?,?,?,?,?,?)",
        [Username, Password, User_fname, User_lname, User_birthday, User_address, User_tel],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values insert");
            }
        }
    );*/