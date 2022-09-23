import { NextFunction, Request, Response } from "express";
import {
  checkSchema,
  Location,
  matchedData,
  Schema,
  validationResult,
} from "express-validator";
import { sendResponse } from "../helpers/utils";

const validators = {
  validate:
    (schema: Schema, locations: Location[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const validationArray = checkSchema(schema, locations);

      await Promise.all(
        validationArray.map((validation) => validation.run(req))
      );

      const errors = validationResult(req);

      if (errors.isEmpty()) {
        locations.forEach((location) => {
          req[location] = matchedData(req, {
            includeOptionals: true,
            locations: [location],
          });
        });
        return next();
      }

      const message = errors
        .array()
        .map((error) => {
          if (error.msg.trim().toLowerCase() === "invalid value") {
            return error.msg.trim().replace(" ", ` ${error.param} `);
          }
          return error.msg;
        })
        .join(" & ");

      return sendResponse(
        res,
        422,
        false,
        null,
        { message },
        "Validation Error"
      );
    },
};

export default validators;
