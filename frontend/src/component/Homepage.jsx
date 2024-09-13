import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate(); // React Router hook for navigation
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin
                ? 'http://localhost:5000/api/login'
                : 'http://localhost:5000/api/register';

            const response = await axios.post(url, formData);
            if (isLogin) {
                localStorage.setItem('token', response.data.access_token); // Save token
                setMessage('Login successful');
                navigate('/dashboard'); // Redirect to Dashboard
            } else {
                setMessage(response.data.msg);
            }
        } catch (error) {
            setMessage(error.response?.data?.msg || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-center text-2xl font-bold mb-4">
                    {isLogin ? 'Login' : 'Register'} to get full access
                </h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="block w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full p-2 mb-4 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <p className="text-center mt-4">{message}</p>
                <p
                    className="text-center mt-2 cursor-pointer text-blue-600"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Need to Register?' : 'Already have an account? Login'}
                </p>
            </form>
        </div>
    );
};

export default Homepage;
