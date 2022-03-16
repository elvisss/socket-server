import { Socket, Server } from 'socket.io';

export const disconnect = (client: Socket) => {
  client.on('disconnect', () => {
    console.log('client disconnected');
  });
};

export const message = (client: Socket, io: Server) => {
  client.on('message', (payload) => {
    console.log('Message received', payload);
    io.emit('new-message', payload)
  });
};
