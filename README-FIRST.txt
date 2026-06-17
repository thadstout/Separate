README FIRST - Biblical Separation App Voice Patch

Purpose:
This patch is only meant to improve the tone and thoughtfulness of the app responses.
It should not change your Netlify setup, build settings, folders, or deployment structure.

What to do:
1. Open your GitHub repository.
2. Find the file where the AI prompt is written. It is probably one of these:
   - netlify/functions/ask.js
   - ask.js
   - api/ask.js
   - src/ask.js
   - src/lib/ai.js
   - src/lib/prompt.js

3. Look for your existing SYSTEM_PROMPT, VOICE_RULES, RESPONSE_FORMAT, or similar prompt text.

4. Copy the contents of PATCH-VOICE-RULES.js into that prompt area.

5. The safest method:
   - Keep your existing API code.
   - Keep your existing Netlify function.
   - Only replace or add the prompt text.

6. Commit the change to GitHub.
7. Let Netlify redeploy normally.

Important:
Do not rename folders.
Do not change package.json.
Do not change netlify.toml.
Do not add new dependencies.
Do not move your Netlify function.

Goal:
The app should stop sounding canned and start sounding like thoughtful Biblical counsel for teens:
- warm
- direct
- Scripture-governed
- not robotic
- not soft where Scripture is clear
- not conclusive where Scripture is silent
