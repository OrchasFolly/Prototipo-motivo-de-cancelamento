import express from 'express';
import rotaMotivo from './Router/rotaC.js';
import cors from 'cors'

const porta = 5174;
const localhost = "localhost"; // "0.0.0.0"
const app = express();
app.use(cors())

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use('/motivos', rotaMotivo);

app.listen(porta,localhost, ()=>{
    console.log(`Backend do servidor rodando em http://${localhost}:${porta}`);
});