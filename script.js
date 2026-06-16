const Bible = {
  async get(reference) {
    return { reference, text: '', url: bibleGatewayUrl(reference) };
  }
};

const RULES = [
  {
    id: 'outside-scope-harm',
    matchAny: ['beating me', 'abuse', 'hurt me', 'run away', 'custody', 'court arrangement', 'suicide', 'kill myself'],
    outcome: 'Outside the scope of this app',
    verses: [],
    answer: 'This app is only for biblical separation questions. Questions about physical danger, abuse, self-harm, custody, or legal arrangements need help from a trusted adult, pastor, parent, teacher, or proper authority right away. This tool should not try to make those decisions.'
  },
  {
    id: 'outside-scope-general',
    matchAny: ['dog died', 'pet in heaven', 'will my dog be in heaven', 'cat in heaven'],
    outcome: 'Outside the scope of biblical separation',
    verses: [],
    answer: 'That question may matter to your heart, but it is not a biblical separation question. Please ask a question about fellowship, obedience, partnership, worship, doctrine, or separation.'
  },
  {
    id: 'gospel-denial',
    matchAny: ['another gospel', 'works save', 'saved by works', 'jesus is not god', 'not deity', 'denies resurrection', 'no resurrection', 'denies hell', 'no hell', 'denies scripture', 'bible is not true', 'not saved by faith', 'salvation by works'],
    outcome: 'Primary Separation — clearly wrong to affirm or partner with false doctrine',
    verses: ['Galatians 1:8', '2 John 1:10', 'John 14:6'],
    answer: 'When a person, church, or ministry denies the gospel, the authority of Scripture, the deity of Christ, salvation by grace through faith, or another truth essential to biblical Christianity, Scripture does not treat it as a small difference. A believer may speak kindly and call them to truth, but should not join with or affirm that teaching.'
  },
  {
    id: 'unbeliever-joining',
    matchAny: ['dating an unbeliever', 'date an unbeliever', 'date a lost', 'marry an unbeliever', 'marry a lost', 'boyfriend is not saved', 'girlfriend is not saved', 'unequally yoked', 'joined with unbeliever'],
    outcome: 'Primary Separation — do not enter a binding yoke with unbelief',
    verses: ['2 Corinthians 6:14', 'Amos 3:3', '1 Corinthians 7:39'],
    answer: 'Scripture is clear that believers must not be unequally yoked together with unbelievers. This does not mean being cruel or refusing all contact. It means a believer must not enter a binding relationship that pulls the heart, worship, obedience, or future away from Christ.'
  },
  {
    id: 'religious-cooperation',
    matchAny: ['pentecostal church', 'catholic church', 'mormon', 'jehovah witness', 'ecumenical', 'joint service', 'religious meeting', 'church partner', 'worship service together', 'preach together'],
    outcome: 'Biblical Conviction / Separation Needed — examine doctrine before religious cooperation',
    verses: ['2 Corinthians 6:14', 'Romans 16:17', '2 John 1:10'],
    answer: 'Religious cooperation is not only about being friendly. When churches join together in worship, preaching, or ministry endorsement, doctrine matters. If the other group denies or confuses essential Bible truth, a Bible-believing church should not join in a way that gives approval to error.'
  },
  {
    id: 'church-as-hobby',
    matchAny: ['church is fishing', 'church is hunting', 'church in the woods', 'lake fishing', 'woods hunting', 'church is on the lake', 'church is outdoors'],
    outcome: 'Clearly wrong if recreation replaces the church assembly',
    verses: ['Hebrews 10:25', 'John 4:24', 'Matthew 6:33'],
    answer: 'Hunting, fishing, and enjoying creation are not automatically wrong. But calling recreation “church” is not the same as assembling with believers for worship, preaching, fellowship, and obedience. A believer should not replace the gathered church with personal enjoyment.'
  },
  {
    id: 'gender-sexuality',
    matchAny: ['trans', 'call him her', 'call her him', 'pronoun', 'gay', 'homosexual', 'same sex', 'lgbt', 'lesbian'],
    outcome: 'Clearly wrong to affirm what Scripture calls sin; speak truth with grace',
    verses: ['Genesis 1:27', 'Romans 1:26', 'Ephesians 4:15'],
    answer: 'A Christian should love the person, avoid cruelty, and speak with kindness. But love does not require affirming an identity or practice that contradicts God’s created order. Speak truthfully and graciously, and do not participate in calling sin or confusion righteous.'
  },
  {
    id: 'communion',
    matchAny: ['communion', 'lords supper', 'lord’s supper', 'pizza and pop', 'pizza and soda', 'bread and cup'],
    outcome: 'Clearly wrong — the Lord’s Supper must be handled reverently',
    verses: ['1 Corinthians 11:23', '1 Corinthians 11:27', '1 Corinthians 11:29'],
    answer: 'The Lord’s Supper is not a casual snack or youth activity object lesson. Scripture ties it to the body and blood of Christ and commands self-examination and reverence. A believer should not participate in treating communion as pizza and pop.'
  },
  {
    id: 'entertainment-christ',
    matchAny: ['jesus christ superstar', 'play about jesus', 'musical about jesus', 'acting as jesus', 'portray jesus'],
    outcome: 'Caution Needed — do not participate in dishonoring Christ',
    verses: ['Colossians 1:18', 'Philippians 2:9', 'Exodus 20:7'],
    answer: 'The question is not merely whether drama is allowed. The question is whether the production presents Jesus truthfully and reverently. If a play presents Christ in a false, mocking, or irreverent way, a believer should not join in that presentation.'
  },
  {
    id: 'modesty-clothing',
    matchAny: ['women wear pants', 'girl wear pants', 'pants on women', 'clothes', 'clothing', 'modesty', 'dress'],
    outcome: 'Insufficient Biblical Evidence for a universal rule; apply modesty and distinction with wisdom',
    verses: ['1 Timothy 2:9', 'Deuteronomy 22:5', 'Romans 14:5'],
    answer: 'Scripture teaches modesty and a distinction between male and female, but it does not give enough biblical evidence to make a universal rule that women wearing pants is always sin. This should be handled with modesty, honesty, humility, and respect for godly authority rather than treated as a primary separation issue.'
  },
  {
    id: 'general-drama-club',
    matchAny: ['drama club', 'school play', 'theater', 'theatre', 'musical', 'acting'],
    outcome: 'Christian Wisdom Needed — participation depends on the content',
    verses: ['1 Corinthians 10:31', 'Philippians 4:8', '1 Thessalonians 5:21'],
    answer: 'Drama or acting is not automatically wrong. The believer should ask whether the specific production requires sinful speech, immoral actions, irreverence toward God, false worship, or endorsement of evil. If the content is clean and does not require sin, it may be a wisdom matter rather than a separation command.'
  },
  {
    id: 'liberty-music-style',
    matchAny: ['music style', 'christian music', 'hymn', 'song', 'clothes style', 'preference'],
    outcome: 'Biblical Liberty / Wisdom — test the content and fruit',
    verses: ['Colossians 3:16', '1 Corinthians 10:31', 'Romans 14:5'],
    answer: 'Not every preference question is a separation issue. The words, message, purpose, associations, and spiritual fruit should be tested by Scripture. Where Scripture gives no direct command or prohibition, believers should walk in wisdom, humility, and a clear conscience before God.'
  }
];

