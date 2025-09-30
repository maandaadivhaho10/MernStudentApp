import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page stays public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Home page is now protected */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Logout page is protected */}
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <LogoutPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
