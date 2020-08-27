import express from 'express';
import rotas from './rotas';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);

app.listen(3333);