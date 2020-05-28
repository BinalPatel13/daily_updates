"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const jwt = require("jsonwebtoken");
const jwtsimple = require("jwt-simple");
const utils_1 = require("../helpers/utils");
class Jwt {
    /*
    * getAuthToken
    */
    static getAuthToken(data) {
        return jwt.sign(data, process.env.JWT_SECRET);
    }
    static createSecretToken(data) {
        var token = jwtsimple.encode(data, process.env.JWT_SECRET);
        return token;
    }
    /*
    * decodeAuthToken
    */
    static decodeAuthToken2(req, res, next) {
        const token = (req.headers && req.headers['x-auth-token']);
        if (utils_1.default.empty(token)) {
            try {
                return res.status(401).json({ "message": req.t("NOT_AUTHORIZED") });
            }
            catch (error) {
                return res.status(401).json({ "message": req.t("NOT_AUTHORIZED") });
            }
        }
        else {
            try {
                const validToken = jwtsimple.decode(token, process.env.JWT_SECRET);
                if (utils_1.default.empty(validToken)) {
                    return res.status(401).json({ "message": req.t("NOT_AUTHORIZED") });
                }
                req.user = validToken;
                next();
            }
            catch (error) {
                return res.status(401).json({ "message": req.t("NOT_AUTHORIZED") });
            }
        }
    }
    static decodeAuthToken(token) {
        if (token) {
            try {
                return jwt.verify(token, process.env.JWT_SECRET);
            }
            catch (error) {
                // logger.error(error);
                return false;
            }
        }
        return false;
    }
}
exports.Jwt = Jwt;
//# sourceMappingURL=jwt.js.map