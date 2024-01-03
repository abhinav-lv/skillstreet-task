import { IsString } from "class-validator";
import { Trim } from "class-sanitizer";

export class CreateNoteDto {
  @IsString()
  @Trim()
  title!: string;

  @IsString()
  @Trim()
  content!: string;
}
