import { useCallback, useEffect, useMemo, useState } from "react";
import AppScreen from "../components/phone/AppScreen.jsx";
import MessageBody from "../components/ui/MessageBody.jsx";
import ScenarioChoiceFooter from "../components/messages/ScenarioChoiceFooter.jsx";

export default function MessagesApp({ phone, onBack, scenarioThreadId, onOpenScenarioThread }) {
  const { state, api } = phone;
  const [activeThreadId, setActiveThreadId] = useState(null);

  const openThread = useCallback(
    (threadId) => {
      api.markSmsRead(threadId);
      setActiveThreadId(threadId);
      if (scenarioThreadId && threadId === scenarioThreadId) {
        onOpenScenarioThread?.();
      }
    },
    [api, scenarioThreadId, onOpenScenarioThread]
  );

  useEffect(() => {
    if (!scenarioThreadId) return;
    const pending = phone.state.signals.open_messages_thread;
    if (pending !== scenarioThreadId) return;
    if (!state.smsThreads[scenarioThreadId]) return;
    openThread(scenarioThreadId);
    phone.api.signal("open_messages_thread", "");
  }, [
    scenarioThreadId,
    phone.state.signals.open_messages_thread,
    phone.api,
    state.smsThreads,
    openThread,
  ]);

  const threads = useMemo(() => {
    return Object.values(state.smsThreads).sort(
      (a, b) => (b.messages.at(-1)?.createdAt ?? 0) - (a.messages.at(-1)?.createdAt ?? 0)
    );
  }, [state.smsThreads]);

  if (activeThreadId) {
    const thread = state.smsThreads[activeThreadId];
    if (!thread) {
      setActiveThreadId(null);
      return null;
    }
    return (
      <AppScreen
        title={thread.title}
        appIcon="💬"
        onBack={() => setActiveThreadId(null)}
      >
        <div className="space-y-3 p-4 pb-8">
          {thread.messages.map((m) => (
            <div key={m.id} className="rounded-2xl bg-slate-100 p-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                {m.from}
              </p>
              <MessageBody text={m.body} />
            </div>
          ))}
        </div>

        {state.choiceGate && (
          <ScenarioChoiceFooter
            title={state.choiceGate.prompt}
            choices={state.choiceGate.options}
            onChoose={(id) => api.choose(id)}
          />
        )}
      </AppScreen>
    );
  }

  return (
    <AppScreen title="Messages" appIcon="💬" onBack={onBack}>
      {threads.length === 0 ? (
        <div className="p-6 text-center text-sm text-slate-500">
          No messages yet.
        </div>
      ) : (
        threads.map((thread) => (
          <button
            key={thread.id}
            type="button"
            onClick={() => openThread(thread.id)}
            className="flex w-full items-start justify-between gap-3 border-b border-slate-200 p-4 text-left hover:bg-slate-50"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">{thread.title}</p>
              <p className="truncate text-sm text-slate-600">{thread.preview}</p>
            </div>
            {thread.unread > 0 && (
              <span className="mt-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
                {thread.unread}
              </span>
            )}
          </button>
        ))
      )}
    </AppScreen>
  );
}

