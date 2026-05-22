import { GROUP_SHARE_BY_PATH } from "../../../content/scenario5.js";
import WhatsAppGroupScreen from "../../../components/whatsapp/WhatsAppGroupScreen.jsx";

/** @param {{ path: keyof typeof GROUP_SHARE_BY_PATH }} props */
export default function WhatsAppGroupScenario5ShareScreen({ path }) {
  const share = GROUP_SHARE_BY_PATH[path];
  const subtitles = {
    reply: "Shared warning — sent password to fake admin",
    block: "Shared warning — blocked fake admin",
    tap: "Shared warning — tapped verify link",
  };

  return (
    <WhatsAppGroupScreen messages={share.groupMessages} subtitle={subtitles[path]} />
  );
}
