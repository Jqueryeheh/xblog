import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//let dir = path.join(__dirname, './');

app.use(express.static("file:///opt/render/project/src/"))

let port = 3000;

app.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(port,()=>{
	console.log("started");
})
