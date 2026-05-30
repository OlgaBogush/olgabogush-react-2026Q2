import { FC, useContext } from 'react';
import { NavLink } from 'react-router';

import { ThemeContext } from '../context/ThemeContext';

export const Header: FC = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return null;
  }
  const { isDarkTheme, toggleTheme } = context;

  return (
    <div
      className={`w-full max-w-[1240px] mx-auto p-6 flex items-center justify-between gap-6 border rounded-sm border-gray-300`}
    >
      <div className="flex items-center gap-6">
        <h1>The Rick and Morty</h1>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                `flex items-center justify-center min-w-20 h-8 text-base border rounded-sm border-gray-300 ${isActive ? 'bg-gray-300' : ''}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/about'}
              className={({ isActive }) =>
                `flex items-center justify-center min-w-20 h-8 text-base border rounded-sm border-gray-300 ${isActive ? 'bg-gray-300' : ''}`
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <button
        className="min-w-20 h-8 text-base cursor-pointer border rounded-sm border-gray-300"
        onClick={toggleTheme}
      >
        {isDarkTheme ? 'Light' : 'Dark'}
      </button>
    </div>
  );
};
