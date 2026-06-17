README FIRST - KJV Scripture Search Patch

Purpose:
This patch adds a safer way to bundle more Scripture into the app without relying on one giant JSON file.

What this patch does:
- Uses smaller KJV files by Bible section/book.
- Adds a local Scripture search helper.
- Keeps your foundation documents/framework in control.
- Prevents the AI from answering from general religious memory.
- Helps avoid Netlify JSON fetch errors like receiving <!DOCTYPE html> instead of JSON.

Important:
This is NOT a full app replacement.
Do not delete your working app.
Do not change your Netlify settings.
Do not rename your existing folders.

Recommended installation:
1. Copy the included src/data/kjv folder into your app's src/data folder.
2. Copy src/lib/searchKJV.js into your app's src/lib folder.
3. Add the prompt rules from PROMPT-KJV-SOURCE-RULES.txt into your existing SYSTEM_PROMPT.
4. In your ask/AI function, call searchKJV(question) before asking the AI to answer.
5. Send the retrieved Scripture passages to the AI along with your foundation framework.

If your app does not have src/lib:
- Create it, or place searchKJV.js wherever your helper files currently live.

If your app uses Netlify functions:
- Import the helper into your function if your build supports it.
- Or paste the helper function directly into netlify/functions/ask.js.

Core rule:
The Bible supplies the authority.
The foundation documents supply the boundaries and conclusions.
The AI may only answer from retrieved KJV Scripture plus the approved framework.

Do not:
- Use one giant Bible JSON file.
- Fetch /bible.json from public.
- Allow the AI to answer from memory.
- Add commentaries or outside religious sources.
