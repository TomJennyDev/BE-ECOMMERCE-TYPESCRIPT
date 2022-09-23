import "express-serve-static-core";
import { IUser } from "./src/models/User";

declare module "express-serve-static-core" {
  interface Request {
    user: IUser;
  }
}

declare module "xss-clean" {
  const value: Function;

  export default value;
}
