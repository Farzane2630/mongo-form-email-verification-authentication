const { MailtrapClient } = require("mailtrap");

const emailClient = new MailtrapClient({
  token: process.env.MAIL_TRAP_TOKEN,
  endpoint: process.env.MAIL_TRAP_ENDPOINT,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "FARZANE",
};

module.exports = { emailClient, sender };