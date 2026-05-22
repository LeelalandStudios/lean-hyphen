import { PATH_B_GROUP_MESSAGES } from "../../../content/scenario2.js";
import WhatsAppGroupScreen from "../../../components/whatsapp/WhatsAppGroupScreen.jsx";

export default function WhatsAppGroupScenario2PathBScreen() {
  return (
    <WhatsAppGroupScreen
      messages={PATH_B_GROUP_MESSAGES}
      subtitle="OTP not shared"
    />
  );
}
