import {
  OFFICIAL_COMPROMISE_EMAIL,
  REAL_EMAIL_ADDRESS,
  REAL_EMAIL_SENDER,
} from "../../../content/scenario4.js";
import EmailShell from "../../../components/email/EmailShell.jsx";

/** Path tap — official school email: account compromised. */
export default function MailOfficialCompromiseScreen() {
  return (
    <EmailShell title="Inbox">
      <div className="p-4">
        <p className="rounded-lg bg-blue-100 px-3 py-1 text-center text-[10px] font-bold uppercase text-blue-800">
          Official · {REAL_EMAIL_ADDRESS}
        </p>
        <h2 className="mt-3 text-lg font-bold text-slate-900">
          {OFFICIAL_COMPROMISE_EMAIL.subject}
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          From: {REAL_EMAIL_SENDER} &lt;{REAL_EMAIL_ADDRESS}&gt;
        </p>
        <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">
          {OFFICIAL_COMPROMISE_EMAIL.body}
        </pre>
      </div>
    </EmailShell>
  );
}
