README FIRST - Tongues Salvation Force Fix

Why the last patch likely failed:
1. The wording "tongues before salvation" may not have matched the earlier detector.
2. The hard override may not have been placed before the AI call.
3. The app may have more than one response path, so the patch may be in the wrong file.
4. The AI response may be replacing the forced result later.

This patch does two things:
1. Uses a much broader detector for tongues/sign gifts connected to salvation.
2. Adds a visible debug marker: OVERRIDE_USED: TONGUES_SALVATION

If the app answer does not include that marker in Show Your Work, then this code is not running in the live app.

Install:
1. Open the file that handles the teen question. Usually:
   - netlify/functions/ask.js
   - api/ask.js
   - ask.js
   - src/lib/ai.js

2. Paste the function from TONGUES-SALVATION-FORCEFIX.js near the top.

3. Immediately after the app reads the question, add:

const forced = forceTonguesSalvationAnswer(question);
if (forced) {
  return jsonResponse(forced);
}

If you do not already have jsonResponse, use the full Netlify example in EXAMPLE-NETLIFY-ASK-PATCH.js.

Most important:
This must run BEFORE any AI call and BEFORE any "Christian Wisdom Needed" fallback.

Testing:
Ask exactly:
Can I attend a church where speaking in tongues is needed for salvation?

The answer must include:
Conclusion: Separation Required
OVERRIDE_USED: TONGUES_SALVATION

If it does not, the patch is not being reached by the deployed app.
