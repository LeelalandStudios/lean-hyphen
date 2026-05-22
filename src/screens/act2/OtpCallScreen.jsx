import { scripts } from "../../content/scripts.js";
import StatusBar from "../../components/phone/StatusBar.jsx";
import Bubble from "../../components/ui/Bubble.jsx";

const OTP_CALL_SCRIPT = [
  { text: scripts.otpCall1 },
  { text: "What should I do?", mine: true },
  { text: scripts.otpCall2 },
  { text: scripts.otpSms },
  { text: scripts.otpPressure },
  { text: "Did you receive any OTP?" },
  { text: "Yes, received just now.", mine: true },
  {
    text: "That is the upgrade verification code. Tell me quickly before the session expires.",
  },
];

export default function OtpCallScreen() {
  return (
    <div className="relative h-full overflow-y-auto bg-slate-950 p-6 pt-20 text-white">
      <StatusBar />
      <div className="text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-green-600/30 text-4xl ring-2 ring-green-500">
          📞
        </div>
        <h1 className="text-2xl font-bold">Unknown Number</h1>
        <p className="text-xs text-white/50">On speaker — static</p>
      </div>

      <div className="mt-8 space-y-4 pb-12 text-sm">
        {OTP_CALL_SCRIPT.map((line, index) => (
          <Bubble key={index} mine={line.mine}>
            {line.text}
          </Bubble>
        ))}
      </div>

      <div className="sticky bottom-4 mx-auto w-fit rounded-full bg-red-600 px-6 py-3 text-sm font-semibold">
        Share OTP
      </div>
    </div>
  );
}
