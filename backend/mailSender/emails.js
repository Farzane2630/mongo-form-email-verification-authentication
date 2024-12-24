const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplate");
const { transporter } = require("./mailtrap.config");

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Verification token",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully ;) ");
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Forgot password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) throw Error(error);
      console.log("Email sent successfully ;) ");
    });
  } catch (error) {
    console.error("Error sending reset link:", error);
  }
};

const sendSuccessfullyResetPasword = async (email) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Password reset successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) throw Error(error);
      console.log("Email sent successfully ;) ");
    });
  } catch (error) {
    console.error("Error sending reset link:", error);
  }
};
module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendSuccessfullyResetPasword,
};
