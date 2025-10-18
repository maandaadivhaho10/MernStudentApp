# MERN Student App Frontend

This project is the React + TypeScript frontend for the MERN Student App. It uses Vite for fast development, Tailwind CSS for styling, and communicates with the backend via REST APIs secured with JWT-based authentication.

## Features

- **Authentication Flow**: Login, logout, forgot password, and reset password screens.
- **Protected Routes**: Client-side guard via the `PrivateRoute` component that redirects unauthenticated users to `/login`.
- **Role-Based Views**: Conditional UI rendering based on role claims stored in the auth store.
- **API Integration**: Axios is used for all HTTP requests to the Express backend.

## Authorization Requirements

The backend exposes a set of protected endpoints that require a valid JWT. The following routes require authentication and, where noted, elevated privileges:

1. `GET /api/users/me` – returns the currently authenticated user profile.
2. `PUT /api/users/me` – updates profile information for the logged-in user.
3. `GET /api/students` – requires `admin` role to list all students.
4. `POST /api/students` – requires `admin` role to create a new student record.
5. `PUT /api/students/:id` – requires `admin` or `teacher` role to update student details.
6. `DELETE /api/students/:id` – restricted to `admin` role only.
7. `GET /api/reports` – requires `teacher` or `admin` role to view academic reports.

> **Note**: Roles are assigned during user creation by the backend. The frontend inspects the decoded token (via the auth store) to determine the UI a user should see. Unauthorized requests will receive `401` or `403` responses from the server.

## Project Structure

```text
FrontEnd/my-app/
├── public/
├── src/
│   ├── Pages/
│   │   ├── Home.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   └── ResetPasswordPage.tsx
│   ├── components/
│   │   └── PrivateRoute.tsx
│   ├── store/
│   │   └── authStore.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **Environment variables**
   Create a `.env` file with the following keys:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

## Authentication & Role Handling

- **Token Storage**: The JWT access token is stored in the auth store (Zustand). On login, the token is persisted and decoded to extract role claims.
- **Route Protection**: `PrivateRoute` ensures only authenticated users reach protected routes. It checks for a stored token and redirects unauthorized users to `/login`.
- **Role-Based Rendering**: Components query the auth store for `roles` to display admin- or teacher-specific UI features.
- **Error Handling**: Axios interceptors (configured in `src/api/axiosClient.ts`) attach the token to every request and surface backend error messages.

## Testing Protected Endpoints

You can test the endpoints using curl or Postman. Example curl request for fetching the current user profile:

```bash
curl -H "Authorization: Bearer <JWT_TOKEN>" \
     http://localhost:5000/api/users/me
```

When accessing admin-only endpoints, ensure the token belongs to a user with the `admin` role.

## Additional Resources

- **Backend Repository**: Refer to the backend README for detailed information about authentication middleware, MongoDB models, and role assignment.
- **Vite Documentation**: [https://vitejs.dev/](https://vitejs.dev/)
- **React Router Docs**: [https://reactrouter.com/](https://reactrouter.com/)