const wisdomFallback = {
  outcome: 'Christian Wisdom Needed — not enough for a separation command yet',
  verses: ['James 1:5', '1 Thessalonians 5:21', '1 Corinthians 10:31'],
  answer: 'This question does not clearly match a direct separation command from Scripture as written. That does not mean the answer is “anything goes.” Test it by Scripture: Does it deny the gospel? Does it affirm sin? Does it create a binding yoke with unbelief? Does it require disobedience? If not, this may be a matter of wisdom, conscience, and godly counsel rather than required separation.'
};

function chooseRule(question) {
  const q = normalize(question);
  for (const rule of RULES) {
    if (rule.matchAny.some(term => q.includes(normalize(term)))) return rule;
  }
  return wisdomFallback;
}

async function buildAnswer(question) {
  const rule = chooseRule(question);
  const verses = await Promise.all(rule.verses.map(ref => Bible.get(ref)));
  return { ...rule, verses };
}

function renderAnswer(result) {
  const verseHtml = result.verses.length
    ? result.verses.map(v => `<div class="scripture"><a href="${v.url}" target="_blank" rel="noopener">${v.reference}</a><p>Open the link to read the KJV passage online.</p></div>`).join('')
    : '<p>No passage is quoted because this question is outside the scope of this tool.</p>';

  return `
    <span class="badge">${escapeHtml(result.outcome)}</span>
    <h2>Answer</h2>
    <p>${escapeHtml(result.answer)}</p>
    <h3>Scripture</h3>
    ${verseHtml}
    <h3>Brief explanation</h3>
    <p>This answer is limited to Scripture and the biblical separation framework. Insufficient Biblical Evidence is used only when the Bible does not give enough support for a universal rule, not as the first response to every question.</p>
  `;
}

function normalize(str) {
  return String(str).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function bibleGatewayUrl(reference) {
  return `https://www.kingjamesbibleonline.org/search.php?q=${encodeURIComponent(reference)}`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}

const answerBox = document.getElementById('answer');

document.getElementById('answerBtn').addEventListener('click', async () => {
  const question = document.getElementById('question').value.trim();
  if (!question) return;
  answerBox.classList.remove('hidden');
  answerBox.innerHTML = '<p>Searching Scripture and applying the framework…</p>';
  const result = await buildAnswer(question);
  answerBox.innerHTML = renderAnswer(result);
});

document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('question').value = '';
  answerBox.classList.add('hidden');
  answerBox.innerHTML = '';
});
