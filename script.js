const Bible = {
  async get(reference) {
    return { reference, text: '', url: bibleGatewayUrl(reference) };
  }
};

// Version 1.2 Expanded Rule Engine
// Purpose: answer more open-ended teen questions without making "Christian Wisdom Needed" the default for everything.
// Order matters: outside scope first, then clear biblical categories, then wisdom/liberty.
const RULES = [
  {
    id: 'outside-scope-harm',
    outcome: 'Outside the scope of this app',
    confidence: 'High',
    terms: ['beating me', 'abuse', 'hurt me', 'run away', 'custody', 'court', 'suicide', 'kill myself', 'self harm', 'police', 'unsafe at home'],
    verses: [],
    answer: 'This app is only for biblical separation questions. Questions about physical danger, abuse, self-harm, custody, or legal arrangements need help from a trusted adult, parent, pastor, teacher, or proper authority right away. This tool should not try to make those decisions.'
  },
  {
    id: 'outside-scope-general',
    outcome: 'Outside the scope of biblical separation',
    confidence: 'High',
    terms: ['dog died', 'pet in heaven', 'will my dog be in heaven', 'cat in heaven', 'animal heaven'],
    verses: [],
    answer: 'That question may matter to your heart, but it is not a biblical separation question. Please ask about fellowship, obedience, partnership, worship, doctrine, or separation.'
  },

  // PRIMARY / GOSPEL / FALSE DOCTRINE
  {
    id: 'gospel-denial',
    outcome: 'Primary Separation — do not affirm or partner with false doctrine',
    confidence: 'High',
    terms: ['another gospel', 'works save', 'saved by works', 'salvation by works', 'jesus is not god', 'jesus not god', 'denies resurrection', 'no resurrection', 'denies hell', 'no hell', 'bible is not true', 'scripture is not true', 'not saved by faith', 'deny the trinity', 'not the only way', 'many ways to heaven'],
    verses: ['Galatians 1:8', '2 John 1:10', 'John 14:6', 'Acts 4:12'],
    answer: 'When a person, church, or ministry denies the gospel, the authority of Scripture, the deity of Christ, salvation by grace through faith, or another truth essential to biblical Christianity, Scripture does not treat it as a small difference. A believer may speak kindly and call them to truth, but should not join with, platform, or affirm that teaching.'
  },
  {
    id: 'false-teacher-content',
    outcome: 'Primary Separation / Strong Caution — do not receive false teaching as spiritual guidance',
    confidence: 'High',
    terms: ['false teacher', 'false doctrine', 'listen to preacher', 'watch preacher', 'podcast preacher', 'heretic', 'teacher denies', 'church denies', 'cult'],
    verses: ['Romans 16:17', '2 John 1:10', 'Titus 3:10', '1 John 4:1'],
    answer: 'Christians should test teaching by Scripture. If a teacher denies essential Bible truth or promotes doctrine contrary to the gospel, believers should not receive that ministry as spiritual guidance or give it approval.'
  },
  {
    id: 'religious-cooperation',
    outcome: 'Biblical Conviction / Separation Needed — examine doctrine before religious cooperation',
    confidence: 'High',
    terms: ['pentecostal church', 'catholic church', 'mormon', 'jehovah witness', 'jehovahs witness', 'ecumenical', 'joint service', 'religious meeting', 'church partner', 'worship service together', 'preach together', 'prayer service together', 'interfaith', 'mosque', 'temple', 'mass'],
    verses: ['2 Corinthians 6:14', 'Romans 16:17', '2 John 1:10', 'Amos 3:3'],
    answer: 'Religious cooperation is not only about being friendly. When churches join together in worship, preaching, prayer, or ministry endorsement, doctrine matters. If the other group denies or confuses essential Bible truth, a Bible-believing church should not join in a way that gives approval to error.'
  },

  // RELATIONSHIPS / YOKES
  {
    id: 'unbeliever-dating-marriage',
    outcome: 'Primary Separation — do not enter a binding yoke with unbelief',
    confidence: 'High',
    terms: ['dating an unbeliever', 'date an unbeliever', 'date a lost', 'dating a lost', 'marry an unbeliever', 'marry a lost', 'boyfriend is not saved', 'girlfriend is not saved', 'unequally yoked', 'joined with unbeliever', 'my boyfriend is lost', 'my girlfriend is lost', 'non christian boyfriend', 'non christian girlfriend'],
    verses: ['2 Corinthians 6:14', 'Amos 3:3', '1 Corinthians 7:39'],
    answer: 'Scripture is clear that believers must not be unequally yoked together with unbelievers. This does not mean being cruel or refusing all contact. It means a believer must not enter a binding relationship that pulls the heart, worship, obedience, or future away from Christ.'
  },
  {
    id: 'close-friend-influence',
    outcome: 'Christian Wisdom / Possible Separation — close friendship must not lead you into sin',
    confidence: 'Medium',
    terms: ['best friend', 'close friend', 'hang out with', 'bad friends', 'friends cuss', 'friends drink', 'friends vape', 'friends pressure me', 'friend wants me to sin', 'friend makes fun of church'],
    verses: ['1 Corinthians 15:33', 'Proverbs 13:20', 'Psalm 1:1', 'Ephesians 5:11'],
    answer: 'Having contact with unbelievers is not wrong, and Christians should be kind witnesses. But close companionship that pulls you toward sin, mocks obedience, or weakens your walk with God must be limited or separated from. The issue is not pride; it is obedience and spiritual influence.'
  },
  {
    id: 'business-yoke',
    outcome: 'Biblical Caution — avoid binding partnerships that pull against obedience',
    confidence: 'Medium',
    terms: ['business partner', 'start a business', 'business with unbeliever', 'contract with unbeliever', 'partnership with unbeliever', 'joined in business'],
    verses: ['2 Corinthians 6:14', 'Proverbs 11:3', 'Amos 3:3'],
    answer: 'Scripture warns believers not to be unequally yoked. A binding partnership that requires shared moral decisions, compromise, dishonesty, or spiritual agreement can become a yoke. Ordinary business contact is not the same as a binding partnership, but believers should avoid arrangements that pull them away from obedience.'
  },

  // CHURCH / WORSHIP / ASSEMBLY
  {
    id: 'church-as-hobby',
    outcome: 'Clearly wrong if recreation replaces the church assembly',
    confidence: 'High',
    terms: ['church is fishing', 'church is hunting', 'church in the woods', 'lake fishing', 'woods hunting', 'church is on the lake', 'church is outdoors', 'my church is nature', 'hunting is my church', 'fishing is my church'],
    verses: ['Hebrews 10:25', 'John 4:24', 'Matthew 6:33'],
    answer: 'Hunting, fishing, and enjoying creation are not automatically wrong. But calling recreation “church” is not the same as assembling with believers for worship, preaching, fellowship, and obedience. A believer should not replace the gathered church with personal enjoyment.'
  },
  {
    id: 'skipping-church',
    outcome: 'Clearly wrong when it becomes neglect of the assembly',
    confidence: 'High',
    terms: ['skip church', 'miss church', 'dont go to church', 'do not go to church', 'church not important', 'stay home from church', 'rather sleep than church'],
    verses: ['Hebrews 10:25', 'Matthew 6:33', 'Acts 2:42'],
    answer: 'Scripture teaches believers not to forsake the assembling of themselves together. Sickness, necessity, or providential hindrance may keep someone away at times, but choosing to neglect church for convenience, entertainment, or laziness is not obedience.'
  },
  {
    id: 'communion',
    outcome: 'Clearly wrong — the Lord’s Supper must be handled reverently',
    confidence: 'High',
    terms: ['communion', 'lords supper', 'lord’s supper', 'pizza and pop', 'pizza and soda', 'bread and cup', 'juice and crackers', 'take the lord supper'],
    verses: ['1 Corinthians 11:23', '1 Corinthians 11:27', '1 Corinthians 11:29'],
    answer: 'The Lord’s Supper is not a casual snack or youth activity object lesson. Scripture ties it to the body and blood of Christ and commands self-examination and reverence. A believer should not participate in treating communion carelessly.'
  },
  {
    id: 'worship-music-content',
    outcome: 'Biblical Liberty / Wisdom — test the words, doctrine, and worship purpose',
    confidence: 'Medium',
    terms: ['song', 'christian music', 'worship song', 'hymn', 'music style', 'sing in church', 'famous one', 'bethel', 'elevation', 'hill song', 'hillsong'],
    verses: ['Colossians 3:16', 'Ephesians 5:19', '1 Thessalonians 5:21', '1 Corinthians 10:31'],
    answer: 'A song should be tested by Scripture: Are the words true? Is Christ honored? Is the church being taught sound doctrine? Style alone is not usually a primary separation issue, but false doctrine, irreverence, or confusing worship should not be brought into the church.'
  },

  // GENDER / SEXUALITY / IDENTITY
  {
    id: 'gender-identity-pronouns',
    outcome: 'Clearly wrong to affirm what contradicts God’s created order; speak truth with grace',
    confidence: 'High',
    terms: ['trans', 'transgender', 'call him her', 'call her him', 'pronoun', 'pronouns', 'nonbinary', 'identify as a girl', 'identify as a boy', 'they them'],
    verses: ['Genesis 1:27', 'Mark 10:6', 'Ephesians 4:15'],
    answer: 'A Christian should love the person, avoid cruelty, and speak with kindness. But love does not require affirming an identity that contradicts God’s created order. Speak truthfully and graciously, and do not participate in calling confusion righteous.'
  },
  {
    id: 'sexual-sin',
    outcome: 'Clearly wrong to affirm sexual sin; kindness does not require approval',
    confidence: 'High',
    terms: ['gay', 'homosexual', 'same sex', 'lgbt', 'lesbian', 'bisexual', 'pride month', 'pride flag', 'my friend believes he is gay', 'my friend is gay'],
    verses: ['Romans 1:26', '1 Corinthians 6:9', '1 Corinthians 6:11', 'Ephesians 4:15'],
    answer: 'A Christian should not hate, mock, or mistreat a person. But Scripture does not allow believers to affirm sexual sin as good. The right response is truth with grace: love the person, speak honestly, and do not celebrate or approve what Scripture calls sin.'
  },
  {
    id: 'sexual-immorality-dating',
    outcome: 'Clearly wrong — flee fornication and sexual uncleanness',
    confidence: 'High',
    terms: ['sex before marriage', 'sleep with boyfriend', 'sleep with girlfriend', 'fornication', 'porn', 'lust', 'making out', 'sexual pictures', 'send pictures', 'nudes'],
    verses: ['1 Corinthians 6:18', '1 Thessalonians 4:3', 'Matthew 5:28', 'Ephesians 5:3'],
    answer: 'Scripture clearly commands believers to flee fornication and sexual uncleanness. A Christian should separate from situations, media, conversations, or relationships that are leading into sexual sin.'
  },

  // ENTERTAINMENT / MEDIA / ACTIVITIES
  {
    id: 'entertainment-christ',
    outcome: 'Caution Needed — do not participate in dishonoring Christ',
    confidence: 'High',
    terms: ['jesus christ superstar', 'play about jesus', 'musical about jesus', 'acting as jesus', 'portray jesus', 'movie about jesus'],
    verses: ['Colossians 1:18', 'Philippians 2:9', 'Exodus 20:7'],
    answer: 'The question is not merely whether drama is allowed. The question is whether the production presents Jesus truthfully and reverently. If a play presents Christ in a false, mocking, or irreverent way, a believer should not join in that presentation.'
  },
  {
    id: 'general-drama-club',
    outcome: 'Christian Wisdom Needed — participation depends on the content',
    confidence: 'Medium',
    terms: ['drama club', 'school play', 'theater', 'theatre', 'musical', 'acting', 'audition'],
    verses: ['1 Corinthians 10:31', 'Philippians 4:8', '1 Thessalonians 5:21'],
    answer: 'Drama or acting is not automatically wrong. The believer should ask whether the specific production requires sinful speech, immoral actions, irreverence toward God, false worship, or endorsement of evil. If the content is clean and does not require sin, it may be a wisdom matter rather than a separation command.'
  },
  {
    id: 'movies-games-media',
    outcome: 'Christian Wisdom / Possible Separation — test content by Scripture',
    confidence: 'Medium',
    terms: ['movie', 'show', 'netflix', 'youtube', 'video game', 'game', 'horror', 'violent movie', 'scary movie', 'anime', 'tiktok'],
    verses: ['Philippians 4:8', 'Psalm 101:3', '1 Thessalonians 5:21', '1 Corinthians 10:31'],
    answer: 'Entertainment is not judged merely by whether it is popular. A believer should test whether it promotes lust, blasphemy, rebellion, occultism, sinful pleasure, or a love for evil. If the content leads the heart toward sin, separation from that entertainment is wise and may be necessary.'
  },
  {
    id: 'occult-witchcraft',
    outcome: 'Clearly wrong — separate from occult practice',
    confidence: 'High',
    terms: ['witchcraft', 'spell', 'tarot', 'ouija', 'horoscope', 'zodiac', 'magic ritual', 'talk to dead', 'ghost hunting', 'demon game', 'satanic'],
    verses: ['Deuteronomy 18:10', 'Ephesians 5:11', 'Acts 19:19'],
    answer: 'Scripture clearly forbids occult practice and fellowship with darkness. A Christian should not participate in activities that seek power, guidance, or entertainment from witchcraft, spirits, divination, or darkness.'
  },

  // OBEDIENCE / AUTHORITY / SPEECH
  {
    id: 'parents-authority',
    outcome: 'Clearly required — obey rightful authority unless commanded to sin',
    confidence: 'High',
    terms: ['parents told me', 'mom told me', 'dad told me', 'disobey my parents', 'obey my parents', 'my parents wont let me', 'my parents said no', 'teacher told me'],
    verses: ['Ephesians 6:1', 'Colossians 3:20', 'Acts 5:29'],
    answer: 'Children are commanded to obey their parents in the Lord. If an authority commands sin, we must obey God rather than men. But when the command is not sinful, obedience is the biblical path even when it is not preferred.'
  },
  {
    id: 'lying-cheating',
    outcome: 'Clearly wrong — do not lie, cheat, or deceive',
    confidence: 'High',
    terms: ['lie', 'lying', 'cheat', 'cheating', 'copy homework', 'plagiarize', 'fake sick', 'deceive', 'hide the truth'],
    verses: ['Ephesians 4:25', 'Proverbs 12:22', 'Colossians 3:9'],
    answer: 'Scripture clearly forbids lying and deceit. A Christian should not participate in cheating, hiding truth, or dishonest behavior, even if others are doing it or it seems convenient.'
  },
  {
    id: 'speech-sins',
    outcome: 'Clearly wrong — sinful speech should be put away',
    confidence: 'High',
    terms: ['cuss', 'cussing', 'swear', 'swearing', 'dirty joke', 'gossip', 'slander', 'make fun of', 'bully', 'trash talk', 'crude joking'],
    verses: ['Ephesians 4:29', 'Ephesians 5:4', 'James 4:11', 'Colossians 4:6'],
    answer: 'The Bible commands speech that builds up and is seasoned with grace. A Christian should not join in gossip, filthy joking, slander, cruelty, or corrupt speech.'
  },
  {
    id: 'anger-bitterness',
    outcome: 'Clearly wrong to hold bitterness; pursue forgiveness and righteousness',
    confidence: 'Medium',
    terms: ['hate my dad', 'hate my mom', 'never forgive', 'bitterness', 'revenge', 'get even', 'angry at', 'affair', 'divorce'],
    verses: ['Ephesians 4:31', 'Ephesians 4:32', 'Romans 12:19'],
    answer: 'Sin against you may be truly grievous, and forgiveness does not mean pretending evil was good. But Scripture commands believers to put away bitterness, wrath, and revenge, and to forgive as God has forgiven us. Separation may be needed for wisdom or safety, but hatred and vengeance are not righteous.'
  },

  // SUBSTANCES / WORLDLINESS
  {
    id: 'drugs-alcohol-vaping',
    outcome: 'Clearly wrong when it brings bondage, drunkenness, lawbreaking, or uncleanness',
    confidence: 'High',
    terms: ['vape', 'vaping', 'weed', 'marijuana', 'drunk', 'drinking party', 'alcohol party', 'beer', 'drugs', 'edibles', 'smoke cigarettes', 'nicotine'],
    verses: ['Ephesians 5:18', '1 Corinthians 6:12', '1 Peter 4:3', 'Romans 13:1'],
    answer: 'A believer should not be controlled by substances, join drunkenness, break the law, or place himself under bondage. Separate from parties or friendships that pressure you toward these sins.'
  },
  {
    id: 'party-worldliness',
    outcome: 'Separate when the gathering is built around sin',
    confidence: 'High',
    terms: ['party', 'school dance', 'prom', 'club', 'dance with', 'after party', 'homecoming dance'],
    verses: ['1 Peter 4:3', 'Ephesians 5:11', 'Romans 13:14', '1 Corinthians 10:31'],
    answer: 'A gathering is not wrong merely because people are together. But if the event is built around lust, drunkenness, rebellion, immodesty, or sinful pressure, a Christian should not participate in that fellowship with darkness.'
  },

  // CLOTHING / MODESTY / LIBERTY
  {
    id: 'modesty-clothing',
    outcome: 'Insufficient Biblical Evidence for a universal rule; apply modesty and distinction with wisdom',
    confidence: 'Medium',
    terms: ['women wear pants', 'girl wear pants', 'pants on women', 'pants', 'clothes', 'clothing', 'modesty', 'dress code', 'dress'],
    verses: ['1 Timothy 2:9', 'Deuteronomy 22:5', 'Romans 14:5'],
    answer: 'Scripture teaches modesty and a distinction between male and female, but it does not give enough biblical evidence to make a universal rule that women wearing pants is always sin. This should be handled with modesty, honesty, humility, and respect for godly authority rather than treated as a primary separation issue.'
  },
  {
    id: 'liberty-preference',
    outcome: 'Biblical Liberty / Wisdom — do not make a universal rule where Scripture does not',
    confidence: 'Medium',
    terms: ['preference', 'style', 'hair length', 'beard', 'makeup', 'jewelry', 'sports', 'hobby', 'video games wrong', 'is it wrong to eat', 'is it wrong to drink coffee'],
    verses: ['Romans 14:5', 'Romans 14:22', '1 Corinthians 10:31'],
    answer: 'Not every preference question is a separation issue. Where Scripture gives no direct command or prohibition, believers should act with a clear conscience, avoid causing others to stumble, honor authority, and do all to the glory of God.'
  },

  // SEPARATION FROM BELIEVERS IN SIN / DISORDER
  {
    id: 'professing-believer-sin',
    outcome: 'Separation from disorderly conduct may be required after biblical warning',
    confidence: 'Medium',
    terms: ['christian living in sin', 'believer living in sin', 'church member in sin', 'claims to be christian but', 'brother in sin', 'sister in sin', 'wont repent', 'refuses to repent'],
    verses: ['2 Thessalonians 3:6', '1 Corinthians 5:11', 'Galatians 6:1', 'Matthew 18:15'],
    answer: 'Scripture distinguishes between restoring a repentant believer and continuing close fellowship with someone who claims Christ while refusing correction. The goal is restoration, not pride, but ongoing unrepentant sin may require separation.'
  },

  // BAPTISM / CHURCH CONVICTION
  {
    id: 'baptism-membership',
    outcome: 'Biblical Conviction — church fellowship should follow biblical doctrine and order',
    confidence: 'Medium',
    terms: ['baptism', 'sprinkling', 'infant baptism', 'join church', 'church membership', 'baptized as baby'],
    verses: ['Acts 2:41', 'Romans 6:4', 'Matthew 28:19'],
    answer: 'Baptism and church membership are not gospel-denial by themselves in every case, but they are biblical conviction issues. A church should practice and require baptism according to Scripture and should not ignore doctrine for the sake of convenience.'
  }
];

