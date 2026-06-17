/*
FRONTEND-SAFETY-INSTALL-EXAMPLE.jsx

Use this only if the backend patch does not seem to run.

Place getUniversalGospelOverride somewhere the frontend can use it.
Then run it before displaying the AI answer.

Example:
*/

async function handleAsk(question) {
  // FRONTEND SAFETY CHECK BEFORE API CALL
  const localOverride = getUniversalGospelOverride(question);
  if (localOverride) {
    setAnswer(localOverride.answer);
    setConclusion(localOverride.conclusion);
    return;
  }

  const res = await fetch("/.netlify/functions/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await res.json();

  // FRONTEND SAFETY CHECK AFTER API CALL TOO
  const finalOverride = getUniversalGospelOverride(question);
  if (finalOverride) {
    setAnswer(finalOverride.answer);
    setConclusion(finalOverride.conclusion);
    return;
  }

  setAnswer(data.answer || data.message || "No answer returned.");
}
