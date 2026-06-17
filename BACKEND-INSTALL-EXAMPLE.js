/*
BACKEND-INSTALL-EXAMPLE.js

Use this pattern in netlify/functions/ask.js.

The important part:
getUniversalGospelOverride(question) must run BEFORE the AI call.
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

// Paste getUniversalGospelOverride here if you are not importing it.

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const question = body.question || body.message || body.prompt || "";

    const gospelOverride = getUniversalGospelOverride(question);
    if (gospelOverride) {
      return jsonResponse(gospelOverride);
    }

    // The AI call must come AFTER this point.
    // const aiAnswer = await callAI(question);

    // return jsonResponse({ answer: aiAnswer });

  } catch (error) {
    return jsonResponse({ error: error.message }, 500);
  }
};
