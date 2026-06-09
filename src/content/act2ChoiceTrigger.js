/** Fire sidebar choice selection from an in-phone interaction. */
export function triggerAct2Choice(phone, choiceId) {
  phone.api.signal("act2.choice.triggered", choiceId);
}
