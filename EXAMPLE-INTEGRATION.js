EXAMPLE INTEGRATION

This is the basic idea for your ask/AI function.

You do not have to copy this exactly if your code is different.

import { searchKJV } from "../src/lib/searchKJV.js";

const question = body.question;

const scriptureResults = searchKJV(question, {
  maxResults: 12
});

const USER_PROMPT = `
Teen question:
"${question}"

Retrieved KJV Scripture:
${scriptureResults.map(v => `${v.ref} - ${v.text}`).join("\n")}

Approved Foundation Framework:
${FOUNDATION_FRAMEWORK}

Answer using only the retrieved KJV Scripture and the approved framework.
Do not use general Bible memory.
Do not invent Scripture.
`;
