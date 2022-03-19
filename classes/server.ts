import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import { SERVER_PORT } from '../global/environment';
import * as socket from '../sockets/socket';

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = http.createServer(this.app);
    this.io = new socketIO.Server(this.httpServer, {
      cors: { origin: '*', methods: ['GET', 'POST'] },
    });
    this.listenSockets();
    this.middlewares();
  }

  public static get instance() {
    return this._instance || (this._instance = new Server());
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
  }

  private listenSockets() {
    console.log('listen connections - sockets');
    this.io.on('connection', (client) => {
      console.log(client.id);
      socket.connectClient(client);
      socket.configUser(client, this.io);
      socket.message(client, this.io);
      socket.disconnect(client);
    });
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback());
  }
}
