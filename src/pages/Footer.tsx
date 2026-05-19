import { FC } from 'react';
import { Link } from 'react-router';

const Footer: FC = () => {
  return (
    <div className="w-full max-w-[1240px] mx-auto p-6  flex justify-between items-center gap-6 border rounded-sm border-gray-300">
      <h1>The Rick and Morty</h1>
      <p>
        Developed by{' '}
        <Link
          to={'https://github.com/OlgaBogush'}
          className="text-gray-700 italic"
        >
          OlgaBogush
        </Link>
      </p>
      <Link
        to={'https://rs.school/courses/reactjs'}
        className="text-gray-700 italic"
      >
        RS School
      </Link>
    </div>
  );
};

export default Footer;
