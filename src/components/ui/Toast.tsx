import { useEffect } from 'react';

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-md z-50 animate-fade-in">
      {message}
    </div>
  );
};
