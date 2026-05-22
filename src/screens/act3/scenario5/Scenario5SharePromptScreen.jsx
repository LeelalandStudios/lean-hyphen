import { GROUP_SHARE_BY_PATH } from "../../../content/scenario5.js";
import GroupSharePromptScreen from "../../../components/whatsapp/GroupSharePromptScreen.jsx";

/** @param {{ path: keyof typeof GROUP_SHARE_BY_PATH }} props */
export default function Scenario5SharePromptScreen({ path }) {
  const share = GROUP_SHARE_BY_PATH[path];
  return (
    <GroupSharePromptScreen
      heading="Tell your friends"
      subtitle="Fake MLBB admin"
      shareLabel={share.shareLabel}
      sharePreview={share.sharePreview}
      previewMessage={share.previewMessage}
    />
  );
}
