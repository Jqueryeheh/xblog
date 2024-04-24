import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

let dir = path.join(__dirname, 'public');

app.use(express.static(dir))

let port = 3000;

app.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(port,()=>{
	console.log("started");
})
