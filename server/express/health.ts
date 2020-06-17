import express from 'express';
import version from '../utils/version';

const router = express.Router();

router.get('/', (_req, res): void => {
  res.send({
    health: 'ok',
    version,
  });
});

export default router;
