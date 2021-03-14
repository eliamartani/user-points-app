import { useEffect } from 'react';
import io from 'socket.io-client';

export default function useSocket(eventName, cb) {
  const socket = io();

  useEffect(() => {
    socket.on(eventName, cb);

    return function useSocketCleanup() {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);

  return socket;
}
