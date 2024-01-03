import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { sanitize } from "class-sanitizer";
import { BadPostRequestRO } from "../../ro/BadPostRequestRO";
import { NextFunction, Request, Response } from "express";

export default function dtoValidation(dto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dto, req.body);
    const errors = await validate(dtoObj);
    if (errors.length > 0) {
      res.status(400).json(
        new BadPostRequestRO({
          errors: errors.map((e) => ({
            [e.property]: e.constraints ? Object.values(e.constraints) : [],
          })),
        })
      );
    } else {
      //sanitize the object and call the next middleware
      sanitize(dtoObj);
      req.body = dtoObj;
      next();
    }
  };
}
