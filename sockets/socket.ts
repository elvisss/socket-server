import { Socket } from 'socket.io';

export const disconnect = (client: Socket) => {
  client.on('disconnect', () => {
    console.log('client disconnected');
  });
};

export const message = (client: Socket) => {
  client.on('message', (payload, callback) => {
    console.log('Message received', payload);
  });
};
