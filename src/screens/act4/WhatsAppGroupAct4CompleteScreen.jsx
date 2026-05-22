import { ACT4_GROUP_COMPLETE_MESSAGES } from "../../content/act4SpotTheIssue.js";
import WhatsAppGroupScreen from "../../components/whatsapp/WhatsAppGroupScreen.jsx";

export default function WhatsAppGroupAct4CompleteScreen() {
  return (
    <WhatsAppGroupScreen
      messages={ACT4_GROUP_COMPLETE_MESSAGES}
      subtitle="After Spot the Scam challenge"
    />
  );
}
