import StatusBar from "../../phone/StatusBar.jsx";
import { triggerAct2Choice } from "../../../content/act2ChoiceTrigger.js";

/** Instagram DM sextortion threat (non-graphic). */
export default function InstagramThreatScreen({ phone }) {
  return (
    <div className="relative flex h-full flex-col bg-black pt-12 text-white overflow-hidden">
      <StatusBar />
      <header className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4 pb-3">
        <span className="text-lg opacity-70">‹</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-xs font-bold">
          ?
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">user_2847361</p>
          <p className="text-[10px] text-white/50">Unknown account</p>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-end p-4 pb-16">
        <p className="mb-3 text-center text-[10px] text-white/40">Evening</p>
        <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-[#262626] px-4 py-3 text-[13px] leading-relaxed text-white/90">
          <p>
            we have something of yours. photos and a video. we used AI to make them
            look very bad. if you don&apos;t send ₹2,000 to this UPI in 2 hours we send
            it to your school principal and all your classmates. don&apos;t tell anyone
            or it gets worse.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => phone && triggerAct2Choice(phone, "reply")}
        className="shrink-0 border-t border-white/10 px-4 py-3 text-left text-sm text-white/50"
      >
        Message...
      </button>
    </div>
  );
}
