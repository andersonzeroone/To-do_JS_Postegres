const express = require('express');
const server = express();

server.listen(3000,()=>{
    console.log('Server running');
});

const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express:server,
    noCache: true,
})

server.use(express.static('public'));
server.use(express.urlencoded({extended: true}));

const Pool = require('pg').Pool
const db = new Pool({
    user:'postgres',
    password:'0000',
    host:'localhost',
    port:5432,
    database:'todo'
})

server.get("/", function(req, res){

    db.query("select * from task", function(err, result){
        if(err) return res.send("erro no db")

        const todos = result.rows

        console.log(todos) 
        return res.render("index.html", {todos});
        
    })
    
})


server.post("/", function(req, res){
    const task = req.body.task
    console.log(task)

    if(task == ''){
        return res.send("Preencha o campo")
    }

    const query = `insert into task (tasks) VALUES ($1)`
    const values =[task]  

    db.query(query, values, function(err){
        if(err) return res.send('erro no banco de dados.')

        return res.redirect("back");
    })
  
});

server.delete("/", function(req, res){
    
})
