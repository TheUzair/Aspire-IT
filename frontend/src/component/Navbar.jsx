// src/component/Navbar.js
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();


  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-cyan-900 dark:bg-black sticky top-0 z-10">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 sticky">
        <div className="text-cyan-50 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AspireIt</div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <button type="button" onClick={handleSignOut} className="dark:bg-gray-700 dark:text-white bg-cyan-700 hover:bg-cyan-800 text-cyan-50 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Sign out
          </button>

          {/* Toggle theme button */}
          <button type="button" onClick={toggleTheme} className="bg-white dark:bg-gray-600 dark:text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
