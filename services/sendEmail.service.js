const nodemailer = require("nodemailer");
const config = require("config");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: config.get("email_service"),
      auth: {
        user: config.get("email_user"),
        pass: config.get("email_pass"),
      },
    });

    await transporter.sendMail({
      from: `"Avia Rent" <${config.get("email_user")}>`,
      to,
      subject,
      html ,
    });

    console.log("Email muvaffaqiyatli yuborildi");
  } catch (err) {
    console.error("Email yuborishda xatolik:", err.message);
    throw err;
  }
};

module.exports = sendEmail;
