import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Declare navigate for redirection

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:5000/api/register'; // Registration URL

      const response = await axios.post(url, formData);
      setMessage(response.data.msg);
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      setMessage(error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold mb-6">Register</h2>
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
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default Register;
