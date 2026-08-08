export type SocketEventType = 'connected' | 'tick';

export type SocketResponse<T = unknown> = {
  type: SocketEventType;
  message?: string;
  timestamp?: string;
  data?: T;
};