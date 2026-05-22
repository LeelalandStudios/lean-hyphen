import {
  FAKE_DOMAIN,
  PATH_CHECK_DOMAIN_NOTE,
  REAL_DOMAIN_HINT,
  SCAM_EMAIL_ADDRESS,
} from "../../../content/scenario4.js";
import EmailShell from "../../../components/email/EmailShell.jsx";

export default function MailDomainCheckScreen() {
  return (
    <EmailShell title="Inbox">
      <div className="p-4">
        <p className="text-xs font-bold uppercase text-emerald-700">Marked as phishing</p>
        <div className="mt-4 rounded-2xl border-2 border-amber-400 bg-amber-50 p-4">
          <p className="text-xs text-slate-600">Sender address</p>
          <p className="mt-2 font-mono text-lg font-bold">
            noreply@
            <span className="rounded bg-red-200 px-1 text-red-800">sch00l</span>
            -portal.com
          </p>
          <p className="mt-3 text-sm text-amber-900">{PATH_CHECK_DOMAIN_NOTE}</p>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Real school domain: <span className="font-mono font-semibold">{REAL_DOMAIN_HINT}</span>
        </p>
        <p className="mt-2 text-xs text-slate-500">
          You did not tap {FAKE_DOMAIN}. Email moved to spam.
        </p>
        <p className="mt-4 text-center text-xs text-slate-400">{SCAM_EMAIL_ADDRESS}</p>
      </div>
    </EmailShell>
  );
}
