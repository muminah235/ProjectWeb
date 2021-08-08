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


app.get('/pharmacist',(req ,res)=>{
    db.query("SELECT * FROM pharmacist",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.put('/PharmaEdit',(req ,res)=>{
    const id = req.body.Pharma_ID;
    console.log(id);
    db.query("SELECT * from pharmacist WHERE Pharma_ID = ?"  ,[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
   
});

app.get('/customer',(req ,res)=>{
    db.query("SELECT DATE_FORMAT(User_birthday, '%Y-%m-%d') AS User_birthday,Admin_ID,Chat_ID,Order_ID,User_ID,Username,Password,User_fname,User_lname,User_address,User_tel from customer ",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.get('/showproduct',(req ,res)=>{
    db.query("SELECT * from product",(err,result)=>{
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

app.post('/addproduct',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const detail = req.body.detail;
    const price = req.body.price;
    const image = req.body.image;
    const status = req.body.status;
    const flag = req.body.flag;
    const type = req.body.type;

    console.log("name: " +name);
    console.log("detail: " +detail);
    console.log("price: " +price);
    console.log("image: "+image);
    console.log("status: "+status);
    console.log("flag: "+flag);
    console.log("type: "+type);

    db.query("INSERT into product(Product_name,Product_detail,Product_price,Product_img,Product_status,Product_flag) VALUES(?,?,?,?,?,?)",
    [name,detail,price,image,status,flag],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    })

    /*db.query("INSERT into proType(Protype_ID) VALUES (?)",[type],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send({message:"Add complete"});
        }
    })*/
    
})

app.put('/updatePharmacist',(req,res)=>{
    const id = req.body.Pharma_ID;
    const username = req.body.Username;
    const password = req.body.Password;
    const fname = req.body.Pharma_fname;
    const surname = req.body.Pharma_lname;
    console.log("id: "+ id);
    console.log("username: "+ username);
    console.log("password: "+ password);
    console.log("fname: "+ fname);
    console.log("surname: "+ surname);


    db.query("UPDATE pharmacist SET Username = ? ,Password = ?,Pharma_fname = ? ,Pharma_lname = ?  WHERE Pharma_ID = ?",[username,password,fname,surname,id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/deletePharmacist/:Pharma_ID',(req,res) =>{
    const id = req.params.Pharma_ID;
    db.query("DELETE FROM pharmacist WHERE Pharma_ID = ?",id,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
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

app.put('/profile',(req ,res)=>{
    const username = req.body.username;
    console.log("username: "+ username);
    db.query("SELECT DATE_FORMAT(User_birthday, '%Y-%m-%d') AS User_birthday,Admin_ID,Chat_ID,Order_ID,User_ID,Username,Password,User_fname,User_lname,User_address,User_tel from customer WHERE Username = ?"  ,[username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
   
});
app.listen('4002', () => {
    console.log('Sever is running on port 4001');
})


