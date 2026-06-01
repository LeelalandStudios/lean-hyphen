import WhatsAppShell from "../../whatsapp/WhatsAppShell.jsx";

/** WhatsApp message from unknown number claiming to be Kabir. */
export default function FakeFriendWhatsAppScreen() {
  return (
    <WhatsAppShell title="+91 90000 11234" subtitle="Not saved">
      <div className="border-b border-amber-200 bg-amber-50 px-3 py-2 text-center text-[10px] font-semibold text-amber-900">
        Unknown number — not in your contacts
      </div>
      <div className="p-3">
        <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
          <p className="text-[13px] leading-relaxed text-[#111b21]">
            hey it&apos;s kabir!! borrowing my neighbour&apos;s phone mine died. i was
            logging into garena on my laptop and the otp came to your number somehow??
            idk why. send it quick i&apos;m in a ranked match with my team please bro we
            need you 🙏🙏
          </p>
          <p className="mt-1 text-right text-[10px] text-[#667781]">3:52 PM</p>
        </div>
      </div>
    </WhatsAppShell>
  );
}
