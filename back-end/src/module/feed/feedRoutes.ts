import { Router } from 'express';
import { FeedController } from './feedController';


const router: Router = Router();
const feedController = new FeedController();

const fetchFeedMiddleware = [
    feedController.fetchFeed
  ];
router.get('/new', fetchFeedMiddleware);

const editFeedMiddleware = [
    feedController.updateFeed
  ];
router.post('/edit/:id', editFeedMiddleware);

const deleteFeedMiddleware = [
    feedController.deleteFeed
  ];
router.delete('/delete/:id', deleteFeedMiddleware);

export const FeedRoutes: Router = router;