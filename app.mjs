import express from 'express'

const app = express();

let dir ="" 

app.use(express.static(dir))

let port = 3000;

app.get("/",(req,res)=>{
	res.sendFile("./index.html");
})

app.listen(port,()=>{
	console.log("started");
})
