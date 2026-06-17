/*
APP-INSTALL-EXAMPLE.jsx

This shows WHERE the override goes.
Your file may look different.

Find your handleSubmit / askQuestion / handleAsk function.
Put the override:
1. before the API call, and
2. after the API call before setAnswer(data.answer).
*/

async function handleAsk() {
  const questionText = question;

  // 1. FRONTEND OVERRIDE BEFORE AI/API
  const beforeOverride = finalDisplayGospelOverride(questionText);
  if (beforeOverride) {
    setAnswer(beforeOverride.answer);
    setConclusion(beforeOverride.conclusion);
    return;
  }

  const response = await fetch("/.netlify/functions/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: questionText })
  });

  const data = await response.json();

  // 2. FRONTEND OVERRIDE AFTER AI/API
  // This prevents the AI/fallback from displaying Christian Wisdom Needed.
  const afterOverride = finalDisplayGospelOverride(questionText);
  if (afterOverride) {
    setAnswer(afterOverride.answer);
    setConclusion(afterOverride.conclusion);
    return;
  }

  // Normal display
  setAnswer(data.answer || data.message || "No answer returned.");
}
