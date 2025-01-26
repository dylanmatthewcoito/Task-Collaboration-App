// src/services/webSocket.js
export const createWebSocketService = () => ({
    callbacks: new Set(),
    emit(task) {
      this.callbacks.forEach(callback => callback(task));
    },
    onMessage(callback) {
      this.callbacks.add(callback);
      return () => this.callbacks.delete(callback);
    }
  });