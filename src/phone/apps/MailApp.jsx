import { useMemo, useState } from "react";
import EmailShell from "../../components/email/EmailShell.jsx";
import ScenarioChoiceFooter from "../../components/messages/ScenarioChoiceFooter.jsx";

const DECOY_EMAILS = [
  {
    sender: "Riverside Academy",
    address: "fees@riverside-academy.edu.in",
    subject: "Fee receipt — payment confirmed",
    unread: false,
  },
  {
    sender: "Class 10 — Homework",
    address: "homework@class10.edu",
    subject: "Physics worksheet due Monday",
    unread: false,
  },
  {
    sender: "Amazon India",
    address: "order-update@amazon.in",
    subject: "Your order has been delivered",
    unread: false,
  },
];

const SCENARIO2_EMAIL = {
  id: "act2_s2_school",
  sender: "School IT Support",
  address: "it-support@sch00l-portal.in",
  subject: "⚠️ Action Required — Account Deactivation in 24 Hours",
  body:
    "Your school portal will be deactivated. You will lose access to results and timetable. Verify now →\n" +
    "school-portal-login.net/verify-now",
  unread: true,
};

export default function MailApp({ onBack, phone }) {
  const [activeEmailId, setActiveEmailId] = useState(null);
  const gate = phone?.state?.choiceGate ?? null;

  const emails = useMemo(() => {
    const base = [...DECOY_EMAILS];
    if (phone?.state?.vars?.act2_active_scenario === "s2") {
      base.unshift(SCENARIO2_EMAIL);
    }
    return base;
  }, [phone?.state?.vars?.act2_active_scenario]);

  const activeEmail =
    activeEmailId === SCENARIO2_EMAIL.id
      ? SCENARIO2_EMAIL
      : emails.find((e) => e.id === activeEmailId) ?? null;

  if (activeEmail) {
    return (
      <EmailShell
        title={activeEmail.subject}
        onBack={() => setActiveEmailId(null)}
        footer={
          gate &&
          (!gate.targetAppId || gate.targetAppId === "mail") &&
          (!gate.targetId || gate.targetId === activeEmail.id) ? (
            <ScenarioChoiceFooter
              title={gate.prompt}
              choices={gate.options}
              onChoose={(id) => phone.api.choose(id)}
            />
          ) : null
        }
      >
        <div className="p-4">
          <p className="text-xs font-bold text-slate-700">{activeEmail.sender}</p>
          <p className="text-xs text-slate-500">{activeEmail.address}</p>
          <p className="mt-3 whitespace-pre-wrap text-sm text-slate-800">{activeEmail.body}</p>
        </div>
      </EmailShell>
    );
  }

  return (
    <EmailShell title="Inbox" onBack={onBack}>
      {emails.map((email) => (
        <button
          key={email.id ?? email.subject}
          type="button"
          onClick={() => {
            setActiveEmailId(email.id ?? null);
            if (email.id) {
              phone.api.signal("open_email", email.id);
            }
          }}
          className={`w-full border-b border-slate-100 p-4 text-left ${
            email.unread ? "bg-slate-50" : "opacity-80"
          }`}
        >
          <b className="text-sm text-slate-900">{email.sender}</b>
          <p className="text-xs text-slate-500">{email.address}</p>
          <p className="mt-1 text-sm text-slate-600">{email.subject}</p>
        </button>
      ))}
    </EmailShell>
  );
}
