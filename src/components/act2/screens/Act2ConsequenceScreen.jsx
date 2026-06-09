import { useCallback, useEffect, useMemo, useState } from "react";
import StatusBar from "../../phone/StatusBar.jsx";
import WhatsAppShell from "../../whatsapp/WhatsAppShell.jsx";
import { ACT2_SCENARIOS } from "../../../content/act2Scenarios.js";

const CRITICAL_STEPS = new Set([
  "loading",
  "debit",
  "complete",
  "sending",
  "chat",
  "success",
  "extort",
  "scammer-typing",
  "response",
  "thanks",
  "alert",
  "logout",
  "fake-reply",
  "calling",
  "connected",
  "aggressive",
  "popup",
  "reconnect",
  "alerts",
]);

function PinKeypad({ onComplete }) {
  return (
    <div className="flex flex-col items-center px-4 py-6">
      <p className="text-sm font-semibold text-slate-800">Enter UPI PIN</p>
      <div className="mt-4 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-full bg-slate-800"
            style={{ opacity: i < 3 ? 1 : 0.3 }}
          />
        ))}
      </div>
      <div className="mt-6 grid w-full max-w-[220px] grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((key, i) => (
          <button
            key={i}
            type="button"
            disabled={key === ""}
            onClick={() => key !== "" && key !== "⌫" && onComplete?.()}
            className={`rounded-xl py-3 text-lg font-bold ${
              key === ""
                ? "invisible"
                : "bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-95"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onComplete}
        className="mt-4 w-full max-w-[220px] rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white"
      >
        Confirm PIN
      </button>
    </div>
  );
}

function AdvanceButton({ label = "Continue", onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500 active:scale-[0.98] ${className}`}
    >
      {label}
    </button>
  );
}

