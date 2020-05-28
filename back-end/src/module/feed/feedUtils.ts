import * as My from "jm-ez-mysql";
import { Tables } from "../../config/tables";

export class FeedUtils {

    public async getFeed() {
        const query = `select * from ${Tables.FEEDS}`;
        const data = await My.query(query);
        return data;
      }

      public async updateFeed(
        editFeedData: {
          title: string;
          photo: File;
          description: string;
        },
        id: number
      ) {
        const data = await My.update(
          Tables.FEEDS,
          editFeedData,
          "id = ?",
          [id]
        );
        return data;
      }

      public async deleteFeed(id: number) {
        const data = await My.delete(Tables.FEEDS, "id = ?", [id]);
        return data;
      }
}
