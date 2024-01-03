import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Note extends BaseEntity {
  @Property()
  title: string;

  @Property()
  content: string;

  constructor({ title, content }: { title: string; content: string }) {
    super();
    this.title = title;
    this.content = content;
  }
}
