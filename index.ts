import express, { type Express, type Request, type Response } from 'express';
import authRoute from './src/routes/auth.route.ts';
import { prisma } from './src/config/prisma.ts';
import http from 'node:http'
import { initSocketIO } from './src/sockets/index.ts';
import specsRoute from './src/routes/specs.route.ts';
import noteRoute from './src/routes/note.route.ts';
import cors from 'cors';
const app: Express = express();

const corsOptions = {
  origin: 'http://localhost:8081', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Cho phép gửi cookie/headers xác thực
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);

app.use('/api/v1/specs', specsRoute);

app.use('/api/v1/notes', noteRoute);


const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

initSocketIO(server);

async function start() {
  try {
    await prisma.$connect();
    console.log('Database connected');

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`WebSocket ready at ws://localhost:${PORT}/ws`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
