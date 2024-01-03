import { IsOptional, IsString } from "class-validator";
import { Trim } from "class-sanitizer";

export class UpdateNoteDto {
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  @Trim()
  title?: string;

  @IsOptional()
  @IsString()
  @Trim()
  content?: string;
}
