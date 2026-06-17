/*
HARD-OVERRIDE-CODE.js

Paste this into your main ask/AI file.

Purpose:
Force non-negotiable doctrine issues to the correct answer before the AI can misclassify them.
*/

function getHardOverride(question = "") {
  const q = String(question).toLowerCase();

  const mentionsTongues =
    q.includes("tongue") ||
    q.includes("tongues") ||
    q.includes("speaking in tongues") ||
    q.includes("speak in tongues");

  const mentionsSalvation =
    q.includes("salvation") ||
    q.includes("saved") ||
    q.includes("be saved") ||
    q.includes("born again") ||
    q.includes("go to heaven") ||
    q.includes("eternal life");

  const mentionsRequirement =
    q.includes("required") ||
    q.includes("requirement") ||
    q.includes("needed") ||
    q.includes("necessary") ||
    q.includes("must") ||
    q.includes("have to") ||
    q.includes("need to") ||
    q.includes("in order to") ||
    q.includes("proof of") ||
    q.includes("evidence of");

  // Direct hard override for tongues attached to salvation.
  if (mentionsTongues && mentionsSalvation && mentionsRequirement) {
    return {
      conclusion: "Separation Required",
      category: "Primary Separation",
      scripture: [
        {
          ref: "Galatians 1:8-9",
          text: "But though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed. As we said before, so say I now again, If any man preach any other gospel unto you than that ye have received, let him be accursed."
        },
        {
          ref: "Ephesians 2:8-9",
          text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast."
        },
        {
          ref: "1 Corinthians 12:11",
          text: "But all these worketh that one and the selfsame Spirit, dividing to every man severally as he will."
        },
        {
          ref: "1 Corinthians 12:29-30",
          text: "Are all apostles? are all prophets? are all teachers? are all workers of miracles? Have all the gifts of healing? do all speak with tongues? do all interpret?"
        },
        {
          ref: "1 Corinthians 13:8",
          text: "Charity never faileth: but whether there be prophecies, they shall fail; whether there be tongues, they shall cease..."
        }
      ],
      answer:
        "If a church teaches that speaking in tongues is needed for salvation, the issue is not merely a disagreement about spiritual gifts. It has added a requirement to salvation that Scripture does not add. Salvation is by grace through faith, not by receiving a sign gift. Scripture also says the Spirit gives gifts as He wills, and Paul asks, 'do all speak with tongues?' The expected answer is no. Because this teaching changes the gospel, you should not attend or join that church in religious fellowship.",
      nextStep:
        "You can still speak kindly to the people and point them to Scripture, but you should not participate in or endorse teaching that adds to salvation.",
      showYourWork:
        "This was forced by the Gospel Corruption Test. The question connected tongues to salvation as a requirement. That makes it Primary Separation, not Christian Wisdom."
    };
  }

  // Broader hard override for any obvious "salvation plus" statement.
  const salvationPlusPatterns = [
    "baptism required for salvation",
    "baptism is required for salvation",
    "baptism needed for salvation",
    "baptism is needed for salvation",
    "baptized to be saved",
    "works required for salvation",
    "works needed for salvation",
    "good works to be saved",
    "faith plus works",
    "sacraments required for salvation",
    "church membership required for salvation",
    "only our church can save",
    "only their church can save"
  ];

  if (salvationPlusPatterns.some(pattern => q.includes(pattern))) {
    return {
      conclusion: "Separation Required",
      category: "Primary Separation",
      scripture: [
        {
          ref: "Galatians 1:8-9",
          text: "But though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed."
        },
        {
          ref: "Ephesians 2:8-9",
          text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast."
        },
        {
          ref: "Titus 3:5",
          text: "Not by works of righteousness which we have done, but according to his mercy he saved us..."
        }
      ],
      answer:
        "This is not merely a difference in church practice. If a teaching adds something to salvation that Scripture does not add, it changes the gospel. Scripture teaches salvation by grace through faith, not by human works, religious acts, or church membership.",
      nextStep:
        "Do not join or endorse that teaching. Speak graciously, but stand clearly on the gospel.",
      showYourWork:
        "This was forced by the Gospel Corruption Test because the question described salvation plus an added requirement."
    };
  }

  return null;
}

/*
HOW TO USE IN NETLIFY FUNCTION

After your code reads the question, add this BEFORE calling the AI:

const override = getHardOverride(question);

if (override) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      answer: `
Opening Counsel:
${override.answer}

Scripture:
${override.scripture.map(v => `${v.ref} - ${v.text}`).join("\\n")}

Conclusion:
${override.conclusion}

Next Step:
${override.nextStep}

Show Your Work:
${override.showYourWork}
`,
      conclusion: override.conclusion,
      category: override.category,
      scripture: override.scripture
    })
  };
}

Then continue with your normal AI call below.
*/
