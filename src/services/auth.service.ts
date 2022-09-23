import { StatusCodes } from "http-status-codes";
import { AppError, generateRandomHexString } from "../helpers/utils";

const authService = {
  loginUserWithEmailPassword: async function (email: string, password: string) {
    const filter = { email };
    const options = ["+password", "+role"];
    const user = await userService.getUserByFilter(filter, options);

    if (user && !(await user.isPasswordMatch(password))) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Incorrect email or password",
        "Authentication error"
      );
    }

    if (user.isDeleted) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "please contact to Admin",
        "Authentication error"
      );
    }

    if (!user) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Email is not exist, please register",
        "Authentication error"
      );
    }

    const token = await user.generateToken();

    return { user, accessToken: token };
  },

  loginUserWithSocial: async function (socialUser) {
    const { id, displayName, emails, photos, provider } = socialUser;

    const filter = { email: emails[0].value };

    const socialCriteria = { facebook: "facebookId", google: "googleId" };

    const socialId = socialCriteria[provider];

    let user = await userService.getUserByFilter(filter);

    if (!user) {
      const newUser = {
        name: displayName,
        [socialId]: id,
        email: emails[0].value,
        isEmailVerified: true,
        password: generateRandomHexString(8),
        avatarUrl: photos[0].value,
      };

      user = await userService.createUser(newUser);
    }

    const token = await user.generateToken();

    return { user, accessToken: token };
  },
};

export default authService;
