import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { userConnected } from '../sockets/socket';

const router = Router();

router.get('/messages', (_req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'everything is ok',
  });
});

router.post('/messages', (req: Request, res: Response) => {
  const { body, from } = req.body;
  const payload = {
    body,
    from
  }

  const server = Server.instance;
  server.io.emit('new-message', payload);

  res.json({
    ok: true,
    body,
    from,
  });
});

router.post('/messages/:id', (req: Request, res: Response) => {
  const { body, from } = req.body;
  const id = req.params.id;

  const payload = {
    body,
    from
  }

  const server = Server.instance;
  server.io.in(id).emit('private-message', payload);

  res.json({
    ok: true,
    body,
    from,
    id,
  });
});

router.get('/users', async(_req: Request, res: Response) => {
  try {
    const server = Server.instance;
    const clients = await server.io.fetchSockets();
    const ids = clients.map((client) => client.id);
    console.log({ ids });

    res.json({
      ok: true,
      clients: ids
    })
  } catch (err) {
    console.log({ err });
    res.json({
      ok: false,
      err
    })
  }
});

router.get('/users/detail', async(_req: Request, res: Response) => {
  res.json({
    ok: true,
    clients: userConnected.getList(),
  });
});

export default router;
