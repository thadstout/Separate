/*
DECISION-RULE-GOSPEL-CORRUPTION.js

Optional helper rule.
Use this only if your app has a JavaScript decision/classifier layer.
If your app is prompt-only, you can skip this file and just use the prompt patch.

Purpose:
Catch questions that describe salvation being changed before the app returns Christian Wisdom Needed.
*/

export function detectGospelCorruption(question = "") {
  const q = String(question).toLowerCase();

  const salvationTerms = [
    "saved",
    "salvation",
    "born again",
    "go to heaven",
    "eternal life",
    "forgiven",
    "justified",
    "right with god",
    "receive christ",
    "become a christian"
  ];

  const addOnTerms = [
    "must speak in tongues",
    "have to speak in tongues",
    "required to speak in tongues",
    "tongues are required",
    "tongues for salvation",
    "baptism saves",
    "baptized to be saved",
    "baptism required",
    "must be baptized",
    "works required",
    "good works to be saved",
    "earn salvation",
    "keep the law to be saved",
    "sacraments save",
    "church membership required",
    "only our church",
    "only their church",
    "confess to a priest to be saved",
    "not saved by faith alone",
    "faith plus works",
    "another gospel"
  ];

  const denialTerms = [
    "jesus is not god",
    "jesus was created",
    "jesus did not rise",
    "jesus did not resurrect",
    "bible is not true",
    "scripture is not authority",
    "christ is not enough",
    "jesus is not the only way",
    "other ways to god"
  ];

  const hasSalvationLanguage = salvationTerms.some(term => q.includes(term));
  const hasAddOn = addOnTerms.some(term => q.includes(term));
  const hasDenial = denialTerms.some(term => q.includes(term));

  if (hasAddOn || hasDenial || (hasSalvationLanguage && q.includes("required"))) {
    return {
      isGospelCorruption: true,
      outcome: "Separation Required",
      category: "Primary Separation",
      reason:
        "The question appears to add to, remove from, redefine, or replace salvation by grace through faith in Jesus Christ alone.",
      scriptures: [
        "Galatians 1:8-9",
        "Ephesians 2:8-9",
        "Romans 4:4-5",
        "John 14:6",
        "Acts 4:12",
        "Titus 3:5"
      ]
    };
  }

  return {
    isGospelCorruption: false
  };
}

/*
Example use:

const gospelCheck = detectGospelCorruption(question);

if (gospelCheck.isGospelCorruption) {
  // Put this result into the prompt or force the outcome before calling AI.
  // Do not allow the AI to downgrade this to Christian Wisdom Needed.
}

*/
