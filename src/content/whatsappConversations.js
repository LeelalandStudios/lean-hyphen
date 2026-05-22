/** Friends group pinned at top of WhatsApp inbox. */
export const FRIENDS_GROUP = {
  id: "friends-group",
  type: "group",
  title: "Aryan, Mei, Zack, Priya",
  members: ["Aryan", "Mei", "Zack", "Priya"],
  preview: "Priya: WAIT. Don't click that…",
  time: "3:50 PM",
  unread: 6,
};

/** Other chats shown below the group (static decoys). */
export const WHATSAPP_OTHER_CHATS = [
  {
    id: "mom",
    type: "direct",
    title: "Mom",
    preview: "Beta, call me when you're free",
    time: "1:08 PM",
    unread: 0,
  },
  {
    id: "dad",
    type: "direct",
    title: "Dad",
    preview: "👍",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "cousin-rohan",
    type: "direct",
    title: "Rohan",
    preview: "Match highlights are insane",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "school-fc",
    type: "group",
    title: "Class 10 — FC",
    members: ["Neha", "Ishaan", "12 others"],
    preview: "Neha: Who has the physics notes?",
    time: "Tuesday",
    unread: 0,
  },
  {
    id: "delivery-updates",
    type: "direct",
    title: "Delivery Updates",
    preview: "Your order is out for delivery",
    time: "Monday",
    unread: 0,
  },
  {
    id: "unknown-otp",
    type: "direct",
    title: "+91 93333 22211",
    preview: "Hi beta, this is Abhishek's mum…",
    time: "Monday",
    unread: 0,
  },
];

export const WHATSAPP_INBOX = [FRIENDS_GROUP, ...WHATSAPP_OTHER_CHATS];

/** Messages inside the friends group chat (static thread). */
export const FRIENDS_GROUP_MESSAGES = [
  { sender: "Aryan", text: "Anyone free after tuition today?", time: "3:38 PM" },
  { sender: "Mei", text: "I can join around 5", time: "3:39 PM" },
  { sender: "Priya", text: "Same, but only for an hour 📚", time: "3:40 PM" },
  { sender: "Zack", text: "See you all at 5? 🎮", time: "3:42 PM" },
  { sender: "You", text: "Yep, I'll be there", time: "3:43 PM", mine: true },
];
