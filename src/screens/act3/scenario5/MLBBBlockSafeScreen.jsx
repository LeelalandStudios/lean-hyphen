import { PATH_BLOCK_SAFE } from "../../../content/scenario5.js";
import MLBBShell from "../../../components/mlbb/MLBBShell.jsx";

export default function MLBBBlockSafeScreen() {
  return (
    <MLBBShell title="Report submitted">
      <div className="p-6">
        <p className="rounded-2xl bg-emerald-500/20 px-4 py-3 text-center text-sm text-emerald-100">
          Account blocked. Message archived.
        </p>
        <div className="mt-6 rounded-2xl border border-white/20 bg-white/5 p-4">
          <p className="text-xs font-bold uppercase text-white/50">Official notice</p>
          <p className="mt-3 text-sm leading-relaxed">{PATH_BLOCK_SAFE}</p>
        </div>
      </div>
    </MLBBShell>
  );
}
