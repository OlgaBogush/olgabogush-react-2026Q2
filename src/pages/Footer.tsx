import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <div className="w-full max-w-[1240px] mx-auto p-6 flex justify-between items-center gap-6 border rounded-sm border-gray-300">
      <h1>The Rick and Morty</h1>
      <p>
        Developed by{' '}
        <a
          href="https://github.com/OlgaBogush"
          className="text-gray-700 italic"
        >
          OlgaBogush
        </a>
      </p>
      <a
        href="https://rs.school/courses/reactjs"
        className="text-gray-700 italic"
      >
        RS School
      </a>
    </div>
  );
};
