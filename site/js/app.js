/* STAAR Power Portal — App Engine v2.0
   Shared across all grade pages + landing page.
   Features: Practice arena, missions, badges, dashboard, parent snapshot,
   missed-question replay, confidence tracking, countdown timers, subject tabs. */

(function () {
  "use strict";

  const STORAGE_PREFIX = "staarPortalV2_";
  const CURRENT_GRADE = document.body.dataset.grade || null;

  /* ─── Question Banks by Grade ─── */
  const questionBanks = {
    "3": [
      { id:"3r1", subject:"reading", skill:"Main Idea", difficulty:"easy", question:"Why do readers look for the main idea in a passage?", options:["To figure out the big point the author is teaching or telling","To count how many sentences are in the passage","To find the hardest word only","To choose the longest answer"], answer:0, explanation:"The main idea is the big point. Good readers ask, 'What is this mostly about?'" },
      { id:"3r2", subject:"reading", skill:"Context Clues", difficulty:"easy", question:"A story says, 'Lena tiptoed through the silent room.' What does 'silent' most likely mean?", options:["Very noisy","Quiet","Messy","Crowded"], answer:1, explanation:"Use the clue 'tiptoed.' People tiptoe when a place is quiet." },
      { id:"3r3", subject:"reading", skill:"Author's Purpose", difficulty:"medium", question:"If a text gives steps for planting a flower, what is the author mostly trying to do?", options:["Entertain you","Persuade you to buy a flower","Inform or teach you","Tell a fantasy story"], answer:2, explanation:"Step-by-step directions are usually meant to teach or inform." },
      { id:"3r4", subject:"reading", skill:"Character Traits", difficulty:"medium", question:"Milo shares his snack with a new student. Which word best describes Milo?", options:["Selfish","Kind","Sleepy","Forgetful"], answer:1, explanation:"Sharing with someone new shows kindness." },
      { id:"3r5", subject:"reading", skill:"Inference", difficulty:"medium", question:"The sky turned dark, thunder rumbled, and Ava ran inside with the laundry. What can you infer?", options:["Ava is going to school","A storm is coming","It is bedtime","The laundry is dirty"], answer:1, explanation:"Dark skies and thunder are clues that a storm is coming." },
      { id:"3r6", subject:"reading", skill:"Text Features", difficulty:"easy", question:"What is a heading used for in nonfiction text?", options:["To make the page heavier","To show a section topic","To hide the main idea","To replace every sentence"], answer:1, explanation:"Headings help readers know what a section is about." },
      { id:"3r7", subject:"reading", skill:"Theme", difficulty:"hard", question:"A story shows that practicing every day helped a girl become a better piano player. Which theme fits best?", options:["Practice helps people improve","Travel is always fun","Rules are silly","Rainy days last forever"], answer:0, explanation:"A theme is a lesson or message. Here the lesson is that practice leads to growth." },
      { id:"3r8", subject:"reading", skill:"Summary", difficulty:"medium", question:"Which is the best summary?", options:["A penguin had black feathers.","The article explains where penguins live, what they eat, and how they stay warm.","I like penguins best.","The title is about penguins."], answer:1, explanation:"A good summary tells the important parts without tiny details or opinions." },
      { id:"3m1", subject:"math", skill:"Place Value", difficulty:"easy", question:"Which number is the greatest?", options:["345","354","435","453"], answer:3, explanation:"Compare hundreds first. 453 has 4 hundreds and 5 tens, so it is the greatest." },
      { id:"3m2", subject:"math", skill:"Addition", difficulty:"easy", question:"What is 247 + 36?", options:["273","283","293","313"], answer:1, explanation:"247 + 30 = 277, then +6 = 283." },
      { id:"3m3", subject:"math", skill:"Subtraction", difficulty:"medium", question:"What is 500 - 178?", options:["312","322","332","342"], answer:1, explanation:"500 - 100 = 400, then -70 = 330, then -8 = 322." },
      { id:"3m4", subject:"math", skill:"Multiplication", difficulty:"medium", question:"Which expression matches 4 groups of 6?", options:["4 + 6","6 - 4","4 x 6","6 / 4"], answer:2, explanation:"Equal groups are multiplication. 4 groups of 6 means 4 x 6." },
      { id:"3m5", subject:"math", skill:"Fractions", difficulty:"easy", question:"Which fraction shows one out of four equal parts shaded?", options:["1/2","1/3","1/4","4/1"], answer:2, explanation:"One shaded part out of four equal parts is 1/4." },
      { id:"3m6", subject:"math", skill:"Measurement", difficulty:"medium", question:"A ribbon is 9 inches long. Another ribbon is 4 inches long. How much longer is the first ribbon?", options:["5 inches","6 inches","13 inches","36 inches"], answer:0, explanation:"Find the difference: 9 - 4 = 5." },
      { id:"3m7", subject:"math", skill:"Area", difficulty:"hard", question:"A rectangle has 3 rows of 5 square tiles. What is the area?", options:["8 square units","15 square units","10 square units","35 square units"], answer:1, explanation:"Area is rows x columns: 3 x 5 = 15 square units." },
      { id:"3m8", subject:"math", skill:"Data", difficulty:"medium", question:"A bar graph shows 7 dogs, 5 cats, and 3 birds. How many more dogs than birds are there?", options:["2","3","4","10"], answer:2, explanation:"Compare the bar amounts: 7 - 3 = 4." },
      { id:"3x1", subject:"mixed", skill:"Word Problem", difficulty:"medium", question:"Sara read 12 pages on Monday and 15 pages on Tuesday. She wants to read 30 pages total. How many more pages does she need?", options:["1","2","3","27"], answer:2, explanation:"12 + 15 = 27. To get to 30, she needs 3 more pages." },
      { id:"3x2", subject:"mixed", skill:"Vocabulary", difficulty:"easy", question:"Which word is an antonym of 'gigantic'?", options:["Huge","Tiny","Tall","Heavy"], answer:1, explanation:"An antonym is an opposite. The opposite of gigantic is tiny." },
      { id:"3x3", subject:"mixed", skill:"Elapsed Time", difficulty:"hard", question:"A movie starts at 3:15 and ends at 4:00. How long is the movie?", options:["30 minutes","45 minutes","50 minutes","1 hour"], answer:1, explanation:"From 3:15 to 4:00 is 45 minutes." },
      { id:"3x4", subject:"mixed", skill:"Sequence", difficulty:"medium", question:"Which clue word often shows the order of events?", options:["Because","First","Blue","Large"], answer:1, explanation:"Words like first, next, then, and last show sequence." }
    ],
    "4": [
      { id:"4r1", subject:"reading", skill:"Main Idea", difficulty:"easy", question:"A passage describes how recycling helps reduce waste in landfills. What is the main idea?", options:["Landfills are full","Recycling helps reduce waste","Trash is heavy","People like recycling bins"], answer:1, explanation:"The main idea is the central point all the details support." },
      { id:"4r2", subject:"reading", skill:"Inference", difficulty:"medium", question:"Marcus packed sunscreen, a towel, and a cooler of sandwiches. Where is he probably going?", options:["A library","A beach or pool","A movie theater","A classroom"], answer:1, explanation:"Sunscreen, towel, and cooler are clues that point to a beach or pool trip." },
      { id:"4r3", subject:"reading", skill:"Figurative Language", difficulty:"medium", question:"'The wind whispered through the trees.' What type of figurative language is this?", options:["Simile","Alliteration","Personification","Hyperbole"], answer:2, explanation:"Giving human qualities (whispering) to wind is personification." },
      { id:"4r4", subject:"reading", skill:"Author's Purpose", difficulty:"easy", question:"An article lists the top 5 reasons to adopt a pet from a shelter. What is the author's purpose?", options:["To entertain","To persuade","To describe a pet","To confuse"], answer:1, explanation:"Listing reasons to do something means the author is trying to persuade." },
      { id:"4m1", subject:"math", skill:"Multiplication", difficulty:"medium", question:"What is 23 x 4?", options:["82","86","92","96"], answer:2, explanation:"20 x 4 = 80, then 3 x 4 = 12, and 80 + 12 = 92." },
      { id:"4m2", subject:"math", skill:"Division", difficulty:"medium", question:"There are 36 stickers shared equally among 4 friends. How many does each friend get?", options:["7","8","9","10"], answer:2, explanation:"36 divided by 4 = 9 stickers each." },
      { id:"4m3", subject:"math", skill:"Fractions", difficulty:"medium", question:"Which fraction is equivalent to 2/4?", options:["1/2","1/3","3/4","2/3"], answer:0, explanation:"2/4 simplifies to 1/2 because 2 divided by 2 = 1, and 4 divided by 2 = 2." },
      { id:"4m4", subject:"math", skill:"Geometry", difficulty:"easy", question:"How many right angles does a rectangle have?", options:["2","3","4","5"], answer:2, explanation:"A rectangle has 4 corners and each one is a right angle." },
      { id:"4x1", subject:"mixed", skill:"Multi-Step Problem", difficulty:"hard", question:"A store sells notebooks for $3 each. Kim buys 5 and pays with a $20 bill. How much change does she get?", options:["$3","$5","$15","$17"], answer:1, explanation:"5 x $3 = $15. Then $20 - $15 = $5 change." },
      { id:"4x2", subject:"mixed", skill:"Context Clues", difficulty:"medium", question:"'The ancient castle had crumbling walls and moss-covered stones.' What does 'ancient' mean?", options:["Brand new","Very old","Colorful","Small"], answer:1, explanation:"Crumbling walls and moss suggest the castle is very old." }
    ],
    "5": [
      { id:"5r1", subject:"reading", skill:"Theme", difficulty:"medium", question:"In a story a character keeps trying even after failing three times and finally succeeds. What is the theme?", options:["Giving up is the best plan","Persistence leads to success","Failure means you should stop","Winning is everything"], answer:1, explanation:"The character kept trying and succeeded. The theme is about persistence paying off." },
      { id:"5r2", subject:"reading", skill:"Point of View", difficulty:"medium", question:"A story is told by a narrator who uses 'I' and 'we.' What point of view is this?", options:["Third person","Second person","First person","No point of view"], answer:2, explanation:"Using 'I' and 'we' means the narrator is telling the story from first person." },
      { id:"5r3", subject:"reading", skill:"Text Structure", difficulty:"hard", question:"A passage first describes a problem with pollution, then explains how communities are solving it. What text structure is this?", options:["Cause and effect","Compare and contrast","Problem and solution","Chronological order"], answer:2, explanation:"Describing a problem and then a solution is the problem-and-solution text structure." },
      { id:"5r4", subject:"reading", skill:"Vocabulary", difficulty:"medium", question:"The prefix 'un-' means 'not.' What does 'unfamiliar' mean?", options:["Very familiar","Not familiar","More familiar","Becoming familiar"], answer:1, explanation:"Un- means not. Unfamiliar means not familiar." },
      { id:"5m1", subject:"math", skill:"Decimals", difficulty:"medium", question:"What is 3.5 + 2.75?", options:["5.25","6.00","6.25","6.75"], answer:2, explanation:"Line up decimals: 3.50 + 2.75 = 6.25." },
      { id:"5m2", subject:"math", skill:"Volume", difficulty:"medium", question:"A box is 4 units long, 3 units wide, and 2 units tall. What is the volume?", options:["9 cubic units","14 cubic units","20 cubic units","24 cubic units"], answer:3, explanation:"Volume = length x width x height = 4 x 3 x 2 = 24 cubic units." },
      { id:"5m3", subject:"math", skill:"Fractions", difficulty:"hard", question:"What is 1/3 + 1/6?", options:["1/6","2/9","1/2","2/6"], answer:2, explanation:"Find a common denominator: 2/6 + 1/6 = 3/6 = 1/2." },
      { id:"5m4", subject:"math", skill:"Order of Operations", difficulty:"medium", question:"What is 3 + 4 x 2?", options:["14","11","10","9"], answer:1, explanation:"Multiply first: 4 x 2 = 8. Then add: 3 + 8 = 11." },
      { id:"5x1", subject:"mixed", skill:"Coordinate Planes", difficulty:"medium", question:"Which ordered pair names a point 3 units right and 5 units up from the origin?", options:["(5, 3)","(3, 5)","(3, 3)","(5, 5)"], answer:1, explanation:"(x, y) means right then up. 3 right and 5 up = (3, 5)." },
      { id:"5x2", subject:"mixed", skill:"Summary", difficulty:"medium", question:"A passage describes how butterflies migrate, what they eat, and where they lay eggs. Which is the best summary?", options:["Butterflies are colorful.","The passage explains the migration, diet, and reproduction of butterflies.","I saw a butterfly once.","Butterflies live outside."], answer:1, explanation:"A good summary captures the key topics without opinions or trivial details." }
    ],
    "6": [
      { id:"6r1", subject:"reading", skill:"Analysis", difficulty:"medium", question:"An author uses short, choppy sentences during an action scene. Why might the author do this?", options:["To confuse the reader","To create a sense of speed and tension","To save space","To be lazy"], answer:1, explanation:"Short sentences speed up the pace and create tension during action." },
      { id:"6r2", subject:"reading", skill:"Argument", difficulty:"hard", question:"Which is the strongest type of evidence to support a claim?", options:["A personal opinion","A fact with a source","A guess","A rhetorical question"], answer:1, explanation:"Facts with sources are the strongest evidence because they can be verified." },
      { id:"6r3", subject:"reading", skill:"Figurative Language", difficulty:"medium", question:"'She was drowning in homework.' This is an example of what?", options:["Simile","Metaphor","Onomatopoeia","Hyperbole"], answer:3, explanation:"Hyperbole is extreme exaggeration used for effect. She is not literally drowning." },
      { id:"6r4", subject:"reading", skill:"Tone", difficulty:"medium", question:"A passage uses words like 'disappointing,' 'unfortunately,' and 'sadly.' What is the tone?", options:["Excited","Hopeful","Negative or disappointed","Humorous"], answer:2, explanation:"Word choice like 'unfortunately' and 'sadly' creates a disappointed tone." },
      { id:"6m1", subject:"math", skill:"Ratios", difficulty:"medium", question:"In a class of 30 students, 12 are wearing blue. What is the ratio of blue-wearers to total students?", options:["12:30","2:5","5:2","12:18"], answer:1, explanation:"12:30 simplifies to 2:5 (divide both by 6)." },
      { id:"6m2", subject:"math", skill:"Percent", difficulty:"medium", question:"What is 25% of 80?", options:["15","20","25","40"], answer:1, explanation:"25% means one quarter. 80 / 4 = 20." },
      { id:"6m3", subject:"math", skill:"Expressions", difficulty:"medium", question:"Evaluate the expression 2n + 5 when n = 7.", options:["14","17","19","21"], answer:2, explanation:"2(7) + 5 = 14 + 5 = 19." },
      { id:"6m4", subject:"math", skill:"Area", difficulty:"hard", question:"What is the area of a triangle with a base of 10 and a height of 6?", options:["16","30","60","20"], answer:1, explanation:"Area of a triangle = 1/2 x base x height = 1/2 x 10 x 6 = 30." },
      { id:"6x1", subject:"mixed", skill:"Integers", difficulty:"medium", question:"What is -3 + 8?", options:["-11","5","11","-5"], answer:1, explanation:"Start at -3 on the number line and move 8 to the right. You land on 5." },
      { id:"6x2", subject:"mixed", skill:"Inference", difficulty:"hard", question:"A character nervously checks the clock, paces the hallway, and keeps glancing at the door. What can you infer?", options:["The character is bored","The character is waiting anxiously for someone or something","The character is tired","The character likes clocks"], answer:1, explanation:"Checking the clock, pacing, and glancing at the door are signs of anxious waiting." }
    ]
  };

  /* ─── Badges by Grade ─── */
  const badgeDefs = {
    "3": [
      { id:"badge-main-idea", label:"Main Idea Master", icon:"\ud83d\udcda", rule:s=> (s.skills["Main Idea"]||0) >= 2 },
      { id:"badge-math", label:"Math Mountain Climber", icon:"\u26f0\ufe0f", rule:s=> (s.subjectCorrect.math||0) >= 4 },
      { id:"badge-reading", label:"Reading Rocket", icon:"\ud83d\ude80", rule:s=> (s.subjectCorrect.reading||0) >= 4 },
      { id:"badge-streak", label:"5 Day Streak", icon:"\ud83d\udd25", rule:s=> (s.studyDays||[]).length >= 5 },
      { id:"badge-mixed", label:"Mixed Mission Hero", icon:"\ud83c\udf08", rule:s=> (s.subjectCorrect.mixed||0) >= 2 },
      { id:"badge-perfect", label:"Perfect 5", icon:"\ud83d\udc51", rule:s=> (s.bestRun||0) >= 5 }
    ],
    "4": [
      { id:"badge-main-idea", label:"Main Idea Pro", icon:"\ud83d\udcda", rule:s=> (s.skills["Main Idea"]||0) >= 2 },
      { id:"badge-math", label:"Multiplication Master", icon:"\u2716\ufe0f", rule:s=> (s.subjectCorrect.math||0) >= 4 },
      { id:"badge-reading", label:"Bookworm", icon:"\ud83d\udc1b", rule:s=> (s.subjectCorrect.reading||0) >= 3 },
      { id:"badge-streak", label:"5 Day Streak", icon:"\ud83d\udd25", rule:s=> (s.studyDays||[]).length >= 5 },
      { id:"badge-mixed", label:"All-Around Star", icon:"\u2b50", rule:s=> (s.subjectCorrect.mixed||0) >= 2 },
      { id:"badge-perfect", label:"Perfect 5", icon:"\ud83d\udc51", rule:s=> (s.bestRun||0) >= 5 }
    ],
    "5": [
      { id:"badge-theme", label:"Theme Detective", icon:"\ud83d\udd0d", rule:s=> (s.skills["Theme"]||0) >= 1 },
      { id:"badge-math", label:"Decimal Ace", icon:"\ud83c\udfaf", rule:s=> (s.subjectCorrect.math||0) >= 4 },
      { id:"badge-reading", label:"Deep Reader", icon:"\ud83d\udcd6", rule:s=> (s.subjectCorrect.reading||0) >= 3 },
      { id:"badge-streak", label:"5 Day Streak", icon:"\ud83d\udd25", rule:s=> (s.studyDays||[]).length >= 5 },
      { id:"badge-mixed", label:"Cross-Subject Star", icon:"\ud83c\udf1f", rule:s=> (s.subjectCorrect.mixed||0) >= 2 },
      { id:"badge-perfect", label:"Perfect 5", icon:"\ud83d\udc51", rule:s=> (s.bestRun||0) >= 5 }
    ],
    "6": [
      { id:"badge-analysis", label:"Critical Thinker", icon:"\ud83e\udde0", rule:s=> (s.skills["Analysis"]||0) >= 1 },
      { id:"badge-math", label:"Ratio Ranger", icon:"\ud83d\udcca", rule:s=> (s.subjectCorrect.math||0) >= 4 },
      { id:"badge-reading", label:"Literary Leader", icon:"\ud83c\udfc6", rule:s=> (s.subjectCorrect.reading||0) >= 3 },
      { id:"badge-streak", label:"5 Day Streak", icon:"\ud83d\udd25", rule:s=> (s.studyDays||[]).length >= 5 },
      { id:"badge-mixed", label:"Ultimate Scholar", icon:"\ud83c\udf93", rule:s=> (s.subjectCorrect.mixed||0) >= 2 },
      { id:"badge-perfect", label:"Perfect 5", icon:"\ud83d\udc51", rule:s=> (s.bestRun||0) >= 5 }
    ]
  };

  /* ─── State Management ─── */
  function storageKey() {
    return STORAGE_PREFIX + (CURRENT_GRADE || "global");
  }
  function defaultState() {
    return {
      completedQuestions: {},
      missedQuestions: [],
      studyDays: [],
      confidenceLog: [],
      subjectCorrect: { reading: 0, math: 0, mixed: 0 },
      skills: {},
      bestRun: 0,
      lastScore: 0,
      lastMode: "practice",
      missionChecks: { day1: false, day2: false, day3: false, day4: false },
      badges: {}
    };
  }
  function getState() {
    try {
      return Object.assign({}, defaultState(), JSON.parse(localStorage.getItem(storageKey()) || "{}"));
    } catch (e) {
      return defaultState();
    }
  }
  function setState(s) {
    localStorage.setItem(storageKey(), JSON.stringify(s));
  }
  function markToday(s) {
    var today = new Date().toISOString().slice(0, 10);
    if (!s.studyDays) s.studyDays = [];
    if (!s.studyDays.includes(today)) s.studyDays.push(today);
  }
  function updateBadges(s) {
    var defs = badgeDefs[CURRENT_GRADE] || [];
    defs.forEach(function (b) { s.badges[b.id] = !!b.rule(s); });
  }
  function todayStr() { return new Date().toISOString().slice(0, 10); }
  function formatDate(d) {
    return new Date(d + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  /* ─── Countdown Timers (landing page) ─── */
  function setupCountdown() {
    var boxes = document.querySelectorAll("[data-countdown]");
    if (!boxes.length) return;
    var targets = {
      reading: new Date("2026-04-07T08:00:00"),
      math: new Date("2026-04-21T08:00:00")
    };
    function render(type, el) {
      var diff = Math.max(0, targets[type] - new Date());
      el.querySelector(".d").textContent = Math.floor(diff / 864e5);
      el.querySelector(".h").textContent = Math.floor((diff / 36e5) % 24);
      el.querySelector(".m").textContent = Math.floor((diff / 6e4) % 60);
      el.querySelector(".s").textContent = Math.floor((diff / 1e3) % 60);
    }
    function tick() { boxes.forEach(function (el) { render(el.dataset.countdown, el); }); }
    tick();
    setInterval(tick, 1000);
  }

  /* ─── Subject Tabs (grade study pages) ─── */
  function setupSubjectTabs() {
    var tabs = document.querySelectorAll("[data-tab]");
    var panels = document.querySelectorAll("[data-panel]");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
        panels.forEach(function (p) { p.classList.toggle("active", p.dataset.panel === tab.dataset.tab); });
      });
    });
  }

  /* ─── Missions ─── */
  function initMissions() {
    var root = document.getElementById("missionArea");
    if (!root) return;
    var state = getState();
    var missions = [
      { id: "day1", title: "Day 1 \u2014 Reading Rocket", cls: "", items: ["Main idea warm-up", "Context clues sprint", "Read one short passage", "Do 5 reading questions"] },
      { id: "day2", title: "Day 2 \u2014 Math Mountain", cls: "math", items: ["Key concept refresh", "Operations review", "Fractions or geometry check", "Do 5 math questions"] },
      { id: "day3", title: "Day 3 \u2014 Mixed Mission", cls: "mixed", items: ["5 reading questions", "5 math questions", "Replay 2 missed questions", "Confidence check"] },
      { id: "day4", title: "Day 4 \u2014 Confidence Camp", cls: "confidence", items: ["Review weak skills", "Print a cheat sheet", "One short challenge set", "Celebrate progress"] }
    ];
    root.innerHTML = missions.map(function (m) {
      return '<div class="mission-card ' + m.cls + '">' +
        '<div class="small muted">' + m.id.toUpperCase() + '</div>' +
        '<h3>' + m.title + '</h3>' +
        '<ul>' + m.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + '</ul>' +
        '<button class="btn ' + (state.missionChecks[m.id] ? "teal" : "secondary") + '" data-mission="' + m.id + '">' +
        (state.missionChecks[m.id] ? "\u2705 Done" : "Mark Done") + '</button></div>';
    }).join("");
    root.querySelectorAll("[data-mission]").forEach(function (btn) {
      btn.onclick = function () {
        var s = getState();
        s.missionChecks[btn.dataset.mission] = !s.missionChecks[btn.dataset.mission];
        markToday(s); updateBadges(s); setState(s);
        initMissions(); renderDashboard();
      };
    });
  }

  /* ─── Dashboard ─── */
  function renderDashboard() {
    var root = document.getElementById("dashboard");
    if (!root) return;
    var state = getState();
    updateBadges(state); setState(state);
    var totalAnswered = Object.keys(state.completedQuestions).length;
    var totalCorrect = Object.values(state.completedQuestions).filter(function (v) { return v.correct; }).length;
    var percent = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    var missedCount = Array.from(new Set(state.missedQuestions)).length;

    root.innerHTML =
      '<div class="grid-4">' +
        '<div class="stat-card"><div class="muted small">Answered</div><div class="kpi">' + totalAnswered + '</div></div>' +
        '<div class="stat-card"><div class="muted small">Accuracy</div><div class="kpi">' + percent + '%</div></div>' +
        '<div class="stat-card"><div class="muted small">Missed</div><div class="kpi">' + missedCount + '</div></div>' +
        '<div class="stat-card"><div class="muted small">Best Run</div><div class="kpi">' + (state.bestRun || 0) + '</div></div>' +
      '</div>' +
      '<div class="grid-2" style="margin-top:18px">' +
        '<div class="panel"><h3>Progress Meter</h3><div class="meter"><span style="width:' + Math.min(percent, 100) + '%"></span></div>' +
        '<p class="small muted" style="margin-top:10px">Saves in this browser on this device.</p></div>' +
        '<div class="panel"><h3>Mission Checkpoints</h3><table class="table-lite">' +
          '<tr><td>Day 1 Reading Rocket</td><td>' + (state.missionChecks.day1 ? "\u2705" : "\u2b1c") + '</td></tr>' +
          '<tr><td>Day 2 Math Mountain</td><td>' + (state.missionChecks.day2 ? "\u2705" : "\u2b1c") + '</td></tr>' +
          '<tr><td>Day 3 Mixed Mission</td><td>' + (state.missionChecks.day3 ? "\u2705" : "\u2b1c") + '</td></tr>' +
          '<tr><td>Day 4 Confidence Camp</td><td>' + (state.missionChecks.day4 ? "\u2705" : "\u2b1c") + '</td></tr>' +
        '</table></div></div>';

    renderBadgeGrid();
    renderParentDashboard();
    renderMissedList();
    renderCertificates();
  }

  /* ─── Badge Grid ─── */
  function renderBadgeGrid() {
    var root = document.getElementById("badgeGrid");
    if (!root) return;
    var state = getState();
    updateBadges(state);
    var defs = badgeDefs[CURRENT_GRADE] || [];
    root.innerHTML = defs.map(function (b) {
      return '<div class="badge ' + (state.badges[b.id] ? "" : "locked") + '">' +
        '<div class="badge-icon">' + b.icon + '</div>' +
        '<strong>' + b.label + '</strong>' +
        '<div class="small muted">' + (state.badges[b.id] ? "Unlocked!" : "Keep going!") + '</div></div>';
    }).join("");
  }

  /* ─── Parent Dashboard ─── */
  function renderParentDashboard() {
    var root = document.getElementById("parentDashboard");
    if (!root) return;
    var state = getState();
    var r = state.subjectCorrect.reading || 0;
    var m = state.subjectCorrect.math || 0;
    var x = state.subjectCorrect.mixed || 0;
    var weak = Object.entries(state.skills).sort(function (a, b) { return a[1] - b[1]; }).slice(0, 4).map(function (e) { return e[0]; });
    var conf = (state.confidenceLog || []).slice(-4).map(function (c) { return formatDate(c.date) + " " + c.value; }).join(" \u2022 ") || "No check-ins yet";
    root.innerHTML =
      '<div class="grid-2">' +
        '<div class="panel"><h3>Subject Strengths</h3><table class="table-lite">' +
          '<tr><td>Reading correct</td><td>' + r + '</td></tr>' +
          '<tr><td>Math correct</td><td>' + m + '</td></tr>' +
          '<tr><td>Mixed correct</td><td>' + x + '</td></tr>' +
          '<tr><td>Last score</td><td>' + (state.lastScore || 0) + '%</td></tr></table></div>' +
        '<div class="panel"><h3>Needs Work</h3>' +
          '<div class="pill-row">' + (weak.length ? weak : ["Main Idea", "Word Problems"]).map(function (s) { return '<span class="pill">' + s + '</span>'; }).join("") + '</div>' +
          '<p class="small muted" style="margin-top:12px">Confidence: ' + conf + '</p></div></div>';
  }

  /* ─── Missed Questions ─── */
  function renderMissedList() {
    var root = document.getElementById("missedList");
    if (!root) return;
    var state = getState();
    var ids = Array.from(new Set(state.missedQuestions));
    var bank = questionBanks[CURRENT_GRADE] || [];
    if (!ids.length) {
      root.innerHTML = '<div class="panel"><h3>Missed Questions Replay</h3><p class="muted">Nothing missed yet. That is a win.</p></div>';
      return;
    }
    var cards = ids.map(function (id) { return bank.find(function (q) { return q.id === id; }); })
      .filter(Boolean)
      .map(function (q) {
        return '<div class="mini-card"><div class="small muted">' + q.subject.toUpperCase() + ' \u2022 ' + q.skill + '</div>' +
          '<h3 style="margin-top:8px">' + q.question + '</h3>' +
          '<div class="small">Correct: <strong>' + String.fromCharCode(65 + q.answer) + '. ' + q.options[q.answer] + '</strong></div>' +
          '<div class="small muted" style="margin-top:8px">' + q.explanation + '</div></div>';
      }).join("");
    root.innerHTML = '<div class="panel"><h3>Missed Questions Replay</h3><div class="grid-2">' + cards + '</div></div>';
  }

  /* ─── Certificates ─── */
  function renderCertificates() {
    var root = document.getElementById("certificateArea");
    if (!root) return;
    var state = getState();
    var total = Object.values(state.badges).filter(Boolean).length;
    root.innerHTML =
      '<div class="panel center">' +
        '<h3>Victory Certificate</h3><p class="lead">Print this after a strong week or before test day.</p>' +
        '<div class="callout" style="max-width:720px;margin:0 auto">' +
          '<div class="small muted">Awarded by</div>' +
          '<div style="font-size:1.6rem;font-weight:900;margin:6px 0">RISE Studio Labs STAAR Power Portal</div>' +
          '<div style="font-size:1.1rem;font-weight:900">This certifies the student completed brave, focused study missions and earned <strong>' + total + '</strong> badge(s).</div>' +
          '<div class="small muted" style="margin-top:12px">Brought to you by <strong>www.risestudiolabs.com</strong></div></div>' +
        '<button class="btn secondary no-print" style="margin-top:14px" onclick="window.print()">Print Certificate</button></div>';
  }

  /* ─── Practice Arena ─── */
  function initPractice() {
    var root = document.getElementById("practiceApp");
    if (!root) return;
    var bank = questionBanks[CURRENT_GRADE] || [];
    if (!bank.length) {
      root.innerHTML = '<div class="panel"><h3>Practice questions coming soon</h3><p class="muted">This grade\'s question bank is being expanded.</p></div>';
      return;
    }
    var state = getState();
    var filter = "all";
    var mode = state.lastMode || "practice";
    var streak = 0;
    var idx = 0;
    var timer = null;
    var timeLeft = 0;
    var durations = { practice: 0, focus: 45, challenge: 30 };

    function filtered() {
      if (filter === "all") return bank;
      if (filter === "missed") {
        var ids = Array.from(new Set(state.missedQuestions));
        return bank.filter(function (q) { return ids.includes(q.id); });
      }
      return bank.filter(function (q) { return q.subject === filter; });
    }
    function score(list) {
      var done = list.filter(function (q) { return state.completedQuestions[q.id]; });
      var correct = done.filter(function (q) { return state.completedQuestions[q.id].correct; }).length;
      return { done: done.length, correct: correct, total: list.length, pct: list.length ? Math.round(correct / list.length * 100) : 0 };
    }
    function startTimer() {
      stopTimer();
      timeLeft = durations[mode];
      if (timeLeft <= 0) { renderTimer(); return; }
      timer = setInterval(function () {
        timeLeft--;
        renderTimer();
        if (timeLeft <= 0) stopTimer();
      }, 1000);
    }
    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
    function renderTimer() {
      var el = document.getElementById("timerDisplay");
      if (!el) return;
      if (durations[mode] === 0) { el.textContent = "No timer in Practice Mode"; return; }
      el.textContent = String(Math.floor(timeLeft / 60)).padStart(2, "0") + ":" + String(timeLeft % 60).padStart(2, "0") + " remaining";
    }

    function render() {
      state = getState();
      updateBadges(state); setState(state);
      var list = filtered();
      if (idx >= list.length) idx = 0;
      var q = list[idx];
      var s = score(list);

      root.innerHTML =
        '<div class="practice-layout"><div class="sidebar-stack">' +
          '<div class="panel"><h3>Mode</h3><div class="pill-row">' +
            '<button class="pill ' + (mode === "practice" ? "active" : "") + '" data-mode="practice">Practice</button>' +
            '<button class="pill ' + (mode === "focus" ? "active" : "") + '" data-mode="focus">Focus</button>' +
            '<button class="pill ' + (mode === "challenge" ? "active" : "") + '" data-mode="challenge">Challenge</button></div>' +
            '<div class="timer" style="margin-top:14px"><strong>Timer</strong><span id="timerDisplay"></span></div></div>' +
          '<div class="panel"><h3>Sets</h3><div class="pill-row">' +
            '<button class="pill ' + (filter === "all" ? "active" : "") + '" data-filter="all">All</button>' +
            '<button class="pill ' + (filter === "reading" ? "active" : "") + '" data-filter="reading">Reading</button>' +
            '<button class="pill ' + (filter === "math" ? "active" : "") + '" data-filter="math">Math</button>' +
            '<button class="pill ' + (filter === "mixed" ? "active" : "") + '" data-filter="mixed">Mixed</button>' +
            '<button class="pill ' + (filter === "missed" ? "active" : "") + '" data-filter="missed">Missed</button></div>' +
            '<p class="small muted" style="margin-top:10px">' + s.done + ' of ' + s.total + ' done \u2022 ' + s.pct + '% correct</p>' +
            '<div class="meter"><span style="width:' + (s.total ? s.done / s.total * 100 : 0) + '%"></span></div></div>' +
          '<div class="panel"><h3>Confidence Check</h3><div class="confidence-row">' +
            '<button class="emoji-btn" data-confidence="Nervous">Nervous</button>' +
            '<button class="emoji-btn" data-confidence="Okay">Okay</button>' +
            '<button class="emoji-btn" data-confidence="Got this">Got this</button></div></div>' +
        '</div><div>' +
        (q ?
          '<div class="question-card"><div class="question-header"><div>' +
            '<div class="small muted">' + q.subject.toUpperCase() + ' \u2022 ' + q.skill + ' \u2022 ' + q.difficulty + '</div>' +
            '<h3 style="font-size:1.3rem;margin-top:8px">' + q.question + '</h3></div>' +
            '<div class="small muted">Q ' + (idx + 1) + '/' + list.length + '</div></div>' +
            '<div class="options">' + q.options.map(function (opt, i) {
              return '<button class="option" data-option="' + i + '"><strong>' + String.fromCharCode(65 + i) + '.</strong> ' + opt + '</button>';
            }).join("") + '</div>' +
            '<div class="explanation" id="explainBox"></div>' +
            '<div class="pill-row"><button class="btn ghost" data-nav="prev">Prev</button><button class="btn teal" data-nav="next">Next</button></div></div>'
          : '<div class="panel"><h3>No questions in this set yet</h3><p class="muted">Try All or another filter.</p></div>') +
        '</div></div>';

      root.querySelectorAll("[data-mode]").forEach(function (b) { b.onclick = function () { mode = b.dataset.mode; state.lastMode = mode; setState(state); render(); startTimer(); }; });
      root.querySelectorAll("[data-filter]").forEach(function (b) { b.onclick = function () { filter = b.dataset.filter; idx = 0; render(); startTimer(); }; });
      root.querySelectorAll("[data-confidence]").forEach(function (b) {
        b.onclick = function () {
          var s2 = getState();
          if (!s2.confidenceLog) s2.confidenceLog = [];
          s2.confidenceLog.push({ date: todayStr(), value: b.dataset.confidence });
          markToday(s2); setState(s2);
          b.classList.add("active");
          renderDashboard();
        };
      });
      var prev = root.querySelector('[data-nav="prev"]');
      var next = root.querySelector('[data-nav="next"]');
      if (prev) prev.onclick = function () { idx = (idx - 1 + list.length) % list.length; render(); startTimer(); };
      if (next) next.onclick = function () { idx = (idx + 1) % list.length; render(); startTimer(); };
      root.querySelectorAll("[data-option]").forEach(function (b) {
        b.onclick = function () { answerQuestion(q, Number(b.dataset.option)); };
      });
      renderTimer();
    }

    function answerQuestion(q, chosen) {
      var s = getState();
      var correct = chosen === q.answer;
      s.completedQuestions[q.id] = { correct: correct, subject: q.subject, skill: q.skill, date: todayStr() };
      if (correct) {
        s.subjectCorrect[q.subject] = (s.subjectCorrect[q.subject] || 0) + 1;
        s.skills[q.skill] = (s.skills[q.skill] || 0) + 1;
        streak++;
        s.bestRun = Math.max(s.bestRun || 0, streak);
      } else {
        streak = 0;
        if (!s.missedQuestions) s.missedQuestions = [];
        s.missedQuestions.push(q.id);
      }
      markToday(s);
      var all = Object.values(s.completedQuestions);
      s.lastScore = all.length ? Math.round(all.filter(function (v) { return v.correct; }).length / all.length * 100) : 0;
      updateBadges(s);

      var btns = root.querySelectorAll(".option");
      btns.forEach(function (b, i) {
        b.disabled = true;
        if (i === q.answer) b.classList.add("correct");
        if (i === chosen && chosen !== q.answer) b.classList.add("wrong");
      });
      var ex = root.querySelector("#explainBox");
      if (ex) {
        ex.innerHTML = "<strong>" + (correct ? "Nice work!" : "Not quite.") + "</strong> " + q.explanation;
        ex.classList.add("show");
      }
      setState(s);
      renderDashboard();
    }

    render();
    startTimer();
  }

  /* ─── Year stamp ─── */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ─── Toggle answers (simple practice cards) ─── */
  function initToggleAnswers() {
    document.querySelectorAll(".toggle-answer").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".practice-card");
        if (card) {
          card.classList.toggle("open");
          btn.textContent = card.classList.contains("open") ? "Hide answer" : "Show answer";
        }
      });
    });
  }

  /* ─── Boot ─── */
  document.addEventListener("DOMContentLoaded", function () {
    setupCountdown();
    setupSubjectTabs();
    initMissions();
    initPractice();
    renderDashboard();
    initYear();
    initToggleAnswers();
  });
})();
