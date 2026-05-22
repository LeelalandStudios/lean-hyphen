/**
 * Phase 1 registry — static screens by act / scene.
 */
import LockScreen from "../screens/LockScreen.jsx";
import HomeScreen from "../screens/HomeScreen.jsx";
import DrawerScreen from "../screens/DrawerScreen.jsx";
import HomeScene1NotificationScreen from "../screens/act1/HomeScene1NotificationScreen.jsx";
import WhatsAppInboxScreen from "../screens/apps/WhatsAppInboxScreen.jsx";
import WhatsAppGroupCasualScreen from "../screens/act1/WhatsAppGroupCasualScreen.jsx";
import WhatsAppPaytmDialogScreen from "../screens/act1/WhatsAppPaytmDialogScreen.jsx";
import WhatsAppInfographicSharedScreen from "../screens/act1/WhatsAppInfographicSharedScreen.jsx";
import InfographicViewerScreen from "../screens/act1/InfographicViewerScreen.jsx";
import InfographicSavedScreen from "../screens/act1/InfographicSavedScreen.jsx";
import WhatsAppZackGiftHookScreen from "../screens/act3/WhatsAppZackGiftHookScreen.jsx";
import MessagesPhonepeInboxScreen from "../screens/act3/MessagesPhonepeInboxScreen.jsx";
import MessagesPhonepeScamThreadScreen from "../screens/act3/MessagesPhonepeScamThreadScreen.jsx";
import PhonePeWalletScreen from "../screens/act3/PhonePeWalletScreen.jsx";
import ChromePhonepeFakeLoginScreen from "../screens/act3/ChromePhonepeFakeLoginScreen.jsx";
import PhonePeWalletZeroScreen from "../screens/act3/PhonePeWalletZeroScreen.jsx";
import WhatsAppGroupPathAScreen from "../screens/act3/WhatsAppGroupPathAScreen.jsx";
import MessagesPhonepeDeletedScreen from "../screens/act3/MessagesPhonepeDeletedScreen.jsx";
import WhatsAppGroupPathBScreen from "../screens/act3/WhatsAppGroupPathBScreen.jsx";
import WhatsAppGroupPathCScreen from "../screens/act3/WhatsAppGroupPathCScreen.jsx";
import WhatsAppGroupFoodPlanningScreen from "../screens/act3/zomato/WhatsAppGroupFoodPlanningScreen.jsx";
import WhatsAppGroupZomatoForwardScreen from "../screens/act3/zomato/WhatsAppGroupZomatoForwardScreen.jsx";
import WhatsAppGroupZomatoSafeScreen from "../screens/act3/zomato/WhatsAppGroupZomatoSafeScreen.jsx";
import MessagesOtpInboxScreen from "../screens/act3/scenario2/MessagesOtpInboxScreen.jsx";
import MessagesPaytmOtpScreen from "../screens/act3/scenario2/MessagesPaytmOtpScreen.jsx";
import MessagesUnknownOtpThreadScreen from "../screens/act3/scenario2/MessagesUnknownOtpThreadScreen.jsx";
import MessagesOtpIgnoredScreen from "../screens/act3/scenario2/MessagesOtpIgnoredScreen.jsx";
import MessagesOtpSharedScreen from "../screens/act3/scenario2/MessagesOtpSharedScreen.jsx";
import PhonePeWalletBalanceScreen from "../screens/act3/PhonePeWalletBalanceScreen.jsx";
import WhatsAppGroupScenario2PathBScreen from "../screens/act3/scenario2/WhatsAppGroupScenario2PathBScreen.jsx";
import WhatsAppGroupScenario2WrongScreen from "../screens/act3/scenario2/WhatsAppGroupScenario2WrongScreen.jsx";
import HomeNewsNotificationScreen from "../screens/act3/HomeNewsNotificationScreen.jsx";
import NewsFeedScreen from "../screens/apps/NewsFeedScreen.jsx";
import NewsArticleScreen from "../screens/apps/NewsArticleScreen.jsx";
import WhatsAppInboxScenario3Screen from "../screens/act3/scenario3/WhatsAppInboxScenario3Screen.jsx";
import MessagesFreeFireOtpScreen from "../screens/act3/scenario3/MessagesFreeFireOtpScreen.jsx";
import WhatsAppRafiThreadScreen from "../screens/act3/scenario3/WhatsAppRafiThreadScreen.jsx";
import IncomingCallRafiScreen from "../screens/act3/scenario3/IncomingCallRafiScreen.jsx";
import RafiCallVerifiedScreen from "../screens/act3/scenario3/RafiCallVerifiedScreen.jsx";
import WhatsAppRafiOtpSentScreen from "../screens/act3/scenario3/WhatsAppRafiOtpSentScreen.jsx";
import FreeFireScenario3DrainedScreen from "../screens/act3/scenario3/FreeFireScenario3DrainedScreen.jsx";
import WhatsAppRafiIgnoredScreen from "../screens/act3/scenario3/WhatsAppRafiIgnoredScreen.jsx";
import NewsArticleShareScreen from "../screens/act3/scenario3/NewsArticleShareScreen.jsx";
import WhatsAppGroupNewsShareScreen from "../screens/act3/scenario3/WhatsAppGroupNewsShareScreen.jsx";
import MailInboxScenario4Screen from "../screens/act3/scenario4/MailInboxScenario4Screen.jsx";
import MailScamEmailScreen from "../screens/act3/scenario4/MailScamEmailScreen.jsx";
import ChromeSchoolPortalScreen from "../screens/act3/scenario4/ChromeSchoolPortalScreen.jsx";
import MailDomainCheckScreen from "../screens/act3/scenario4/MailDomainCheckScreen.jsx";
import MailForwardedToGroupScreen from "../screens/act3/scenario4/MailForwardedToGroupScreen.jsx";
import Scenario4SharePromptScreen from "../screens/act3/scenario4/Scenario4SharePromptScreen.jsx";
import Scenario4TapSharePromptScreen from "../screens/act3/scenario4/Scenario4TapSharePromptScreen.jsx";
import MailInboxAfterTapScreen from "../screens/act3/scenario4/MailInboxAfterTapScreen.jsx";
import MailOfficialCompromiseScreen from "../screens/act3/scenario4/MailOfficialCompromiseScreen.jsx";
import WhatsAppGroupScenario4ShareScreen from "../screens/act3/scenario4/WhatsAppGroupScenario4ShareScreen.jsx";
import MLBBLobbyScenario5Screen from "../screens/act3/scenario5/MLBBLobbyScenario5Screen.jsx";
import MLBBAdminDmScreen from "../screens/act3/scenario5/MLBBAdminDmScreen.jsx";
import MLBBDrainedScreen from "../screens/act3/scenario5/MLBBDrainedScreen.jsx";
import MLBBBlockSafeScreen from "../screens/act3/scenario5/MLBBBlockSafeScreen.jsx";
import MLBBVerifyLinkScreen from "../screens/act3/scenario5/MLBBVerifyLinkScreen.jsx";
import Scenario5SharePromptScreen from "../screens/act3/scenario5/Scenario5SharePromptScreen.jsx";
import WhatsAppGroupScenario5ShareScreen from "../screens/act3/scenario5/WhatsAppGroupScenario5ShareScreen.jsx";
import WhatsAppGroupAct4LinkScreen from "../screens/act4/WhatsAppGroupAct4LinkScreen.jsx";
import SpotTheIssueIntroScreen from "../screens/act4/SpotTheIssueIntroScreen.jsx";
import SpotTheIssuePuzzleScreen from "../screens/act4/SpotTheIssuePuzzleScreen.jsx";
import SpotTheIssueCompleteScreen from "../screens/act4/SpotTheIssueCompleteScreen.jsx";
import WhatsAppGroupAct4CompleteScreen from "../screens/act4/WhatsAppGroupAct4CompleteScreen.jsx";
import {
  PHONEPE_DEBIT_AMOUNT,
  PHONEPE_WALLET_S2_SAFE,
  PHONEPE_WALLET_S2_STOLEN,
} from "./scenario2.js";

