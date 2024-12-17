const { MailtrapClient } = require("mailtrap");

const emailClient = new MailtrapClient({
  token: process.env.MAIL_TRAP_TOKEN,
  endpoint: process.env.MAIL_TRAP_ENDPOINT,
  testInboxId: 3339171,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "FARZANE",
};

module.exports = { emailClient, sender };