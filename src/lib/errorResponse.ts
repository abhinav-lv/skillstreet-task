import { Response } from "express";

export default function errorResponse({
  statusCode,
  message,
  res,
}: {
  statusCode: number;
  message: string;
  res: Response;
}) {
  res.status(statusCode).json({ statusCode, message });
}
