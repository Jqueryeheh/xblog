import express from 'express'
/*import { exec } from 'child_process'*/

const app = express();

let dir = "/opt/render/project/src/";
app.use(express.static(dir))

let port = 3000;

app.get("/",(req,res)=>{
	res.sendFile(dir+"index.html");
	
})

app.listen(port,()=>{
	console.log("started");
	/*exec('ls', (error, stdout, stderr) => {
     if (error) {
       console.log(error) 
     }
    console.log(stdout);


	})*/
})
