import nodemailer from "nodemailer";
import config from "./config";

const transporter = nodemailer.createTransport(config.email.smtp);
transporter
  .verify()
  .then(() => console.log("Connected to email server"))
  .catch(() =>
    console.log(
      "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
    )
  );

export default transporter;
