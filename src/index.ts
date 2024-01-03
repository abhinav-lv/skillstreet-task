import "reflect-metadata";
import { config as configureEnv } from "dotenv";
import express from "express";
import logger from "./lib/logger";
import { Environment } from "./lib/types";
import { RequestContext } from "@mikro-orm/core";
import { EntityManager, MikroORM } from "@mikro-orm/mongodb";
import { noteRouter } from "./routes";

configureEnv();

export const db = {} as {
  orm: MikroORM;
  em: EntityManager;
};

async function init() {
  const app = express();
  const env: Environment = app.get("env");
  if (!env) throw new Error(`NODE_ENV is not set`);

  /* MongoDB ORM */
  db.orm = await MikroORM.init();
  db.em = db.orm.em;

  /* Middleware */
  app.use(logger());
  app.use(express.json());
  app.use((_, __, next) => RequestContext.create(db.em, next));

  // Root route
  app.get("/", (_, res) =>
    res.status(200).json({ statusCode: 200, message: "Hello" })
  );

  // Note route
  app.use("/note", noteRouter);

  // 404
  app.use((_, res) =>
    res
      .status(404)
      .json({ statusCode: 404, message: "Requested resource was not found" })
  );

  /* Start server */
  const PORT = 8080;
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

init();
