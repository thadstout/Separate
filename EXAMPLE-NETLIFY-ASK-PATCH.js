/*
EXAMPLE-NETLIFY-ASK-PATCH.js

Use this pattern in netlify/functions/ask.js.

Do not paste this whole file unless your ask.js is very similar.
The important part is that forceTonguesSalvationAnswer(question) runs BEFORE the AI call.
*/

function jsonResponse(payload, statusCode = 200) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(payload)
  };
}

// Paste forceTonguesSalvationAnswer function here, above handler.

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const question = body.question || body.message || body.prompt || "";

    // FORCE OVERRIDE MUST BE FIRST
    const forced = forceTonguesSalvationAnswer(question);
    if (forced) {
      return jsonResponse(forced);
    }

    // Normal AI code goes below this line.
    // const aiResult = await callAI(question);
    // return jsonResponse({ answer: aiResult });

    return jsonResponse({
      answer: "Normal AI response would go here."
    });

  } catch (error) {
    return jsonResponse({ error: error.message }, 500);
  }
};
