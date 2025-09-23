# FullStack Student CRUD App

This repo contains a TypeScript Node.js + Express backend (MongoDB via Mongoose) and a React + TypeScript frontend.

## Tech

- Backend: Node, Express, TypeScript, Mongoose, CORS, dotenv
- Frontend: React, TypeScript, Vite, axios, react-router-dom, Tailwind CSS v4

## Data model (Student)

```
{
  _id: string,
  name: string,
  studentId: string,
  program: string,
  year: number,
  email: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Backend

Location: `BackEnd/`

### Prerequisites

- Node 18+
- MongoDB connection string (Atlas or local)

### Environment

Create `BackEnd/.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority&appName=<app>
```

### Install & run

```bash
# from repo root
cd BackEnd
npm install
npm run dev
# Server at http://localhost:5000
```

### REST API

Base URL: `http://localhost:5000/students`

- GET `/students` — list students
  - Optional query: `page`, `limit`, `q`, `program`, `year`, `sort`
- GET `/students/:id` — get by id
- POST `/students` — create
- PUT `/students/:id` — update
- DELETE `/students/:id` — delete

#### Example requests

```bash
# List
curl "http://localhost:5000/students?page=1&limit=10&q=jane&sort=-createdAt"

# Create
curl -X POST http://localhost:5000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Doe",
    "studentId":"S123",
    "program":"CS",
    "year":2,
    "email":"jane@example.com"
  }'

# Update
curl -X PUT http://localhost:5000/students/<id> \
  -H "Content-Type: application/json" \
  -d '{"program":"Software Engineering"}'

# Delete
curl -X DELETE http://localhost:5000/students/<id>
```

## Frontend

Location: `FrontEnd/my-app/`

### Install & run

```bash
# new terminal
cd FrontEnd/my-app
npm install
npm run dev
# App at http://localhost:5173
```

The frontend expects the backend at `http://localhost:5000`. Update `src/api/studentApi.ts` to change base URL if needed.

### Features

- Create, list, view detail, edit, delete students
- Client-side validation and nicer UI with Tailwind

## Notes

- Types are defined on both backend (Mongoose model) and frontend (`src/types.ts`).
- Meaningful status codes and simple validation are implemented (including ObjectId checks, Mongoose validators).
- Basic responsive layout and accessibility-friendly form labels.

## Repo workflow

- Make small, focused commits.
- Open a PR for the final submission summarizing changes.
