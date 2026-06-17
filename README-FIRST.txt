Biblical Separation App - AI Thoughtfulness Patch
=================================================

This is a patch package, not a full app replacement.

Goal:
Make the existing app more thoughtful for open-ended teen questions without changing the Netlify structure.

Safest way to use this:

1. Open your existing GitHub repository.
2. Find your current Netlify function file, probably:
   netlify/functions/ask.js
3. Open the file in GitHub edit mode.
4. Open this patch file:
   netlify/functions/ask-prompt-patch.js
5. Copy the SYSTEM_PROMPT from the patch file.
6. Paste it over the old SYSTEM_PROMPT in your existing ask.js.
7. Copy the buildUserPrompt(question) function if your file has a similar user prompt section.
8. Paste it over the old user prompt section.
9. Do not rename folders.
10. Do not change package.json.
11. Do not change Netlify settings.
12. Commit the change.

Important:
Do not simply drag this whole folder into GitHub unless you understand what it will do.
This package includes ask-prompt-patch.js so it will not overwrite your live ask.js by accident.

If you want to use drag-and-drop:
- Rename ask-prompt-patch.js to ask.js on your computer first.
- Only do that if your existing function is also named ask.js and you want to replace that file.

This patch changes the app's brain, not the deployment structure.
