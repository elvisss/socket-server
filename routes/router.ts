import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
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

export default router;
