import { Router } from 'express';
import { YoutubeController } from './youtube.controller';
import { validateSchema } from '../../../common/middlewares/validate';
import { youTubeSchema } from './middlewares/youtube.schema';

export const createYouTubeRouter = () => {
  const router = Router();
  router.get('/video/:id', YoutubeController.getVideoYouTube);
  router.get('/search', validateSchema(youTubeSchema), YoutubeController.getSearchYouTube);
  return router;
};
