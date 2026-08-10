import type { Socket } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents } from '../types.ts';

export function registerExampleHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  let intervalId: NodeJS.Timeout | null = null;

  const startTickInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      if (socket.connected) {
        try {
          socket.emit('tick', {
            type: 'tick',
            timestamp: new Date().toISOString(),
            data: {
              message: 'example data from server',
              random: Math.floor(Math.random() * 1000),
            },
          });
        } catch (error) {
          console.error(`Error emitting tick for ${socket.id}:`, error);
        }
      }
    }, 1000);
  };

  startTickInterval();

  socket.on('ping', () => {
    try {
      socket.emit('tick', {
        type: 'tick',
        timestamp: new Date().toISOString(),
        data: {
          message: 'pong',
          random: Math.floor(Math.random() * 1000),
        },
      });
    } catch (error) {
      console.error(`Error handling ping for ${socket.id}:`, error);
    }
  });

  socket.on('disconnect', () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  });
}