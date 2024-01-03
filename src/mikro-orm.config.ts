import { Options } from "@mikro-orm/core";
import { Note, BaseEntity } from "./entities";

const options: Options = {
  type: "mongo",
  entities: ["./dist/entities"],
  entitiesTs: ["./src/entities"],
  dbName: "skillstreet",
  debug: true,
  clientUrl: process.env.MONGODB_URI,
};

export default options;
