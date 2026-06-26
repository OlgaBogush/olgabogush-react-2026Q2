'use client';

export default function NotFoundPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col w-full max-w-[1240px] mx-auto p-6 items-center gap-6 border rounded-sm border-gray-300">
      <h2 className="text-xl">404</h2>
      <h3 className="text-xl">Page Not Found</h3>
      <p className="text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        className="min-w-40 h-8 text-base border rounded-sm border-gray-300 cursor-pointer"
        onClick={handleGoHome}
      >
        Go to the main page
      </button>
    </div>
  );
}
