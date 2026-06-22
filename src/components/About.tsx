import { FC } from 'react';

export const About: FC = () => {
  return (
    <div className="w-full max-w-[1240px] mx-auto p-6  items-center gap-6 border rounded-sm border-gray-300">
      <div>
        <span className="font-bold">Author: </span>
        <a
          href="https://github.com/OlgaBogush"
          className="text-gray-700 italic"
        >
          OlgaBogush
        </a>
      </div>
      <div>
        <span className="font-bold">React course: </span>
        <a
          href="https://rs.school/courses/reactjs"
          className="text-gray-700 italic"
        >
          RS School React course
        </a>
      </div>
    </div>
  );
};
