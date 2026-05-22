export default function ScamAlert({ text }) {
  return (
    <div className="mx-4 mt-5 rounded-2xl bg-red-600 p-4 text-center text-xl font-black text-white shadow-xl">
      {text}
    </div>
  );
}
