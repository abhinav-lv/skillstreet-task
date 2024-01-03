import "reflect-metadata";
import express from "express";
import logger from "./lib/logger";
import { Environment } from "./lib/types";
import { RequestContext } from "@mikro-orm/core";
import { EntityManager, MikroORM } from "@mikro-orm/mongodb";
import { noteRouter } from "./routes";

export const db = {} as {
  orm: MikroORM;
  em: EntityManager;
};

async function main() {
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
  app.get("/", (_, res) => res.json("Hello"));

  app.use("/note", noteRouter);

  // 404
  app.use((_, res) =>
    res.status(404).json({ message: "Requested resource was not found" })
  );

  /* Start server */
  const PORT = 8080;
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

main();
