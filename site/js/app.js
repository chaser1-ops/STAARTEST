/* STAAR Power Portal — App Engine v3.0
   Shared across all grade pages + landing page.
   Features: Kid profiles, expanded question banks, weekly missions, boss battle,
   streak system, confetti, upgraded parent dashboard, science support,
   practice arena, badges, missed-question replay, confidence tracking,
   countdown timers, subject tabs. */

(function () {
  "use strict";

  var STORAGE_PREFIX = "staarPortalV2_";
  var PROFILE_KEY = "staarProfile";
  var CURRENT_GRADE = document.body.dataset.grade || null;
  var AVATAR_OPTIONS = ["\ud83e\udd8a","\ud83d\udc31","\ud83e\udd81","\ud83d\udc3c","\ud83e\udd84","\ud83d\udc32","\ud83e\udd85","\ud83d\udc2c","\ud83d\udc22","\ud83e\udd8b","\ud83c\udf1f","\ud83d\ude80","\u26a1","\ud83c\udfaf","\ud83e\udde0","\ud83d\udd25"];

  /* ================================================================
     SECTION 1: QUESTION BANKS BY GRADE
     ================================================================ */
  var questionBanks = {
    /* ── GRADE 3 (~32 questions) ── */
    "3": [
      /* Reading (12) */
      { id:"3r1", subject:"reading", skill:"Main Idea", difficulty:"easy", question:"Why do readers look for the main idea in a passage?", options:["To figure out the big point the author is teaching or telling","To count how many sentences are in the passage","To find the hardest word only","To choose the longest answer"], answer:0, explanation:"The main idea is the big point. Good readers ask, 'What is this mostly about?'" },
      { id:"3r2", subject:"reading", skill:"Context Clues", difficulty:"easy", question:"A story says, 'Lena tiptoed through the silent room.' What does 'silent' most likely mean?", options:["Very noisy","Quiet","Messy","Crowded"], answer:1, explanation:"Use the clue 'tiptoed.' People tiptoe when a place is quiet." },
      { id:"3r3", subject:"reading", skill:"Author's Purpose", difficulty:"medium", question:"If a text gives steps for planting a flower, what is the author mostly trying to do?", options:["Entertain you","Persuade you to buy a flower","Inform or teach you","Tell a fantasy story"], answer:2, explanation:"Step-by-step directions are usually meant to teach or inform." },
      { id:"3r4", subject:"reading", skill:"Character Traits", difficulty:"medium", question:"Milo shares his snack with a new student. Which word best describes Milo?", options:["Selfish","Kind","Sleepy","Forgetful"], answer:1, explanation:"Sharing with someone new shows kindness." },
      { id:"3r5", subject:"reading", skill:"Inference", difficulty:"medium", question:"The sky turned dark, thunder rumbled, and Ava ran inside with the laundry. What can you infer?", options:["Ava is going to school","A storm is coming","It is bedtime","The laundry is dirty"], answer:1, explanation:"Dark skies and thunder are clues that a storm is coming." },
      { id:"3r6", subject:"reading", skill:"Text Features", difficulty:"easy", question:"What is a heading used for in nonfiction text?", options:["To make the page heavier","To show a section topic","To hide the main idea","To replace every sentence"], answer:1, explanation:"Headings help readers know what a section is about." },
      { id:"3r7", subject:"reading", skill:"Theme", difficulty:"hard", question:"A story shows that practicing every day helped a girl become a better piano player. Which theme fits best?", options:["Practice helps people improve","Travel is always fun","Rules are silly","Rainy days last forever"], answer:0, explanation:"A theme is a lesson or message. Here the lesson is that practice leads to growth." },
      { id:"3r8", subject:"reading", skill:"Summary", difficulty:"medium", question:"Which is the best summary?", options:["A penguin had black feathers.","The article explains where penguins live, what they eat, and how they stay warm.","I like penguins best.","The title is about penguins."], answer:1, explanation:"A good summary tells the important parts without tiny details or opinions." },
      { id:"3r9", subject:"reading", skill:"Cause and Effect", difficulty:"medium", question:"Maria forgot her umbrella. Because of this, she got soaked in the rain. What is the effect?", options:["Maria forgot her umbrella","It was raining outside","Maria got soaked","Maria went to school"], answer:2, explanation:"The effect is what happened as a result. She got soaked because she forgot her umbrella." },
      { id:"3r10", subject:"reading", skill:"Fact vs Opinion", difficulty:"easy", question:"Which sentence is an opinion?", options:["Dogs have four legs.","Summer is the best season.","Water freezes at 32 degrees.","Texas is a state."], answer:1, explanation:"'Best' is a judgment word. Opinions cannot be proven true for everyone." },
      { id:"3r11", subject:"reading", skill:"Poetry", difficulty:"medium", question:"In a poem, words at the end of lines that sound alike are called what?", options:["Alliteration","Rhyming words","Headings","Captions"], answer:1, explanation:"Words that end with the same sound, like 'cat' and 'hat,' are rhyming words." },
      { id:"3r12", subject:"reading", skill:"Comparing Texts", difficulty:"hard", question:"Two passages are both about dolphins. One is a story and one is an article. How are they different?", options:["They are about different animals","One entertains and one informs","They use the same words","One is shorter"], answer:1, explanation:"A story entertains while an article informs. Same topic, different purposes." },

      /* Math (12) */
      { id:"3m1", subject:"math", skill:"Place Value", difficulty:"easy", question:"Which number is the greatest?", options:["345","354","435","453"], answer:3, explanation:"Compare hundreds first. 453 has 4 hundreds and 5 tens, so it is the greatest." },
      { id:"3m2", subject:"math", skill:"Addition", difficulty:"easy", question:"What is 247 + 36?", options:["273","283","293","313"], answer:1, explanation:"247 + 30 = 277, then +6 = 283." },
      { id:"3m3", subject:"math", skill:"Subtraction", difficulty:"medium", question:"What is 500 - 178?", options:["312","322","332","342"], answer:1, explanation:"500 - 100 = 400, then -70 = 330, then -8 = 322." },
      { id:"3m4", subject:"math", skill:"Multiplication", difficulty:"medium", question:"Which expression matches 4 groups of 6?", options:["4 + 6","6 - 4","4 x 6","6 / 4"], answer:2, explanation:"Equal groups are multiplication. 4 groups of 6 means 4 x 6." },
      { id:"3m5", subject:"math", skill:"Fractions", difficulty:"easy", question:"Which fraction shows one out of four equal parts shaded?", options:["1/2","1/3","1/4","4/1"], answer:2, explanation:"One shaded part out of four equal parts is 1/4." },
      { id:"3m6", subject:"math", skill:"Measurement", difficulty:"medium", question:"A ribbon is 9 inches long. Another ribbon is 4 inches long. How much longer is the first ribbon?", options:["5 inches","6 inches","13 inches","36 inches"], answer:0, explanation:"Find the difference: 9 - 4 = 5." },
      { id:"3m7", subject:"math", skill:"Area", difficulty:"hard", question:"A rectangle has 3 rows of 5 square tiles. What is the area?", options:["8 square units","15 square units","10 square units","35 square units"], answer:1, explanation:"Area is rows x columns: 3 x 5 = 15 square units." },
      { id:"3m8", subject:"math", skill:"Data", difficulty:"medium", question:"A bar graph shows 7 dogs, 5 cats, and 3 birds. How many more dogs than birds are there?", options:["2","3","4","10"], answer:2, explanation:"Compare the bar amounts: 7 - 3 = 4." },
      { id:"3m9", subject:"math", skill:"Rounding", difficulty:"easy", question:"What is 67 rounded to the nearest ten?", options:["60","65","70","100"], answer:2, explanation:"67 is closer to 70 than to 60. The digit 7 means round up." },
      { id:"3m10", subject:"math", skill:"Patterns", difficulty:"medium", question:"What number comes next in the pattern: 5, 10, 15, 20, __?", options:["22","24","25","30"], answer:2, explanation:"The pattern adds 5 each time. 20 + 5 = 25." },
      { id:"3m11", subject:"math", skill:"Money", difficulty:"medium", question:"Sam has 3 quarters and 2 dimes. How much money does he have?", options:["$0.50","$0.75","$0.95","$1.00"], answer:2, explanation:"3 quarters = $0.75. 2 dimes = $0.20. Total = $0.95." },
      { id:"3m12", subject:"math", skill:"Perimeter", difficulty:"hard", question:"A square has sides that are each 6 inches long. What is the perimeter?", options:["12 inches","18 inches","24 inches","36 inches"], answer:2, explanation:"Perimeter of a square is 4 x side length. 4 x 6 = 24 inches." },

      /* Mixed (8) */
      { id:"3x1", subject:"mixed", skill:"Word Problem", difficulty:"medium", question:"Sara read 12 pages on Monday and 15 pages on Tuesday. She wants to read 30 pages total. How many more pages does she need?", options:["1","2","3","27"], answer:2, explanation:"12 + 15 = 27. To get to 30, she needs 3 more pages." },
      { id:"3x2", subject:"mixed", skill:"Vocabulary", difficulty:"easy", question:"Which word is an antonym of 'gigantic'?", options:["Huge","Tiny","Tall","Heavy"], answer:1, explanation:"An antonym is an opposite. The opposite of gigantic is tiny." },
      { id:"3x3", subject:"mixed", skill:"Elapsed Time", difficulty:"hard", question:"A movie starts at 3:15 and ends at 4:00. How long is the movie?", options:["30 minutes","45 minutes","50 minutes","1 hour"], answer:1, explanation:"From 3:15 to 4:00 is 45 minutes." },
      { id:"3x4", subject:"mixed", skill:"Sequence", difficulty:"medium", question:"Which clue word often shows the order of events?", options:["Because","First","Blue","Large"], answer:1, explanation:"Words like first, next, then, and last show sequence." },
      { id:"3x5", subject:"mixed", skill:"Graph Reading", difficulty:"medium", question:"A pictograph shows 3 sun symbols for Monday and 5 for Tuesday. Each sun stands for 2 hours of sunshine. How many hours on Tuesday?", options:["5","6","10","15"], answer:2, explanation:"5 suns x 2 hours each = 10 hours of sunshine on Tuesday." },
      { id:"3x6", subject:"mixed", skill:"Spelling Patterns", difficulty:"easy", question:"Which word is spelled correctly?", options:["becuz","becaus","because","becuase"], answer:2, explanation:"The correct spelling is 'because.' Sound it out: be-cause." },
      { id:"3x7", subject:"mixed", skill:"Comparing Numbers", difficulty:"medium", question:"Which symbol makes this true? 482 ___ 489", options:[">","<","=","x"], answer:1, explanation:"482 is less than 489, so the correct symbol is <." },
      { id:"3x8", subject:"mixed", skill:"Story Elements", difficulty:"easy", question:"What is the setting of a story?", options:["The lesson the story teaches","Where and when the story happens","The main character's name","The ending of the story"], answer:1, explanation:"The setting is where and when a story takes place." }
    ],

    /* ── GRADE 4 (~28 questions) ── */
    "4": [
      /* Reading (10) */
      { id:"4r1", subject:"reading", skill:"Main Idea", difficulty:"easy", question:"A passage describes how recycling helps reduce waste in landfills. What is the main idea?", options:["Landfills are full","Recycling helps reduce waste","Trash is heavy","People like recycling bins"], answer:1, explanation:"The main idea is the central point all the details support." },
      { id:"4r2", subject:"reading", skill:"Inference", difficulty:"medium", question:"Marcus packed sunscreen, a towel, and a cooler of sandwiches. Where is he probably going?", options:["A library","A beach or pool","A movie theater","A classroom"], answer:1, explanation:"Sunscreen, towel, and cooler are clues that point to a beach or pool trip." },
      { id:"4r3", subject:"reading", skill:"Figurative Language", difficulty:"medium", question:"'The wind whispered through the trees.' What type of figurative language is this?", options:["Simile","Alliteration","Personification","Hyperbole"], answer:2, explanation:"Giving human qualities (whispering) to wind is personification." },
      { id:"4r4", subject:"reading", skill:"Author's Purpose", difficulty:"easy", question:"An article lists the top 5 reasons to adopt a pet from a shelter. What is the author's purpose?", options:["To entertain","To persuade","To describe a pet","To confuse"], answer:1, explanation:"Listing reasons to do something means the author is trying to persuade." },
      { id:"4r5", subject:"reading", skill:"Summary", difficulty:"medium", question:"A passage explains how bees make honey, where they live, and why they are important to flowers. What is the best summary?", options:["Bees are yellow.","The passage describes how bees make honey, their habitat, and their role in pollination.","Honey tastes good.","Bees can sting people."], answer:1, explanation:"A good summary covers the main topics without opinions or tiny details." },
      { id:"4r6", subject:"reading", skill:"Theme", difficulty:"hard", question:"A boy brags about winning a race but loses friends. He learns to be humble. What is the theme?", options:["Running fast is the most important thing","Being humble is better than bragging","Friends always leave","Races are unfair"], answer:1, explanation:"The character learned that bragging pushes people away and humility matters more." },
      { id:"4r7", subject:"reading", skill:"Text Features", difficulty:"easy", question:"In a textbook, a glossary helps you find what?", options:["The table of contents","Definitions of key words","The author's name","Picture captions"], answer:1, explanation:"A glossary is like a mini-dictionary at the back of a book with key word definitions." },
      { id:"4r8", subject:"reading", skill:"Compare and Contrast", difficulty:"medium", question:"Two articles discuss pet cats and pet dogs. Which question helps you compare them?", options:["What color is the cat?","How are cats and dogs alike and different as pets?","Does the dog live outside?","Which article is longer?"], answer:1, explanation:"Comparing means finding similarities and differences between two subjects." },
      { id:"4r9", subject:"reading", skill:"Genre", difficulty:"easy", question:"A story has wizards, a magical forest, and a talking dragon. What genre is this?", options:["Biography","Fantasy","Nonfiction","Poetry"], answer:1, explanation:"Fantasy stories include magical or impossible elements like talking animals and wizards." },
      { id:"4r10", subject:"reading", skill:"Drawing Conclusions", difficulty:"hard", question:"Every time it rains, the basement floor gets wet. The family buys a sump pump. What conclusion can you draw?", options:["The family likes water","They want to prevent basement flooding","They are moving away","Rain is unusual here"], answer:1, explanation:"A sump pump removes water. Buying one means they want to stop the flooding problem." },

      /* Math (10) */
      { id:"4m1", subject:"math", skill:"Multiplication", difficulty:"medium", question:"What is 23 x 4?", options:["82","86","92","96"], answer:2, explanation:"20 x 4 = 80, then 3 x 4 = 12, and 80 + 12 = 92." },
      { id:"4m2", subject:"math", skill:"Division", difficulty:"medium", question:"There are 36 stickers shared equally among 4 friends. How many does each friend get?", options:["7","8","9","10"], answer:2, explanation:"36 divided by 4 = 9 stickers each." },
      { id:"4m3", subject:"math", skill:"Fractions", difficulty:"medium", question:"Which fraction is equivalent to 2/4?", options:["1/2","1/3","3/4","2/3"], answer:0, explanation:"2/4 simplifies to 1/2 because 2 divided by 2 = 1, and 4 divided by 2 = 2." },
      { id:"4m4", subject:"math", skill:"Geometry", difficulty:"easy", question:"How many right angles does a rectangle have?", options:["2","3","4","5"], answer:2, explanation:"A rectangle has 4 corners and each one is a right angle." },
      { id:"4m5", subject:"math", skill:"Multi-Step Problems", difficulty:"hard", question:"A baker makes 48 muffins. She puts 6 in each box. She sells 5 boxes. How many muffins are left?", options:["8","12","18","30"], answer:2, explanation:"48 / 6 = 8 boxes. She sold 5, so 3 boxes left. 3 x 6 = 18 muffins remaining." },
      { id:"4m6", subject:"math", skill:"Measurement Conversion", difficulty:"medium", question:"How many inches are in 3 feet?", options:["24","30","36","42"], answer:2, explanation:"1 foot = 12 inches. 3 x 12 = 36 inches." },
      { id:"4m7", subject:"math", skill:"Data and Graphs", difficulty:"medium", question:"A line plot shows X marks at: 2, 2, 3, 3, 3, 5. What is the mode?", options:["2","3","5","10"], answer:1, explanation:"The mode is the number that appears most often. 3 appears three times." },
      { id:"4m8", subject:"math", skill:"Decimals", difficulty:"easy", question:"Which decimal is equal to 1/2?", options:["0.12","0.2","0.5","1.2"], answer:2, explanation:"1 divided by 2 = 0.5. Half of one whole is 0.5." },
      { id:"4m9", subject:"math", skill:"Factors and Multiples", difficulty:"medium", question:"Which number is a factor of 24?", options:["5","7","9","6"], answer:3, explanation:"24 divided by 6 = 4 with no remainder, so 6 is a factor of 24." },
      { id:"4m10", subject:"math", skill:"Perimeter vs Area", difficulty:"hard", question:"A garden is 8 feet long and 5 feet wide. What is its perimeter?", options:["13 feet","26 feet","40 feet","80 feet"], answer:1, explanation:"Perimeter = 2 x (length + width) = 2 x (8 + 5) = 2 x 13 = 26 feet." },

      /* Mixed (8) */
      { id:"4x1", subject:"mixed", skill:"Multi-Step Problem", difficulty:"hard", question:"A store sells notebooks for $3 each. Kim buys 5 and pays with a $20 bill. How much change does she get?", options:["$3","$5","$15","$17"], answer:1, explanation:"5 x $3 = $15. Then $20 - $15 = $5 change." },
      { id:"4x2", subject:"mixed", skill:"Context Clues", difficulty:"medium", question:"'The ancient castle had crumbling walls and moss-covered stones.' What does 'ancient' mean?", options:["Brand new","Very old","Colorful","Small"], answer:1, explanation:"Crumbling walls and moss suggest the castle is very old." },
      { id:"4x3", subject:"mixed", skill:"Prefixes", difficulty:"easy", question:"The prefix 're-' means 'again.' What does 'rewrite' mean?", options:["Write badly","Write once","Write again","Stop writing"], answer:2, explanation:"Re- means again, so rewrite means to write something again." },
      { id:"4x4", subject:"mixed", skill:"Estimation", difficulty:"medium", question:"About how much is 398 + 211?", options:["About 400","About 500","About 600","About 700"], answer:2, explanation:"Round 398 to 400 and 211 to 200. 400 + 200 = about 600." },
      { id:"4x5", subject:"mixed", skill:"Map Skills", difficulty:"medium", question:"On a map, the compass rose shows N at the top. If you move toward the bottom of the map, which direction do you go?", options:["North","South","East","West"], answer:1, explanation:"The bottom of a standard map is south, opposite of north at the top." },
      { id:"4x6", subject:"mixed", skill:"Synonyms", difficulty:"easy", question:"Which word means the same as 'enormous'?", options:["Tiny","Quick","Huge","Quiet"], answer:2, explanation:"Enormous and huge both mean very large." },
      { id:"4x7", subject:"mixed", skill:"Elapsed Time", difficulty:"hard", question:"Practice starts at 4:30 PM and lasts 1 hour 15 minutes. What time does it end?", options:["5:15 PM","5:30 PM","5:45 PM","6:00 PM"], answer:2, explanation:"4:30 + 1 hour = 5:30, then +15 minutes = 5:45 PM." },
      { id:"4x8", subject:"mixed", skill:"Cause and Effect", difficulty:"medium", question:"The plants in the garden died because there was no rain for weeks. What is the cause?", options:["The plants died","The garden was big","No rain for weeks","Someone picked the flowers"], answer:2, explanation:"The cause is what made something happen. No rain caused the plants to die." }
    ],

    /* ── GRADE 5 (~36 questions) ── */
    "5": [
      /* Reading (8) */
      { id:"5r1", subject:"reading", skill:"Theme", difficulty:"medium", question:"In a story a character keeps trying even after failing three times and finally succeeds. What is the theme?", options:["Giving up is the best plan","Persistence leads to success","Failure means you should stop","Winning is everything"], answer:1, explanation:"The character kept trying and succeeded. The theme is about persistence paying off." },
      { id:"5r2", subject:"reading", skill:"Point of View", difficulty:"medium", question:"A story is told by a narrator who uses 'I' and 'we.' What point of view is this?", options:["Third person","Second person","First person","No point of view"], answer:2, explanation:"Using 'I' and 'we' means the narrator is telling the story from first person." },
      { id:"5r3", subject:"reading", skill:"Text Structure", difficulty:"hard", question:"A passage first describes a problem with pollution, then explains how communities are solving it. What text structure is this?", options:["Cause and effect","Compare and contrast","Problem and solution","Chronological order"], answer:2, explanation:"Describing a problem and then a solution is the problem-and-solution text structure." },
      { id:"5r4", subject:"reading", skill:"Vocabulary", difficulty:"medium", question:"The prefix 'un-' means 'not.' What does 'unfamiliar' mean?", options:["Very familiar","Not familiar","More familiar","Becoming familiar"], answer:1, explanation:"Un- means not. Unfamiliar means not familiar." },
      { id:"5r5", subject:"reading", skill:"Author's Craft", difficulty:"hard", question:"An author uses a flashback in a story to show a character's childhood. Why might the author do this?", options:["To confuse the reader","To give background that explains the character's behavior","To make the story shorter","To skip the boring parts"], answer:1, explanation:"Flashbacks help readers understand why a character acts a certain way by showing their past." },
      { id:"5r6", subject:"reading", skill:"Poetry", difficulty:"medium", question:"A poem repeats the line 'I will rise' at the start of each stanza. What is this technique called?", options:["Rhyme","Repetition","Simile","Onomatopoeia"], answer:1, explanation:"Using the same words or phrases again and again is repetition, used for emphasis." },
      { id:"5r7", subject:"reading", skill:"Multiple Texts", difficulty:"hard", question:"Article A says screen time hurts kids' sleep. Article B says some screen time is educational. What is the best conclusion?", options:["Screen time is always bad","Screen time is always good","The impact of screen time depends on how it is used","Both articles are wrong"], answer:2, explanation:"When sources disagree, the best conclusion often recognizes that context matters." },
      { id:"5r8", subject:"reading", skill:"Drawing Conclusions", difficulty:"medium", question:"A character studies every night, asks the teacher questions, and reviews notes before the test. What can you conclude?", options:["The character does not care about school","The character is hardworking and prepared","The character is guessing on the test","The character forgot to study"], answer:1, explanation:"Studying, asking questions, and reviewing are all signs of being hardworking." },
      { id:"5r9", subject:"reading", skill:"Figurative Language", difficulty:"medium", question:"'Time flies when you are having fun.' What type of figurative language is this?", options:["Simile","Idiom","Onomatopoeia","Alliteration"], answer:1, explanation:"An idiom is a phrase that means something different from the literal words. Time cannot literally fly." },
      { id:"5r10", subject:"reading", skill:"Cause and Effect", difficulty:"easy", question:"Because the alarm did not go off, Jaden was late to school. What is the cause?", options:["Jaden was late","Jaden went to school","The alarm did not go off","School started early"], answer:2, explanation:"The cause is what made it happen. The alarm not going off caused Jaden to be late." },
      { id:"5r11", subject:"reading", skill:"Compare and Contrast", difficulty:"hard", question:"Passage A describes life in the city. Passage B describes life on a farm. How are they MOST alike?", options:["Both involve working hard every day","Both mention tall buildings","Both describe raising animals","Both take place in winter"], answer:0, explanation:"When comparing passages, look for shared themes. Both city and farm life involve hard work." },
      { id:"5r12", subject:"reading", skill:"Author's Purpose", difficulty:"medium", question:"A magazine article titled 'Why Every Kid Should Learn to Cook' is mostly trying to:", options:["Entertain with funny stories","Persuade readers that cooking skills matter","Explain the history of cooking","Describe restaurant menus"], answer:1, explanation:"The word 'should' signals the author is trying to persuade the reader." },

      /* Math (12) */
      { id:"5m1", subject:"math", skill:"Decimals", difficulty:"medium", question:"What is 3.5 + 2.75?", options:["5.25","6.00","6.25","6.75"], answer:2, explanation:"Line up decimals: 3.50 + 2.75 = 6.25." },
      { id:"5m2", subject:"math", skill:"Volume", difficulty:"medium", question:"A box is 4 units long, 3 units wide, and 2 units tall. What is the volume?", options:["9 cubic units","14 cubic units","20 cubic units","24 cubic units"], answer:3, explanation:"Volume = length x width x height = 4 x 3 x 2 = 24 cubic units." },
      { id:"5m3", subject:"math", skill:"Fractions", difficulty:"hard", question:"What is 1/3 + 1/6?", options:["1/6","2/9","1/2","2/6"], answer:2, explanation:"Find a common denominator: 2/6 + 1/6 = 3/6 = 1/2." },
      { id:"5m4", subject:"math", skill:"Order of Operations", difficulty:"medium", question:"What is 3 + 4 x 2?", options:["14","11","10","9"], answer:1, explanation:"Multiply first: 4 x 2 = 8. Then add: 3 + 8 = 11." },
      { id:"5m5", subject:"math", skill:"Long Division", difficulty:"hard", question:"What is 156 divided by 12?", options:["11","12","13","14"], answer:2, explanation:"12 x 13 = 156. So 156 / 12 = 13." },
      { id:"5m6", subject:"math", skill:"Mixed Numbers", difficulty:"medium", question:"What is 2 1/4 + 1 2/4?", options:["3 1/4","3 2/4","3 3/4","4"], answer:2, explanation:"Add whole numbers: 2 + 1 = 3. Add fractions: 1/4 + 2/4 = 3/4. Total = 3 3/4." },
      { id:"5m7", subject:"math", skill:"Unit Conversion", difficulty:"medium", question:"How many centimeters are in 2 meters?", options:["20","200","2000","2"], answer:1, explanation:"1 meter = 100 centimeters. 2 meters = 200 centimeters." },
      { id:"5m8", subject:"math", skill:"Graphing", difficulty:"easy", question:"On a coordinate grid, which point is at (2, 4)?", options:["2 left and 4 down","2 right and 4 up","4 right and 2 up","2 up and 4 right"], answer:1, explanation:"In (x, y), x means right and y means up. So (2, 4) is 2 right and 4 up." },
      { id:"5m9", subject:"math", skill:"Multiplying Decimals", difficulty:"hard", question:"What is 0.6 x 0.4?", options:["0.10","0.24","2.4","24"], answer:1, explanation:"6 x 4 = 24, then count two decimal places total. 0.24." },
      { id:"5m10", subject:"math", skill:"Equivalent Fractions", difficulty:"medium", question:"Which fraction is equivalent to 3/5?", options:["5/3","6/10","9/20","3/10"], answer:1, explanation:"Multiply top and bottom of 3/5 by 2: 6/10. Both simplify to the same value." },
      { id:"5m11", subject:"math", skill:"Perimeter", difficulty:"easy", question:"A triangle has sides of 5 cm, 7 cm, and 8 cm. What is the perimeter?", options:["15 cm","17 cm","20 cm","35 cm"], answer:2, explanation:"Perimeter is the total of all sides: 5 + 7 + 8 = 20 cm." },
      { id:"5m12", subject:"math", skill:"Word Problems", difficulty:"hard", question:"A school has 450 students. If 2/5 of them ride the bus, how many students ride the bus?", options:["90","150","180","225"], answer:2, explanation:"2/5 of 450: 450 / 5 = 90, then 90 x 2 = 180 students." },

      /* Mixed (6) */
      { id:"5x1", subject:"mixed", skill:"Coordinate Planes", difficulty:"medium", question:"Which ordered pair names a point 3 units right and 5 units up from the origin?", options:["(5, 3)","(3, 5)","(3, 3)","(5, 5)"], answer:1, explanation:"(x, y) means right then up. 3 right and 5 up = (3, 5)." },
      { id:"5x2", subject:"mixed", skill:"Summary", difficulty:"medium", question:"A passage describes how butterflies migrate, what they eat, and where they lay eggs. Which is the best summary?", options:["Butterflies are colorful.","The passage explains the migration, diet, and reproduction of butterflies.","I saw a butterfly once.","Butterflies live outside."], answer:1, explanation:"A good summary captures the key topics without opinions or trivial details." },
      { id:"5x3", subject:"mixed", skill:"Data Analysis", difficulty:"medium", question:"A student scored 80, 90, 85, 90, and 95 on five tests. What is the mode?", options:["80","85","90","95"], answer:2, explanation:"The mode is the number that appears most often. 90 appears twice." },
      { id:"5x4", subject:"mixed", skill:"Measurement Word Problem", difficulty:"hard", question:"A recipe calls for 3/4 cup of sugar. If you make a double batch, how much sugar do you need?", options:["3/4 cup","1 cup","1 1/4 cups","1 1/2 cups"], answer:3, explanation:"Double 3/4 is 3/4 + 3/4 = 6/4 = 1 2/4 = 1 1/2 cups." },
      { id:"5x5", subject:"mixed", skill:"Interpreting Tables", difficulty:"medium", question:"A table shows 3rd graders read 120 books, 4th graders read 150, and 5th graders read 200. How many more books did 5th graders read than 3rd graders?", options:["30","50","80","200"], answer:2, explanation:"200 - 120 = 80 more books." },
      { id:"5x6", subject:"mixed", skill:"Prefixes and Suffixes", difficulty:"easy", question:"The suffix '-less' means 'without.' What does 'fearless' mean?", options:["Full of fear","Without fear","Causing fear","A type of fear"], answer:1, explanation:"Fear + less = without fear. A fearless person is not afraid." },

      /* Science (8) */
      { id:"5s1", subject:"science", skill:"Matter and States", difficulty:"medium", question:"When ice melts into water, what kind of change is happening?", options:["Chemical change","Physical change","No change","Permanent change"], answer:1, explanation:"Melting is a physical change. The water is still H2O, just in a different state." },
      { id:"5s2", subject:"science", skill:"Ecosystems", difficulty:"medium", question:"In a food chain, what is the role of a producer?", options:["It eats other animals","It makes its own food using sunlight","It breaks down dead organisms","It hunts prey"], answer:1, explanation:"Producers like plants make their own food through photosynthesis using sunlight." },
      { id:"5s3", subject:"science", skill:"Weather and Water Cycle", difficulty:"easy", question:"What happens during evaporation?", options:["Water falls from clouds","Water freezes into ice","Liquid water turns into water vapor","Water soaks into the ground"], answer:2, explanation:"Evaporation is when liquid water heats up and turns into water vapor (gas)." },
      { id:"5s4", subject:"science", skill:"Force and Motion", difficulty:"medium", question:"A ball rolling on grass slows down and stops. What force caused this?", options:["Gravity","Magnetism","Friction","Wind"], answer:2, explanation:"Friction between the ball and the grass surface slows the ball down." },
      { id:"5s5", subject:"science", skill:"Earth and Space", difficulty:"medium", question:"What causes day and night on Earth?", options:["The moon blocking the sun","Earth's rotation on its axis","Earth's revolution around the sun","The sun moving across the sky"], answer:1, explanation:"Earth rotates (spins) on its axis once every 24 hours, creating day and night." },
      { id:"5s6", subject:"science", skill:"Light and Sound", difficulty:"easy", question:"Light travels in what kind of path?", options:["Curved lines","Zigzag lines","Straight lines","Circles"], answer:2, explanation:"Light travels in straight lines. That is why shadows have sharp edges." },
      { id:"5s7", subject:"science", skill:"Engineering Design", difficulty:"hard", question:"An engineer tests a bridge model and it breaks. What should the engineer do next?", options:["Give up on the project","Redesign and test again","Use the same design anyway","Blame the materials"], answer:1, explanation:"The engineering design process includes testing, learning from failure, and redesigning." },
      { id:"5s8", subject:"science", skill:"Energy", difficulty:"medium", question:"A solar panel converts sunlight into what type of energy?", options:["Sound energy","Electrical energy","Heat energy only","Mechanical energy"], answer:1, explanation:"Solar panels convert light energy from the sun into electrical energy." }
    ],

    /* ── GRADE 6 (~28 questions) ── */
    "6": [
      /* Reading (10) */
      { id:"6r1", subject:"reading", skill:"Analysis", difficulty:"medium", question:"An author uses short, choppy sentences during an action scene. Why might the author do this?", options:["To confuse the reader","To create a sense of speed and tension","To save space","To be lazy"], answer:1, explanation:"Short sentences speed up the pace and create tension during action." },
      { id:"6r2", subject:"reading", skill:"Argument", difficulty:"hard", question:"Which is the strongest type of evidence to support a claim?", options:["A personal opinion","A fact with a source","A guess","A rhetorical question"], answer:1, explanation:"Facts with sources are the strongest evidence because they can be verified." },
      { id:"6r3", subject:"reading", skill:"Figurative Language", difficulty:"medium", question:"'She was drowning in homework.' This is an example of what?", options:["Simile","Metaphor","Onomatopoeia","Hyperbole"], answer:3, explanation:"Hyperbole is extreme exaggeration used for effect. She is not literally drowning." },
      { id:"6r4", subject:"reading", skill:"Tone", difficulty:"medium", question:"A passage uses words like 'disappointing,' 'unfortunately,' and 'sadly.' What is the tone?", options:["Excited","Hopeful","Negative or disappointed","Humorous"], answer:2, explanation:"Word choice like 'unfortunately' and 'sadly' creates a disappointed tone." },
      { id:"6r5", subject:"reading", skill:"Rhetoric", difficulty:"hard", question:"A speaker asks, 'Don't we all deserve clean water?' This is an example of what persuasive technique?", options:["Alliteration","Rhetorical question","Flashback","Foreshadowing"], answer:1, explanation:"A rhetorical question is asked to make a point, not to get an actual answer." },
      { id:"6r6", subject:"reading", skill:"Compare Arguments", difficulty:"hard", question:"Two editorials argue about school start times. One uses research data, the other uses personal stories. Which is more credible?", options:["The one with personal stories","The one with research data","Both are equally strong","Neither is strong"], answer:1, explanation:"Research data is more credible because it is based on evidence that can be verified." },
      { id:"6r7", subject:"reading", skill:"Literary Devices", difficulty:"medium", question:"'The classroom was a zoo.' What literary device is this?", options:["Simile","Metaphor","Personification","Alliteration"], answer:1, explanation:"A metaphor compares two things without using 'like' or 'as.' The classroom is called a zoo directly." },
      { id:"6r8", subject:"reading", skill:"Drama", difficulty:"medium", question:"In a play script, words in brackets like [sighs loudly] are called what?", options:["Dialogue","Stage directions","Narration","Captions"], answer:1, explanation:"Stage directions tell actors what to do. They appear in brackets or italics." },
      { id:"6r9", subject:"reading", skill:"Poetry Analysis", difficulty:"hard", question:"A poem uses the structure ABAB for its rhyme scheme. What does this mean?", options:["Every line rhymes","Lines 1 and 3 rhyme, lines 2 and 4 rhyme","Only the last two lines rhyme","No lines rhyme"], answer:1, explanation:"ABAB means the 1st and 3rd lines rhyme (A) and the 2nd and 4th lines rhyme (B)." },
      { id:"6r10", subject:"reading", skill:"Media Literacy", difficulty:"medium", question:"A news headline says 'SHOCKING Discovery!' What technique is this?", options:["Factual reporting","Sensationalism","Summarizing","Citing sources"], answer:1, explanation:"Using dramatic words like 'SHOCKING' is sensationalism, designed to grab attention." },

      /* Math (10) */
      { id:"6m1", subject:"math", skill:"Ratios", difficulty:"medium", question:"In a class of 30 students, 12 are wearing blue. What is the ratio of blue-wearers to total students?", options:["12:30","2:5","5:2","12:18"], answer:1, explanation:"12:30 simplifies to 2:5 (divide both by 6)." },
      { id:"6m2", subject:"math", skill:"Percent", difficulty:"medium", question:"What is 25% of 80?", options:["15","20","25","40"], answer:1, explanation:"25% means one quarter. 80 / 4 = 20." },
      { id:"6m3", subject:"math", skill:"Expressions", difficulty:"medium", question:"Evaluate the expression 2n + 5 when n = 7.", options:["14","17","19","21"], answer:2, explanation:"2(7) + 5 = 14 + 5 = 19." },
      { id:"6m4", subject:"math", skill:"Area", difficulty:"hard", question:"What is the area of a triangle with a base of 10 and a height of 6?", options:["16","30","60","20"], answer:1, explanation:"Area of a triangle = 1/2 x base x height = 1/2 x 10 x 6 = 30." },
      { id:"6m5", subject:"math", skill:"Proportions", difficulty:"medium", question:"If 3 apples cost $2.25, how much do 12 apples cost?", options:["$6.75","$9.00","$10.00","$12.00"], answer:1, explanation:"12 is 4 times 3. So 4 x $2.25 = $9.00." },
      { id:"6m6", subject:"math", skill:"Unit Rates", difficulty:"medium", question:"A car travels 180 miles in 3 hours. What is the speed in miles per hour?", options:["45 mph","50 mph","60 mph","90 mph"], answer:2, explanation:"Speed = distance / time = 180 / 3 = 60 miles per hour." },
      { id:"6m7", subject:"math", skill:"Inequalities", difficulty:"medium", question:"Which value of x makes x + 3 > 10 true?", options:["5","6","7","8"], answer:3, explanation:"8 + 3 = 11, and 11 > 10 is true. The other values give 10 or less." },
      { id:"6m8", subject:"math", skill:"Statistics", difficulty:"medium", question:"The data set is: 4, 7, 7, 9, 13. What is the median?", options:["4","7","9","8"], answer:1, explanation:"The median is the middle value in an ordered list. In 4, 7, 7, 9, 13 the middle value is 7." },
      { id:"6m9", subject:"math", skill:"Nets and Surface Area", difficulty:"hard", question:"A cube has edges of 3 cm. What is the surface area?", options:["18 sq cm","27 sq cm","36 sq cm","54 sq cm"], answer:3, explanation:"A cube has 6 faces. Each face = 3 x 3 = 9 sq cm. Total = 6 x 9 = 54 sq cm." },
      { id:"6m10", subject:"math", skill:"Absolute Value", difficulty:"easy", question:"What is the absolute value of -8?", options:["-8","0","8","16"], answer:2, explanation:"Absolute value is the distance from zero. |-8| = 8." },

      /* Mixed (8) */
      { id:"6x1", subject:"mixed", skill:"Integers", difficulty:"medium", question:"What is -3 + 8?", options:["-11","5","11","-5"], answer:1, explanation:"Start at -3 on the number line and move 8 to the right. You land on 5." },
      { id:"6x2", subject:"mixed", skill:"Inference", difficulty:"hard", question:"A character nervously checks the clock, paces the hallway, and keeps glancing at the door. What can you infer?", options:["The character is bored","The character is waiting anxiously for someone or something","The character is tired","The character likes clocks"], answer:1, explanation:"Checking the clock, pacing, and glancing at the door are signs of anxious waiting." },
      { id:"6x3", subject:"mixed", skill:"Percent Word Problem", difficulty:"hard", question:"A jacket costs $60. It is 20% off. What is the sale price?", options:["$40","$42","$48","$52"], answer:2, explanation:"20% of $60 = $12. Sale price = $60 - $12 = $48." },
      { id:"6x4", subject:"mixed", skill:"Scientific Notation", difficulty:"hard", question:"The distance from Earth to the Sun is about 93,000,000 miles. In scientific notation, this is:", options:["9.3 x 10^6","9.3 x 10^7","93 x 10^6","0.93 x 10^8"], answer:1, explanation:"Move the decimal 7 places left: 9.3 x 10^7." },
      { id:"6x5", subject:"mixed", skill:"Coordinate Geometry", difficulty:"medium", question:"What is the distance between (0, 0) and (3, 4) on a coordinate plane?", options:["3","4","5","7"], answer:2, explanation:"Use the distance formula or recognize the 3-4-5 right triangle. Distance = 5." },
      { id:"6x6", subject:"mixed", skill:"Vocabulary in Context", difficulty:"medium", question:"'The president will address the nation tonight.' What does 'address' mean here?", options:["A home location","To speak to","To mail a letter","A number on a building"], answer:1, explanation:"In this context, 'address' means to speak to or give a speech to the nation." },
      { id:"6x7", subject:"mixed", skill:"Order of Operations", difficulty:"medium", question:"What is (8 + 2) x 3 - 4?", options:["22","26","30","34"], answer:1, explanation:"Parentheses first: 8 + 2 = 10. Then 10 x 3 = 30. Then 30 - 4 = 26." },
      { id:"6x8", subject:"mixed", skill:"Rate and Ratio Word Problem", difficulty:"hard", question:"If you read 45 pages in 3 days, at the same rate, how many pages will you read in 7 days?", options:["90","105","115","135"], answer:1, explanation:"Rate = 45 / 3 = 15 pages per day. 15 x 7 = 105 pages." }
    ]
  };

  /* ================================================================
     SECTION 2: BADGES BY GRADE (8 per grade)
     ================================================================ */
  var badgeDefs = {
    "3": [
      { id:"badge-main-idea", label:"Main Idea Master", icon:"\ud83d\udcda", rule: function(s) { return (s.skills["Main Idea"]||0) >= 2; } },
      { id:"badge-math", label:"Math Mountain Climber", icon:"\u26f0\ufe0f", rule: function(s) { return (s.subjectCorrect.math||0) >= 4; } },
      { id:"badge-reading", label:"Reading Rocket", icon:"\ud83d\ude80", rule: function(s) { return (s.subjectCorrect.reading||0) >= 4; } },
      { id:"badge-streak5", label:"5 Day Streak", icon:"\ud83d\udd25", rule: function(s) { return getStreakInfo(s).current >= 5; } },
      { id:"badge-mixed", label:"Mixed Mission Hero", icon:"\ud83c\udf08", rule: function(s) { return (s.subjectCorrect.mixed||0) >= 2; } },
      { id:"badge-perfect", label:"Perfect 5", icon:"\ud83d\udc51", rule: function(s) { return (s.bestRun||0) >= 5; } },
      { id:"badge-streak3", label:"Study Streak 3", icon:"\u2b50", rule: function(s) { return getStreakInfo(s).current >= 3; } },
      { id:"badge-boss", label:"Boss Slayer", icon:"\ud83d\udc7e", rule: function(s) { return s.bossWins >= 1; } }
    ],
    "4": [
      { id:"badge-main-idea", label:"Main Idea Pro", icon:"\ud83d\udcda", rule: function(s) { return (s.skills["Main Idea"]||0) >= 2; } },
      { id:"badge-math", label:"Multiplication Master", icon:"\u2716\ufe0f", rule: function(s) { return (s.subjectCorrect.math||0) >= 4; } },
      { id:"badge-reading", label:"Bookworm", icon:"\ud83d\udc1b", rule: function(s) { return (s.subjectCorrect.reading||0) >= 3; } },
      { id:"badge-streak5", label:"5 Day Streak", icon:"\ud83d\udd25", rule: function(s) { return getStreakInfo(s).current >= 5; } },
      { id:"badge-mixed", label:"All-Around Star", icon:"\u2b50", rule: function(s) { return (s.subjectCorrect.mixed||0) >= 2; } },
      { id:"badge-perfect", label:"Perfect 5", icon:"\ud83d\udc51", rule: function(s) { return (s.bestRun||0) >= 5; } },
      { id:"badge-streak3", label:"Study Streak 3", icon:"\ud83c\udf1f", rule: function(s) { return getStreakInfo(s).current >= 3; } },
      { id:"badge-boss", label:"Boss Slayer", icon:"\ud83d\udc7e", rule: function(s) { return s.bossWins >= 1; } }
    ],
    "5": [
      { id:"badge-theme", label:"Theme Detective", icon:"\ud83d\udd0d", rule: function(s) { return (s.skills["Theme"]||0) >= 1; } },
      { id:"badge-math", label:"Decimal Ace", icon:"\ud83c\udfaf", rule: function(s) { return (s.subjectCorrect.math||0) >= 4; } },
      { id:"badge-reading", label:"Deep Reader", icon:"\ud83d\udcd6", rule: function(s) { return (s.subjectCorrect.reading||0) >= 3; } },
      { id:"badge-streak5", label:"5 Day Streak", icon:"\ud83d\udd25", rule: function(s) { return getStreakInfo(s).current >= 5; } },
      { id:"badge-mixed", label:"Cross-Subject Star", icon:"\ud83c\udf1f", rule: function(s) { return (s.subjectCorrect.mixed||0) >= 2; } },
      { id:"badge-perfect", label:"Perfect 5", icon:"\ud83d\udc51", rule: function(s) { return (s.bestRun||0) >= 5; } },
      { id:"badge-science", label:"Science Explorer", icon:"\ud83d\udd2c", rule: function(s) { return (s.subjectCorrect.science||0) >= 3; } },
      { id:"badge-boss", label:"Boss Slayer", icon:"\ud83d\udc7e", rule: function(s) { return s.bossWins >= 1; } }
    ],
    "6": [
      { id:"badge-analysis", label:"Critical Thinker", icon:"\ud83e\udde0", rule: function(s) { return (s.skills["Analysis"]||0) >= 1; } },
      { id:"badge-math", label:"Ratio Ranger", icon:"\ud83d\udcca", rule: function(s) { return (s.subjectCorrect.math||0) >= 4; } },
      { id:"badge-reading", label:"Literary Leader", icon:"\ud83c\udfc6", rule: function(s) { return (s.subjectCorrect.reading||0) >= 3; } },
      { id:"badge-streak5", label:"5 Day Streak", icon:"\ud83d\udd25", rule: function(s) { return getStreakInfo(s).current >= 5; } },
      { id:"badge-mixed", label:"Ultimate Scholar", icon:"\ud83c\udf93", rule: function(s) { return (s.subjectCorrect.mixed||0) >= 2; } },
      { id:"badge-perfect", label:"Perfect 5", icon:"\ud83d\udc51", rule: function(s) { return (s.bestRun||0) >= 5; } },
      { id:"badge-streak3", label:"Study Streak 3", icon:"\ud83c\udf1f", rule: function(s) { return getStreakInfo(s).current >= 3; } },
      { id:"badge-boss", label:"Boss Slayer", icon:"\ud83d\udc7e", rule: function(s) { return s.bossWins >= 1; } }
    ]
  };

  /* ================================================================
     SECTION 3: STATE MANAGEMENT
     ================================================================ */
  function storageKey() {
    return STORAGE_PREFIX + (CURRENT_GRADE || "global");
  }

  function defaultState() {
    return {
      completedQuestions: {},
      missedQuestions: [],
      studyDays: [],
      confidenceLog: [],
      subjectCorrect: { reading: 0, math: 0, mixed: 0, science: 0 },
      skills: {},
      bestRun: 0,
      lastScore: 0,
      lastMode: "practice",
      missionChecks: {},
      badges: {},
      bossWins: 0,
      bossBattleScores: [],
      activityLog: [],
      questionsToday: 0,
      lastActiveDate: null,
      longestStreak: 0
    };
  }

  function getState() {
    try {
      var raw = JSON.parse(localStorage.getItem(storageKey()) || "{}");
      var s = {};
      var d = defaultState();
      var k;
      for (k in d) {
        if (d.hasOwnProperty(k)) {
          s[k] = raw.hasOwnProperty(k) ? raw[k] : d[k];
        }
      }
      /* ensure subjectCorrect has science */
      if (!s.subjectCorrect.science) s.subjectCorrect.science = 0;
      return s;
    } catch (e) {
      return defaultState();
    }
  }

  function setState(s) {
    localStorage.setItem(storageKey(), JSON.stringify(s));
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function formatDate(d) {
    return new Date(d + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function markToday(s) {
    var today = todayStr();
    if (!s.studyDays) s.studyDays = [];
    if (s.studyDays.indexOf(today) === -1) s.studyDays.push(today);
    s.lastActiveDate = today;
  }

  /* Count questions answered today */
  function countQuestionsToday(s) {
    var today = todayStr();
    var count = 0;
    var k;
    for (k in s.completedQuestions) {
      if (s.completedQuestions.hasOwnProperty(k) && s.completedQuestions[k].date === today) {
        count++;
      }
    }
    return count;
  }

  /* ================================================================
     SECTION 4: STREAK SYSTEM
     ================================================================ */
  function getStreakInfo(s) {
    if (!s.studyDays || s.studyDays.length === 0) {
      return { current: 0, longest: s.longestStreak || 0 };
    }

    /* Sort study days descending */
    var sorted = s.studyDays.slice().sort(function (a, b) {
      return a < b ? 1 : a > b ? -1 : 0;
    });

    /* Only count a day as a "study day" if 3+ questions were answered */
    var validDays = [];
    var i, dayCount;
    for (i = 0; i < sorted.length; i++) {
      dayCount = 0;
      var dk;
      for (dk in s.completedQuestions) {
        if (s.completedQuestions.hasOwnProperty(dk) && s.completedQuestions[dk].date === sorted[i]) {
          dayCount++;
        }
      }
      /* For legacy data or today-in-progress, count days with at least 1 question
         but a "real" streak day needs 3 */
      if (dayCount >= 3 || (sorted[i] === todayStr() && dayCount >= 1)) {
        validDays.push(sorted[i]);
      }
    }

    if (validDays.length === 0) {
      return { current: 0, longest: s.longestStreak || 0 };
    }

    /* Calculate current streak (consecutive days ending at today or yesterday) */
    var current = 0;
    var today = new Date(todayStr() + "T12:00:00");
    var checkDate = today;
    var found;

    for (i = 0; i < 400; i++) {
      var checkStr = checkDate.toISOString().slice(0, 10);
      found = false;
      var v;
      for (v = 0; v < validDays.length; v++) {
        if (validDays[v] === checkStr) { found = true; break; }
      }
      if (found) {
        current++;
        checkDate = new Date(checkDate.getTime() - 86400000);
      } else if (i === 0) {
        /* Today not counted yet, try yesterday */
        checkDate = new Date(checkDate.getTime() - 86400000);
      } else {
        break;
      }
    }

    var longest = Math.max(current, s.longestStreak || 0);
    s.longestStreak = longest;

    return { current: current, longest: longest };
  }

  /* ================================================================
     SECTION 5: BADGE MANAGEMENT
     ================================================================ */
  function updateBadges(s) {
    var defs = badgeDefs[CURRENT_GRADE] || [];
    var oldBadges = {};
    var k;
    for (k in s.badges) {
      if (s.badges.hasOwnProperty(k)) oldBadges[k] = s.badges[k];
    }
    var newUnlocks = [];
    defs.forEach(function (b) {
      var earned = !!b.rule(s);
      s.badges[b.id] = earned;
      if (earned && !oldBadges[b.id]) {
        newUnlocks.push(b);
      }
    });
    return newUnlocks;
  }

  /* ================================================================
     SECTION 6: KID PROFILE SYSTEM
     ================================================================ */
  function getProfile() {
    try {
      return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
    } catch (e) {
      return null;
    }
  }

  function setProfile(p) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  }

  function showProfileSetup(onComplete) {
    var overlay = document.createElement("div");
    overlay.id = "profileOverlay";
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;";

    var card = document.createElement("div");
    card.style.cssText = "background:#fff;border-radius:16px;padding:32px;max-width:440px;width:100%;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.3);max-height:90vh;overflow-y:auto;";

    var selectedAvatar = AVATAR_OPTIONS[0];
    var selectedGrade = CURRENT_GRADE || "3";

    card.innerHTML =
      '<h2 style="margin:0 0 8px 0;font-size:1.5rem;">Welcome to STAAR Power Portal!</h2>' +
      '<p style="color:#666;margin:0 0 20px 0;">Set up your profile to get started.</p>' +
      '<div style="margin-bottom:16px;text-align:left;">' +
        '<label style="font-weight:700;font-size:0.9rem;display:block;margin-bottom:6px;">Your Nickname</label>' +
        '<input id="profileNickname" type="text" maxlength="20" placeholder="Type your name..." style="width:100%;padding:10px 14px;border:2px solid #ddd;border-radius:8px;font-size:1rem;box-sizing:border-box;" />' +
      '</div>' +
      '<div style="margin-bottom:16px;text-align:left;">' +
        '<label style="font-weight:700;font-size:0.9rem;display:block;margin-bottom:6px;">Pick Your Avatar</label>' +
        '<div id="avatarGrid" style="display:flex;flex-wrap:wrap;gap:8px;">' +
          AVATAR_OPTIONS.map(function (a, i) {
            return '<button class="avatar-pick' + (i === 0 ? ' selected' : '') + '" data-avatar="' + a + '" style="font-size:1.8rem;width:44px;height:44px;border:2px solid ' + (i === 0 ? '#4f46e5' : '#ddd') + ';border-radius:10px;background:' + (i === 0 ? '#eef2ff' : '#fff') + ';cursor:pointer;display:flex;align-items:center;justify-content:center;">' + a + '</button>';
          }).join("") +
        '</div>' +
      '</div>' +
      '<div style="margin-bottom:20px;text-align:left;">' +
        '<label style="font-weight:700;font-size:0.9rem;display:block;margin-bottom:6px;">Your Grade</label>' +
        '<div id="gradeSelect" style="display:flex;gap:8px;">' +
          ["3","4","5","6"].map(function (g) {
            var isSel = g === selectedGrade;
            return '<button class="grade-pick' + (isSel ? ' selected' : '') + '" data-grade-pick="' + g + '" style="flex:1;padding:10px;border:2px solid ' + (isSel ? '#4f46e5' : '#ddd') + ';border-radius:8px;background:' + (isSel ? '#eef2ff' : '#fff') + ';font-weight:700;font-size:1.1rem;cursor:pointer;">Grade ' + g + '</button>';
          }).join("") +
        '</div>' +
      '</div>' +
      '<button id="profileSaveBtn" style="width:100%;padding:12px;background:#4f46e5;color:#fff;border:none;border-radius:8px;font-size:1.1rem;font-weight:700;cursor:pointer;">Start Learning!</button>';

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    /* Avatar selection */
    var avatarBtns = card.querySelectorAll(".avatar-pick");
    avatarBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectedAvatar = btn.dataset.avatar;
        avatarBtns.forEach(function (b) {
          var sel = b.dataset.avatar === selectedAvatar;
          b.style.borderColor = sel ? "#4f46e5" : "#ddd";
          b.style.background = sel ? "#eef2ff" : "#fff";
          b.className = "avatar-pick" + (sel ? " selected" : "");
        });
      });
    });

    /* Grade selection */
    var gradeBtns = card.querySelectorAll(".grade-pick");
    gradeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectedGrade = btn.dataset.gradePick;
        gradeBtns.forEach(function (b) {
          var sel = b.dataset.gradePick === selectedGrade;
          b.style.borderColor = sel ? "#4f46e5" : "#ddd";
          b.style.background = sel ? "#eef2ff" : "#fff";
          b.className = "grade-pick" + (sel ? " selected" : "");
        });
      });
    });

    /* Save */
    card.querySelector("#profileSaveBtn").addEventListener("click", function () {
      var nickname = (card.querySelector("#profileNickname").value || "").trim();
      if (!nickname) {
        card.querySelector("#profileNickname").style.borderColor = "#ef4444";
        card.querySelector("#profileNickname").focus();
        return;
      }
      var profile = {
        nickname: nickname.slice(0, 20),
        avatar: selectedAvatar,
        grade: selectedGrade,
        createdAt: todayStr()
      };
      setProfile(profile);
      overlay.remove();
      if (onComplete) onComplete(profile);
    });
  }

  function renderProfileBar() {
    var bar = document.getElementById("profileBar");
    if (!bar) return;
    var profile = getProfile();
    if (!profile) {
      bar.innerHTML = "";
      return;
    }
    var state = getState();
    var streakInfo = getStreakInfo(state);
    var fireEmoji = "";
    var fi;
    for (fi = 0; fi < Math.min(streakInfo.current, 10); fi++) {
      fireEmoji += "\ud83d\udd25";
    }
    if (streakInfo.current > 10) fireEmoji += "+";

    bar.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">' +
        '<div style="display:flex;align-items:center;gap:10px;">' +
          '<span style="font-size:1.6rem;">' + profile.avatar + '</span>' +
          '<span style="font-weight:700;">' + escapeHtml(profile.nickname) + '</span>' +
          '<span class="small muted">Grade ' + profile.grade + '</span>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          (streakInfo.current > 0 ? '<span style="font-weight:700;">' + fireEmoji + ' ' + streakInfo.current + '-day streak</span>' : '<span class="small muted">Start a streak!</span>') +
          '<button id="editProfileBtn" class="btn ghost" style="padding:4px 12px;font-size:0.8rem;">Edit</button>' +
        '</div>' +
      '</div>';

    var editBtn = document.getElementById("editProfileBtn");
    if (editBtn) {
      editBtn.addEventListener("click", function () {
        showProfileSetup(function () {
          renderProfileBar();
          renderDashboard();
        });
      });
    }
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ================================================================
     SECTION 7: CONFETTI EFFECT
     ================================================================ */
  function launchConfetti() {
    var container = document.createElement("div");
    container.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;overflow:hidden;";
    document.body.appendChild(container);

    var colors = ["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff9ff3","#f368e0","#ff9f43","#00d2d3","#54a0ff","#5f27cd"];
    var i;
    for (i = 0; i < 30; i++) {
      var piece = document.createElement("div");
      var color = colors[i % colors.length];
      var left = Math.random() * 100;
      var delay = Math.random() * 0.5;
      var size = 6 + Math.random() * 8;
      var rotation = Math.random() * 360;
      piece.style.cssText =
        "position:absolute;top:-20px;left:" + left + "%;" +
        "width:" + size + "px;height:" + size + "px;" +
        "background:" + color + ";" +
        "border-radius:" + (Math.random() > 0.5 ? "50%" : "2px") + ";" +
        "animation:confettiFall " + (1.5 + Math.random() * 1.5) + "s ease-out " + delay + "s forwards;" +
        "transform:rotate(" + rotation + "deg);";
      container.appendChild(piece);
    }

    /* Inject keyframes if not present */
    if (!document.getElementById("confettiStyle")) {
      var style = document.createElement("style");
      style.id = "confettiStyle";
      style.textContent =
        "@keyframes confettiFall {" +
          "0% { top: -20px; opacity: 1; }" +
          "100% { top: 110vh; opacity: 0; transform: rotate(720deg) translateX(80px); }" +
        "}";
      document.head.appendChild(style);
    }

    setTimeout(function () { container.remove(); }, 4000);
  }

  /* ================================================================
     SECTION 8: COUNTDOWN TIMERS (landing page)
     ================================================================ */
  function setupCountdown() {
    var boxes = document.querySelectorAll("[data-countdown]");
    if (!boxes.length) return;
    var targets = {
      reading: new Date("2026-04-07T08:00:00"),
      math: new Date("2026-04-21T08:00:00")
    };
    function render(type, el) {
      var diff = Math.max(0, targets[type] - new Date());
      var dEl = el.querySelector(".d");
      var hEl = el.querySelector(".h");
      var mEl = el.querySelector(".m");
      var sEl = el.querySelector(".s");
      if (dEl) dEl.textContent = Math.floor(diff / 864e5);
      if (hEl) hEl.textContent = Math.floor((diff / 36e5) % 24);
      if (mEl) mEl.textContent = Math.floor((diff / 6e4) % 60);
      if (sEl) sEl.textContent = Math.floor((diff / 1e3) % 60);
    }
    function tick() {
      boxes.forEach(function (el) { render(el.dataset.countdown, el); });
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ================================================================
     SECTION 9: SUBJECT TABS
     ================================================================ */
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

  /* ================================================================
     SECTION 10: WEEKLY MISSION SYSTEM
     ================================================================ */
  function getDayOfWeek() {
    return new Date().getDay(); /* 0=Sun, 1=Mon ... 6=Sat */
  }

  function getMissionForDay() {
    var day = getDayOfWeek();
    var missions = {
      1: { id:"reading-boost", title:"Reading Boost", icon:"\ud83d\udcda", description:"Sharpen your reading skills with focused comprehension questions.", count:5, subject:"reading", cls:"" },
      2: { id:"math-mountain", title:"Math Mountain", icon:"\u26f0\ufe0f", description:"Climb through math challenges and master key concepts.", count:5, subject:"math", cls:"math" },
      3: { id:"mixed-review", title:"Mixed Review", icon:"\ud83c\udf00", description:"Test your skills across all subjects in a cross-topic challenge.", count:5, subject:"mixed", cls:"mixed" },
      4: { id:"weak-spot-repair", title:"Weak Spot Repair", icon:"\ud83d\udd27", description:"Replay missed questions and practice your hardest skills.", count:5, subject:"missed", cls:"confidence" },
      5: { id:"boss-battle", title:"Boss Battle", icon:"\ud83d\udc7e", description:"10 questions, all subjects, 20-second timer. Can you beat the boss?", count:10, subject:"boss", cls:"boss" }
    };
    if (day >= 1 && day <= 5) return missions[day];
    return { id:"free-practice", title:"Free Practice", icon:"\ud83c\udfae", description:"Weekend mode! Pick any subject and practice at your own pace.", count:0, subject:"all", cls:"free" };
  }

  function initMissions() {
    var root = document.getElementById("missionArea");
    if (!root) return;
    var state = getState();
    var todayMission = getMissionForDay();
    var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var dayNum = getDayOfWeek();

    /* Build the week view */
    var weekMissions = [
      { day:"Monday", id:"reading-boost", title:"Reading Boost", icon:"\ud83d\udcda", desc:"5 reading questions", active: dayNum === 1 },
      { day:"Tuesday", id:"math-mountain", title:"Math Mountain", icon:"\u26f0\ufe0f", desc:"5 math questions", active: dayNum === 2 },
      { day:"Wednesday", id:"mixed-review", title:"Mixed Review", icon:"\ud83c\udf00", desc:"5 mixed questions", active: dayNum === 3 },
      { day:"Thursday", id:"weak-spot-repair", title:"Weak Spot Repair", icon:"\ud83d\udd27", desc:"Replay missed questions", active: dayNum === 4 },
      { day:"Friday", id:"boss-battle", title:"Boss Battle", icon:"\ud83d\udc7e", desc:"10 questions, 20s timer", active: dayNum === 5 }
    ];
    if (dayNum === 0 || dayNum === 6) {
      weekMissions.push({ day: dayNames[dayNum], id:"free-practice", title:"Free Practice", icon:"\ud83c\udfae", desc:"Your choice!", active: true });
    }

    var html = '<div class="mission-card ' + todayMission.cls + '" style="grid-column:1/-1;border:2px solid #4f46e5;">' +
      '<div class="small muted">' + dayNames[dayNum].toUpperCase() + ' MISSION</div>' +
      '<h3>' + todayMission.icon + ' ' + todayMission.title + '</h3>' +
      '<p style="margin:8px 0;">' + todayMission.description + '</p>' +
      (todayMission.count > 0 ? '<p class="small muted">' + todayMission.count + ' questions</p>' : '') +
      '<button class="btn primary" data-start-mission="' + todayMission.subject + '">Start Mission</button>' +
      (state.missionChecks[todayMission.id + "_" + todayStr()] ? '<span style="margin-left:8px;color:#22c55e;font-weight:700;">Done today!</span>' : '') +
    '</div>';

    html += weekMissions.map(function (m) {
      var done = state.missionChecks[m.id + "_" + todayStr()];
      return '<div class="mission-card' + (m.active ? " active-mission" : "") + '" style="' + (m.active ? "border:2px solid #4f46e5;opacity:1;" : "opacity:0.7;") + '">' +
        '<div class="small muted">' + m.day.toUpperCase() + '</div>' +
        '<h3 style="font-size:1.1rem;">' + m.icon + ' ' + m.title + '</h3>' +
        '<p class="small muted">' + m.desc + '</p>' +
        (done ? '<span class="small" style="color:#22c55e;font-weight:700;">Done</span>' : '') +
      '</div>';
    }).join("");

    root.innerHTML = html;

    /* Start Mission button */
    var startBtn = root.querySelector("[data-start-mission]");
    if (startBtn) {
      startBtn.addEventListener("click", function () {
        var subject = startBtn.dataset.startMission;
        var practiceEl = document.getElementById("practiceApp");
        if (practiceEl) {
          practiceEl.scrollIntoView({ behavior: "smooth" });
          /* Dispatch custom event to set filter */
          var evt = new CustomEvent("missionStart", { detail: { subject: subject } });
          document.dispatchEvent(evt);
        }
      });
    }
  }

  /* ================================================================
     SECTION 11: DASHBOARD
     ================================================================ */
  function renderDashboard() {
    var root = document.getElementById("dashboard");
    if (!root) return;
    var state = getState();
    var newUnlocks = updateBadges(state);
    setState(state);

    var totalAnswered = Object.keys(state.completedQuestions).length;
    var totalCorrect = 0;
    var k;
    for (k in state.completedQuestions) {
      if (state.completedQuestions.hasOwnProperty(k) && state.completedQuestions[k].correct) totalCorrect++;
    }
    var percent = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    var missedIds = {};
    var mi;
    for (mi = 0; mi < (state.missedQuestions || []).length; mi++) {
      missedIds[state.missedQuestions[mi]] = true;
    }
    var missedCount = Object.keys(missedIds).length;
    var streakInfo = getStreakInfo(state);
    var fireDisplay = "";
    var fi;
    for (fi = 0; fi < Math.min(streakInfo.current, 10); fi++) {
      fireDisplay += "\ud83d\udd25";
    }

    root.innerHTML =
      '<div class="grid-4">' +
        '<div class="stat-card"><div class="muted small">Answered</div><div class="kpi">' + totalAnswered + '</div></div>' +
        '<div class="stat-card"><div class="muted small">Accuracy</div><div class="kpi">' + percent + '%</div></div>' +
        '<div class="stat-card"><div class="muted small">Streak</div><div class="kpi">' + (fireDisplay || "0") + (streakInfo.current > 0 ? ' <span style="font-size:0.7em;">' + streakInfo.current + 'd</span>' : '') + '</div></div>' +
        '<div class="stat-card"><div class="muted small">Best Run</div><div class="kpi">' + (state.bestRun || 0) + '</div></div>' +
      '</div>' +
      '<div class="grid-2" style="margin-top:18px">' +
        '<div class="panel"><h3>Progress Meter</h3><div class="meter"><span style="width:' + Math.min(percent, 100) + '%"></span></div>' +
        '<p class="small muted" style="margin-top:10px">Streak: ' + streakInfo.current + ' days (longest ever: ' + streakInfo.longest + ')</p>' +
        '<p class="small muted">Saves in this browser on this device.</p></div>' +
        '<div class="panel"><h3>Today\'s Mission</h3>' +
        '<p class="small">' + getMissionForDay().icon + ' ' + getMissionForDay().title + '</p>' +
        '<p class="small muted">Questions today: ' + countQuestionsToday(state) + '</p>' +
        '<p class="small muted">Missed to replay: ' + missedCount + '</p>' +
      '</div></div>';

    renderBadgeGrid();
    renderParentDashboard();
    renderMissedList();
    renderCertificates();

    /* Trigger confetti for new badge unlocks */
    if (newUnlocks.length > 0) {
      launchConfetti();
    }

    /* Trigger confetti at streak milestones */
    if (streakInfo.current > 0 && streakInfo.current % 5 === 0 && streakInfo.current === streakInfo.longest) {
      launchConfetti();
    }
  }

  /* ================================================================
     SECTION 12: BADGE GRID
     ================================================================ */
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

  /* ================================================================
     SECTION 13: UPGRADED PARENT DASHBOARD
     ================================================================ */
  function renderParentDashboard() {
    var root = document.getElementById("parentDashboard");
    if (!root) return;
    var state = getState();
    var profile = getProfile();
    var streakInfo = getStreakInfo(state);

    /* Subject breakdown */
    var r = state.subjectCorrect.reading || 0;
    var m = state.subjectCorrect.math || 0;
    var x = state.subjectCorrect.mixed || 0;
    var sc = state.subjectCorrect.science || 0;
    var maxSubj = Math.max(r, m, x, sc, 1);

    /* Weak skills analysis */
    var skillEntries = [];
    var sk;
    for (sk in state.skills) {
      if (state.skills.hasOwnProperty(sk)) {
        skillEntries.push({ name: sk, count: state.skills[sk] });
      }
    }
    skillEntries.sort(function (a, b) { return a.count - b.count; });

    var weakSkills = skillEntries.slice(0, 5).map(function (e) {
      var label = "needs work";
      if (e.count >= 3) label = "strong";
      else if (e.count >= 2) label = "improving";
      var color = label === "strong" ? "#22c55e" : label === "improving" ? "#f59e0b" : "#ef4444";
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #f0f0f0;">' +
        '<span>' + escapeHtml(e.name) + '</span>' +
        '<span class="pill" style="background:' + color + ';color:#fff;font-size:0.75rem;padding:2px 8px;">' + label + '</span></div>';
    });

    if (weakSkills.length === 0) {
      weakSkills = ['<p class="small muted">No skills tracked yet. Start practicing!</p>'];
    }

    /* Recent activity (last 5 sessions) */
    var activityDays = (state.studyDays || []).slice(-5).reverse();
    var activityHtml = activityDays.map(function (day) {
      var dayQ = 0;
      var dayCorrect = 0;
      var dk;
      for (dk in state.completedQuestions) {
        if (state.completedQuestions.hasOwnProperty(dk) && state.completedQuestions[dk].date === day) {
          dayQ++;
          if (state.completedQuestions[dk].correct) dayCorrect++;
        }
      }
      var pct = dayQ ? Math.round(dayCorrect / dayQ * 100) : 0;
      return '<tr><td>' + formatDate(day) + '</td><td>' + dayQ + ' questions</td><td>' + pct + '% correct</td></tr>';
    }).join("");

    if (!activityHtml) {
      activityHtml = '<tr><td colspan="3" class="muted">No activity recorded yet.</td></tr>';
    }

    /* Confidence log */
    var confStr = (state.confidenceLog || []).slice(-4).map(function (c) { return formatDate(c.date) + " " + c.value; }).join(" \u2022 ") || "No check-ins yet";

    /* Suggested action */
    var suggestion = "Start a practice session to get rolling!";
    if (streakInfo.current >= 5) {
      suggestion = "Amazing streak! Try a Boss Battle for extra challenge.";
    } else if (streakInfo.current >= 3) {
      suggestion = "Great momentum! Keep the streak going.";
    } else if (Object.keys(state.missedQuestions || {}).length > 3) {
      suggestion = "Focus on Weak Spot Repair to review missed questions.";
    } else if (r > m + 3) {
      suggestion = "Math could use some love. Try a Math Mountain session.";
    } else if (m > r + 3) {
      suggestion = "Reading skills need a boost. Try a Reading Boost session.";
    }

    /* Build the subject bars */
    function subjectBar(label, value, color) {
      var pct = maxSubj > 0 ? Math.round(value / maxSubj * 100) : 0;
      return '<div style="margin-bottom:10px;">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:3px;">' +
          '<span class="small" style="font-weight:600;">' + label + '</span>' +
          '<span class="small muted">' + value + ' correct</span>' +
        '</div>' +
        '<div style="background:#e5e7eb;border-radius:6px;height:14px;overflow:hidden;">' +
          '<div style="background:' + color + ';height:100%;width:' + pct + '%;border-radius:6px;transition:width 0.5s;"></div>' +
        '</div></div>';
    }

    var subjectBarsHtml =
      subjectBar("Reading", r, "#4f46e5") +
      subjectBar("Math", m, "#22c55e") +
      subjectBar("Mixed", x, "#f59e0b") +
      (CURRENT_GRADE === "5" ? subjectBar("Science", sc, "#06b6d4") : "");

    root.innerHTML =
      '<div class="panel" style="margin-bottom:18px;"><h2 style="margin:0 0 4px 0;">Parent Dashboard</h2><p class="small muted">For parents and guardians. Print-friendly view of progress.</p></div>' +

      /* Row 1: Profile + Streak */
      '<div class="grid-2" style="margin-bottom:18px;">' +
        '<div class="panel">' +
          '<h3>Student Profile</h3>' +
          (profile ?
            '<div style="display:flex;align-items:center;gap:12px;margin-top:8px;">' +
              '<span style="font-size:2.5rem;">' + profile.avatar + '</span>' +
              '<div><div style="font-weight:700;font-size:1.1rem;">' + escapeHtml(profile.nickname) + '</div>' +
              '<div class="small muted">Grade ' + profile.grade + '</div></div></div>'
            : '<p class="small muted">No profile set up yet.</p>') +
        '</div>' +
        '<div class="panel">' +
          '<h3>Study Streak</h3>' +
          '<div style="display:flex;gap:24px;margin-top:8px;">' +
            '<div><div class="kpi" style="font-size:2rem;">' + streakInfo.current + '</div><div class="small muted">Current days</div></div>' +
            '<div><div class="kpi" style="font-size:2rem;">' + streakInfo.longest + '</div><div class="small muted">Longest ever</div></div>' +
          '</div>' +
          '<p class="small muted" style="margin-top:8px;">A study day counts after 3+ questions answered.</p>' +
        '</div>' +
      '</div>' +

      /* Row 2: Subject breakdown + Weak skills */
      '<div class="grid-2" style="margin-bottom:18px;">' +
        '<div class="panel">' +
          '<h3>Subject Breakdown</h3>' +
          '<div style="margin-top:8px;">' + subjectBarsHtml + '</div>' +
        '</div>' +
        '<div class="panel">' +
          '<h3>Skill Health</h3>' +
          '<div style="margin-top:8px;">' + weakSkills.join("") + '</div>' +
        '</div>' +
      '</div>' +

      /* Row 3: Recent activity + Suggested action */
      '<div class="grid-2">' +
        '<div class="panel">' +
          '<h3>Recent Activity</h3>' +
          '<table class="table-lite" style="margin-top:8px;">' +
            '<thead><tr><th>Date</th><th>Questions</th><th>Accuracy</th></tr></thead>' +
            '<tbody>' + activityHtml + '</tbody>' +
          '</table>' +
        '</div>' +
        '<div class="panel">' +
          '<h3>Confidence Log</h3>' +
          '<p class="small" style="margin-top:8px;">' + confStr + '</p>' +
          '<h3 style="margin-top:16px;">Suggested Next Step</h3>' +
          '<p style="margin-top:8px;padding:12px;background:#f0fdf4;border-radius:8px;font-weight:600;">' + suggestion + '</p>' +
        '</div>' +
      '</div>';
  }

  /* ================================================================
     SECTION 14: MISSED QUESTIONS REPLAY
     ================================================================ */
  function renderMissedList() {
    var root = document.getElementById("missedList");
    if (!root) return;
    var state = getState();
    var idSet = {};
    var mi;
    for (mi = 0; mi < (state.missedQuestions || []).length; mi++) {
      idSet[state.missedQuestions[mi]] = true;
    }
    var ids = Object.keys(idSet);
    var bank = questionBanks[CURRENT_GRADE] || [];
    if (!ids.length) {
      root.innerHTML = '<div class="panel"><h3>Missed Questions Replay</h3><p class="muted">Nothing missed yet. That is a win.</p></div>';
      return;
    }
    var cards = ids.map(function (id) {
      return bank.filter(function (q) { return q.id === id; })[0];
    }).filter(Boolean).map(function (q) {
      return '<div class="mini-card"><div class="small muted">' + q.subject.toUpperCase() + ' \u2022 ' + q.skill + '</div>' +
        '<h3 style="margin-top:8px">' + q.question + '</h3>' +
        '<div class="small">Correct: <strong>' + String.fromCharCode(65 + q.answer) + '. ' + q.options[q.answer] + '</strong></div>' +
        '<div class="small muted" style="margin-top:8px">' + q.explanation + '</div></div>';
    }).join("");
    root.innerHTML = '<div class="panel"><h3>Missed Questions Replay</h3><div class="grid-2">' + cards + '</div></div>';
  }

  /* ================================================================
     SECTION 15: CERTIFICATES
     ================================================================ */
  function renderCertificates() {
    var root = document.getElementById("certificateArea");
    if (!root) return;
    var state = getState();
    var total = 0;
    var bk;
    for (bk in state.badges) {
      if (state.badges.hasOwnProperty(bk) && state.badges[bk]) total++;
    }
    var profile = getProfile();
    var name = profile ? escapeHtml(profile.nickname) : "Student";

    root.innerHTML =
      '<div class="panel center">' +
        '<h3>Victory Certificate</h3><p class="lead">Print this after a strong week or before test day.</p>' +
        '<div class="callout" style="max-width:720px;margin:0 auto">' +
          '<div class="small muted">Awarded by</div>' +
          '<div style="font-size:1.6rem;font-weight:900;margin:6px 0">RISE Studio Labs STAAR Power Portal</div>' +
          '<div style="font-size:1.1rem;font-weight:900">This certifies that <strong>' + name + '</strong> completed brave, focused study missions and earned <strong>' + total + '</strong> badge(s).</div>' +
          '<div class="small muted" style="margin-top:12px">Brought to you by <strong>www.risestudiolabs.com</strong></div></div>' +
        '<button class="btn secondary no-print" style="margin-top:14px" onclick="window.print()">Print Certificate</button></div>';
  }

  /* ================================================================
     SECTION 16: PRACTICE ARENA (with Boss Battle)
     ================================================================ */
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
    var durations = { practice: 0, focus: 45, challenge: 30, boss: 20 };

    /* Boss Battle state */
    var bossBattle = null; /* { questions:[], current:0, score:0, total:10, active:false } */

    /* Determine available subjects */
    var hasScience = CURRENT_GRADE === "5";
    var subjectFilters = ["all","reading","math","mixed"];
    if (hasScience) subjectFilters.push("science");
    subjectFilters.push("missed");

    function filtered() {
      if (filter === "all") return bank;
      if (filter === "missed") {
        var idSet = {};
        var mi;
        for (mi = 0; mi < (state.missedQuestions || []).length; mi++) {
          idSet[state.missedQuestions[mi]] = true;
        }
        var ids = Object.keys(idSet);
        return bank.filter(function (q) { return ids.indexOf(q.id) !== -1; });
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
      var dur = (mode === "boss") ? 20 : durations[mode];
      timeLeft = dur;
      if (timeLeft <= 0) { renderTimer(); return; }
      timer = setInterval(function () {
        timeLeft--;
        renderTimer();
        if (timeLeft <= 0) {
          stopTimer();
          if (mode === "boss" && bossBattle && bossBattle.active) {
            /* Auto-advance on timeout for boss battle */
            bossTimeout();
          }
        }
      }, 1000);
    }

    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    function renderTimer() {
      var el = document.getElementById("timerDisplay");
      if (!el) return;
      var dur = (mode === "boss") ? 20 : durations[mode];
      if (dur === 0) { el.textContent = "No timer in Practice Mode"; return; }
      var color = timeLeft <= 5 ? "#ef4444" : timeLeft <= 10 ? "#f59e0b" : "#22c55e";
      el.innerHTML = '<span style="color:' + color + ';font-weight:700;">' + String(Math.floor(timeLeft / 60)).padStart(2, "0") + ":" + String(timeLeft % 60).padStart(2, "0") + '</span> remaining';
    }

    /* Boss Battle functions */
    function startBossBattle() {
      mode = "boss";
      state.lastMode = mode;
      setState(state);

      /* Pick 10 random questions from all subjects */
      var shuffled = bank.slice().sort(function () { return Math.random() - 0.5; });
      var bossQuestions = shuffled.slice(0, Math.min(10, shuffled.length));
      bossBattle = {
        questions: bossQuestions,
        current: 0,
        score: 0,
        total: bossQuestions.length,
        active: true,
        answers: []
      };
      renderBoss();
      startTimer();
    }

    function bossTimeout() {
      if (!bossBattle || !bossBattle.active) return;
      /* Mark as wrong */
      bossBattle.answers.push(false);
      bossBattle.current++;
      if (bossBattle.current >= bossBattle.total) {
        endBossBattle();
      } else {
        renderBoss();
        startTimer();
      }
    }

    function bossAnswer(chosen) {
      if (!bossBattle || !bossBattle.active) return;
      stopTimer();
      var q = bossBattle.questions[bossBattle.current];
      var correct = chosen === q.answer;
      if (correct) bossBattle.score++;
      bossBattle.answers.push(correct);

      /* Also record in main state */
      var s = getState();
      s.completedQuestions[q.id] = { correct: correct, subject: q.subject, skill: q.skill, date: todayStr() };
      if (correct) {
        s.subjectCorrect[q.subject] = (s.subjectCorrect[q.subject] || 0) + 1;
        s.skills[q.skill] = (s.skills[q.skill] || 0) + 1;
      } else {
        if (!s.missedQuestions) s.missedQuestions = [];
        s.missedQuestions.push(q.id);
      }
      markToday(s);
      setState(s);
      state = s;

      /* Show feedback briefly */
      var btns = root.querySelectorAll(".option");
      btns.forEach(function (b, i) {
        b.disabled = true;
        if (i === q.answer) b.classList.add("correct");
        if (i === chosen && !correct) b.classList.add("wrong");
      });
      var ex = root.querySelector("#explainBox");
      if (ex) {
        ex.innerHTML = "<strong>" + (correct ? "Correct!" : "Wrong.") + "</strong> " + q.explanation;
        ex.classList.add("show");
      }

      setTimeout(function () {
        bossBattle.current++;
        if (bossBattle.current >= bossBattle.total) {
          endBossBattle();
        } else {
          renderBoss();
          startTimer();
        }
      }, 1200);
    }

    function endBossBattle() {
      stopTimer();
      bossBattle.active = false;
      var won = bossBattle.score >= 7;

      /* Record boss battle */
      var s = getState();
      if (!s.bossBattleScores) s.bossBattleScores = [];
      s.bossBattleScores.push({ date: todayStr(), score: bossBattle.score, total: bossBattle.total });
      if (won) {
        s.bossWins = (s.bossWins || 0) + 1;
      }
      /* Mark mission done */
      s.missionChecks["boss-battle_" + todayStr()] = true;
      /* Log activity */
      if (!s.activityLog) s.activityLog = [];
      s.activityLog.push({ date: todayStr(), type: "boss", score: bossBattle.score, total: bossBattle.total });
      updateBadges(s);
      setState(s);
      state = s;

      root.innerHTML =
        '<div class="panel center" style="padding:40px;">' +
          '<div style="font-size:4rem;">' + (won ? "\ud83c\udfc6" : "\ud83d\udcaa") + '</div>' +
          '<h2 style="margin:12px 0;">' + (won ? "BOSS DEFEATED!" : "Battle Over!") + '</h2>' +
          '<div class="kpi" style="font-size:3rem;margin:12px 0;">' + bossBattle.score + '/' + bossBattle.total + '</div>' +
          '<p style="font-size:1.1rem;">' + (won ? "You earned the Boss Slayer badge! Incredible work!" : "Keep practicing and try again. You need 7/10 to defeat the boss!") + '</p>' +
          '<div style="margin-top:16px;">' +
            bossBattle.questions.map(function (q, i) {
              var wasCorrect = bossBattle.answers[i];
              return '<div style="text-align:left;padding:8px;border-bottom:1px solid #eee;">' +
                '<span style="color:' + (wasCorrect ? '#22c55e' : '#ef4444') + ';font-weight:700;">' + (wasCorrect ? 'O' : 'X') + '</span> ' +
                '<span class="small">' + q.skill + ': ' + q.question.slice(0, 60) + (q.question.length > 60 ? '...' : '') + '</span></div>';
            }).join("") +
          '</div>' +
          '<button class="btn primary" style="margin-top:20px;" id="bossRetry">Try Again</button>' +
          '<button class="btn ghost" style="margin-top:10px;" id="bossExit">Back to Practice</button>' +
        '</div>';

      if (won) launchConfetti();

      var retryBtn = root.querySelector("#bossRetry");
      var exitBtn = root.querySelector("#bossExit");
      if (retryBtn) retryBtn.addEventListener("click", function () { startBossBattle(); });
      if (exitBtn) exitBtn.addEventListener("click", function () { mode = "practice"; bossBattle = null; render(); });

      renderDashboard();
    }

    function renderBoss() {
      if (!bossBattle || !bossBattle.active) return;
      var q = bossBattle.questions[bossBattle.current];
      var progress = Math.round((bossBattle.current / bossBattle.total) * 100);

      root.innerHTML =
        '<div class="question-card" style="border:3px solid #7c3aed;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
            '<div>' +
              '<span style="font-size:1.5rem;">\ud83d\udc7e</span> ' +
              '<strong style="color:#7c3aed;">BOSS BATTLE</strong>' +
            '</div>' +
            '<div>' +
              '<strong>Q ' + (bossBattle.current + 1) + '/' + bossBattle.total + '</strong>' +
              '<span style="margin-left:12px;">Score: ' + bossBattle.score + '</span>' +
            '</div>' +
          '</div>' +
          '<div style="background:#e5e7eb;border-radius:8px;height:8px;margin-bottom:16px;">' +
            '<div style="background:#7c3aed;height:100%;width:' + progress + '%;border-radius:8px;transition:width 0.3s;"></div>' +
          '</div>' +
          '<div class="timer" style="margin-bottom:12px;"><strong>Timer: </strong><span id="timerDisplay"></span></div>' +
          '<div class="question-header"><div>' +
            '<div class="small muted">' + q.subject.toUpperCase() + ' \u2022 ' + q.skill + '</div>' +
            '<h3 style="font-size:1.3rem;margin-top:8px">' + q.question + '</h3></div></div>' +
          '<div class="options">' + q.options.map(function (opt, i) {
            return '<button class="option" data-boss-option="' + i + '"><strong>' + String.fromCharCode(65 + i) + '.</strong> ' + opt + '</button>';
          }).join("") + '</div>' +
          '<div class="explanation" id="explainBox"></div>' +
        '</div>';

      root.querySelectorAll("[data-boss-option]").forEach(function (b) {
        b.addEventListener("click", function () { bossAnswer(Number(b.dataset.bossOption)); });
      });
      renderTimer();
    }

    /* Main practice render */
    function render() {
      if (bossBattle && bossBattle.active) {
        renderBoss();
        return;
      }

      state = getState();
      updateBadges(state);
      setState(state);
      var list = filtered();
      if (idx >= list.length) idx = 0;
      var q = list[idx];
      var s = score(list);

      root.innerHTML =
        '<div class="practice-layout"><div class="sidebar-stack">' +
          '<div class="panel"><h3>Mode</h3><div class="pill-row">' +
            '<button class="pill ' + (mode === "practice" ? "active" : "") + '" data-mode="practice">Practice</button>' +
            '<button class="pill ' + (mode === "focus" ? "active" : "") + '" data-mode="focus">Focus</button>' +
            '<button class="pill ' + (mode === "challenge" ? "active" : "") + '" data-mode="challenge">Challenge</button>' +
            '<button class="pill ' + (mode === "boss" ? "active" : "") + '" data-mode="boss" style="background:' + (mode === "boss" ? "#7c3aed" : "") + ';color:' + (mode === "boss" ? "#fff" : "") + ';">\ud83d\udc7e Boss</button></div>' +
            '<div class="timer" style="margin-top:14px"><strong>Timer</strong><span id="timerDisplay"></span></div></div>' +
          '<div class="panel"><h3>Sets</h3><div class="pill-row">' +
            subjectFilters.map(function (f) {
              var label = f.charAt(0).toUpperCase() + f.slice(1);
              return '<button class="pill ' + (filter === f ? "active" : "") + '" data-filter="' + f + '">' + label + '</button>';
            }).join("") + '</div>' +
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

      /* Mode buttons */
      root.querySelectorAll("[data-mode]").forEach(function (b) {
        b.addEventListener("click", function () {
          if (b.dataset.mode === "boss") {
            startBossBattle();
            return;
          }
          mode = b.dataset.mode;
          state.lastMode = mode;
          setState(state);
          render();
          startTimer();
        });
      });

      /* Filter buttons */
      root.querySelectorAll("[data-filter]").forEach(function (b) {
        b.addEventListener("click", function () {
          filter = b.dataset.filter;
          idx = 0;
          render();
          startTimer();
        });
      });

      /* Confidence buttons */
      root.querySelectorAll("[data-confidence]").forEach(function (b) {
        b.addEventListener("click", function () {
          var s2 = getState();
          if (!s2.confidenceLog) s2.confidenceLog = [];
          s2.confidenceLog.push({ date: todayStr(), value: b.dataset.confidence });
          markToday(s2);
          setState(s2);
          b.classList.add("active");
          renderDashboard();
        });
      });

      /* Nav buttons */
      var prev = root.querySelector('[data-nav="prev"]');
      var next = root.querySelector('[data-nav="next"]');
      if (prev) prev.addEventListener("click", function () { idx = (idx - 1 + list.length) % list.length; render(); startTimer(); });
      if (next) next.addEventListener("click", function () { idx = (idx + 1) % list.length; render(); startTimer(); });

      /* Option buttons */
      root.querySelectorAll("[data-option]").forEach(function (b) {
        b.addEventListener("click", function () { answerQuestion(q, Number(b.dataset.option)); });
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

      /* Update activity log */
      if (!s.activityLog) s.activityLog = [];
      /* Just track on state change, actual session log at dashboard level */

      var all = Object.values(s.completedQuestions);
      s.lastScore = all.length ? Math.round(all.filter(function (v) { return v.correct; }).length / all.length * 100) : 0;
      var newUnlocks = updateBadges(s);

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

      /* Mark today's mission as done if enough questions answered */
      var todayQs = countQuestionsToday(s);
      var todayMission = getMissionForDay();
      if (todayQs >= (todayMission.count || 5)) {
        s.missionChecks[todayMission.id + "_" + todayStr()] = true;
      }

      setState(s);
      state = s;
      renderDashboard();

      /* Confetti for badge unlocks */
      if (newUnlocks.length > 0) {
        launchConfetti();
      }
    }

    /* Listen for mission start events */
    document.addEventListener("missionStart", function (e) {
      var subject = e.detail.subject;
      if (subject === "boss") {
        startBossBattle();
      } else if (subject === "missed") {
        filter = "missed";
        idx = 0;
        render();
        startTimer();
      } else if (subject === "all" || subjectFilters.indexOf(subject) !== -1) {
        filter = subject;
        idx = 0;
        render();
        startTimer();
      }
    });

    render();
    startTimer();
  }

  /* ================================================================
     SECTION 17: YEAR STAMP
     ================================================================ */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ================================================================
     SECTION 18: TOGGLE ANSWERS (simple practice cards)
     ================================================================ */
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

  /* ================================================================
     SECTION 19: BOOT SEQUENCE
     ================================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    /* Profile check */
    var profile = getProfile();
    if (!profile && CURRENT_GRADE) {
      showProfileSetup(function (newProfile) {
        renderProfileBar();
        initMissions();
        initPractice();
        renderDashboard();
      });
    } else {
      renderProfileBar();
    }

    /* Core init */
    setupCountdown();
    setupSubjectTabs();
    initMissions();
    initPractice();
    renderDashboard();
    initYear();
    initToggleAnswers();
  });
})();
