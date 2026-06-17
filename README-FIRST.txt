README FIRST - HARD OVERRIDE PATCH

Problem:
The prompt patches did not fix the tongues-for-salvation issue because the AI is still allowed to choose the final conclusion.

Fix:
This patch adds a hard code-level override.

If the question says or implies that tongues are required for salvation, the code forces:

Conclusion: Separation Required
Category: Primary Separation

The AI is not allowed to downgrade this to:
- Christian Wisdom Needed
- Proceed With Caution
- Insufficient Biblical Evidence
- Biblically Acceptable

Where to install:
Open your main AI/ask file. It is probably:
- netlify/functions/ask.js
- ask.js
- api/ask.js
- src/lib/ai.js

Safest method:
1. Copy the function from HARD-OVERRIDE-CODE.js.
2. Paste it near the top of your ask.js file.
3. After you read the teen's question, run:

const override = getHardOverride(question);

4. If override exists, return it immediately instead of asking the AI.

This is important:
A prompt asks the AI to obey.
A hard override prevents the wrong answer from ever being returned.

Do not change:
- Netlify settings
- package.json
- folder structure
- build command
