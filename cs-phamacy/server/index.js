const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { response } = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const multer =require('multer');
const http = require('http')
const publicDirectory=path.join(__dirname,'./public')
const writeFileP = require("write-file-p");
const {Server} = require("socket.io")
const fs = require('fs')
const bcrypt = require('bcryptjs');


app.use(express.static(publicDirectory));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    }
})

io.on("connection",(socket)=>{
    console.log(`User Connected:${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    
    socket.on("send_message",(data)=>{ 
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("send_messageList",(data,room)=>{
        console.log(data)
        if(data !== ""){
            writeFileP(`${__dirname}/chat/${room}.txt`, data, (err, data) => {
            console.log(err || data);
            });
        }
        
    })
    
    socket.on("disconnect",(data)=>{
        console.log("User Disconnected",socket.id)
        
    });
});


const storage = multer.diskStorage({
    destination:path.join(__dirname,'../public','uploads'),
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

const storage2 = multer.diskStorage({
    destination:path.join(__dirname,'../public','slip'),
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})


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

//อัปเดตตรงนี้
//หน้า Oderlist
app.get('/orderCus/:username',(req ,res)=>{
    const Username = req.params.username;
    db.query("SELECT DATE_FORMAT(Order_date, '%Y-%m-%d') AS Order_date,Order_ID,Order_price,Order_pay,paytime,paybill,Order_status,Tranfer,completeTime,receiveTime,Username from orderCus WHERE Username = ? ", [Username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.get('/showcart/:Username',(req ,res)=>{
    const Username = req.params.Username;
    db.query("SELECT * from O_detail WHERE Username = ? ",[Username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

//หน้า Odetail
app.post('/slip',async (req,res) =>{
    
    try{
        let slip = multer({storage:storage2}).single('slipImg');
        
        slip(req,res,function(err){
            if(!req.file){
                return res.send('Please select img');
            }
            else if(err instanceof multer.MulterError){
                return res.send(err);
            }
            
        }) ;  
        
    }catch(err){console.log(err)}

})

app.put('/updateSlip',(req,res)=>{
    const orderpay = req.body.Order_pay;
    const paytime = req.body.paytime;
    const paybill = req.body.img;
    const tranfer = req.body.Tranfer;
    const completetime = req.body.completeTime;
    const username = req.body.Username;
    const orderstatus = req.body.Order_Status;

    console.log(orderpay)
    console.log(paytime)
    console.log(paybill)
    console.log(tranfer)
    console.log(completetime)
    console.log(username)
    
    db.query("UPDATE orderCus SET Order_pay = ?,paytime = ? ,paybill = ?,Order_Status = ?, Tranfer = ?, completeTime = ?  WHERE Username = ?"
        ,[orderpay,paytime,paybill,orderstatus,tranfer,completetime,username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//หน้า status order
app.put('/updateStatus', (req ,res)=> {
    const time = req.body.time;
    const username = req.body.username;

    db.query("UPDATE OrderCus SET receiveTime = ? where Username = ?  ",[time,username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
   
    
});

app.get("/",(req,res)=>{
    res.send("hello wolrd");
})

app.post('/upload',async (req,res) =>{
    
    try{
        let upload = multer({storage:storage}).single('img');
        
        upload(req,res,function(err){
            if(!req.file){
                return res.send('Please select img');
            }
            else if(err instanceof multer.MulterError){
                return res.send(err);
            }
            
        }) ;  
        
    }catch(err){console.log(err)}
    

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
app.put('/productEdit',(req ,res)=>{
    const id = req.body.Product_ID;
    console.log(id);
    db.query("SELECT * from product WHERE id = ?"  ,[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
   
});

app.put('/addToCart',(req ,res)=>{
    const id = req.body.id;
    db.query("SELECT * from product WHERE Product_ID = ?"  ,[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
   
});

app.get('/customer',(req ,res)=>{
    db.query("SELECT DATE_FORMAT(User_birthday, '%Y-%m-%d') AS User_birthday,Admin_ID,Chat_ID,Order_ID,User_ID,Username,Password,User_fname,User_lname,User_address,User_tel,Chat_room from customer ",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.get('/selectcustomer',(req ,res)=>{
    const Username = req.body.username
    db.query("SELECT DATE_FORMAT(User_birthday, '%Y-%m-%d') AS User_birthday,Admin_ID,Chat_ID,Order_ID,User_ID,Username,Password,User_fname,User_lname,User_address,User_tel from customer WHERE Username =?",[Username],(err,result)=>{
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

app.put('/search',(req ,res)=>{
    const search = req.body.seachtext;
    console.log("search: "+search);
    db.query("SELECT * from product WHERE name  LIKE ? ",[search],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});
app.put('/history',(req ,res)=>{
    const room = req.body.room;
    console.log("room: "+room);
    try {
        const data = fs.readFileSync(`${__dirname}/chat/${room}.txt`, 'utf8')
        console.log(data)
        console.log("complete")
        res.send(data);
    } catch (err) {
        console.error(err)
    }
    /*db.query("SELECT * from product WHERE name  LIKE ? ",[search],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });*/

});

app.put('/cat',(req ,res)=>{
    const type = req.body.type;
    console.log("type: "+type);
    db.query("SELECT * from product WHERE Product_type = ? ",[type],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});


app.get('/showcart/:Username',(req ,res)=>{
    const Username = req.params.Username;
    db.query("SELECT * from O_detail WHERE Username = ? ",[Username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});
app.put('/orderCus',(req ,res)=>{
    const Username = req.body.Username;
    console.log(Username)
    db.query("SELECT * from customer WHERE Username = ? ",[Username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.put('/showcartPharma',(req ,res)=>{
    const Username = req.body.username;
    console.log("user: "+Username);
    db.query("SELECT * from O_detail WHERE Username = ? ",[Username],(err,result)=>{
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

app.put('/updateCart',(req ,res)=>{
    const Cartstatus = req.body.Cartstatus;
    const Username = req.body.Username;
    const num = req.body.num;
    const Cart_id = req.body.Cart_id;
    const Product_id = req.body.Product_id;
    console.log("----------");
    console.log("update")
    console.log("user: "+Username)
   console.log("num: "+num);
   console.log("Cart_id: "+Cart_id);
   console.log("Product_id: "+Product_id);
   console.log("status: "+Cartstatus)
   console.log("----------");
    
    db.query("UPDATE O_detail SET Cart_Amount = ? where Order_ID = ? AND id =?",[num,Cart_id,Product_id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
   
});


   


app.post('/addproduct',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const detail = req.body.detail;
    const price = req.body.price;
    const image = req.body.img;
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

    db.query("INSERT into product(name,detail,price,Product_img,Product_status,Product_flag,Product_type) VALUES(?,?,?,?,?,?,?)",
    [name,detail,price,image,status,flag,type],(err,result)=>{
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
    
    const fname = req.body.Pharma_fname;
    const surname = req.body.Pharma_lname;
    console.log("id: "+ id);
    console.log("username: "+ username);
    
    console.log("fname: "+ fname);
    console.log("surname: "+ surname);


    db.query("UPDATE pharmacist SET Username = ?,Pharma_fname = ? ,Pharma_lname = ?  WHERE Pharma_ID = ?",[username,fname,surname,id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.put('/updateProduct',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    
    const detail = req.body.detail;
    const price = req.body.price;
    console.log("id: "+ id);
    console.log("name: "+ name);
    
    console.log("detail: "+ detail);
    console.log("price: "+ price);


    db.query("UPDATE product SET name = ?,detail = ? ,price = ?  WHERE id = ?",[name,detail,price,id],(err,result)=>{
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

app.delete('/deleteProduct/:id',(req,res) =>{
    const id = req.params.id;
    db.query("DELETE FROM product WHERE id = ?",id,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/deletetoCart/:itemID/:Cart_ID',(req,res) =>{
    const id = req.params.itemID;
    const Cartid = req.params.Cart_ID;
    console.log("---------");
    console.log("id: "+id);
    console.log("cartID: "+Cartid);
    db.query("DELETE FROM O_detail WHERE id = ? AND Order_ID =? ",[id,Cartid],(err,result)=>{
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
    
    const fname = req.body.User_fname;
    const surname = req.body.User_lname;
    const birthday = req.body.User_birthday;
    const address = req.body.User_address;
    const tel = req.body.User_tel;
    console.log("id: "+ id);
    console.log("username: "+ username);
    
    console.log("fname: "+ fname);
    console.log("surname: "+ surname);
    console.log("birthday: "+ birthday);
    console.log("address: "+ address);
    console.log("tel: "+ tel);


    db.query("UPDATE customer SET Username = ? ,User_fname = ? ,User_lname = ? ,User_birthday = ?,User_address = ?,User_tel =?  WHERE User_ID = ?",[username,fname,surname,birthday,address,tel,id],(err,result)=>{
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

app.post('/order',(req,res)=>{
    const Cartstatus = req.body.Cartstatus;
    const Username = req.body.Username;
    const id = parseInt(req.body.Product_ID);
    const Cart_ID = req.body.Cart_ID;
    const num  = req.body.num;
    const price = req.body.price;
    const name = req.body.name;
    const detail = req.body.detail;
    console.log("-------");
    console.log("Insert");
    console.log("User: "+Username);
    console.log("Cart_ID: " +Cart_ID);
    console.log("num: " +num);
    console.log("id: " +id);
    console.log("name: " +name);
    console.log("price: " +price);
    console.log("status: " +Cartstatus);
    console.log("detail: " +detail);
    console.log("-------");

    db.query("INSERT INTO O_detail(Order_ID,id,name,detail,Cart_Amount,price,Username,Cart_status) VALUES(?,?,?,?,?,?,?,?)",
    [Cart_ID, id,name,detail, num, price,Username,Cartstatus],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({message:"aad to cart complete"});
        }
    }
);
})



app.post('/register', (req, res) => {
    const { username, name, surname, tel ,birthday, address, password, PasswordConfirm,room } = req.body;
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
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);
            db.query("INSERT INTO customer(Username,Password,User_fname,User_lname,User_birthday,User_address,User_tel,Chat_room) VALUES(?,?,?,?,?,?,?,?)",
            [username, hashedPassword, name, surname, birthday, address, tel,room],
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
    try {
    const Username = req.body.username;
    const Password = req.body.password;
    
    if (!Username || !Password) {
        console.log("no username/password");
        res.send({message: "no username/password"});
        return;
    }

    db.query("SELECT * FROM customer WHERE Username = ?  ", [Username], (err, result) => {
        console.log(result);
        if (err) {
            res.send({ err: err });
        } else {
            if (bcrypt.compare( Password , result[0].Password)) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username/password" });
            }
        }
    })
    } catch (error) {
        console.log(error);
    }
})

app.post("/chatlogin",  (req, res) => {

    const Username = req.body.username;
    const room = req.body.room;
    console.log("Username: "+Username)
    console.log("Room: "+room)
    if (!Username) {
        console.log("no username");
        res.send({message: "no username"});
        return;
    }
    if(room !== "1234"){
        db.query("SELECT * FROM customer WHERE Username = ? && Chat_room = ?  ", [Username,room], (err, result) => {
            if (err) {
                res.send({ err: err });
            } else {
                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({ message: "Wrong username" }); 
                }
            }
        })
    }else db.query("SELECT * FROM customer WHERE Username = ?   ", [Username], (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username" }); 
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

app.post("/pharmalogin",  (req, res) => {

    const Username = req.body.username;
    const Password = req.body.password;
    
    if (!Username || !Password) {
        console.log("no username/password");
        res.send({message: "no username/password"});
        return;
    }

    db.query("SELECT * FROM pharmacist WHERE Username = ? AND Password = ? ", [Username, Password], (err, result) => {
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
app.put('/userID',(req ,res)=>{
    const username = req.body.username;
    console.log("username: "+ username);
    db.query("SELECT User_ID from customer WHERE Username = ?"  ,[username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    });
   
});

app.put('/cusCart',(req ,res)=>{
    const username = req.body.username;
    console.log("username: "+ username);
    db.query("SELECT * from O_detail WHERE Username = ?"  ,[username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    });
   
});

app.put('/profile',(req ,res)=>{
    const username = req.body.username;
    console.log("username: "+ username);
    db.query("SELECT DATE_FORMAT(User_birthday, '%Y-%m-%d') AS User_birthday,Admin_ID,Chat_ID,Order_ID,User_ID,Username,Password,User_fname,User_lname,User_address,User_tel,Chat_room from customer WHERE Username = ?"  ,[username],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
   
});
app.listen('4007', () => {
    console.log('Sever is running on port 4006');
})

server.listen('3006',()=>{
    console.log('Socket is running on port 3005');
})

