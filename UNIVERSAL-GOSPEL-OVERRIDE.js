/*
UNIVERSAL-GOSPEL-OVERRIDE.js

Purpose:
Force any "salvation plus" teaching to Primary Separation / Separation Required.

This should run BEFORE the AI call and/or BEFORE displaying the AI response.
*/

function getUniversalGospelOverride(question = "") {
  const original = String(question || "");
  const q = original
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const salvationWords = [
    "salvation",
    "saved",
    "save",
    "be saved",
    "get saved",
    "born again",
    "go to heaven",
    "eternal life",
    "justified",
    "forgiven",
    "right with god"
  ];

  const requirementWords = [
    "required",
    "require",
    "needed",
    "need",
    "necessary",
    "must",
    "have to",
    "has to",
    "in order to",
    "before",
    "unless",
    "without",
    "proof",
    "evidence",
    "condition"
  ];

  const addedRequirementWords = [
    "works",
    "good works",
    "tongues",
    "speaking in tongues",
    "speak in tongues",
    "baptism",
    "baptized",
    "sacraments",
    "communion",
    "church membership",
    "membership",
    "confession to a priest",
    "priest",
    "law",
    "commandments",
    "religious rules",
    "denomination",
    "our church",
    "their church"
  ];

  const faithPlusPhrases = [
    "faith plus works",
    "faith and works",
    "faith plus baptism",
    "faith plus tongues",
    "faith plus sacraments",
    "jesus plus works",
    "christ plus works",
    "not by faith alone",
    "not saved by faith alone"
  ];

  const directSalvationPlusPhrases = [
    "works salvation",
    "works based salvation",
    "works are needed for salvation",
    "works are required for salvation",
    "works are necessary for salvation",
    "good works are needed for salvation",
    "good works are required for salvation",
    "good works to be saved",
    "works to be saved",

    "tongues for salvation",
    "tongues before salvation",
    "tongues needed for salvation",
    "tongues required for salvation",
    "speaking in tongues for salvation",
    "speaking in tongues before salvation",
    "speak in tongues to be saved",
    "speaking in tongues to be saved",
    "must speak in tongues to be saved",
    "not saved unless you speak in tongues",

    "baptism for salvation",
    "baptism needed for salvation",
    "baptism required for salvation",
    "baptism necessary for salvation",
    "baptized to be saved",
    "must be baptized to be saved",
    "not saved unless baptized",

    "sacraments for salvation",
    "sacraments needed for salvation",
    "sacraments required for salvation",

    "church membership for salvation",
    "church membership required for salvation",
    "must join the church to be saved",
    "only our church can save",
    "only their church can save"
  ];

  const hasDirectPhrase = directSalvationPlusPhrases.some(p => q.includes(p));
  const hasFaithPlus = faithPlusPhrases.some(p => q.includes(p));
  const hasSalvation = salvationWords.some(w => q.includes(w));
  const hasRequirement = requirementWords.some(w => q.includes(w));
  const hasAddedRequirement = addedRequirementWords.some(w => q.includes(w));

  if (!(hasDirectPhrase || hasFaithPlus || (hasSalvation && hasRequirement && hasAddedRequirement))) {
    return null;
  }

  const answer = `Opening Counsel:
This is not a Christian Wisdom issue. If a church or teacher says that salvation requires works, tongues, baptism, sacraments, church membership, or any other added requirement beyond faith in Jesus Christ, that teaching has changed the gospel.

Biblical Answer:
Scripture teaches that salvation is by grace through faith, not by works or religious acts. Good works matter as obedience after salvation, but they do not earn salvation. Baptism, church membership, and spiritual gifts must never be added as requirements for a sinner to be saved.

If the specific issue is tongues, Scripture also says the Spirit gives gifts as He wills and asks, "do all speak with tongues?" The expected answer is no. Therefore tongues cannot be required for every saved person.

Because this changes the gospel, the proper conclusion is Primary Separation. You may still speak kindly to the people and point them to Scripture, but you should not attend, join, or endorse a church that teaches a changed gospel.

Scripture:
Galatians 1:8-9 - But though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed. As we said before, so say I now again, If any man preach any other gospel unto you than that ye have received, let him be accursed.

Ephesians 2:8-9 - For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.

Titus 3:5 - Not by works of righteousness which we have done, but according to his mercy he saved us...

Romans 4:4-5 - Now to him that worketh is the reward not reckoned of grace, but of debt. But to him that worketh not, but believeth on him...

Acts 4:12 - Neither is there salvation in any other...

1 Corinthians 12:29-30 - Are all apostles? are all prophets? are all teachers? are all workers of miracles? Have all the gifts of healing? do all speak with tongues? do all interpret?

Conclusion:
Separation Required

Next Step:
Do not participate in or endorse that teaching. Speak graciously, but clearly stand on salvation by grace through faith in Christ alone.

Show Your Work:
OVERRIDE_USED: UNIVERSAL_GOSPEL_OVERRIDE
This answer was forced because the question described salvation plus an added requirement. That is Primary Separation, not Christian Wisdom Needed.`;

  return {
    answer,
    conclusion: "Separation Required",
    category: "Primary Separation",
    overrideUsed: "UNIVERSAL_GOSPEL_OVERRIDE"
  };
}

// ES module export option:
export { getUniversalGospelOverride };

// CommonJS option if needed:
// module.exports = { getUniversalGospelOverride };
