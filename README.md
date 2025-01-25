# mean-stack-Form-email

 ## 🚀 In this project I implement a register/login form which has bellow features:

🔐 Signup Endpoint

📧 Sending Verify Account Email

🔍 Verify Email Endpoint

📄 Building a Welcome Email Template

🚪 Logout Endpoint

🔑 Login Endpoint

🔄 Forgot Password Endpoint

🔁 Reset Password Endpoint

✔️ Check Auth Endpoint

🌐 Frontend Setup

📋 Signup Page UI

🔓 Login Page UI

✅ Email Verification Page UI

📤 Implementing Signup

📧 Implementing Email Verification

🔒 Protecting Our Routes

🔑 Implementing Login

🏠 Dashboard Page

🔄 Implementing Forgot Password

🚀 Super Detailed Deployment

Setup /backend/.env file

```
MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development

JWT_SECRET=xxx


NODEMAILER_EMAIL=your email address
NODEMAILER_PASSWORD=your email password


CLIENT_URL=your client/frontend url 
```

Setup /frontend/src/environment/environment.js

```
export const environment = {
  production: false,
  API_AUTH_URL: "http://localhost:5000/api/auth", // Your AUTH API base URL for development
  API_URL: "http://localhost:5000/api", // Your API base URL for development
  IMAGE_BASE_URL: "http://localhost:5000", // Your IMAGE API  base URL for development
};
```
