export class BadPostRequestRO {
  status: number;
  message: string;
  errors: { [key: string]: string[] }[];

  constructor({ errors }: { errors: { [key: string]: string[] }[] }) {
    this.status = 400;
    this.message = "Invalid data received";
    this.errors = errors;
  }
}
