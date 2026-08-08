import express, { type Express, type Request, type Response } from 'express';
import authRoute from './src/routes/auth.route.ts';
import { prisma } from './src/config/prisma.ts';
import http from 'node:http'
import { initWebSocket } from './src/sockets/index.ts';

const app: Express = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);


const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

initWebSocket(server);

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
