import {
  ADMIN_DM_THREAD,
  MLBB_ADMIN_NAME,
  MLBB_ADMIN_TAG,
  SCENARIO5_CHOICE_CONTEXT,
  SCENARIO5_CHOICES,
} from "../../../content/scenario5.js";
import GroupChatThread from "../../../components/whatsapp/GroupChatThread.jsx";
import MLBBShell from "../../../components/mlbb/MLBBShell.jsx";
import ScenarioChoiceFooter from "../../../components/messages/ScenarioChoiceFooter.jsx";

export default function MLBBAdminDmScreen() {
  const messages = ADMIN_DM_THREAD.map((m) => ({
    type: "text",
    sender: m.sender,
    text: m.text,
    time: m.time,
  }));

  return (
    <MLBBShell title="Mail · System" footer={<ScenarioChoiceFooter choices={SCENARIO5_CHOICES} />}>
      <div className="border-b border-white/10 px-4 py-3">
        <p className="font-bold text-amber-300">{MLBB_ADMIN_NAME}</p>
        <p className="text-xs text-white/50">{MLBB_ADMIN_TAG}</p>
      </div>
      <div className="p-2">
        <GroupChatThread messages={messages} />
      </div>
      <p className="mx-3 mb-2 rounded-xl bg-amber-500/20 px-3 py-2 text-center text-xs text-amber-100">
        {SCENARIO5_CHOICE_CONTEXT}
      </p>
    </MLBBShell>
  );
}
