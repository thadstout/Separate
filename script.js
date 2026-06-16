const Bible = {
  async get(reference) {
    const parsed = parseReference(reference);
    if (!parsed) return { reference, text: '', url: bibleGatewayUrl(reference) };
    const endpoint = new URL('https://thebibleapi.netlify.app/.netlify/functions/getVerse');
    endpoint.searchParams.set('book', parsed.book);
    endpoint.searchParams.set('chapter', parsed.chapter);
    endpoint.searchParams.set('verse', parsed.verse);
    endpoint.searchParams.set('translation', 'kjv');
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Bible lookup failed');
      const data = await res.json();
      return { reference, text: data.text || '', url: bibleGatewayUrl(reference) };
    } catch (err) {
      return { reference, text: '', url: bibleGatewayUrl(reference) };
    }
  }
};

const RULES = [
  {
    id: 'gospel-denial',
    keywords: ['not saved by faith', 'works save', 'no trinity', 'jesus is not god', 'not deity', 'another gospel', 'denies resurrection', 'denies hell', 'denies scripture'],
    outcome: 'Clearly wrong — primary separation issue',
    verses: ['Galatians 1:8', '2 John 1:10', 'John 14:6'],
    answer: 'When a person or church denies the gospel, the nature of God, the deity of Christ, salvation by grace through faith, or the authority of Scripture, this is not a small difference. Scripture commands believers not to endorse or partner with a false gospel. You may still speak kindly and seek their repentance, but you should not join with or affirm that teaching.'
  },
  {
    id: 'unbeliever-joining',
    keywords: ['dating an unbeliever', 'date an unbeliever', 'marry an unbeliever', 'best friend is unbeliever', 'joined with unbeliever', 'business partner unbeliever'],
    outcome: 'Clearly wrong when it creates a binding spiritual yoke',
    verses: ['2 Corinthians 6:14', 'Amos 3:3', '1 Corinthians 7:39'],
    answer: 'Scripture is clear that believers must not be unequally yoked together with unbelievers. This does not mean you must be unkind or refuse all contact. It means you must not enter a binding relationship that pulls your heart, worship, obedience, or future in a direction opposed to Christ.'
  },
  {
    id: 'church-as-hobby',
    keywords: ['church is fishing', 'church is hunting', 'church in the woods', 'lake fishing', 'woods hunting'],
    outcome: 'Caution needed — worship must not be replaced by preference',
    verses: ['Hebrews 10:25', 'John 4:24', 'Matthew 6:33'],
    answer: 'Enjoying hunting, fishing, or time outdoors is not automatically wrong. But calling recreation “church” is not the same as gathering with believers for worship, preaching, fellowship, and obedience. A believer should not treat personal enjoyment as a replacement for assembling with the church.'
  },
  {
    id: 'gender-sexuality',
    keywords: ['trans', 'call him her', 'call her him', 'gay', 'homosexual', 'same sex', 'lgbt'],
    outcome: 'Clearly wrong to affirm what Scripture calls sin; speak truth with grace',
    verses: ['Genesis 1:27', 'Romans 1:26', 'Ephesians 4:15'],
    answer: 'A Christian should love the person, speak with kindness, and avoid cruelty. But love does not require affirming an identity or practice that contradicts God’s created order. Use speech that is gracious and truthful, and do not participate in pretending that sin or confusion is righteous.'
  },
  {
    id: 'communion',
    keywords: ['communion', 'lords supper', 'lord’s supper', 'pizza and pop', 'pizza and soda'],
    outcome: 'Clearly wrong — the Lord’s Supper must be handled reverently',
    verses: ['1 Corinthians 11:23', '1 Corinthians 11:27', '1 Corinthians 11:29'],
    answer: 'The Lord’s Supper is not a casual snack or youth activity object lesson. Scripture ties it to the body and blood of Christ and commands self-examination and reverence. You should not participate in treating communion as pizza and pop.'
  },
  {
    id: 'entertainment-christ',
    keywords: ['jesus christ superstar', 'drama club', 'play about jesus', 'musical about jesus'],
    outcome: 'Caution needed — do not participate in dishonoring Christ',
    verses: ['Colossians 1:18', 'Philippians 2:9', 'Exodus 20:7'],
    answer: 'The question is not merely whether acting or drama is allowed. The question is whether the production presents Jesus truthfully and reverently. If a play presents Christ in a false, mocking, or irreverent way, a believer should not join in that presentation.'
  },
  {
    id: 'outside-scope-harm',
    keywords: ['beating me', 'abuse', 'hurt me', 'run away', 'court arrangement', 'custody'],
    outcome: 'Outside the scope of this app',
    verses: [],
    answer: 'This app is only for biblical separation questions. Questions about immediate physical danger, abuse, custody, or legal arrangements need help from a trusted adult, pastor, parent, teacher, or proper authority right away. This tool should not try to make those decisions.'
  },
  {
    id: 'outside-scope-general',
    keywords: ['dog died', 'pet in heaven', 'will my dog be in heaven'],
    outcome: 'Outside the scope of biblical separation',
    verses: [],
    answer: 'That question may be important to your heart, but it is not a biblical separation question. Ask again with a question about fellowship, obedience, partnership, worship, or separation.'
  }
];

const fallback = {
  outcome: 'Insufficient Biblical evidence from this question',
  verses: ['James 1:5', 'Romans 14:5', '1 Thessalonians 5:21'],
  answer: 'I do not have enough information to give a clear separation answer. Search the Scriptures first: Is there a clear command? Is the gospel being denied? Is sin being affirmed? Is there a binding yoke with unbelief or unrighteousness? If those tests do not give a clear answer, this may be a wisdom or Biblical conviction matter rather than a separation command.'
};

function chooseRule(question) {
  const q = question.toLowerCase();
  return RULES.find(rule => rule.keywords.some(k => q.includes(k))) || fallback;
}

async function buildAnswer(question) {
  const rule = chooseRule(question);
  const verses = await Promise.all(rule.verses.map(ref => Bible.get(ref)));
  return { ...rule, verses };
}

function renderAnswer(result) {
  const verseHtml = result.verses.length
    ? result.verses.map(v => `<div class="scripture"><a href="${v.url}" target="_blank" rel="noopener">${v.reference}</a>${v.text ? `<p>${escapeHtml(v.text)}</p>` : '<p>Open the link to read the KJV passage online.</p>'}</div>`).join('')
    : '<p>No passage is quoted because this question is outside the scope of this tool.</p>';
  return `
    <span class="badge">${escapeHtml(result.outcome)}</span>
    <h2>Answer</h2>
    <p>${escapeHtml(result.answer)}</p>
    <h3>Scripture</h3>
    ${verseHtml}
    <h3>Brief explanation</h3>
    <p>This answer is limited to Scripture and the biblical separation framework. It should be firm where Scripture is clear and restrained where the Bible has not given enough evidence for a separation conclusion.</p>
  `;
}

function parseReference(reference) {
  const match = reference.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+):(\d+)/);
  if (!match) return null;
  return { book: match[1].replace(' ', '+'), chapter: match[2], verse: match[3] };
}

function bibleGatewayUrl(reference) {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(reference)}&version=KJV`;
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
