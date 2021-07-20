const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { response } = require('express');

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

app.get("/",(req,res)=>{
    res.send("hello wolrd");
})


app.get('/customer',(req ,res)=>{
    db.query("SELECT * FROM customer",(err,result)=>{
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
    db.query("SELECT * FROM customer WHERE User_ID = ?",[id],(err,result)=>{
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
                console.log("complete");
                res.send({ message: "Complete" });
                return;
            } else {
                console.log("err");
                res.send({ message: "Wrong username/password" });
                return;
            }
        }
    })

})
app.listen('4001', () => {
    console.log('Sever is running on port 4001');
})