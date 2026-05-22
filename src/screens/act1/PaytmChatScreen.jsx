import { PAYTM_SENDER } from "../../content/constants.js";
import { scripts } from "../../content/scripts.js";
import AppScreen from "../../components/phone/AppScreen.jsx";
import SavePaytmDialog from "../../components/messages/SavePaytmDialog.jsx";
import MessageBody from "../../components/ui/MessageBody.jsx";

export default function PaytmChatScreen() {
  return (
    <AppScreen title={PAYTM_SENDER} appIcon="💬">
      <div className="p-4">
        <div className="rounded-2xl bg-slate-100 p-4">
          <MessageBody text={scripts.paytmFull} />
        </div>
      </div>
      <SavePaytmDialog />
    </AppScreen>
  );
}
