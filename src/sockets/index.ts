import type http from 'node:http';
import { WebSocketServer } from 'ws';
import { registerExampleHandler } from './handlers/example.handler.ts';
import { registerOsInfoHandler } from './handlers/osinfo.handler.ts';
export function initWebSocket(server: http.Server) {
  const wss = new WebSocketServer({
    server,
    path: '/ws',
  });

  wss.on('connection', (ws) => {
    registerOsInfoHandler(ws);
  });

  return wss;
}