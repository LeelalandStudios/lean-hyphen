import {
  HOME_MLBB_NOTIFICATION,
  MLBB_LOBBY_DIAMONDS,
} from "../../../content/scenario5.js";
import StatusBar from "../../../components/phone/StatusBar.jsx";
import ScenarioChoiceFooter from "../../../components/messages/ScenarioChoiceFooter.jsx";

export default function MLBBLobbyScenario5Screen({ onBack, phone }) {
  const gate = phone?.state?.choiceGate ?? null;
  return (
    <div className="relative h-full overflow-y-auto bg-gradient-to-b from-indigo-800 via-violet-900 to-slate-950 p-5 pt-16 text-white">
      <StatusBar />
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-[54px] z-30 rounded-full bg-black/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/35"
        >
          ‹ Back
        </button>
      )}
      <div className="rounded-3xl border border-amber-400/50 bg-black/40 p-5">
        <h1 className="text-2xl font-bold tracking-wide">Mobile Legends</h1>
        <p className="mt-2 text-sm text-white/70">Lobby · Ranked ready</p>
        <p className="mt-4 text-3xl font-bold text-amber-300">{MLBB_LOBBY_DIAMONDS} 💎</p>
      </div>
      <div className="mt-4 rounded-2xl border border-red-500/60 bg-red-950/80 p-4">
        <p className="text-xs font-bold uppercase text-red-300">In-game mail</p>
        <p className="mt-2 text-sm font-semibold">{HOME_MLBB_NOTIFICATION}</p>
        <p className="mt-2 text-xs text-red-200/80">Tap to open admin message →</p>
      </div>

      {gate && (!gate.targetAppId || gate.targetAppId === "mlbb") && (
        <div className="absolute bottom-0 left-0 right-0">
          <ScenarioChoiceFooter
            title={gate.prompt}
            choices={gate.options}
            onChoose={(id) => phone.api.choose(id)}
          />
        </div>
      )}
    </div>
  );
}
