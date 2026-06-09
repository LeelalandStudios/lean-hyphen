import { useEffect, useState } from "react";
import {
  HOME_MLBB_NOTIFICATION,
  MLBB_LOBBY_DIAMONDS,
} from "../../../content/scenario5.js";
import StatusBar from "../../../components/phone/StatusBar.jsx";
import { triggerAct2Choice } from "../../../content/act2ChoiceTrigger.js";

function GameHeader({ onBack, title, headerAction }) {
  return (
    <header className="flex items-center justify-between bg-black/80 px-3 py-2 border-b border-amber-500/20 shrink-0 text-white select-none">
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-full bg-slate-800 p-1 text-sm font-semibold text-white active:scale-90"
            aria-label="Back"
          >
            ‹
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full border-2 border-amber-400 bg-slate-700 flex items-center justify-center font-bold text-xs">
            👤
          </div>
          <div>
            <p className="text-xs font-bold leading-none text-slate-200">{title || "Rohan_Pro"}</p>
            <p className="mt-0.5 text-[8px] font-bold text-amber-400">
              {title ? "online" : "Lv.72 · Diamond III"}
            </p>
          </div>
        </div>
      </div>
      
      {headerAction ? (
        headerAction
      ) : (
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <div className="flex items-center gap-1 rounded bg-slate-900 px-2 py-0.5 border border-slate-800">
            <span className="text-yellow-500">🪙</span>
            <span className="font-bold text-slate-300">24,500</span>
          </div>
          <div className="flex items-center gap-1 rounded bg-slate-900 px-2 py-0.5 border border-slate-800">
            <span className="text-cyan-400">💎</span>
            <span className="font-bold text-cyan-200">{MLBB_LOBBY_DIAMONDS}</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default function MLBBLobbyScenario5Screen({ onBack, phone, onScamReached }) {
  const activeScenario = phone?.state?.vars?.act2_active_scenario;
  const [activeMailTab, setActiveMailTab] = useState(null); // Open to lobby/home page by default

  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (activeScenario === "game-threat") {
      phone?.api?.signal("mlbb.admin_dm.opened", "game-threat");
      onScamReached?.();
    }
  }, [phone?.api, activeScenario, onScamReached]);

  const hasUnread = activeScenario === "game-threat";

  // Tab: Lobby / Home page
  if (!activeMailTab) {
    return (
      <div className="relative flex h-full flex-col bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#030712] pt-12 text-white font-sans overflow-hidden">
        <StatusBar dark={false} />
        <GameHeader onBack={onBack} />
        
        <div className="flex-1 flex flex-col justify-between p-4 relative">
          {/* Game Title Silhouette */}
          <div className="text-center mt-6 select-none">
            <h1 className="text-xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 drop-shadow-md">
              Battlegrounds
            </h1>
            <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase leading-none">
              Season 24 Multiplayer Lobby
            </p>
          </div>

          {/* Center visual: character hologram look */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="text-[120px]">🛡️</div>
          </div>

          <div className="flex justify-end gap-3 mt-auto relative z-10">
            {/* Play game card */}
            <div className="flex-1 rounded-xl border border-amber-500/20 bg-black/60 p-3 flex flex-col justify-between select-none">
              <div>
                <p className="text-[9px] font-bold text-amber-500 uppercase">Current Mode</p>
                <h3 className="text-xs font-bold text-slate-100">Classic Battle Royale</h3>
                <p className="text-[8px] text-slate-400">Map: Erangel · Squad</p>
              </div>
              <button
                type="button"
                className="mt-3 w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 py-2.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg border border-amber-400/30 active:scale-95 transition-transform"
              >
                Start Match
              </button>
            </div>
          </div>

          {/* Bottom HUD menu */}
          <nav className="mt-4 flex items-center justify-around rounded-xl bg-black/75 border border-slate-800 p-2 shrink-0 text-slate-400 text-[9px] font-bold select-none">
            <button type="button" className="flex flex-col items-center gap-1 active:text-white">
              <span>🛒</span>
              <span>Shop</span>
            </button>
            <button type="button" className="flex flex-col items-center gap-1 active:text-white">
              <span>🎒</span>
              <span>Inventory</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMailTab("inbox")}
              className={`flex flex-col items-center gap-0.5 relative active:text-amber-300 cursor-pointer transition-all ${
                hasUnread
                  ? "animate-lobby-mail-alert bg-amber-500/20 border border-amber-500/50 px-3 py-1 rounded-xl text-amber-300"
                  : "text-slate-400 border border-transparent px-3 py-1"
              }`}
            >
              <span>✉️</span>
              <span className="text-[8px]">Mail</span>
              {hasUnread && (
                <span className="absolute top-0 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </button>
            <button type="button" className="flex flex-col items-center gap-1 active:text-white">
              <span>📅</span>
              <span>Events</span>
            </button>
          </nav>
        </div>
      </div>
    );
  }

  // Tab: Mail Inbox List (General Mailbox)
  if (activeMailTab === "inbox") {
    const mails = [
      {
        id: "admin-mail",
        sender: "System Security", // Impersonating user
        subject: "URGENT: Third-party software flagged",
        time: "Just now",
        unread: hasUnread,
        emoji: "👤"
      },
      {
        id: "rewards",
        sender: "Garena Season Team",
        subject: "Rank Season Reset Rewards",
        time: "2 days ago",
        unread: false,
        emoji: "🎁"
      },
      {
        id: "maintenance",
        sender: "System Operator",
        subject: "Server maintenance completed v2.9",
        time: "5 days ago",
        unread: false,
        emoji: "⚙️"
      }
    ];

    return (
      <div className="relative flex h-full flex-col bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#030712] pt-12 text-white font-sans overflow-hidden">
        <StatusBar dark={false} />
        <GameHeader onBack={() => setActiveMailTab(null)} />
        
        <div className="flex-1 flex flex-col p-4 min-h-0 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Mailbox</h2>
            <button
              type="button"
              onClick={() => setActiveMailTab(null)}
              className="text-xs text-slate-400 hover:text-white uppercase font-bold cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          <div className="space-y-2">
            {mails.map((mail) => (
              <button
                key={mail.id}
                type="button"
                onClick={() => setActiveMailTab(mail.id)}
                className={`w-full rounded-xl border p-3 text-left flex items-start gap-3 active:scale-[0.99] transition-transform cursor-pointer ${
                  mail.unread
                    ? "border-red-500/30 bg-red-950/20"
                    : "border-slate-800 bg-slate-900/60"
                }`}
              >
                <span className="text-xl shrink-0">{mail.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-[10px] uppercase font-bold ${mail.unread ? "text-red-400 font-black" : "text-amber-500"}`}>
                      {mail.sender}
                    </span>
                    <span className="shrink-0 text-[8px] text-slate-500">{mail.time}</span>
                  </div>
                  <h4 className="truncate mt-0.5 text-xs font-semibold text-slate-200">{mail.subject}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tab: User Chat Detail (Impersonating admin "System Security")
  if (activeMailTab === "admin-mail") {
    return (
      <div className="relative flex h-full flex-col bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#030712] pt-12 text-white font-sans overflow-hidden">
        <StatusBar dark={false} />
        <GameHeader
          onBack={() => setActiveMailTab("inbox")}
          title="System Security"
          headerAction={
            <button
              type="button"
              onClick={() => triggerAct2Choice(phone, "report")}
              className="flex items-center gap-1 rounded bg-red-950/60 border border-red-500/40 px-2 py-1 text-[9px] font-bold text-red-200 active:scale-95 shrink-0 mr-1 cursor-pointer"
              title="Report User"
            >
              ⚠️ Report User
            </button>
          }
        />
        
        {/* Chat Thread Body */}
        <div className="flex-1 flex flex-col p-4 gap-3 min-h-0 overflow-y-auto pb-24">
          <div className="text-center my-1 select-none">
            <span className="rounded bg-black/40 px-3 py-1 text-[8px] text-slate-500 uppercase tracking-wider">
              Direct Chat
            </span>
          </div>

          {/* Scammer message */}
          <div className="flex gap-2 max-w-[85%]">
            <div className="h-6 w-6 rounded-full border border-amber-500 bg-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0">
              👤
            </div>
            <div className="rounded-xl rounded-tl-none bg-slate-900 border border-slate-800 p-3 shadow-md">
              <p className="text-[10px] font-bold text-red-400">System Security</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-200">
                Dear player, unusual activity / third-party software detected on your MLBB account. To avoid permanent ban, reply with your registered email and password within 10 minutes to verify identity.
              </p>
              <p className="mt-1.5 text-right text-[8px] text-slate-500">3:55 PM</p>
            </div>
          </div>
        </div>

        {/* Input Bar & Keyboard Suggestions */}
        {phone ? (
          <div className="absolute bottom-0 left-0 right-0 z-20">
            {showSuggestions && (
              <div className="absolute bottom-16 left-3 right-3 flex flex-col gap-2 rounded-2xl border border-slate-800 bg-[#111827] p-3 shadow-lg">
                <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Quick Reply Drafts</p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInputValue("Email: rohan@gmail.com, Password: MyPassword123");
                      setShowSuggestions(false);
                    }}
                    className="w-full rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2.5 text-xs font-semibold text-slate-300 text-left active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    📝 Verify Both (Email & Password)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputValue("Email: rohan@gmail.com");
                      setShowSuggestions(false);
                    }}
                    className="w-full rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2.5 text-xs font-semibold text-slate-300 text-left active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    📧 Verify Email Only
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2 bg-black/90 px-3 py-2 border-t border-slate-800 shrink-0">
              <div
                onClick={() => setShowSuggestions((s) => !s)}
                className="flex flex-1 items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3 py-1.5 shadow-sm cursor-pointer"
              >
                <span className="text-lg text-slate-500 select-none">💬</span>
                <input
                  type="text"
                  placeholder="Send a message..."
                  readOnly
                  value={inputValue}
                  className="flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-500 cursor-pointer pointer-events-none"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (inputValue.includes("Password")) {
                    triggerAct2Choice(phone, "both");
                  } else if (inputValue.includes("Email")) {
                    triggerAct2Choice(phone, "email");
                  }
                }}
                disabled={!inputValue}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm transition-transform active:scale-95 shrink-0 cursor-pointer ${
                  inputValue ? "bg-amber-500 hover:bg-amber-600" : "bg-slate-800 cursor-not-allowed text-slate-600"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  // Tab: Other Mail details (Rewards / Maintenance)
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#030712] pt-12 text-white font-sans overflow-hidden">
      <StatusBar dark={false} />
      <GameHeader onBack={() => setActiveMailTab("inbox")} />
      
      <div className="flex-1 flex flex-col p-4 min-h-0 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <button
            type="button"
            onClick={() => setActiveMailTab("inbox")}
            className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer"
          >
            ‹ Back
          </button>
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">System Message</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-baseline justify-between border-b border-slate-800/60 pb-2 mb-3">
            <span className="text-[10px] font-bold text-amber-500">
              From: {activeMailTab === "rewards" ? "Garena Season Team" : "System Operator"}
            </span>
            <span className="text-[8px] text-slate-500">
              {activeMailTab === "rewards" ? "2 days ago" : "5 days ago"}
            </span>
          </div>
          
          <p className="text-xs leading-relaxed text-slate-300">
            {activeMailTab === "rewards"
              ? "Dear player, the current ranked season has concluded. Your rewards have been calculated and sent to your inventory: 250 Gold Coins, 2 Double Battle Point Cards, and 1 Season Fighter Skin. Thank you for your support!"
              : "Dear player, server maintenance for version 2.9 update has successfully concluded. All servers are back online. We have added 50 Gold Coins to your account as compensation. Enjoy the game!"}
          </p>

          <p className="mt-4 text-[10px] italic text-slate-500 text-center select-none border-t border-slate-800 pt-2">
            Attachment claimed
          </p>
        </div>
      </div>
    </div>
  );
}
