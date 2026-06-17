/*
EXAMPLE-ASK-FUNCTION-SNIPPET.js

This is not meant to replace your whole file unless your file is already very similar.
Use it as a guide for where the hard override goes.
*/

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const question = body.question || body.message || "";

    // HARD OVERRIDE MUST RUN BEFORE AI
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
${override.scripture.map(v => `${v.ref} - ${v.text}`).join("\n")}

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

    // NORMAL AI CALL GOES HERE
    // const aiAnswer = await callAI(question);
    // return response with aiAnswer

  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message })
    };
  }
}
