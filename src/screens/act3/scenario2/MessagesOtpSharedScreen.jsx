import {
  PATH_WRONG_YOU_REPLY,
  UNKNOWN_OTP_SENDER,
  UNKNOWN_OTP_THREAD,
} from "../../../content/scenario2.js";
import AppScreen from "../../../components/phone/AppScreen.jsx";
import Bubble from "../../../components/ui/Bubble.jsx";

/** Path wrong — you sent the OTP in the thread. */
export default function MessagesOtpSharedScreen() {
  return (
    <AppScreen title={UNKNOWN_OTP_SENDER} appIcon="💬">
      <div className="space-y-3 p-4">
        {UNKNOWN_OTP_THREAD.slice(0, 2).map((msg) => (
          <Bubble key={msg.time}>{msg.text}</Bubble>
        ))}
        <Bubble mine>{PATH_WRONG_YOU_REPLY.text}</Bubble>
        <p className="text-center text-xs text-slate-500">
          Code sent — check PhonePe wallet
        </p>
      </div>
    </AppScreen>
  );
}
