import { StatusCodes } from "http-status-codes";
import config from "../config/config";
import transporter from "../config/loadTransportEmail";
import resetPasswordEmailtemplate from "../helpers/emailTemplate/resetPassword";
import { AppError, generateRandomHexString } from "../helpers/utils";
import userService from "./user.service";

const emailService = {
  sendResetPasswordEmail: async function ({ email }) {
    const filter = { email };

    const options = ["+password"];
    const user = await userService.getUserByFilter(filter, options);

    if (!user) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Email is not found",
        "Reset Password"
      );
    }

    if (user.isResetPassword) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Your request was sent to your Email!",
        "Reset Password"
      );
    }
    const newPassword = generateRandomHexString(8);
    user.password = newPassword;
    user.isResetPassword = true;

    await user.save();

    const html = resetPasswordEmailtemplate(newPassword);

    await transporter.sendMail({
      from: config.email.from,
      to: config.email.to,
      subject: "Reset password from Coder eCommerce",
      html,
    });
  },

  sendAcceptOrderEmail: async function (email: string, token: string) {
    const isExist = await User.checkEmailTaken(email);
    if (!isExist) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Email is not found",
        "Reset Password"
      );
    }
    await sendEmail({
      subject: "Reset Password Account",
      text: "",
      html,
    });
  },
};
export default emailService;
