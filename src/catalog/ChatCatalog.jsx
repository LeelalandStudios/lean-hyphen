import { useEffect, useMemo, useState } from "react";
import PhoneShell from "../components/phone/PhoneShell.jsx";
import ScriptedChat from "../components/chat/ScriptedChat.jsx";
import {
  CHAT_CATALOG,
  DEFAULT_CHAT_ID,
  getChatDefinition,
} from "../content/chatRegistry.js";

function chatIdFromSearch() {
  if (typeof window === "undefined") return DEFAULT_CHAT_ID;
  const param = new URLSearchParams(window.location.search).get("chat");
  return CHAT_CATALOG.some((c) => c.id === param) ? param : DEFAULT_CHAT_ID;
}

export default function ChatCatalog() {
  const [chatId, setChatId] = useState(chatIdFromSearch);
  const [mode, setMode] = useState(/** @type {'scripted'|'static'} */ ("scripted"));

  const entry = useMemo(
    () => CHAT_CATALOG.find((c) => c.id === chatId) ?? CHAT_CATALOG[0],
    [chatId]
  );

  const definition = useMemo(() => getChatDefinition(chatId), [chatId]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("chats", "1");
    url.searchParams.delete("catalog");
    url.searchParams.delete("index");
    if (chatId === DEFAULT_CHAT_ID) {
      url.searchParams.delete("chat");
    } else {
      url.searchParams.set("chat", chatId);
    }
    window.history.replaceState({}, "", url);
  }, [chatId]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <aside className="flex h-full w-80 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
        <div className="shrink-0 border-b border-slate-800 p-4">
          <h1 className="text-sm font-bold uppercase tracking-wide text-slate-400">
            Chat catalog
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Preview YAML chat files — static or scripted playback.
          </p>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
          <ul className="space-y-0.5">
            {CHAT_CATALOG.map((chat) => (
              <li key={chat.id}>
                <button
                  type="button"
                  onClick={() => setChatId(chat.id)}
                  className={`w-full rounded-lg px-2 py-2 text-left text-xs leading-snug transition ${
                    chatId === chat.id
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {chat.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-slate-800 p-3">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Preview mode
            </p>
            <div className="flex gap-1">
              {(["scripted", "static"]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMode(/** @type {'scripted'|'static'} */ (value))}
                  className={`flex-1 rounded-lg px-2 py-1.5 text-[10px] font-semibold uppercase ${
                    mode === value
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <p className="font-mono text-[10px] text-slate-500">
            id: {entry.id}
            <br />
            file: src/content/chats/{entry.id}.yaml
          </p>
          <a href="/" className="block text-[10px] text-emerald-600 hover:underline">
            ← Lesson app
          </a>
          <a
            href="?index=1"
            className="block text-[10px] text-slate-600 hover:text-slate-400 hover:underline"
          >
            Scene index
          </a>
        </div>
      </aside>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="shrink-0 border-b border-slate-800 px-5 py-3">
          <h2 className="text-sm font-semibold text-slate-100">{entry.label}</h2>
          <p className="mt-1 text-xs text-slate-400">{entry.description}</p>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4">
          <PhoneShell>
            <ScriptedChat
              key={`${chatId}-${mode}`}
              definition={definition}
              mode={mode}
            />
          </PhoneShell>
        </div>
      </main>
    </div>
  );
}
