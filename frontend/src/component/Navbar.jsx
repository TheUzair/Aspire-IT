import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext'; // Import DarkModeContext

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext); // Use context

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav
      className={`bg-cyan-900 dark:bg-gray-800 text-white dark:text-gray-100`} // Dynamic background color
    >
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">AspireIt</span>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <button
            type="button"
            onClick={handleSignOut}
            className="text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-cyan-800"
          >
            Sign out
          </button>

          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)} // Toggle dark mode using context
            style={{
              backgroundColor: isDarkMode ? '#000000' : '#F8F9FA',
              color: isDarkMode ? '#F8F9FA' : '#000000',
              border: isDarkMode ? '1px solid #F8F9FA' : '1px solid #000000',
            }}
            className="hover:bg-gray-700 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
