import { useState } from "react";
import WhatsAppShell from "../../whatsapp/WhatsAppShell.jsx";
import { triggerAct2Choice } from "../../../content/act2ChoiceTrigger.js";

/** WhatsApp message from unknown number claiming to be Kabir. */
export default function FakeFriendWhatsAppScreen({ phone, onBack }) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <WhatsAppShell
      title="+91 90000 11234"
      subtitle="Not saved"
      onBack={onBack}
      footer={
        phone ? (
          <div className="relative">
            {showSuggestions && (
              <div className="absolute bottom-16 left-2 right-2 z-20 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Quick Reply Drafts</p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInputValue("Here is your OTP: 847291");
                      setShowSuggestions(false);
                    }}
                    className="w-full rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2.5 text-xs font-semibold text-slate-700 text-left active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    📩 Send OTP (847291)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputValue("Prove it's really you");
                      setShowSuggestions(false);
                    }}
                    className="w-full rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2.5 text-xs font-semibold text-slate-700 text-left active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    🤨 Ask for Proof
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2 bg-[#f0f2f5] px-2 py-2 border-t border-[#d1d7db] shrink-0">
              <div
                onClick={() => setShowSuggestions((s) => !s)}
                className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm cursor-pointer"
              >
                <span className="text-xl text-slate-400 select-none">😊</span>
                <input
                  type="text"
                  placeholder="Message"
                  readOnly
                  value={inputValue}
                  className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 cursor-pointer pointer-events-none"
                />
                <span className="text-xl text-slate-400 rotate-45 select-none">📎</span>
                <span className="text-xl text-slate-400 select-none">📷</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (inputValue === "Here is your OTP: 847291") {
                    triggerAct2Choice(phone, "send");
                  } else if (inputValue === "Prove it's really you") {
                    triggerAct2Choice(phone, "proof");
                  }
                }}
                disabled={!inputValue}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition-transform active:scale-95 shrink-0 cursor-pointer ${
                  inputValue ? "bg-[#00a884] hover:bg-[#008f72]" : "bg-slate-400 cursor-not-allowed"
                }`}
              >
                {inputValue ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                ) : (
                  <span className="text-lg select-none">🎙️</span>
                )}
              </button>
            </div>
          </div>
        ) : null
      }
    >
      <div className="border-b border-amber-200 bg-amber-50 px-3 py-2 text-center text-[10px] font-semibold text-amber-900 select-none">
        Unknown number — not in your contacts
      </div>
      <div className="p-3">
        <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
          <p className="text-[13px] leading-relaxed text-[#111b21]">
            hey it&apos;s kabir!! borrowing my neighbour&apos;s phone mine died. i was
            logging into garena on my laptop and the otp came to your number somehow??
            idk why. send it quick i&apos;m in a ranked match with my team please bro we
            need you 🙏🙏
          </p>
          <p className="mt-1 text-right text-[10px] text-[#667781]">3:52 PM</p>
        </div>
      </div>
    </WhatsAppShell>
  );
}
