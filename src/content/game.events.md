---
start: boot
---

# Event-driven simulation
#
# The player can navigate the phone freely. This script only injects:
# - notifications
# - SMS messages
# - choice gates (blocks input until answered)

## boot
type: wait
ms: 500
goto: phonepe_sms_arrives

## phonepe_sms_arrives
type: sms.receive
threadId: phonepe_scam
from: +91 91234 56789
body: |
  🎉 You have won ₹3,000 PhonePe cashback!
  Claim now or offer expires in 5 minutes!
  → bit.ly/phonepe-bonus-3000
notifyAppId: messages
notifyAppLabel: 📱 Messages
notifyFrom: +91 91234 56789
notifyBody: 🎉 You have won ₹3,000 PhonePe cashback! Tap to view.
goto: wait_for_open

## wait_for_open
type: wait
untilSignal: opened_messages_from_notification
goto: phonepe_choice_gate

## phonepe_choice_gate
type: choice
prompt: What do you do?
options:
  - id: tap
    label: Tap the link quickly and claim ₹3,000
    set:
      s1_path: A
    goto: end
  - id: ignore
    label: Ignore and delete the message
    set:
      s1_path: B
    goto: end
  - id: forward
    label: Forward it to friends
    set:
      s1_path: C
    goto: end

## end
type: wait
ms: 99999999

