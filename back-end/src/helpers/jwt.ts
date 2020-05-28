import * as jwt from "jsonwebtoken";
import * as jwtsimple from "jwt-simple";
import  Utils from "../helpers/utils";
export class Jwt {
  
  /*
  * getAuthToken
  */
  public static getAuthToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  public static createSecretToken(data) {
    var token = jwtsimple.encode(data, process.env.JWT_SECRET);
    return token;
  }

  /*
  * decodeAuthToken
  */
 public static decodeAuthToken2(req, res, next) {
  const token = (req.headers && req.headers['x-auth-token']);
  
  if (Utils.empty(token)) {
    try {
      return res.status(401).json({ "message": req.t("NOT_AUTHORIZED") });
    } catch (error) {
      return res.status(401).json({ "message": req.t("NOT_AUTHORIZED") });
    }
  }
  else{
    try {
      const validToken = jwtsimple.decode(token, process.env.JWT_SECRET);
      if (Utils.empty(validToken)) {
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
  public static decodeAuthToken(token) {
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        // logger.error(error);
        return false;
      }
    }
    return false;
  }
}
