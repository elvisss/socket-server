import { Socket, Server } from 'socket.io';
import UserList from '../classes/userList';
import User from '../classes/user';

export const userConnected = new UserList();

export const connectClient = (client: Socket) => {
  const user = new User(client.id);
  userConnected.add(user);
};

export const disconnect = (client: Socket) => {
  client.on('disconnect', () => {
    userConnected.removeUser(client.id);
  });
};

export const message = (client: Socket, io: Server) => {
  client.on('message', (payload) => {
    console.log('Message received', payload);
    io.emit('new-message', payload);
  });
};

export const configUser = (client: Socket, _io: Server) => {
  client.on('config-user', ({ name }, callback: Function) => {
    console.log('config user', name);
    userConnected.updateName(client.id, name);
    callback({
      ok: true,
      message: 'User ' + name + ' Configured',
    });
  });
};
