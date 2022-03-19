import { Socket, Server } from 'socket.io';
import UserList from '../classes/userList';
import User from '../classes/user';

export const userConnected = new UserList();

export const connectClient = (client: Socket, io: Server) => {
  const user = new User(client.id);
  userConnected.add(user);
  io.emit('active-users', userConnected.getList());
};

export const disconnect = (client: Socket, io: Server) => {
  client.on('disconnect', () => {
    userConnected.removeUser(client.id);
    io.emit('active-users', userConnected.getList());
  });
};

export const message = (client: Socket, io: Server) => {
  client.on('message', (payload) => {
    console.log('Message received', payload);
    io.emit('new-message', payload);
  });
};

export const configUser = (client: Socket, io: Server) => {
  client.on('config-user', ({ name }, callback: Function) => {
    console.log('config user', name);
    userConnected.updateName(client.id, name);
    io.emit('active-users', userConnected.getList());
    callback({
      ok: true,
      message: 'User ' + name + ' Configured',
    });
  });
};

export const getUsers = (client: Socket, io: Server) => {
  client.on('get-users', () => {
    io.to(client.id).emit('active-users', userConnected.getList());
  });
}
