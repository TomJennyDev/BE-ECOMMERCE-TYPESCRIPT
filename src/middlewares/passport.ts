import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import FacebookStrategy from "passport-facebook-token";
import GoogleStrategy from "passport-google-oauth-token";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions
} from "passport-jwt";
import config from "../config/config";
import { AppError } from "./../helpers/utils";

const jwtOptions: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    done(null, payload);
  } catch (error) {
    done(error, false);
  }
});

const facebookLogin = new FacebookStrategy(
  config.passport.facebook,
  async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (arg0: null, arg1: boolean) => void
  ) => {
    try {
      return done(null, profile);
    } catch (error) {
      done(error, false);
    }
  }
);

const googleLogin = new GoogleStrategy(config.passport.google, async function (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: (arg0: null, arg1: boolean) => void
) {
  try {
    return done(null, profile);
  } catch (error) {
    done(error, false);
  }
});

passport.use("jwt", jwtStrategy);
passport.use(facebookLogin);
passport.use(googleLogin);

const passportMiddleware = {
  loginRequired(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "jwt",
      {
        session: false,
      },
      function (err, user, info) {
        try {
          if (err || info) {
            throw new AppError(
              StatusCodes.UNAUTHORIZED,
              "Invalid access token",
              "Get access token"
            );
          }
          req.user = user;
          return next();
        } catch (error) {
          next(error);
        }
      }
    )(req, res, next);
  },
  loginFacebook: passport.authenticate("facebook-token", {
    session: false,
  }),
  loginGoogle: passport.authenticate("google-oauth-token", {
    session: false,
  }),
};

export default passportMiddleware;
