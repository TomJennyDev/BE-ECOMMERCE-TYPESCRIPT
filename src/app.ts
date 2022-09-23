import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";
import logger from "morgan";
import passport from "passport";
import path from "path";
import xss from "xss-clean";
import { sendResponse } from "./helpers/utils";
import indexRouter from "./routes/index";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Data sanitization against XSS
app.use(xss());

// connect to database
require("./config/connectDB");

app.use("/v1", indexRouter);

// jwt authentication
app.use(passport.initialize());

// catch 404 and forard to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: any = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

/* Initialize Error Handling */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error", err);

  // handle error for passport login authentication
  if (err.oauthError) {
    const { statusCode, data } = err.oauthError;
    err.statusCode = statusCode;
    err.message = "Invalid access token";
    err.errorType = "Get access token";
    return sendResponse(
      res,
      err.statusCode,
      false,
      null,
      { message: err.message },
      err.errorType
    );
  }

  if (err.isOperational) {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      { message: err.message },
      err.errorType
    );
  } else {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      { message: err.message },
      "Internal Server Error"
    );
  }
});

export default app;
