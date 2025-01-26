// src/hooks/useWebSocket.js
import { useEffect } from 'react';

export const useWebSocket = (socket, onMessage) => {
  useEffect(() => {
    const cleanup = socket.onMessage(onMessage);
    return cleanup;
  }, [socket, onMessage]);
};