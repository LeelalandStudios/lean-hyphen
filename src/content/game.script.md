---
start: lock
---

# Phone Scam Education — playable script

Authoritative flow for the simulation. Screen ids match `src/content/staticScreens.js`.

# Act 1 — Scene 1

## lock
screen: lock
advance: tap
goto: home_default

## home_default
screen: home_default
advance: continue
goto: drawer

## drawer
screen: drawer
advance: continue
goto: home_whatsapp_activity

## home_whatsapp_activity
screen: home_whatsapp_activity
advance: continue
goto: whatsapp_group_casual

# Act 1 — Scene 2

## whatsapp_group_casual
screen: whatsapp_group_casual
advance: continue
goto: whatsapp_inbox

## whatsapp_inbox
screen: whatsapp_inbox
advance: continue
goto: whatsapp_paytm_dialog

## whatsapp_paytm_dialog
screen: whatsapp_paytm_dialog
advance: continue
goto: whatsapp_infographic_shared

## whatsapp_infographic_shared
screen: whatsapp_infographic_shared
advance: continue
goto: infographic_viewer

## infographic_viewer
screen: infographic_viewer
advance: continue
goto: infographic_saved

## infographic_saved
screen: infographic_saved
advance: continue
goto: s1_whatsapp_zack_gift_hook

# Act 3 — Scenario 1 (PhonePe trap)

## s1_whatsapp_zack_gift_hook
screen: s1_whatsapp_zack_gift_hook
advance: continue
goto: s1_phonepe_wallet

## s1_phonepe_wallet
screen: s1_phonepe_wallet
advance: continue
goto: s1_home_phonepe_notification

## s1_home_phonepe_notification
screen: s1_home_phonepe_notification
advance: continue
goto: s1_messages_inbox

## s1_messages_inbox
screen: s1_messages_inbox
advance: continue
goto: s1_messages_thread

## s1_messages_thread
screen: s1_messages_thread
advance: choice
goto: s1_phonepe_choice

## s1_phonepe_choice
type: choice
screen: s1_messages_thread
prompt: What do you do?
options:
  - id: tap
    label: Tap the link quickly and claim ₹3,000
    goto: s1_path_a_chrome
    set:
      s1_path: A
  - id: ignore
    label: Ignore and delete the message from this unknown number
    goto: s1_path_b_deleted
    set:
      s1_path: B
  - id: forward
    label: Forward it to friends so they can claim too
    goto: s1_path_c_group
    set:
      s1_path: C

# Path A — tap link

## s1_path_a_chrome
screen: s1_path_a_chrome
advance: continue
goto: s1_path_a_phonepe_zero

## s1_path_a_phonepe_zero
screen: s1_path_a_phonepe_zero
advance: continue
goto: s1_path_a_group

## s1_path_a_group
screen: s1_path_a_group

# Path B — delete SMS

## s1_path_b_deleted
screen: s1_path_b_deleted
advance: continue
goto: s1_path_b_group

## s1_path_b_group
screen: s1_path_b_group

# Path C — forward in group

## s1_path_c_group
screen: s1_path_c_group
