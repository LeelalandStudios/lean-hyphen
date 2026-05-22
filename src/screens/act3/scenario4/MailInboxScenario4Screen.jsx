import {
  REAL_EMAIL_ADDRESS,
  REAL_EMAIL_SENDER,
  SCAM_EMAIL_ADDRESS,
  SCAM_EMAIL_SENDER,
  SCAM_EMAIL_SUBJECT,
} from "../../../content/scenario4.js";
import EmailShell from "../../../components/email/EmailShell.jsx";

export default function MailInboxScenario4Screen() {
  return (
    <EmailShell title="Inbox">
      <div className="border-b border-red-100 bg-red-50 p-4">
        <div className="flex justify-between gap-2">
          <b className="text-sm text-slate-900">{SCAM_EMAIL_SENDER}</b>
          <span className="shrink-0 text-xs font-medium text-red-600">now</span>
        </div>
        <p className="text-xs text-slate-500">{SCAM_EMAIL_ADDRESS}</p>
        <p className="mt-1 text-sm font-medium text-slate-800">{SCAM_EMAIL_SUBJECT}</p>
      </div>
      <div className="border-b border-slate-100 p-4 opacity-70">
        <b className="text-sm">{REAL_EMAIL_SENDER}</b>
        <p className="text-xs text-slate-500">{REAL_EMAIL_ADDRESS}</p>
        <p className="mt-1 text-sm text-slate-600">Fee receipt — payment confirmed</p>
      </div>
      <div className="border-b border-slate-100 p-4 opacity-50">
        <b className="text-sm">Class 10 — Homework</b>
        <p className="text-sm text-slate-600">Physics worksheet due Monday</p>
      </div>
    </EmailShell>
  );
}
