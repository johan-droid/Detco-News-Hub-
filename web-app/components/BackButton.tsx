'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

interface BackButtonProps {
  className?: string;
  text?: string;
}

export default function BackButton({ className = '', text = 'Back' }: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label="Go back"
    >
      <FaArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}
