import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? 'http://localhost:5000/api/login'
        : 'http://localhost:5000/api/register';

      const response = await axios.post(url, formData);
      if (isLogin) {
        localStorage.setItem('token', response.data.access_token); // Save token to local storage
        setMessage('Login successful');
        navigate('/dashboard'); // Redirect to Dashboard
      } else {
        setMessage(response.data.msg); // Show message for registration
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold mb-6">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="w-1/3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className="mb-4 p-2 w-full border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="mb-4 p-2 w-full border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 mt-4"
      >
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
}

export default Login;
