import {
  OFFICIAL_COMPROMISE_EMAIL,
  REAL_EMAIL_ADDRESS,
  REAL_EMAIL_SENDER,
  SCAM_EMAIL_ADDRESS,
  SCAM_EMAIL_SENDER,
  SCAM_EMAIL_SUBJECT,
} from "../../../content/scenario4.js";
import EmailShell from "../../../components/email/EmailShell.jsx";

/** Path tap — official security email arrives after fake portal. */
export default function MailInboxAfterTapScreen() {
  return (
    <EmailShell title="Inbox">
      <div className="border-b border-blue-200 bg-blue-50 p-4">
        <div className="flex justify-between gap-2">
          <b className="text-sm text-slate-900">{REAL_EMAIL_SENDER}</b>
          <span className="shrink-0 text-xs font-medium text-blue-700">now</span>
        </div>
        <p className="text-xs text-slate-500">{REAL_EMAIL_ADDRESS}</p>
        <p className="mt-1 text-sm font-semibold text-blue-900">
          {OFFICIAL_COMPROMISE_EMAIL.subject}
        </p>
      </div>
      <div className="border-b border-slate-100 p-4 opacity-60">
        <b className="text-sm">{SCAM_EMAIL_SENDER}</b>
        <p className="text-xs text-slate-500">{SCAM_EMAIL_ADDRESS}</p>
        <p className="mt-1 text-sm text-slate-600">{SCAM_EMAIL_SUBJECT}</p>
      </div>
      <p className="px-4 py-3 text-center text-xs text-slate-500">
        New message from your real school — open it first.
      </p>
    </EmailShell>
  );
}
