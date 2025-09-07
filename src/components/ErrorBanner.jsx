export default function ErrorBanner({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-800 flex items-start justify-between gap-4">
      <div className="font-medium">Something went wrong</div>
      <div className="text-red-700">{message}</div>
      <button
        className="ml-auto rounded border border-red-300 px-2 py-0.5 text-sm hover:bg-red-100"
        onClick={onClose}
        aria-label="Dismiss"
      >
        Dismiss
      </button>
    </div>
  );
}
