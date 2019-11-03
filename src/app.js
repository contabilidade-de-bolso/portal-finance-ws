import "dotenv/config";

import express from "express";
import Youch from "youch";

import routes from "./router";

import "./database";

class App {
  server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.exceptionHandler();
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV == "development") {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json("Internal Server Error");
    });
  }
}

export default new App().server;
