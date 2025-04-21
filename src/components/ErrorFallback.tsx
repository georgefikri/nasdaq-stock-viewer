export const ErrorFallback = ({ message }: { message: string }) => {
  return (
    <div className="text-center text-red-500 mt-6">
      <p className="text-lg font-semibold">🚫 Oops! Something went wrong.</p>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
};
