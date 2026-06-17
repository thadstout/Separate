/*
FINAL-DISPLAY-OVERRIDE.js

Paste this into the frontend file that displays the answer:
- src/App.jsx
- src/App.js
- src/components/AnswerBox.jsx
- or wherever setAnswer(...) happens.

This override checks the ORIGINAL QUESTION, not the AI answer.
It prevents the app from displaying "Christian Wisdom Needed" for salvation-plus errors.
*/

function finalDisplayGospelOverride(question = "") {
  const q = String(question || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const hasSalvation =
    q.includes("salvation") ||
    q.includes("saved") ||
    q.includes("save") ||
    q.includes("to be saved") ||
    q.includes("get saved") ||
    q.includes("born again") ||
    q.includes("go to heaven") ||
    q.includes("eternal life") ||
    q.includes("forgiven") ||
    q.includes("justified");

  const hasRequirement =
    q.includes("needed") ||
    q.includes("need") ||
    q.includes("required") ||
    q.includes("require") ||
    q.includes("necessary") ||
    q.includes("must") ||
    q.includes("have to") ||
    q.includes("has to") ||
    q.includes("in order to") ||
    q.includes("before") ||
    q.includes("unless") ||
    q.includes("without") ||
    q.includes("proof") ||
    q.includes("evidence") ||
    q.includes("condition");

  const hasAddedWork =
    q.includes("works") ||
    q.includes("good works") ||
    q.includes("work salvation") ||
    q.includes("works salvation") ||
    q.includes("earn salvation") ||
    q.includes("earn heaven") ||
    q.includes("obedience to be saved") ||
    q.includes("keep the law") ||
    q.includes("commandments to be saved") ||
    q.includes("religious rules");

  const hasTongues =
    q.includes("tongue") ||
    q.includes("tongues") ||
    q.includes("speaking in tongues") ||
    q.includes("speak in tongues");

  const hasBaptism =
    q.includes("baptism") ||
    q.includes("baptized") ||
    q.includes("baptize");

  const hasSacramentOrChurch =
    q.includes("sacrament") ||
    q.includes("sacraments") ||
    q.includes("church membership") ||
    q.includes("membership") ||
    q.includes("join their church") ||
    q.includes("join our church") ||
    q.includes("only our church") ||
    q.includes("only their church");

  const directPhrases = [
    "works salvation",
    "work salvation",
    "works based salvation",
    "works are needed for salvation",
    "works needed for salvation",
    "works are required for salvation",
    "works required for salvation",
    "works are necessary for salvation",
    "good works are needed for salvation",
    "good works are required for salvation",
    "good works to be saved",
    "works to be saved",
    "earn salvation",
    "earn heaven",
    "faith plus works",
    "not saved by faith alone",

    "tongues for salvation",
    "tongues before salvation",
    "tongues needed for salvation",
    "tongues required for salvation",
    "speaking in tongues for salvation",
    "speak in tongues to be saved",
    "speaking in tongues to be saved",
    "must speak in tongues to be saved",
    "not saved unless you speak in tongues",

    "baptism for salvation",
    "baptism needed for salvation",
    "baptism required for salvation",
    "baptized to be saved",
    "must be baptized to be saved",
    "not saved unless baptized",

    "sacraments for salvation",
    "sacraments required for salvation",
    "church membership for salvation",
    "church membership required for salvation",
    "must join their church to be saved",
    "must join our church to be saved"
  ];

  const hasDirectPhrase = directPhrases.some(phrase => q.includes(phrase));
  const hasAddedRequirement = hasAddedWork || hasTongues || hasBaptism || hasSacramentOrChurch;

  if (!(hasDirectPhrase || (hasSalvation && hasRequirement && hasAddedRequirement))) {
    return null;
  }

  return {
    conclusion: "Separation Required",
    category: "Primary Separation",
    answer: `Opening Counsel:
This is not a Christian Wisdom issue. If a church or teacher says that salvation requires works, tongues, baptism, sacraments, church membership, or any other added requirement beyond faith in Jesus Christ, that teaching has changed the gospel.

Biblical Answer:
Scripture teaches that salvation is by grace through faith, not by works or religious acts. Good works matter as the fruit of obedience after salvation, but they do not earn salvation. Baptism, church membership, and spiritual gifts must never be added as requirements for a sinner to be saved.

Because this changes the gospel, the proper conclusion is Primary Separation. You may still speak kindly to the people and point them to Scripture, but you should not attend, join, or endorse a church that teaches a changed gospel.

Scripture:
Galatians 1:8-9 - But though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed. As we said before, so say I now again, If any man preach any other gospel unto you than that ye have received, let him be accursed.

Ephesians 2:8-9 - For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.

Titus 3:5 - Not by works of righteousness which we have done, but according to his mercy he saved us...

Romans 4:4-5 - Now to him that worketh is the reward not reckoned of grace, but of debt. But to him that worketh not, but believeth on him...

Acts 4:12 - Neither is there salvation in any other...

Conclusion:
Separation Required

Next Step:
Do not participate in or endorse that teaching. Speak graciously, but clearly stand on salvation by grace through faith in Christ alone.

Show Your Work:
OVERRIDE_USED: FINAL_DISPLAY_GOSPEL_OVERRIDE
This answer was forced because the question described salvation plus an added requirement. That is Primary Separation, not Christian Wisdom Needed.`
  };
}

/*
If using modules, export this:
export { finalDisplayGospelOverride };
*/
