import { FC } from 'react';
import { NavLink } from 'react-router';

export const Header: FC = () => {
  return (
    <div className="w-full max-w-[1240px] mx-auto p-6 flex items-center gap-6 border rounded-sm border-gray-300">
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
  );
};
