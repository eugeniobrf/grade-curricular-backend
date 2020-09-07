import express from 'express';
import rotas from './rotas';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);
const porta = process.env.PORT || 3333;
app.listen(porta,()=>console.log('Server iniciado na porta: ' +porta));