import express, {Request, Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import bodyParser from 'body-parser';

dotenv.config();

const server = express();

server.use(cors({
    origin: 'https://resttesttest.com'
}));

server.use(express.json());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Endpoint não encontrado'
    })
});

server.listen(process.env.PORT);