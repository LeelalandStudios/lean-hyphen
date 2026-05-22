import { WHATSAPP_OTP_SENDER } from "../../content/constants.js";
import { scripts } from "../../content/scripts.js";
import AppScreen from "../../components/phone/AppScreen.jsx";

export default function OtpRewardScreen() {
  return (
    <AppScreen title="WhatsApp" appIcon="💬">
      <div className="p-4">
        <div className="rounded-2xl bg-green-100 p-4">
          <b>{WHATSAPP_OTP_SENDER}</b>
          <p className="mt-2 text-sm">{scripts.otpReward}</p>
        </div>
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          User starts typing but stops midway in suspicion…
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-2xl bg-red-600 p-4 font-medium text-white"
        >
          Block Number
        </button>
      </div>
    </AppScreen>
  );
}
