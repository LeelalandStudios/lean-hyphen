import {
  PATH_IGNORE_EXTRA,
  RAFI_SCAM_NUMBER,
  RAFI_THREAD,
} from "../../../content/scenario3.js";
import GroupChatThread from "../../../components/whatsapp/GroupChatThread.jsx";
import WhatsAppShell from "../../../components/whatsapp/WhatsAppShell.jsx";

export default function WhatsAppRafiIgnoredScreen() {
  const messages = [
    ...RAFI_THREAD.map((m) => ({
      type: "text",
      sender: m.sender,
      text: m.text,
      time: m.time,
    })),
    ...PATH_IGNORE_EXTRA.map((m) => ({
      type: "text",
      sender: m.sender,
      text: m.text,
      time: m.time,
    })),
  ];

  return (
    <WhatsAppShell title={RAFI_SCAM_NUMBER} subtitle="not in your contacts">
      <GroupChatThread messages={messages} />
      <p className="mx-3 mb-4 rounded-xl bg-slate-100 px-3 py-2 text-center text-xs text-slate-600">
        You didn't reply — but you also didn't verify with a call.
      </p>
    </WhatsAppShell>
  );
}
