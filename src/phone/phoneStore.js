import { useCallback, useMemo, useReducer } from "react";

/**
 * @typedef {{ id: string, appId: string, appLabel: string, from: string, body: string, createdAt: number }} PhoneNotification
 * @typedef {{ id: string, from: string, body: string, createdAt: number }} SmsMessage
 * @typedef {{ id: string, title: string, preview: string, unread: number, messages: SmsMessage[] }} SmsThread
 *
 * @typedef {object} PhoneState
 * @property {PhoneNotification[]} notifications
 * @property {Record<string, SmsThread>} smsThreads
 * @property {string | null} choiceGateId
 * @property {{ prompt: string, options: { id: string, label: string, set?: Record<string, string>, goto?: string }[] } | null} choiceGate
 * @property {Record<string, string>} vars
 * @property {Record<string, string>} signals
 */

function makeDecoyThread(id, title, preview, body) {
  return {
    id,
    title,
    preview,
    unread: 0,
    messages: [
      {
        id: `${id}_1`,
        from: title,
        body,
        createdAt: Date.now() - 86_400_000,
      },
    ],
  };
}

/**
 * @type {PhoneState}
 */
const INITIAL_STATE = {
  notifications: [],
  smsThreads: {
    mom: makeDecoyThread("mom", "Mom", "Call me when free.", "Call me when free."),
    school: makeDecoyThread(
      "school",
      "School Group",
      "Homework reminder.",
      "Physics worksheet due Monday."
    ),
  },
  choiceGateId: null,
  choiceGate: null,
  vars: {},
  signals: {},
};

function now() {
  return Date.now();
}

function makeId(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2)}`;
}

/**
 * @param {PhoneState} state
 * @param {any} action
 * @returns {PhoneState}
 */
function reducer(state, action) {
  switch (action.type) {
    case "notify": {
      const n = /** @type {PhoneNotification} */ ({
        id: makeId("n"),
        appId: action.appId,
        appLabel: action.appLabel,
        from: action.from,
        body: action.body,
        createdAt: now(),
      });
      return { ...state, notifications: [n, ...state.notifications].slice(0, 20) };
    }

    case "sms.receive": {
      const threadId = action.threadId;
      const existing = state.smsThreads[threadId];
      const msg = /** @type {SmsMessage} */ ({
        id: makeId("sms"),
        from: action.from,
        body: action.body,
        createdAt: now(),
      });
      const thread = existing
        ? {
            ...existing,
            preview: action.body.slice(0, 40),
            unread: existing.unread + 1,
            messages: [...existing.messages, msg],
          }
        : {
            id: threadId,
            title: action.from,
            preview: action.body.slice(0, 40),
            unread: 1,
            messages: [msg],
          };
      return { ...state, smsThreads: { ...state.smsThreads, [threadId]: thread } };
    }

    case "sms.markRead": {
      const t = state.smsThreads[action.threadId];
      if (!t) return state;
      return {
        ...state,
        smsThreads: {
          ...state.smsThreads,
          [action.threadId]: { ...t, unread: 0 },
        },
      };
    }

    case "choice.open": {
      return {
        ...state,
        choiceGateId: action.id,
        choiceGate: { prompt: action.prompt, options: action.options },
      };
    }

    case "choice.choose": {
      const gate = state.choiceGate;
      if (!gate) return state;
      const option = gate.options.find((o) => o.id === action.optionId);
      if (!option) return state;
      return {
        ...state,
        vars: option.set ? { ...state.vars, ...option.set } : state.vars,
        choiceGateId: null,
        choiceGate: null,
      };
    }

    case "vars.set": {
      return { ...state, vars: { ...state.vars, ...action.vars } };
    }

    case "signal": {
      return {
        ...state,
        signals: { ...state.signals, [action.name]: String(action.value ?? now()) },
      };
    }

    default:
      return state;
  }
}

export function usePhoneStore() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const api = useMemo(() => {
    return {
      notify(payload) {
        dispatch({ type: "notify", ...payload });
      },
      receiveSms(payload) {
        dispatch({ type: "sms.receive", ...payload });
      },
      markSmsRead(threadId) {
        dispatch({ type: "sms.markRead", threadId });
      },
      openChoiceGate(payload) {
        dispatch({ type: "choice.open", ...payload });
      },
      choose(optionId) {
        dispatch({ type: "choice.choose", optionId });
      },
      setVars(vars) {
        dispatch({ type: "vars.set", vars });
      },
      signal(name, value) {
        dispatch({ type: "signal", name, value });
      },
    };
  }, []);

  const selectors = useMemo(() => {
    const latestNotification = state.notifications[0] ?? null;
    const totalUnreadSms = Object.values(state.smsThreads).reduce(
      (sum, t) => sum + (t.unread ?? 0),
      0
    );
    return { latestNotification, totalUnreadSms };
  }, [state.notifications, state.smsThreads]);

  return { state, api, selectors };
}

