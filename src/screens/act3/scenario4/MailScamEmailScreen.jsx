import {
  SCAM_EMAIL_ADDRESS,
  SCAM_EMAIL_BODY,
  SCAM_EMAIL_SENDER,
  SCAM_EMAIL_SUBJECT,
  SCENARIO4_CHOICE_CONTEXT,
  SCENARIO4_CHOICES,
} from "../../../content/scenario4.js";
import EmailShell from "../../../components/email/EmailShell.jsx";
import ScenarioChoiceFooter from "../../../components/messages/ScenarioChoiceFooter.jsx";

export default function MailScamEmailScreen() {
  return (
    <EmailShell
      title="Inbox"
      footer={<ScenarioChoiceFooter choices={SCENARIO4_CHOICES} />}
    >
      <div className="p-4">
        <h2 className="text-lg font-bold">{SCAM_EMAIL_SUBJECT}</h2>
        <p className="mt-2 text-xs text-slate-500">
          From: {SCAM_EMAIL_SENDER} &lt;{SCAM_EMAIL_ADDRESS}&gt;
        </p>
        <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">
          {SCAM_EMAIL_BODY}
        </pre>
        <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-900">
          {SCENARIO4_CHOICE_CONTEXT}
        </p>
      </div>
    </EmailShell>
  );
}
