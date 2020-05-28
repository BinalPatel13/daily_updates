"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const bodyParser = require("body-parser"); // pull information from HTML POST (express4)
const compression = require("compression");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet"); // Security
const l10n = require("jm-ez-l10n");
const jmEzMySql = require("jm-ez-mysql");
const methodOverride = require("method-override"); // simulate DELETE and PUT (express4)
const morgan = require("morgan"); // log requests to the console (express4)
const path = require("path");
const logger_1 = require("./helpers/logger");
const routes_1 = require("./routes");
dotenv.config();
jmEzMySql.init({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
});
class App {
    constructor() {
        this.logger = logger_1.Log.getLogger();
        const NODE_ENV = process.env.NODE_ENV;
        // const PORT = process.env.PORT as string || 3000;
        this.app = express();
        this.app.use(helmet());
        this.app.all("/*", (req, res, next) => {
            // res.setHeader("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");
            // tslint:disable-next-line: max-line-length
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid,x-auth-token");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            if (req.method === "OPTIONS") {
                res.writeHead(200);
                res.end();
            }
            else {
                next();
            }
        });
        if (NODE_ENV === "development") {
            // set the static files location of bower_components
            // this.app.use("/bower_components", express.static(path.join(process.cwd(), "bower_components")));
            this.app.use(morgan("dev")); // log every request to the console
        }
        else {
            this.app.use(compression());
            // set the static files location /public/img will be /img for users
            this.app.use(express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" }));
        }
        l10n.setTranslationsFile("en", "src/language/translation.en.json");
        this.app.use(l10n.enableL10NExpress);
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json(), (error, req, res, next) => {
            if (error) {
                return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
            }
            next();
        });
        this.app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
        this.app.use(methodOverride());
        const routes = new routes_1.Routes(NODE_ENV);
        this.app.use("/api/v1", routes.path());
        this.app.listen(`${process.env.PORT}`, () => {
            this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
            // url: http://localhost:3000/api/v1/user/{route path}
        });
    }
}
exports.App = App;
//# sourceMappingURL=server.js.map