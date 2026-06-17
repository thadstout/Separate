/*
DECISION-GUARD-DOCTRINE-SIGNGIFTS.js

Optional JavaScript guard.
Use this if your app has a classifier or pre-AI decision layer.

This catches "tongues required for salvation" before the AI can downgrade it to Christian Wisdom Needed.
*/

export function doctrineBeforeTopicGuard(question = "") {
  const q = String(question).toLowerCase();

  const hasTongues =
    q.includes("tongue") ||
    q.includes("tongues") ||
    q.includes("speak in tongues") ||
    q.includes("speaking in tongues") ||
    q.includes("sign gift") ||
    q.includes("charismatic") ||
    q.includes("pentecostal");

  const salvationAdditions = [
    "needed for salvation",
    "required for salvation",
    "necessary for salvation",
    "needed to be saved",
    "required to be saved",
    "necessary to be saved",
    "must be saved",
    "must speak",
    "have to speak",
    "proof of salvation",
    "evidence of salvation",
    "to get saved",
    "in order to be saved",
    "before you can be saved"
  ];

  const hasSalvationAddition =
    salvationAdditions.some(term => q.includes(term)) ||
    (
      (q.includes("salvation") || q.includes("saved") || q.includes("born again")) &&
      (q.includes("required") || q.includes("needed") || q.includes("necessary") || q.includes("must") || q.includes("have to"))
    );

  if (hasTongues && hasSalvationAddition) {
    return {
      forced: true,
      outcome: "Separation Required",
      category: "Primary Separation",
      reason:
        "The question connects tongues/sign gifts to salvation. That changes the issue from spiritual gifts to gospel corruption.",
      requiredScriptures: [
        "Galatians 1:8-9",
        "Ephesians 2:8-9",
        "1 Corinthians 12:11",
        "1 Corinthians 12:29-30",
        "1 Corinthians 13:8-10"
      ],
      promptInstruction:
        "Do not classify this as Christian Wisdom Needed. Explain that tongues cannot be required for salvation because salvation is by grace through faith and the Spirit distributes gifts as He wills."
    };
  }

  if (hasTongues) {
    return {
      forced: false,
      issue: "sign_gifts_warning",
      recommendedScriptures: [
        "1 Corinthians 12:11",
        "1 Corinthians 12:29-30",
        "1 Corinthians 13:8-10",
        "1 Corinthians 14:27-33",
        "1 Corinthians 14:40"
      ],
      promptInstruction:
        "This question involves sign gifts/tongues. Include Scripture principles that the Spirit distributes gifts as He wills, not all speak with tongues, tongues will cease, and gifts must operate under Biblical order."
    };
  }

  return {
    forced: false
  };
}

/*
Example use:

const guard = doctrineBeforeTopicGuard(question);

if (guard.forced) {
  // Add this instruction to the AI prompt OR return the result directly.
  // The AI must not be allowed to downgrade the answer.
}

If guard.issue === "sign_gifts_warning", include the recommended scriptures in the prompt.
*/
