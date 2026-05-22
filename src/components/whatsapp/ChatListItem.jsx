import { FRIENDS_GROUP } from "../../content/whatsappConversations.js";

function GroupAvatar({ members }) {
  const colors = ["bg-sky-500", "bg-rose-500", "bg-amber-500", "bg-violet-500"];
  return (
    <div className="relative grid h-12 w-12 shrink-0 grid-cols-2 gap-0.5 overflow-hidden rounded-full bg-[#dfe5e7] p-0.5">
      {members.slice(0, 4).map((name, i) => (
        <div
          key={name}
          className={`grid place-items-center rounded-sm text-[8px] font-bold text-white ${colors[i]}`}
        >
          {name[0]}
        </div>
      ))}
    </div>
  );
}

function DirectAvatar({ title }) {
  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25d366] text-lg font-semibold text-white">
      {title[0]}
    </div>
  );
}

/**
 * @param {{ chat: typeof FRIENDS_GROUP, pinned?: boolean }} props
 */
export default function ChatListItem({ chat, pinned = false }) {
  const isGroup = chat.type === "group";
  const memberList = isGroup && Array.isArray(chat.members) ? chat.members : [];

  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 border-b border-[#e9edef] bg-white px-4 py-3 text-left active:bg-[#f0f2f5] ${
        pinned ? "bg-[#f0f8f4]" : ""
      }`}
    >
      {isGroup ? (
        <GroupAvatar members={memberList} />
      ) : (
        <DirectAvatar title={chat.title} />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate font-semibold text-[#111b21]">
            {chat.title}
          </span>
          <span className="shrink-0 text-xs text-[#667781]">{chat.time}</span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-[#667781]">{chat.preview}</p>
          {chat.unread > 0 && (
            <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-[#25d366] px-1.5 text-[10px] font-bold text-white">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
