This repo contains a TypeScript Node.js + Express backend (MongoDB via Mongoose) and a React + TypeScript frontend.

🧠 Tech Stack

Backend: Node.js, Express, TypeScript, Mongoose, JWT, bcrypt, Nodemailer, Role-Based Access Control (RBAC), CORS, dotenv

Frontend: React, TypeScript, Vite, axios, react-router-dom, Tailwind CSS v4

📘 Data Models
Student
{
"\_id": "string",
"name": "string",
"studentId": "string",
"program": "string",
"year": "number",
"email": "string",
"createdAt": "Date",
"updatedAt": "Date"
}

User (for Authentication & Roles)
{
"\_id": "string",
"name": "string",
"email": "string",
"password": "string (hashed)",
"role": "string (e.g., admin | staff | viewer)",
"createdAt": "Date"
}

⚙️ Backend

Location: BackEnd/

Prerequisites

Node 18+

MongoDB connection string (local or Atlas)

Environment Variables

Create .env in BackEnd/:

PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority&appName=<app>

# JWT

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

# Email (Nodemailer)

EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

Install & Run
cd BackEnd
npm install
npm run dev

# Server runs at http://localhost:5000

🔐 Authentication & Role-Based Access
Base URL

http://localhost:5000/auth

Method Endpoint Description Access
POST /auth/register Register a new user and send welcome email Public
POST /auth/login Login user and return JWT Public
GET /auth/me Get logged-in user info Protected
POST /auth/forgot-password Send password reset email Public
POST /auth/reset-password/:token Reset password using email token Public
Example Requests
Register User
curl -X POST http://localhost:5000/auth/register \
 -H "Content-Type: application/json" \
 -d '{
"name": "Admin User",
"email": "admin@example.com",
"password": "123456",
"role": "admin"
}'

📩 On successful registration, an email is sent to the user’s inbox via Nodemailer confirming the account creation.

Login
curl -X POST http://localhost:5000/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"admin@example.com","password":"123456"}'

Response:

{
"token": "<JWT_TOKEN>",
"user": {
"\_id": "string",
"name": "Admin User",
"email": "admin@example.com",
"role": "admin"
}
}

🎓 Student Routes

Base URL: http://localhost:5000/students

Method Endpoint Description Role Access
GET /students List all students admin, staff
GET /students/:id Get single student admin, staff
POST /students Create new student admin only
PUT /students/:id Update student admin, staff
DELETE /students/:id Delete student admin only
Example:
curl -H "Authorization: Bearer <JWT_TOKEN>" \
"http://localhost:5000/students"

🧩 Middleware
authMiddleware

Validates JWT from the Authorization header.

Adds decoded user info to req.user.

authorizeRoles

Restricts access to certain endpoints based on user role.

Example:

router.post("/students", authMiddleware, authorizeRoles("admin"), createStudent);

📧 Email Notifications (Nodemailer)

Nodemailer is used to send automated emails such as:

✅ Welcome email after registration

🔑 Password reset email with secure token

⚠️ Admin alerts when a new user registers (optional)

Example setup (utils/sendEmail.ts):

import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
const transporter = nodemailer.createTransport({
service: process.env.EMAIL_SERVICE,
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
});

await transporter.sendMail({
from: `"Student Management" <${process.env.EMAIL_USER}>`,
to,
subject,
html,
});
};

🎨 Frontend

Location: FrontEnd/my-app/

Install & Run
cd FrontEnd/my-app
npm install
npm run dev

# App runs at http://localhost:5173

Frontend Features

Login and logout with JWT

Protected routes using React Router

Role-based UI (admins can delete, staff cannot)

CRUD operations with search and filters

Email input validation and error handling

Responsive Tailwind UI

🧠 Notes

Passwords hashed using bcrypt

Tokens handled using jsonwebtoken

Emails handled using Nodemailer

Role-based control enforced both in backend routes and frontend UI

Mongoose schema validation with proper HTTP status codes