const wisdomFallback = {
  id: 'wisdom-fallback',
  outcome: 'Christian Wisdom Needed — ask the question more specifically',
  confidence: 'Low',
  verses: ['James 1:5', '1 Thessalonians 5:21', '1 Corinthians 10:31'],
  answer: 'This question does not clearly match a direct separation category as written. That does not mean “anything goes.” Ask: Does it deny the gospel? Does it affirm sin? Does it create a binding yoke with unbelief? Does it require disobedience? Does it join worship with false doctrine? A more specific question will usually produce a clearer biblical answer.'
};

function chooseRule(question) {
  const q = normalize(question);

  let bestRule = null;
  let bestScore = 0;

  for (const rule of RULES) {
    let score = 0;
    for (const term of rule.terms) {
      const t = normalize(term);
      if (!t) continue;
      if (q.includes(t)) score += t.split(' ').length + 2;
      else {
        // Give partial credit for important individual words in longer open-ended questions.
        const words = t.split(' ').filter(w => w.length > 3);
        const hits = words.filter(w => q.includes(w)).length;
        if (words.length > 1 && hits >= Math.ceil(words.length * 0.6)) score += hits;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  if (bestRule && bestScore >= 3) return bestRule;
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
    <p class="confidence"><strong>Confidence:</strong> ${escapeHtml(result.confidence || 'Medium')}</p>
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
