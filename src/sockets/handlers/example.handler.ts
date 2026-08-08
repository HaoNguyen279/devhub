import { WebSocket } from 'ws';

export function registerExampleHandler(ws: WebSocket) {
  ws.send(
    JSON.stringify({
      type: 'connected',
      message: 'WebSocket connected',
    }),
  );

  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: 'tick',
          timestamp: new Date().toISOString(),
          data: {
            message: 'example data from server',
            random: Math.floor(Math.random() * 1000),
          },
        }),
      );
    }
  }, 1000);

  ws.on('close', () => {
    clearInterval(intervalId);
  });
}