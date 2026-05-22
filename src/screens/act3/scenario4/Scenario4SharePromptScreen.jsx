import { GROUP_SHARE_BY_PATH } from "../../../content/scenario4.js";
import GroupSharePromptScreen from "../../../components/whatsapp/GroupSharePromptScreen.jsx";

/** @param {{ path: keyof typeof GROUP_SHARE_BY_PATH }} props */
export default function Scenario4SharePromptScreen({ path }) {
  const share = GROUP_SHARE_BY_PATH[path];
  return (
    <GroupSharePromptScreen
      heading="Tell your friends"
      subtitle="School fee phishing"
      shareLabel={share.shareLabel}
      sharePreview={share.sharePreview}
      previewMessage={share.previewMessage}
    />
  );
}
