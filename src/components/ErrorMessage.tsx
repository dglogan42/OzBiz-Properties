export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="empty-state">
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn-outline" style={{ marginTop: 16 }} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}