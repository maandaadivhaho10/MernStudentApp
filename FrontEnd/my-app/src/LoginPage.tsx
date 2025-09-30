import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate("/");
    } catch {
      setModalMessage(isLogin ? "Login failed. Please check your credentials." : "Registration failed. Please try again.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            />
          )}
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 cursor-pointer mb-4">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full p-2 text-blue-600 bg-transparent hover:text-blue-800 cursor-pointer text-sm"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-80 text-center">
            <h3 className="text-xl font-bold text-red-600 mb-4">Error</h3>
            <p className="mb-6 text-gray-700">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default LoginPage;
