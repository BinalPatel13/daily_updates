"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedRoutes = void 0;
const express_1 = require("express");
const feedController_1 = require("./feedController");
const router = express_1.Router();
const feedController = new feedController_1.FeedController();
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
exports.FeedRoutes = router;
//# sourceMappingURL=feedRoutes.js.map