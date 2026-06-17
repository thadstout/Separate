README FIRST - Universal Gospel Override Patch

Your latest test proves the patched code is not running in the live response path.

Problem:
The app answered "Christian Wisdom Needed" for works salvation. That should never happen.

That means one of these is true:
1. The override was placed in the wrong file.
2. The override runs after the AI answer instead of before it.
3. The frontend is calling a different function than the one patched.
4. The frontend has its own fallback answer that is displaying Christian Wisdom Needed.
5. Netlify did not redeploy the changed file.

This patch gives you a stronger universal override.

It catches:
- tongues required for salvation
- works required for salvation
- baptism required for salvation
- sacraments required for salvation
- church membership required for salvation
- faith plus works
- anything that says salvation requires something added to faith in Christ

Install in TWO places if needed:

A. BACKEND / NETLIFY FUNCTION
Find:
- netlify/functions/ask.js
- ask.js
- api/ask.js

Paste UNIVERSAL-GOSPEL-OVERRIDE.js near the top.
Immediately after reading the teen question, run:

const gospelOverride = getUniversalGospelOverride(question);
if (gospelOverride) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    body: JSON.stringify(gospelOverride)
  };
}

This must happen BEFORE calling AI.

B. FRONTEND DISPLAY SAFETY
Find the file that sends or displays the answer, often:
- src/App.jsx
- src/App.js
- src/main.jsx
- src/components/QuestionForm.jsx

Before displaying the AI answer, run the same override.
If override exists, display override.answer instead of the AI answer.

Why both?
Because right now we do not know which path is producing the wrong response.
Putting the override on both sides makes it much harder for the wrong answer to display.

Test:
Ask:
"Can I attend a church that teaches works are needed for salvation?"

Correct answer must include:
OVERRIDE_USED: UNIVERSAL_GOSPEL_OVERRIDE

If that marker does not show, the override still is not in the running code path.
