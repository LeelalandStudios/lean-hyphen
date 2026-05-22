import {
  PATH_B_EXTRA_STRANGER,
  UNKNOWN_OTP_SENDER,
  UNKNOWN_OTP_THREAD,
} from "../../../content/scenario2.js";
import AppScreen from "../../../components/phone/AppScreen.jsx";
import Bubble from "../../../components/ui/Bubble.jsx";

/** Path B — you did not reply; stranger keeps pressuring. */
export default function MessagesOtpIgnoredScreen() {
  return (
    <AppScreen title={UNKNOWN_OTP_SENDER} appIcon="💬">
      <div className="space-y-3 p-4">
        <p className="text-center text-xs text-slate-500">
          You did not reply or share the code
        </p>
        {UNKNOWN_OTP_THREAD.map((msg) => (
          <Bubble key={msg.time}>{msg.text}</Bubble>
        ))}
        {PATH_B_EXTRA_STRANGER.map((msg) => (
          <Bubble key={msg.time}>{msg.text}</Bubble>
        ))}
      </div>
    </AppScreen>
  );
}