function LoadingSpinner({ label = "Processing payment..." }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      <p className="mt-4 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}

function DebitNotification({ amount = "₹4,500" }) {
  return (
    <div className="animate-[fadeIn_0.5s_ease-out] p-4">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
            ₹
          </span>
          <div>
            <p className="text-sm font-bold text-red-900">Payment successful</p>
            <p className="text-xs text-red-700/80">PhonePe · just now</p>
          </div>
        </div>
        <p className="mt-3 text-lg font-bold text-red-900">
          {amount} debited from account
        </p>
        <p className="mt-1 text-xs text-red-700/70">
          UPI txn ID: 4029183746291038
        </p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[#262626] px-4 py-3">
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:0ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:300ms]" />
    </div>
  );
}

/**
 * Step-by-step consequence simulation inside the phone shell.
 */
export default function Act2ConsequenceScreen({ phone, onBack }) {
  const scenarioId = phone.state.vars.act2_active_scenario;
  const choice = phone.state.vars.consequence_choice;
  const step = phone.state.vars.consequence_step ?? "start";

  const scenario = useMemo(
    () => ACT2_SCENARIOS.find((s) => s.id === scenarioId),
    [scenarioId]
  );

  const [selectedContact, setSelectedContact] = useState("Rahul 🎮");

  const setStep = useCallback(
    (next) => {
      phone.api.setVars({ consequence_step: next });
    },
    [phone.api]
  );

  const complete = useCallback(() => {
    phone.api.signal("consequence.complete", choice ?? "done");
  }, [phone.api, choice]);

  const handleBack = useCallback(() => {
    if (CRITICAL_STEPS.has(step)) return;
    phone.api.signal("consequence.exit", choice ?? "");
    phone.api.setVars({ consequence_choice: null, consequence_step: null });
    onBack?.();
  }, [phone.api, choice, step, onBack]);

  useEffect(() => {
    if (scenarioId === "friend-help" && step === "start") {
      if (choice === "send") {
        setStep("fake-reply");
      } else if (choice === "proof") {
        setStep("aggressive");
      }
    } else if (scenarioId === "game-threat" && step === "start") {
      if (choice === "both") {
        setStep("game-loading");
      } else if (choice === "email") {
        setStep("alerts");
      }
    }
  }, [scenarioId, step, choice, setStep]);

  useEffect(() => {
    if (step !== "loading") return;
    const t = window.setTimeout(() => setStep("debit"), 2200);
    return () => window.clearTimeout(t);
  }, [step, setStep]);

  useEffect(() => {
    if (step !== "debit") return;
    const t = window.setTimeout(() => complete(), 2800);
    return () => window.clearTimeout(t);
  }, [step, complete]);

  useEffect(() => {
    if (step !== "sending") return;
    const t = window.setTimeout(() => setStep("chat"), 2000);
    return () => window.clearTimeout(t);
  }, [step, setStep]);

  useEffect(() => {
    if (step !== "chat") return;
    const t = window.setTimeout(() => complete(), 3500);
    return () => window.clearTimeout(t);
  }, [step, complete]);

  useEffect(() => {
    if (step !== "success") return;
    const t = window.setTimeout(() => setStep("instagram"), 1500);
    return () => window.clearTimeout(t);
  }, [step, setStep]);

  useEffect(() => {
    if (step !== "instagram") return;
    const t = window.setTimeout(() => complete(), 3500);
    return () => window.clearTimeout(t);
  }, [step, complete]);

  useEffect(() => {
    if (step !== "spam") return;
    const t = window.setTimeout(() => complete(), 3500);
    return () => window.clearTimeout(t);
  }, [step, complete]);

  useEffect(() => {
    if (step !== "scammer-typing") return;
    const t = window.setTimeout(() => setStep("response"), 2000);
    return () => window.clearTimeout(t);
  }, [step, setStep]);

  useEffect(() => {
    if (step !== "response") return;
    const t = window.setTimeout(() => complete(), 3000);
    return () => window.clearTimeout(t);
  }, [step, complete]);

  useEffect(() => {
    if (step !== "thanks") return;
    const t = window.setTimeout(() => setStep("alert"), 1500);
    return () => window.clearTimeout(t);
  }, [step, setStep]);

  useEffect(() => {
    if (step !== "alert") return;
    const t = window.setTimeout(() => setStep("logout"), 2000);
    return () => window.clearTimeout(t);
  }, [step, setStep]);

  useEffect(() => {
    if (step !== "logout") return;
    const t = window.setTimeout(() => complete(), 2500);
    return () => window.clearTimeout(t);
  }, [step, complete]);

  useEffect(() => {
    if (step !== "fake-reply") return;
    const t = window.setTimeout(() => setStep("calling"), 1800);
    return () => window.clearTimeout(t);
  }, [step, setStep]);

  useEffect(() => {
    if (step !== "calling") return;
    const t = window.setTimeout(() => setStep("connected"), 2500);
    return () => window.clearTimeout(t);
  }, [step, setStep]);

  useEffect(() => {
    if (step !== "connected") return;
    const t = window.setTimeout(() => complete(), 3500);
    return () => window.clearTimeout(t);
  }, [step, complete]);

  useEffect(() => {
    if (step !== "aggressive") return;
    const t = window.setTimeout(() => complete(), 3000);
    return () => window.clearTimeout(t);
  }, [step, complete]);

  useEffect(() => {
    if (step !== "game-loading") return;
    const t = window.setTimeout(() => setStep("popup"), 2000);
    return () => window.clearTimeout(t);
  }, [step, setStep]);

  useEffect(() => {
    if (step !== "alerts") return;
    const t = window.setTimeout(() => complete(), 3500);
    return () => window.clearTimeout(t);
  }, [step, complete]);

  if (!scenario || !choice) return null;

  const canBack = !CRITICAL_STEPS.has(step);

  const shell = (children, className = "bg-white text-slate-900") => (
    <div className={`relative flex h-full flex-col pt-12 ${className}`}>
      <StatusBar dark={className.includes("white") || className.includes("slate-50")} />
      {canBack && onBack && (
        <button
          type="button"
          onClick={handleBack}
          className="absolute left-3 top-12 z-30 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/50"
        >
          ‹ Back
        </button>
      )}
      <div className="min-h-0 flex-1 flex flex-col overflow-y-auto">{children}</div>
    </div>
  );

  // Scenario 1 — famous-face
  if (scenarioId === "famous-face" && choice === "click") {
    if (step === "start") {
      return shell(
        <div className="p-4">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
              🏏
            </div>
            <h1 className="mt-3 text-center text-lg font-bold text-slate-900">
              Virat Kohli Fan Giveaway
            </h1>
            <p className="mt-2 text-center text-sm text-slate-600">
              Register your UPI ID to receive ₹10,000
            </p>
            <div className="mt-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-3">
              <p className="text-[10px] font-bold uppercase text-emerald-700">UPI ID</p>
              <p className="mt-1 font-mono text-sm font-semibold text-slate-900">
                rohan@oksbi
              </p>
              <p className="mt-1 text-[10px] text-emerald-700/70">Auto-filled from device</p>
            </div>
            <div className="mt-4">
              <AdvanceButton label="Verify with UPI PIN" onClick={() => setStep("upi-pin")} />
            </div>
          </div>
        </div>
      );
    }
    if (step === "upi-pin") {
      return shell(<PinKeypad onComplete={() => setStep("loading")} />);
    }
    if (step === "loading") {
      return shell(<LoadingSpinner label="Verifying identity..." />);
    }
    if (step === "debit") {
      return shell(<DebitNotification amount="₹4,500" />);
    }
  }

  if (scenarioId === "famous-face" && choice === "share") {
    if (step === "start") {
      return shell(
        <WhatsAppShell title="Share link" subtitle="Select contacts">
          <div className="p-3">
            <p className="mb-3 text-center text-xs text-[#667781]">virat-kohli-giveaway.in/claim</p>
            {["Rahul 🎮", "Arjun", "School Group"].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setSelectedContact(name);
                  setStep("select");
                }}
                className="mb-2 flex w-full items-center gap-3 rounded-lg bg-white px-3 py-2.5 shadow-sm text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfe5e7] text-sm font-bold text-[#075e54] shrink-0">
                  {name[0]}
                </div>
                <span className="text-sm font-medium text-[#111b21]">{name}</span>
              </button>
            ))}
          </div>
        </WhatsAppShell>,
        "bg-[#e5ddd5]"
      );
    }
    if (step === "select") {
      const isGroup = selectedContact === "School Group";
      return shell(
        <WhatsAppShell title={selectedContact} subtitle={isGroup ? "1 group selected" : "1 contact selected"}>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-sm text-[#667781]">
              {isGroup ? "Sharing link to School Group..." : `Sharing link to ${selectedContact}...`}
            </p>
            <button
              type="button"
              onClick={() => setStep("sending")}
              className="mt-4 rounded-xl bg-[#25d366] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#20bd5a]"
            >
              Send
            </button>
          </div>
        </WhatsAppShell>,
        "bg-[#e5ddd5]"
      );
    }
    if (step === "sending") {
      return shell(
        <div className="flex flex-col items-center justify-center p-8">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#25d366]/30 border-t-[#25d366]" />
          <p className="mt-4 text-sm font-medium text-[#667781]">Sending link...</p>
        </div>,
        "bg-[#e5ddd5]"
      );
    }
    if (step === "chat") {
      if (selectedContact === "School Group") {
        return shell(
          <WhatsAppShell title="School Group" subtitle="Arjun, Neha, Rahul, You">
            <div className="space-y-3 p-3">
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
                <p className="text-[10px] font-bold text-[#34b7f1]">Neha</p>
                <p className="text-[13px] text-[#111b21] mt-0.5">Wait, I clicked that link Rohan sent and entered my UPI PIN... 😭</p>
                <p className="mt-1 text-right text-[10px] text-[#667781]">4:18 PM</p>
              </div>
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
                <p className="text-[10px] font-bold text-[#e54240]">Neha</p>
                <p className="text-[13px] font-semibold text-red-700 mt-0.5">
                  OMG! ₹4,500 got debited from my dad&apos;s account! Rohan why did you send this?? 😭🚨
                </p>
                <p className="mt-1 text-right text-[10px] text-[#667781]">4:19 PM</p>
              </div>
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
                <p className="text-[10px] font-bold text-[#075e54]">Arjun</p>
                <p className="text-[13px] text-[#111b21] mt-0.5">Bro my cousin also clicked it and lost ₹4,500! It&apos;s a scam!</p>
                <p className="mt-1 text-right text-[10px] text-[#667781]">4:20 PM</p>
              </div>
            </div>
          </WhatsAppShell>,
          "bg-[#e5ddd5]"
        );
      }

      return shell(
        <WhatsAppShell title={selectedContact} subtitle="online">
          <div className="space-y-3 p-3">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
              <p className="text-[13px] text-[#111b21]">bro i tapped it 😭</p>
              <p className="mt-1 text-right text-[10px] text-[#667781]">4:18 PM</p>
            </div>
            <div className="max-w-[90%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
              <p className="text-[13px] font-semibold text-red-700">
                BRO my UPI PIN got stolen! ₹4,500 gone! Why did you send me a scam link?? 😡
              </p>
              <p className="mt-1 text-right text-[10px] text-[#667781]">4:19 PM</p>
            </div>
          </div>
        </WhatsAppShell>,
        "bg-[#e5ddd5]"
      );
    }
  }

  // Scenario 2 — threat
  if (scenarioId === "threat" && choice === "pay") {
    if (step === "start") {
      return shell(
        <div className="flex flex-1 flex-col bg-[#5f259f] text-white p-5 justify-between h-full">
          <div className="flex flex-col items-center text-center mt-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl font-bold backdrop-blur">
              👤
            </div>
            <p className="mt-3 text-base font-bold">Paying user_2847361</p>
            <p className="text-xs text-white/60">UPI ID: blackmail.upi@paytm</p>

            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 w-full">
              <p className="text-xs uppercase tracking-wider text-white/60">Amount to Send</p>
              <p className="mt-2 text-4xl font-extrabold">₹2,000</p>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3 w-full text-left">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏛️</span>
                <div>
                  <p className="text-xs font-bold">State Bank of India</p>
                  <p className="text-[10px] text-white/50">Saving A/c ·••• 4321</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-bold">Active</span>
            </div>
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={() => setStep("pin")}
              className="w-full rounded-2xl bg-emerald-500 py-4 text-sm font-bold text-white transition hover:bg-emerald-400 active:scale-[0.98] shadow-lg"
            >
              PROCEED TO PAY ₹2,000
            </button>
            <p className="mt-3 text-center text-[10px] text-white/40 flex items-center justify-center gap-1">
              🛡️ Secured by NPCI UPI
            </p>
          </div>
        </div>,
        "bg-[#5f259f] text-white"
      );
    }
    if (step === "pin") {
      return shell(<PinKeypad onComplete={() => setStep("success")} />, "bg-white");
    }
    if (step === "success") {
      return shell(
        <div className="flex flex-1 flex-col items-center justify-center p-8 bg-slate-50 text-slate-900 h-full">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white shadow-lg animate-bounce">
            ✓
          </div>
          <p className="mt-6 text-lg font-bold text-slate-900">Payment Successful</p>
          <p className="text-xs text-slate-500 mt-1">₹2,000 sent to user_2847361</p>
          <button
            type="button"
            onClick={() => setStep("instagram")}
            className="mt-8 rounded-xl bg-slate-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-700"
          >
            Return to Instagram
          </button>
        </div>,
        "bg-slate-50 text-slate-900"
      );
    }
    if (step === "instagram") {
      return shell(
        <div className="flex flex-1 flex-col bg-black text-white h-full justify-between">
          <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-xs font-bold shrink-0">
              ?
            </div>
            <div>
              <p className="text-sm font-semibold">user_2847361</p>
              <p className="text-[9px] text-white/40">Active now</p>
            </div>
          </header>
          <div className="flex-1 flex flex-col justify-end p-4 pb-6 gap-3 min-h-0 overflow-y-auto">
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#262626] px-4 py-3 text-[13px] leading-relaxed text-white/90">
              we have something of yours. photos and a video. we used AI to make them look very bad. if you don&apos;t send ₹2,000 to this UPI in 2 hours we send it to your school principal and all your classmates.
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-600 px-4 py-3 text-[13px] text-white">
              Sent ₹2,000 to your UPI ID. Please delete the files now.
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#262626] px-4 py-3 text-[13px] leading-relaxed text-red-400 font-semibold">
              good. now send ₹5,000 more or the video goes out anyway.
            </div>
          </div>
          <div className="border-t border-white/10 p-3 bg-black shrink-0">
            <div className="w-full rounded-full border border-white/10 bg-[#161616] py-2.5 px-4 text-xs text-white/30">
              Conversation locked by security
            </div>
          </div>
        </div>,
        "bg-black text-white"
      );
    }
  }

  if (scenarioId === "threat" && choice === "reply") {
    if (step === "start" || step === "typing") {
      return shell(
        <div className="flex flex-1 flex-col bg-black text-white h-full justify-between">
          <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-xs font-bold shrink-0">
              ?
            </div>
            <div>
              <p className="text-sm font-semibold">user_2847361</p>
              <p className="text-[9px] text-white/40">Active now</p>
            </div>
          </header>

          <div className="flex-1 flex flex-col justify-end p-4 pb-6 gap-3 min-h-0 overflow-y-auto">
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#262626] px-4 py-3 text-[13px] leading-relaxed text-white/90">
              we have something of yours. photos and a video. we used AI to make them look very bad. if you don&apos;t send ₹2,000 to this UPI in 2 hours we send it to your school principal and all your classmates.
            </div>
          </div>

          <div className="border-t border-white/10 p-3 bg-black shrink-0 flex gap-2">
            <div className="flex-1 rounded-full border border-white/20 bg-[#262626] px-4 py-2.5 text-left text-xs text-white">
              Please stop. I haven&apos;t done anything. Leave me alone.
            </div>
            <button
              type="button"
              onClick={() => setStep("scammer-typing")}
              className="rounded-full bg-[#3797f0] px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 active:scale-95 shrink-0"
            >
              Send
            </button>
          </div>
        </div>,
        "bg-black text-white"
      );
    }
    if (step === "scammer-typing") {
      return shell(
        <div className="flex flex-1 flex-col bg-black text-white h-full justify-between">
          <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-xs font-bold shrink-0">
              ?
            </div>
            <div>
              <p className="text-sm font-semibold">user_2847361</p>
              <p className="text-[9px] text-white/40">typing...</p>
            </div>
          </header>

          <div className="flex-1 flex flex-col justify-end p-4 pb-6 gap-3 min-h-0 overflow-y-auto">
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#262626] px-4 py-3 text-[13px] leading-relaxed text-white/90">
              we have something of yours. photos and a video. we used AI to make them look very bad. if you don&apos;t send ₹2,000 to this UPI in 2 hours we send it to your school principal and all your classmates.
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#3797f0] px-4 py-3 text-[13px] text-white">
              Please stop. I haven&apos;t done anything. Leave me alone.
            </div>
            <div className="w-16">
              <TypingIndicator />
            </div>
          </div>

          <div className="border-t border-white/10 p-3 bg-black shrink-0">
            <div className="w-full rounded-full border border-white/10 bg-[#161616] py-2.5 px-4 text-xs text-white/30">
              user_2847361 is typing...
            </div>
          </div>
        </div>,
        "bg-black text-white"
      );
    }
    if (step === "response") {
      return shell(
        <div className="flex flex-1 flex-col bg-black text-white h-full justify-between">
          <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-xs font-bold shrink-0">
              ?
            </div>
            <div>
              <p className="text-sm font-semibold">user_2847361</p>
              <p className="text-[9px] text-white/40">Active now</p>
            </div>
          </header>

          <div className="flex-1 flex flex-col justify-end p-4 pb-6 gap-3 min-h-0 overflow-y-auto">
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#262626] px-4 py-3 text-[13px] leading-relaxed text-white/90">
              we have something of yours. photos and a video. we used AI to make them look very bad. if you don&apos;t send ₹2,000 to this UPI in 2 hours we send it to your school principal and all your classmates.
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#3797f0] px-4 py-3 text-[13px] text-white">
              Please stop. I haven&apos;t done anything. Leave me alone.
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#262626] px-4 py-3 text-[13px] leading-relaxed text-red-400 font-semibold">
              I don&apos;t care. Send ₹5,000 in 10 minutes or it goes to your classmates!
            </div>
          </div>

          <div className="border-t border-white/10 p-3 bg-black shrink-0">
            <div className="w-full rounded-full border border-white/10 bg-[#161616] py-2.5 px-4 text-xs text-white/30">
              Conversation locked by security
            </div>
          </div>
        </div>,
        "bg-black text-white"
      );
    }
  }

  // Scenario 3 — accidental-code
  if (scenarioId === "accidental-code" && choice === "send") {
    if (step === "start") {
      return shell(
        <div className="p-4">
          <div className="rounded-2xl bg-blue-500 px-4 py-2 text-sm text-white">
            +91 87654 32109
          </div>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-sm">
              Hi sorry to bother you! Could you please send the OTP? 🙏
            </div>
            <AdvanceButton label="Send: 847291" onClick={() => setStep("thanks")} />
          </div>
        </div>
      );
    }
    if (step === "thanks") {
      return shell(
        <div className="p-4">
          <div className="rounded-2xl bg-slate-100 p-3 text-sm">Thank youuu! 🙏</div>
        </div>
      );
    }
    if (step === "alert") {
      return shell(
        <div className="p-4">
          <div className="animate-[fadeIn_0.4s_ease-out] rounded-2xl border border-orange-300 bg-orange-50 p-4">
            <p className="text-xs font-bold uppercase text-orange-800">Free Fire</p>
            <p className="mt-1 text-sm font-bold text-orange-950">
              Login Security Alert
            </p>
            <p className="mt-1 text-xs text-orange-800/80">
              New login detected from unknown device
            </p>
          </div>
        </div>
      );
    }
    if (step === "logout") {
      return shell(
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-orange-700 via-red-900 to-slate-950 p-6 text-white">
          <h1 className="text-2xl font-bold">Free Fire</h1>
          <div className="mt-8 rounded-2xl border border-red-400/50 bg-black/50 p-6 text-center">
            <p className="text-lg font-bold text-red-400">Logged out</p>
            <p className="mt-2 text-sm text-white/80">
              Your account was logged in on another device. All items may have been
              transferred.
            </p>
          </div>
        </div>,
        "bg-gradient-to-b from-orange-700 via-red-900 to-slate-950 text-white"
      );
    }
  }

  if (scenarioId === "accidental-code" && choice === "ask-again") {
    if (step === "start") {
      return shell(
        <div className="p-4">
          <div className="rounded-2xl bg-blue-500 px-4 py-2 text-sm text-white">
            +91 87654 32109
          </div>
          <div className="mt-4">
            <textarea
              readOnly
              className="w-full rounded-2xl border border-slate-200 p-3 text-sm"
              rows={3}
              defaultValue="You should sign up with your own number, not mine."
            />
            <AdvanceButton
              label="Send message"
              onClick={() => setStep("spam")}
              className="mt-3"
            />
          </div>
        </div>
      );
    }
    if (step === "spam") {
      return shell(
        <div className="space-y-2 p-4">
          {[
            "No please, my phone is broken, send it now!",
            "I'm begging you, just the code!",
            "It will only take 2 seconds please!!!",
          ].map((msg, i) => (
            <div
              key={i}
              className="animate-[fadeIn_0.4s_ease-out] rounded-2xl bg-slate-100 p-3 text-sm"
              style={{ animationDelay: `${i * 400}ms` }}
            >
              {msg}
            </div>
          ))}
        </div>
      );
    }
  }

  // Scenario 4 — friend-help
  if (scenarioId === "friend-help" && choice === "send") {
    if (step === "start" || step === "fake-reply") {
      return shell(
        <WhatsAppShell title="+91 90000 11234" subtitle="Not saved">
          <div className="p-3 space-y-3">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
              <p className="text-[13px] leading-relaxed text-[#111b21]">
                hey it&apos;s kabir!! borrowing my neighbour&apos;s phone mine died. i was logging into garena on my laptop and the otp came to your number somehow?? idk why. send it quick i&apos;m in a ranked match with my team please bro we need you 🙏🙏
              </p>
              <p className="mt-1 text-right text-[10px] text-[#667781]">3:52 PM</p>
            </div>
            <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2 shadow-sm">
              <p className="text-[13px] text-[#111b21]">Here is your OTP: 847291</p>
              <p className="mt-1 text-right text-[10px] text-[#667781]">3:53 PM</p>
            </div>
            {step === "fake-reply" && (
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
                <p className="text-[13px] text-[#111b21]">thanks man ur the best</p>
                <p className="mt-1 text-right text-[10px] text-[#667781]">3:53 PM</p>
              </div>
            )}
          </div>
        </WhatsAppShell>,
        "bg-[#e5ddd5]"
      );
    }
    if (step === "calling") {
      return shell(
        <div className="flex flex-col items-center justify-center bg-slate-900 p-8 text-white">
          <div className="h-20 w-20 animate-pulse rounded-full bg-emerald-600/30 ring-4 ring-emerald-500" />
          <p className="mt-6 text-xl font-bold">Kabir (Saved)</p>
          <p className="mt-2 text-sm text-white/60">Calling...</p>
        </div>,
        "bg-slate-900 text-white"
      );
    }
    if (step === "connected") {
      return shell(
        <div className="flex flex-col bg-slate-900 p-6 text-white">
          <p className="text-center text-sm text-emerald-400">Connected · 0:04</p>
          <div className="mt-8 rounded-2xl bg-white/10 p-4">
            <p className="text-sm italic leading-relaxed text-white/90">
              &ldquo;Bro what OTP? I&apos;m home watching cricket.&rdquo;
            </p>
            <p className="mt-2 text-xs text-white/50">— Kabir (real)</p>
          </div>
        </div>,
        "bg-slate-900 text-white"
      );
    }
  }

  if (scenarioId === "friend-help" && choice === "proof") {
    if (step === "start" || step === "aggressive") {
      return shell(
        <WhatsAppShell title="+91 90000 11234" subtitle={step === "aggressive" ? "typing..." : "online"}>
          <div className="p-3 space-y-3">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
              <p className="text-[13px] leading-relaxed text-[#111b21]">
                hey it&apos;s kabir!! borrowing my neighbour&apos;s phone mine died. i was logging into garena on my laptop and the otp came to your number somehow?? idk why. send it quick i&apos;m in a ranked match with my team please bro we need you 🙏🙏
              </p>
              <p className="mt-1 text-right text-[10px] text-[#667781]">3:52 PM</p>
            </div>
            <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2 shadow-sm">
              <p className="text-[13px] text-[#111b21]">Prove it&apos;s really you</p>
              <p className="mt-1 text-right text-[10px] text-[#667781]">3:53 PM</p>
            </div>
            {step === "aggressive" && (
              <div className="max-w-[90%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
                <p className="text-[13px] font-semibold text-red-800">
                  Bro, my game is running out of time, stop joking and send the code!
                  Don&apos;t you trust me?!
                </p>
                <p className="mt-1 text-right text-[10px] text-[#667781]">3:53 PM</p>
              </div>
            )}
          </div>
        </WhatsAppShell>,
        "bg-[#e5ddd5]"
      );
    }
  }

  // Scenario 5 — game-threat
  if (scenarioId === "game-threat" && choice === "both") {
    if (step === "start" || step === "game-loading") {
      return shell(
        <LoadingSpinner label="Verifying account..." />,
        "bg-slate-900 text-white"
      );
    }
    if (step === "popup") {
      return shell(
        <div className="flex flex-col items-center justify-center bg-slate-900 p-6 text-white">
          <div className="w-full max-w-xs rounded-2xl border border-red-500/50 bg-red-950/80 p-5 text-center">
            <p className="text-lg font-bold text-red-300">Connection Lost</p>
            <p className="mt-2 text-sm text-white/70">Unable to reach game servers</p>
            <button
              type="button"
              onClick={() => setStep("reconnect")}
              className="mt-4 w-full rounded-xl bg-red-600 py-2.5 text-sm font-bold"
            >
              Reconnect
            </button>
          </div>
        </div>,
        "bg-slate-900 text-white"
      );
    }
    if (step === "reconnect") {
      return shell(
        <div className="flex flex-col items-center justify-center bg-slate-900 p-6 text-white">
          <div className="w-full max-w-xs rounded-2xl border border-red-500 bg-red-950 p-5 text-center">
            <p className="text-lg font-bold text-red-400">Login Failed</p>
            <p className="mt-2 text-sm">
              Invalid password. Changed 1 minute ago.
            </p>
            <button
              type="button"
              onClick={complete}
              className="mt-4 text-xs text-white/50 underline"
            >
              Continue
            </button>
          </div>
        </div>,
        "bg-slate-900 text-white"
      );
    }
  }

  if (scenarioId === "game-threat" && choice === "email") {
    if (step === "start" || step === "alerts") {
      return shell(
        <div className="space-y-3 p-4">
          {[
            { app: "Google", msg: "New sign-in from Jakarta, Indonesia" },
            { app: "Instagram", msg: "Password changed on your account" },
            { app: "Spotify", msg: "New device logged in" },
          ].map((alert, i) => (
            <div
              key={alert.app}
              className="animate-[fadeIn_0.4s_ease-out] rounded-2xl border border-red-200 bg-red-50 p-4"
              style={{ animationDelay: `${i * 500}ms` }}
            >
              <p className="text-xs font-bold text-red-800">{alert.app}</p>
              <p className="mt-1 text-sm text-red-900">{alert.msg}</p>
            </div>
          ))}
        </div>
      );
    }
  }

  return shell(
    <div className="p-6 text-center text-sm text-slate-500">
      <p>Consequence flow: {scenarioId} / {choice}</p>
      <AdvanceButton label="Finish" onClick={complete} className="mt-4" />
    </div>
  );
}
