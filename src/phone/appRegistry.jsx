import MessagesApp from "./MessagesApp.jsx";
import WhatsAppApp from "./WhatsAppApp.jsx";
import ChromeApp from "./apps/ChromeApp.jsx";
import PhoneApp from "./apps/PhoneApp.jsx";
import FreeFireApp from "./apps/FreeFireApp.jsx";
import MailApp from "./apps/MailApp.jsx";
import GenericShellApp from "./apps/GenericShellApp.jsx";
import PhonePeWalletScreen from "../screens/act3/PhonePeWalletScreen.jsx";
import NewsFeedScreen from "../screens/apps/NewsFeedScreen.jsx";
import MLBBLobbyScenario5Screen from "../screens/act3/scenario5/MLBBLobbyScenario5Screen.jsx";

/**
 * @param {string} appId
 * @param {{ phone: import('./phoneStore.js').ReturnType<typeof import('./phoneStore.js').usePhoneStore>, onBack: () => void, onBackToHome: () => void, scenarioThreadId?: string, onOpenScenarioThread?: () => void }} ctx
 */
export function renderPhoneApp(appId, ctx) {
  const { phone, onBack, onBackToHome, scenarioThreadId, onOpenScenarioThread } = ctx;

  switch (appId) {
    case "messages":
      return (
        <MessagesApp
          phone={phone}
          onBack={onBack}
          scenarioThreadId={scenarioThreadId}
          onOpenScenarioThread={onOpenScenarioThread}
        />
      );
    case "whatsapp":
      return <WhatsAppApp onBackToHome={onBack} />;
    case "phonepe":
      return <PhonePeWalletScreen onBack={onBack} />;
    case "amazon":
      return (
        <GenericShellApp
          title="Amazon"
          emoji="📦"
          tagline="Search Amazon.in"
          onBack={onBack}
          tiles={[
            ["📱", "Mobiles"],
            ["👕", "Fashion"],
            ["📚", "Books"],
            ["🎮", "Gaming"],
            ["🏠", "Home"],
            ["🎁", "Deals"],
          ]}
        />
      );
    case "ludo":
      return (
        <GenericShellApp
          title="Ludo King"
          emoji="🎲"
          tagline="Play with friends"
          onBack={onBack}
          tiles={[
            ["🎮", "Play"],
            ["👥", "Friends"],
            ["🏆", "Leaderboard"],
          ]}
        />
      );
    case "phone":
      return <PhoneApp onBack={onBack} />;
    case "chrome":
      return <ChromeApp onBack={onBack} />;
    case "paytm":
      return (
        <GenericShellApp
          title="Paytm"
          emoji="💙"
          tagline="Paytm Wallet"
          onBack={onBack}
          tiles={[
            ["📲", "Scan"],
            ["💸", "Send"],
            ["📱", "Recharge"],
            ["🎫", "Tickets"],
          ]}
        />
      );
    case "freefire":
      return <FreeFireApp onBack={onBack} />;
    case "camera":
      return (
        <GenericShellApp
          title="Camera"
          emoji="📷"
          tagline="Tap shutter to capture"
          onBack={onBack}
          tiles={[["📸", "Photo"], ["🎥", "Video"], ["✨", "Portrait"]]}
        />
      );
    case "gallery":
      return (
        <GenericShellApp
          title="Gallery"
          emoji="🖼️"
          tagline="Photos & videos"
          onBack={onBack}
          tiles={[
            ["🌅", "Recent"],
            ["📁", "Albums"],
            ["⭐", "Favourites"],
          ]}
        />
      );
    case "instagram":
      return (
        <GenericShellApp
          title="Instagram"
          emoji="📸"
          tagline="Share moments"
          onBack={onBack}
          tiles={[
            ["🏠", "Feed"],
            ["🔍", "Search"],
            ["➕", "Create"],
            ["👤", "Profile"],
          ]}
        />
      );
    case "youtube":
      return (
        <GenericShellApp
          title="YouTube"
          emoji="▶️"
          tagline="What to watch next"
          onBack={onBack}
          tiles={[
            ["🏠", "Home"],
            ["🔥", "Trending"],
            ["📺", "Subs"],
            ["📚", "Library"],
          ]}
        />
      );
    case "spotify":
      return (
        <GenericShellApp
          title="Spotify"
          emoji="🎵"
          tagline="Good evening"
          onBack={onBack}
          tiles={[
            ["🎧", "Liked"],
            ["📻", "Radio"],
            ["🔍", "Search"],
            ["📚", "Library"],
          ]}
        />
      );
    case "mail":
      return <MailApp onBack={onBack} />;
    case "mlbb":
      return <MLBBLobbyScenario5Screen onBack={onBack} />;
    case "news":
      return <NewsFeedScreen onBack={onBack} />;
    default:
      return (
        <GenericShellApp
          title={appId}
          emoji="📱"
          tagline="App not found"
        />
      );
  }
}

/** Map a home notification banner to an app id. */
export function appIdFromNotification(notification) {
  const label = `${notification?.app ?? ""} ${notification?.from ?? ""}`.toLowerCase();
  if (label.includes("whatsapp")) return "whatsapp";
  if (label.includes("message")) return "messages";
  if (label.includes("gmail") || label.includes("mail")) return "mail";
  if (label.includes("teen wire") || label.includes("news")) return "news";
  if (label.includes("legends") || label.includes("mlbb")) return "mlbb";
  if (label.includes("phonepe")) return "phonepe";
  if (label.includes("paytm")) return "paytm";
  if (label.includes("amazon")) return "amazon";
  return "messages";
}
