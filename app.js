const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config();
app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const fs = require('fs')

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/getData",(req,res)=>{
    fs.readFile("data.json",(err,buffer)=>{
        if(!err){
            try{
                let data = JSON.parse(buffer)
                res.send(data)
            }catch(e){
                res.send([])
            }
        }else{
            console.log(err)
            res.send([])
        }
    })
})

app.post("/addArtist",(req,res)=>{
    const {name, about, url} = req.body
    let artistList = []
    fs.readFile("data.json",(err,buffer)=>{
        if(!err){
            try{
                artistList = JSON.parse(buffer)
            }catch(e){
                artistList = []
            }   
        }
        jsonObject = {
            name:name,
            about:about,
            url:url
        }
        artistList.push(jsonObject)
        let data = JSON.stringify(artistList);
        fs.writeFile("data.json",data,(err)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect("/")
            }
        })
        
    })
})

app.delete("/deleteArtist/:artistId",(req,res)=>{
    fs.readFile("data.json",(err,buffer)=>{
        if(!err){
            artistList = JSON.parse(buffer)
            artistList.splice(Number(req.params.artistId),1)
            let data = JSON.stringify(artistList);
            fs.writeFile("data.json",data,(err)=>{
                if(err){
                    console.log(err)
                }
            })
            res.redirect('/')
        }
    })
})

app.listen(process.env.PORT,()=>{
    console.log("SERVER HAS STARTED")
})
