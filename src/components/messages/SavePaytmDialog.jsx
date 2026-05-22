export default function SavePaytmDialog() {
  return (
    <div className="mx-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
      <div className="mb-3 font-semibold">Save paytm</div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-full bg-red-100 px-3 py-2 text-sm text-red-700"
        >
          Report spam
        </button>
        <button
          type="button"
          className="rounded-full bg-slate-100 px-3 py-2 text-sm"
        >
          Add contact
        </button>
        <button
          type="button"
          className="rounded-full bg-slate-100 px-3 py-2 text-sm"
        >
          ×
        </button>
      </div>
    </div>
  );
}
