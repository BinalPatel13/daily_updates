"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedController = void 0;
const feedUtils_1 = require("./feedUtils");
const responseBuilder_1 = require("../../helpers/responseBuilder");
const constants_1 = require("../../config/constants");
class FeedController {
    constructor() {
        this.feedUtils = new feedUtils_1.FeedUtils();
        this.fetchFeed = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.feedUtils.getFeed();
            const response = responseBuilder_1.ResponseBuilder.data(data);
            res.status(response.code).json({
                data: response.result
            });
        });
        this.updateFeed = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const feedData = {
                title: req.body.title,
                photo: req.body.photo,
                description: req.body.description,
            };
            const feedDataUpdate = yield this.feedUtils.updateFeed(feedData, req.params.id);
            const response = responseBuilder_1.ResponseBuilder.data(feedDataUpdate);
            res.status(response.code).json({
                message: constants_1.Constants.EDIT_FEED_SUCCESSFULL
            });
        });
        this.deleteFeed = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const feedDelete = yield this.feedUtils.deleteFeed(req.params.id);
            const response = responseBuilder_1.ResponseBuilder.data(feedDelete);
            res.status(response.code).json({
                message: constants_1.Constants.DELETE_FEED_SUCCESSFULL
            });
        });
    }
}
exports.FeedController = FeedController;
//# sourceMappingURL=feedController.js.map