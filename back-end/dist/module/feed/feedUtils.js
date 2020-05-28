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
exports.FeedUtils = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../config/tables");
class FeedUtils {
    getFeed() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select * from ${tables_1.Tables.FEEDS}`;
            const data = yield My.query(query);
            return data;
        });
    }
    updateFeed(editFeedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield My.update(tables_1.Tables.FEEDS, editFeedData, "id = ?", [id]);
            return data;
        });
    }
    deleteFeed(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield My.delete(tables_1.Tables.FEEDS, "id = ?", [id]);
            return data;
        });
    }
}
exports.FeedUtils = FeedUtils;
//# sourceMappingURL=feedUtils.js.map