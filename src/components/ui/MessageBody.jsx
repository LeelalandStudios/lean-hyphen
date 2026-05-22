export default function MessageBody({ text, className = "" }) {
  return (
    <pre className={`whitespace-pre-wrap font-sans text-sm ${className}`}>
      {text}
    </pre>
  );
}
