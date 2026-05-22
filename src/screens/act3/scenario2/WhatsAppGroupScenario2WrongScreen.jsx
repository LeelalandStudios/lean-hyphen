import { PATH_WRONG_GROUP_MESSAGES } from "../../../content/scenario2.js";
import WhatsAppGroupScreen from "../../../components/whatsapp/WhatsAppGroupScreen.jsx";

export default function WhatsAppGroupScenario2WrongScreen() {
  return (
    <WhatsAppGroupScreen
      messages={PATH_WRONG_GROUP_MESSAGES}
      subtitle="after OTP shared"
    />
  );
}
