README FIRST - Doctrine Before Topic + Sign Gifts Patches

Purpose:
These patches address two problems:

1. The app is treating "tongues" as a generic spiritual gifts topic and returning Christian Wisdom Needed,
   even when the question says tongues are needed for salvation.

2. The app is not giving strong enough Biblical warnings for tongues/sign gifts questions.

Core fix:
The app must classify by the doctrine affected, not merely by the topic keyword.

Example:
- "Does your church believe tongues still exist?" = sign gifts / Biblical conviction issue.
- "Does your church teach tongues are required for salvation?" = gospel corruption / Primary Separation.

Installation:
1. Open your GitHub repository.
2. Find your main AI prompt file. It may be:
   - netlify/functions/ask.js
   - ask.js
   - api/ask.js
   - src/lib/prompt.js
   - src/lib/ai.js

3. Add PATCH-1-DOCTRINE-BEFORE-TOPIC.txt into your SYSTEM_PROMPT before Christian Wisdom rules.
4. Add PATCH-2-SIGN-GIFTS-TONGUES.txt into your SYSTEM_PROMPT near your doctrine/category rules.
5. If your app has a JavaScript classifier, add or paste DECISION-GUARD-DOCTRINE-SIGNGIFTS.js.
6. Add SIGN-GIFTS-VERSES.js to your KJV verse data if you are using the Scripture search patch.
7. Commit to GitHub and let Netlify redeploy.

Important:
Do not change Netlify settings.
Do not rename folders.
Do not change package.json.
Do not add dependencies.
Do not delete your foundation framework.
