import type http from 'node:http';
import { Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents } from './types.ts';
import { registerExampleHandler } from './handlers/example.handler.ts';
import { registerOsInfoHandler } from './handlers/osinfo.handler.ts';

export function initSocketIO(server: http.Server) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    path: '/socket.io',
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:8081',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.emit('connected', {
      type: 'connected',
      message: 'Socket.IO connected',
    });

    registerExampleHandler(socket);
    registerOsInfoHandler(socket);

    socket.on('disconnect', (reason) => {
      console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
    });

    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });
  });

  return io;
}