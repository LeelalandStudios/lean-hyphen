import { GROUP_SHARE_BY_PATH } from "../../../content/scenario4.js";
import SingleChoiceFooter from "../../../components/whatsapp/SingleChoiceFooter.jsx";
import StatusBar from "../../../components/phone/StatusBar.jsx";

/** Path tap — share the official school compromise email to WhatsApp. */
export default function Scenario4TapSharePromptScreen() {
  const share = GROUP_SHARE_BY_PATH.tap;

  return (
    <div className="relative flex h-full flex-col bg-white pt-12 text-slate-900">
      <StatusBar dark />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-800">
          Share with friends
        </p>
        <h1 className="mt-2 text-lg font-bold leading-snug">
          Forward the school’s security email
        </h1>
        <p className="mt-3 text-sm text-slate-600">{share.sharePreview}</p>
        <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs font-semibold text-blue-900">
            Preview — official email to friends group
          </p>
          <p className="mt-1 text-[10px] font-medium text-blue-700">
            {share.forwardedEmail.subject}
          </p>
          <pre className="mt-2 max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-700">
            {share.forwardedEmail.body}
          </pre>
        </div>
      </div>
      <SingleChoiceFooter label={share.shareLabel} />
    </div>
  );
}
