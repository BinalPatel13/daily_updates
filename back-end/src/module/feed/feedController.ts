import { FeedUtils } from "./feedUtils";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Constants } from "../../config/constants";


export class FeedController {

    private feedUtils: FeedUtils = new FeedUtils();

    public fetchFeed = async (req, res) => {
        const data = await this.feedUtils.getFeed();
        const response = ResponseBuilder.data(data);
        res.status(response.code).json({
          data: response.result
        })
      };

      public updateFeed = async (req, res) => {
        const feedData = {
          title: req.body.title,
          photo: req.body.photo,
          description: req.body.description,
        };
        const feedDataUpdate = await this.feedUtils.updateFeed(feedData, req.params.id);
        const response = ResponseBuilder.data(feedDataUpdate);
        res.status(response.code).json({
          message: Constants.EDIT_FEED_SUCCESSFULL
        });
      };

      public deleteFeed = async (req, res) => {
        const feedDelete = await this.feedUtils.deleteFeed(req.params.id);
        const response = ResponseBuilder.data(feedDelete);
        res.status(response.code).json({
          message: Constants.DELETE_FEED_SUCCESSFULL
        });
      };
}