/** @type {{ act: string, screens: { id: string, label: string, Component: React.ComponentType, props?: Record<string, unknown> }[] }[]} */
export const STATIC_SCREEN_GROUPS = [
  {
    act: "ACT 1 — Scene 1 (Homescreen)",
    screens: [
      { id: "lock", label: "Lock screen", Component: LockScreen },
      {
        id: "home_default",
        label: "Home — no notifications",
        Component: HomeScreen,
        props: { variant: "default" },
      },
      { id: "drawer", label: "App drawer", Component: DrawerScreen },
      {
        id: "home_whatsapp_activity",
        label: "Home — WhatsApp activity (end of Scene 1)",
        Component: HomeScene1NotificationScreen,
      },
    ],
  },
  {
    act: "ACT 1 — Scene 2 (Friends + infographic)",
    screens: [
      {
        id: "whatsapp_group_casual",
        label: "1. Group chat — earlier messages",
        Component: WhatsAppGroupCasualScreen,
      },
      {
        id: "whatsapp_inbox",
        label: "2. WhatsApp inbox — friends group on top",
        Component: WhatsAppInboxScreen,
      },
      {
        id: "whatsapp_paytm_dialog",
        label: "3. Group chat — Paytm scam arrives",
        Component: WhatsAppPaytmDialogScreen,
      },
      {
        id: "whatsapp_infographic_shared",
        label: "4. Group chat — Priya shares infographic",
        Component: WhatsAppInfographicSharedScreen,
      },
      {
        id: "infographic_viewer",
        label: "5. Open infographic (full screen)",
        Component: InfographicViewerScreen,
      },
      {
        id: "infographic_saved",
        label: "6. Saved to phone — Downloads",
        Component: InfographicSavedScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 1: Setup → choice",
    screens: [
      {
        id: "s1_whatsapp_zack_gift_hook",
        label: "1. WhatsApp — Zack (month end, birthday gift)",
        Component: WhatsAppZackGiftHookScreen,
      },
      {
        id: "s1_phonepe_wallet",
        label: "2. PhonePe — wallet (₹200)",
        Component: PhonePeWalletScreen,
      },
      {
        id: "s1_home_phonepe_notification",
        label: "3. Home — Messages notification",
        Component: HomeScreen,
        props: { variant: "phonepe_notice" },
      },
      {
        id: "s1_messages_inbox",
        label: "4. Messages inbox",
        Component: MessagesPhonepeInboxScreen,
      },
      {
        id: "s1_messages_thread",
        label: "5. Messages thread + choices",
        Component: MessagesPhonepeScamThreadScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 1: Path A (tap link)",
    screens: [
      {
        id: "s1_path_a_chrome",
        label: "A1. Chrome — fake PhonePe login",
        Component: ChromePhonepeFakeLoginScreen,
      },
      {
        id: "s1_path_a_phonepe_zero",
        label: "A2. PhonePe — balance ₹0",
        Component: PhonePeWalletZeroScreen,
      },
      {
        id: "s1_path_a_group",
        label: "A3. Group — you lost money + Priya",
        Component: WhatsAppGroupPathAScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 1: Path B (ignore & delete)",
    screens: [
      {
        id: "s1_path_b_deleted",
        label: "B1. Messages — scam deleted",
        Component: MessagesPhonepeDeletedScreen,
      },
      {
        id: "s1_path_b_group",
        label: "B2. Group — Zack lost ₹3,000 + Priya",
        Component: WhatsAppGroupPathBScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 1: Path C (forward)",
    screens: [
      {
        id: "s1_path_c_group",
        label: "C1. Group — forward, angry, Priya",
        Component: WhatsAppGroupPathCScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Zomato mini (after Scenario 1)",
    screens: [
      {
        id: "zomato_food_planning",
        label: "1. Group — planning to order food",
        Component: WhatsAppGroupFoodPlanningScreen,
      },
      {
        id: "zomato_aryan_forward",
        label: "2. Group — Aryan forwards Zomato voucher + action",
        Component: WhatsAppGroupZomatoForwardScreen,
      },
      {
        id: "zomato_safe_reply",
        label: "3. Group — you warn the group (can't get scammed again)",
        Component: WhatsAppGroupZomatoSafeScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 2: Setup → choice",
    screens: [
      {
        id: "s2_home_otp",
        label: "1. Home — unknown number wants OTP",
        Component: HomeScreen,
        props: { variant: "otp_wrong_number" },
      },
      {
        id: "s2_messages_inbox",
        label: "2. Messages inbox — Paytm + unknown",
        Component: MessagesOtpInboxScreen,
      },
      {
        id: "s2_paytm_otp",
        label: "3. Paytm — automated OTP (do not share)",
        Component: MessagesPaytmOtpScreen,
      },
      {
        id: "s2_unknown_thread",
        label: "4. Unknown thread + choices",
        Component: MessagesUnknownOtpThreadScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 2: Path B (ignore OTP)",
    screens: [
      {
        id: "s2_path_b_messages",
        label: "B1. Messages — ignored, stranger pressures",
        Component: MessagesOtpIgnoredScreen,
      },
      {
        id: "s2_path_b_wallet",
        label: "B2. PhonePe — still ₹200",
        Component: PhonePeWalletBalanceScreen,
        props: {
          balance: PHONEPE_WALLET_S2_SAFE,
          subtitle: "Wallet balance — unchanged",
        },
      },
      {
        id: "s2_path_b_group",
        label: "B3. Group — don't share + Priya",
        Component: WhatsAppGroupScenario2PathBScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 2: Path A/C (shared OTP)",
    screens: [
      {
        id: "s2_path_wrong_sent",
        label: "W1. Messages — you sent the OTP",
        Component: MessagesOtpSharedScreen,
      },
      {
        id: "s2_path_wrong_wallet",
        label: "W2. PhonePe — ₹200 → ₹47",
        Component: PhonePeWalletBalanceScreen,
        props: {
          balance: PHONEPE_WALLET_S2_STOLEN,
          subtitle: "Wallet balance",
          debitNote: `₹${PHONEPE_DEBIT_AMOUNT} debited — account logged in from another device after the code was shared.`,
        },
      },
      {
        id: "s2_path_wrong_group",
        label: "W3. Group — you lost money + Priya",
        Component: WhatsAppGroupScenario2WrongScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 3: Setup → choice",
    screens: [
      {
        id: "s3_home_rafi",
        label: "1. Home — WhatsApp (fake Rafi)",
        Component: HomeScreen,
        props: { variant: "whatsapp_rafi" },
      },
      {
        id: "s3_whatsapp_inbox",
        label: "2. WhatsApp inbox — unknown Rafi on top",
        Component: WhatsAppInboxScenario3Screen,
      },
      {
        id: "s3_messages_ff_otp",
        label: "3. Messages — Free Fire OTP (yours)",
        Component: MessagesFreeFireOtpScreen,
      },
      {
        id: "s3_rafi_thread",
        label: "4. WhatsApp — Rafi thread + choices",
        Component: WhatsAppRafiThreadScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 3: Path call (verify)",
    screens: [
      {
        id: "s3_path_call_incoming",
        label: "C1. Call — Rafi (saved contact)",
        Component: IncomingCallRafiScreen,
      },
      {
        id: "s3_path_call_verified",
        label: "C2. On call — Rafi says he didn't text",
        Component: RafiCallVerifiedScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 3: Path send OTP",
    screens: [
      {
        id: "s3_path_send_chat",
        label: "S1. WhatsApp — you sent the OTP",
        Component: WhatsAppRafiOtpSentScreen,
      },
      {
        id: "s3_path_send_ff",
        label: "S2. Free Fire — account drained",
        Component: FreeFireScenario3DrainedScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 3: Path ignore",
    screens: [
      {
        id: "s3_path_ignore_chat",
        label: "I1. WhatsApp — ignored, scammer pushes",
        Component: WhatsAppRafiIgnoredScreen,
      },
    ],
  },
  {
    act: "ACT 3 — News (after Scenario 3)",
    screens: [
      {
        id: "news_home_notification",
        label: "1. Home — Teen Wire notification",
        Component: HomeNewsNotificationScreen,
      },
      {
        id: "news_feed",
        label: "2. News — Inshorts-style feed",
        Component: NewsFeedScreen,
      },
      {
        id: "news_friend_otp_article",
        label: "3. News — full article",
        Component: NewsArticleScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Share article (path: called Rafi)",
    screens: [
      {
        id: "news_share_call",
        label: "1. Article — share to group (called Rafi)",
        Component: NewsArticleShareScreen,
        props: { path: "call" },
      },
      {
        id: "news_group_call",
        label: "2. Group — friends react + Priya",
        Component: WhatsAppGroupNewsShareScreen,
        props: { path: "call" },
      },
    ],
  },
  {
    act: "ACT 3 — Share article (path: sent OTP)",
    screens: [
      {
        id: "news_share_send",
        label: "1. Article — share to group (sent OTP)",
        Component: NewsArticleShareScreen,
        props: { path: "send" },
      },
      {
        id: "news_group_send",
        label: "2. Group — friends react + Priya",
        Component: WhatsAppGroupNewsShareScreen,
        props: { path: "send" },
      },
    ],
  },
  {
    act: "ACT 3 — Share article (path: ignored)",
    screens: [
      {
        id: "news_share_ignore",
        label: "1. Article — share to group (ignored)",
        Component: NewsArticleShareScreen,
        props: { path: "ignore" },
      },
      {
        id: "news_group_ignore",
        label: "2. Group — friends react + Priya",
        Component: WhatsAppGroupNewsShareScreen,
        props: { path: "ignore" },
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 4: Setup → choice",
    screens: [
      {
        id: "s4_home_mail",
        label: "1. Home — school fee email",
        Component: HomeScreen,
        props: { variant: "mail_school_fee" },
      },
      {
        id: "s4_mail_inbox",
        label: "2. Gmail — inbox",
        Component: MailInboxScenario4Screen,
      },
      {
        id: "s4_mail_scam",
        label: "3. Gmail — scam email + choices",
        Component: MailScamEmailScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 4: Path tap (fake portal)",
    screens: [
      {
        id: "s4_path_tap_chrome",
        label: "1. Chrome — fake school portal",
        Component: ChromeSchoolPortalScreen,
      },
      {
        id: "s4_path_tap_inbox",
        label: "2. Gmail — official security email arrives",
        Component: MailInboxAfterTapScreen,
      },
      {
        id: "s4_path_tap_official_email",
        label: "3. Gmail — account compromised (official)",
        Component: MailOfficialCompromiseScreen,
      },
      {
        id: "s4_share_tap",
        label: "4. Share official school email to group",
        Component: Scenario4TapSharePromptScreen,
      },
      {
        id: "s4_group_tap",
        label: "5. Group — forwarded official alert + Priya",
        Component: WhatsAppGroupScenario4ShareScreen,
        props: { path: "tap" },
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 4: Path check (spot domain)",
    screens: [
      {
        id: "s4_path_check_domain",
        label: "1. Gmail — sch00l zeros spotted",
        Component: MailDomainCheckScreen,
      },
      {
        id: "s4_share_check",
        label: "2. Debrief — share warning to group",
        Component: Scenario4SharePromptScreen,
        props: { path: "check" },
      },
      {
        id: "s4_group_check",
        label: "3. Group — friends react + Priya",
        Component: WhatsAppGroupScenario4ShareScreen,
        props: { path: "check" },
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 4: Path forward (spread link)",
    screens: [
      {
        id: "s4_path_forward_group",
        label: "1. WhatsApp — forwarded scam email",
        Component: MailForwardedToGroupScreen,
      },
      {
        id: "s4_share_forward",
        label: "2. Debrief — share warning to group",
        Component: Scenario4SharePromptScreen,
        props: { path: "forward" },
      },
      {
        id: "s4_group_forward",
        label: "3. Group — friends react + Priya",
        Component: WhatsAppGroupScenario4ShareScreen,
        props: { path: "forward" },
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 5: Setup → choice",
    screens: [
      {
        id: "s5_home_mlbb",
        label: "1. Home — MLBB ban warning",
        Component: HomeScreen,
        props: { variant: "mlbb_admin" },
      },
      {
        id: "s5_mlbb_lobby",
        label: "2. MLBB — lobby + admin mail",
        Component: MLBBLobbyScenario5Screen,
      },
      {
        id: "s5_mlbb_admin_dm",
        label: "3. MLBB — fake admin DM + choices",
        Component: MLBBAdminDmScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 5: Path reply (password)",
    screens: [
      {
        id: "s5_path_reply_drained",
        label: "R1. MLBB — account drained",
        Component: MLBBDrainedScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 5: Path block (safe)",
    screens: [
      {
        id: "s5_path_block_safe",
        label: "B1. MLBB — reported fake admin",
        Component: MLBBBlockSafeScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 5: Path tap (verify link)",
    screens: [
      {
        id: "s5_path_tap_apk",
        label: "L1. Fake verify APK download",
        Component: MLBBVerifyLinkScreen,
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 5: Share to group (path: reply)",
    screens: [
      {
        id: "s5_share_reply",
        label: "1. Debrief — share warning",
        Component: Scenario5SharePromptScreen,
        props: { path: "reply" },
      },
      {
        id: "s5_group_reply",
        label: "2. Group — friends + Priya",
        Component: WhatsAppGroupScenario5ShareScreen,
        props: { path: "reply" },
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 5: Share to group (path: block)",
    screens: [
      {
        id: "s5_share_block",
        label: "1. Debrief — share warning",
        Component: Scenario5SharePromptScreen,
        props: { path: "block" },
      },
      {
        id: "s5_group_block",
        label: "2. Group — friends + Priya",
        Component: WhatsAppGroupScenario5ShareScreen,
        props: { path: "block" },
      },
    ],
  },
  {
    act: "ACT 3 — Scenario 5: Share to group (path: tap)",
    screens: [
      {
        id: "s5_share_tap",
        label: "1. Debrief — share warning",
        Component: Scenario5SharePromptScreen,
        props: { path: "tap" },
      },
      {
        id: "s5_group_tap",
        label: "2. Group — friends + Priya",
        Component: WhatsAppGroupScenario5ShareScreen,
        props: { path: "tap" },
      },
    ],
  },
  {
    act: "ACT 4 — Spot the Issue (from group link)",
    screens: [
      {
        id: "act4_group_link",
        label: "1. Group — Priya shares challenge link",
        Component: WhatsAppGroupAct4LinkScreen,
      },
      {
        id: "act4_game_intro",
        label: "2. Game — intro (opened from link)",
        Component: SpotTheIssueIntroScreen,
      },
      {
        id: "act4_puzzle_email",
        label: "3. Round 1 — tap red flags (email)",
        Component: SpotTheIssuePuzzleScreen,
        props: { puzzleId: "email" },
      },
      {
        id: "act4_puzzle_message",
        label: "4. Round 2 — tap red flags (SMS)",
        Component: SpotTheIssuePuzzleScreen,
        props: { puzzleId: "message" },
      },
      {
        id: "act4_puzzle_whatsapp",
        label: "5. Round 3 — tap red flags (game admin)",
        Component: SpotTheIssuePuzzleScreen,
        props: { puzzleId: "whatsapp" },
      },
      {
        id: "act4_game_complete",
        label: "6. Game — all rounds complete",
        Component: SpotTheIssueCompleteScreen,
      },
      {
        id: "act4_group_complete",
        label: "7. Group — back from challenge + Priya",
        Component: WhatsAppGroupAct4CompleteScreen,
      },
    ],
  },
];

export const STATIC_SCREENS = STATIC_SCREEN_GROUPS.flatMap((g) => g.screens);

export const DEFAULT_STATIC_SCREEN_ID = "lock";
