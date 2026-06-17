/*
TONGUES-SALVATION-FORCEFIX.js

This is a stronger hard override for any question connecting tongues/sign gifts with salvation.

It catches wording like:
- tongues needed for salvation
- tongues before salvation
- tongues required to be saved
- speaking in tongues to be saved
- proof of salvation
- evidence of being saved
- not saved unless you speak in tongues
*/

function forceTonguesSalvationAnswer(question = "") {
  const original = String(question || "");
  const q = original
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const hasTongues =
    /\btongue\b/.test(q) ||
    /\btongues\b/.test(q) ||
    q.includes("speaking in tongues") ||
    q.includes("speak in tongues") ||
    q.includes("sign gift") ||
    q.includes("sign gifts");

  const hasSalvation =
    q.includes("salvation") ||
    q.includes("saved") ||
    q.includes("be saved") ||
    q.includes("being saved") ||
    q.includes("born again") ||
    q.includes("get saved") ||
    q.includes("go to heaven") ||
    q.includes("eternal life") ||
    q.includes("receive the holy spirit") ||
    q.includes("have the holy spirit");

  const hasRequirement =
    q.includes("needed") ||
    q.includes("need") ||
    q.includes("required") ||
    q.includes("require") ||
    q.includes("necessary") ||
    q.includes("must") ||
    q.includes("have to") ||
    q.includes("has to") ||
    q.includes("supposed to") ||
    q.includes("in order to") ||
    q.includes("before") ||
    q.includes("proof") ||
    q.includes("evidence") ||
    q.includes("unless") ||
    q.includes("without");

  const directPhrases = [
    "tongues for salvation",
    "tongues before salvation",
    "tongues needed for salvation",
    "tongues required for salvation",
    "tongues necessary for salvation",
    "speaking in tongues for salvation",
    "speaking in tongues before salvation",
    "speaking in tongues needed for salvation",
    "speaking in tongues required for salvation",
    "speak in tongues to be saved",
    "speaking in tongues to be saved",
    "must speak in tongues to be saved",
    "have to speak in tongues to be saved",
    "need to speak in tongues to be saved",
    "required to speak in tongues to be saved",
    "not saved unless you speak in tongues",
    "not saved without speaking in tongues",
    "tongues are proof of salvation",
    "tongues are evidence of salvation",
    "speaking in tongues is proof of salvation",
    "speaking in tongues is evidence of salvation"
  ];

  const hasDirectPhrase = directPhrases.some(p => q.includes(p));

  if (!(hasDirectPhrase || (hasTongues && hasSalvation && hasRequirement))) {
    return null;
  }

  const answer = `Opening Counsel:
If a church teaches that speaking in tongues is needed before salvation, required for salvation, or proof that someone is saved, that is not merely a difference about spiritual gifts. That teaching changes the gospel by adding something Scripture does not add.

Biblical Answer:
Salvation is by grace through faith, not by receiving or performing a sign gift. The Holy Spirit gives gifts according to His own will, and Scripture specifically asks, "do all speak with tongues?" The expected answer is no. Therefore tongues cannot be made a requirement for every saved person.

A church may be confused about spiritual gifts and still need careful Biblical correction, but when it makes tongues necessary for salvation, it has crossed into another gospel. You should not attend, join, or participate in religious fellowship with teaching that adds to salvation.

Scripture:
Galatians 1:8-9 - But though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed. As we said before, so say I now again, If any man preach any other gospel unto you than that ye have received, let him be accursed.

Ephesians 2:8-9 - For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.

1 Corinthians 12:11 - But all these worketh that one and the selfsame Spirit, dividing to every man severally as he will.

1 Corinthians 12:29-30 - Are all apostles? are all prophets? are all teachers? are all workers of miracles? Have all the gifts of healing? do all speak with tongues? do all interpret?

1 Corinthians 13:8 - Charity never faileth: but whether there be prophecies, they shall fail; whether there be tongues, they shall cease...

Conclusion:
Separation Required

Next Step:
You can speak kindly to the people and point them to Scripture, but you should not endorse or participate in a church that teaches tongues are required for salvation.

Show Your Work:
OVERRIDE_USED: TONGUES_SALVATION
This answer was forced by the Gospel Corruption Test. The question connected tongues/sign gifts to salvation. That makes it Primary Separation, not Christian Wisdom Needed.`;

  return {
    answer,
    conclusion: "Separation Required",
    category: "Primary Separation",
    overrideUsed: "TONGUES_SALVATION"
  };
}

/*
If your project uses ES modules, add:
export { forceTonguesSalvationAnswer };

If your project uses CommonJS, add:
module.exports = { forceTonguesSalvationAnswer };
*/
