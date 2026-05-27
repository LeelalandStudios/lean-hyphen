import EmailShell from "../../components/email/EmailShell.jsx";

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

export default function MailApp({ onBack }) {
  return (
    <EmailShell title="Inbox" onBack={onBack}>
      {DECOY_EMAILS.map((email) => (
        <div
          key={email.subject}
          className="border-b border-slate-100 p-4 opacity-80"
        >
          <b className="text-sm text-slate-900">{email.sender}</b>
          <p className="text-xs text-slate-500">{email.address}</p>
          <p className="mt-1 text-sm text-slate-600">{email.subject}</p>
        </div>
      ))}
    </EmailShell>
  );
}
