/* ===================================================================
   Ziggy's Brain Garden — content data
   All flashcard decks + emoji pools used by the mini-games live here.
   =================================================================== */

const FLASHCARD_DECKS = {
  animals: {
    title: "Animals",
    icon: "🦁",
    color: "#FF6FA5",
    cards: [
      { q: "🦁", a: "Lion", fact: "A lion's roar can be heard 8 km away!" },
      { q: "🐘", a: "Elephant", fact: "Elephants are the largest land animals." },
      { q: "🐢", a: "Turtle", fact: "Some turtles live longer than 100 years." },
      { q: "🦒", a: "Giraffe", fact: "A giraffe's tongue is almost 50 cm long." },
      { q: "🐧", a: "Penguin", fact: "Penguins can't fly, but they're great swimmers." },
      { q: "🦋", a: "Butterfly", fact: "Butterflies taste with their feet." },
      { q: "🐬", a: "Dolphin", fact: "Dolphins sleep with one eye open." },
      { q: "🦉", a: "Owl", fact: "Owls can turn their heads almost all the way around." },
      { q: "🐝", a: "Bee", fact: "Bees dance to tell each other where flowers are." },
      { q: "🐨", a: "Koala", fact: "Koalas sleep up to 20 hours a day." },
      { q: "🦓", a: "Zebra", fact: "Every zebra's stripes are unique, like fingerprints." },
      { q: "🐍", a: "Snake", fact: "Snakes smell using their tongue." }
    ]
  },
  fruitsveg: {
    title: "Fruits & Veggies",
    icon: "🍎",
    color: "#6BCB77",
    cards: [
      { q: "🍎", a: "Apple", fact: "Apples float because they're 25% air!" },
      { q: "🍌", a: "Banana", fact: "Bananas are berries, but strawberries aren't!" },
      { q: "🍇", a: "Grapes", fact: "Grapes grow in bunches on a vine." },
      { q: "🥕", a: "Carrot", fact: "Carrots were originally purple, not orange." },
      { q: "🍓", a: "Strawberry", fact: "Strawberries have seeds on the outside." },
      { q: "🍍", a: "Pineapple", fact: "A pineapple takes almost 2 years to grow." },
      { q: "🥦", a: "Broccoli", fact: "Broccoli has more protein than most vegetables." },
      { q: "🍊", a: "Orange", fact: "Oranges got their name from their color!" },
      { q: "🍉", a: "Watermelon", fact: "Watermelon is 92% water." },
      { q: "🌽", a: "Corn", fact: "There's always an even number of rows on a corn cob." }
    ]
  },
  colorsShapes: {
    title: "Colors & Shapes",
    icon: "🔺",
    color: "#4EC5F1",
    cards: [
      { q: "🔴", a: "Red Circle", fact: "Red is one of the primary colors." },
      { q: "🟦", a: "Blue Square", fact: "A square has 4 equal sides." },
      { q: "🔺", a: "Triangle", fact: "A triangle has 3 sides and 3 corners." },
      { q: "🟢", a: "Green Circle", fact: "Green is made by mixing blue and yellow." },
      { q: "🟨", a: "Yellow Square", fact: "Yellow is the color of sunshine." },
      { q: "🟣", a: "Purple Circle", fact: "Purple is made by mixing red and blue." },
      { q: "⭐", a: "Star", fact: "A classic star shape has 5 points." },
      { q: "🟠", a: "Orange Circle", fact: "Orange is a mix of red and yellow." },
      { q: "❤️", a: "Heart", fact: "The heart shape is a symbol of love." },
      { q: "⬛", a: "Black Square", fact: "Black absorbs all colors of light." }
    ]
  },
  numbers: {
    title: "Numbers",
    icon: "🔢",
    color: "#FFC93C",
    cards: [
      { q: "1️⃣", a: "One", fact: "One is the first counting number." },
      { q: "2️⃣", a: "Two", fact: "Two eyes, two ears, two hands!" },
      { q: "3️⃣", a: "Three", fact: "A triangle has three sides." },
      { q: "4️⃣", a: "Four", fact: "A car has four wheels." },
      { q: "5️⃣", a: "Five", fact: "You have five fingers on one hand." },
      { q: "6️⃣", a: "Six", fact: "An insect has six legs." },
      { q: "7️⃣", a: "Seven", fact: "There are seven days in a week." },
      { q: "8️⃣", a: "Eight", fact: "A spider has eight legs." },
      { q: "9️⃣", a: "Nine", fact: "A cat is said to have nine lives." },
      { q: "🔟", a: "Ten", fact: "You have ten toes on two feet." }
    ]
  },
  alphabet: {
    title: "Alphabet",
    icon: "🔤",
    color: "#9B72CF",
    cards: [
      { q: "🅰️", a: "A is for Apple", fact: "A is the first letter of the alphabet." },
      { q: "🅱️", a: "B is for Ball", fact: "B is round like the ball you bounce!" },
      { q: "🐱", a: "C is for Cat", fact: "Cats say 'meow'." },
      { q: "🐶", a: "D is for Dog", fact: "Dogs are known as loyal friends." },
      { q: "🐘", a: "E is for Elephant", fact: "Elephants have amazing memories." },
      { q: "🐟", a: "F is for Fish", fact: "Fish breathe through gills." },
      { q: "🦒", a: "G is for Giraffe", fact: "Giraffes are the tallest animals." },
      { q: "🏠", a: "H is for House", fact: "A house keeps a family safe and warm." },
      { q: "🍦", a: "I is for Ice Cream", fact: "Ice cream is a frozen treat." },
      { q: "🪁", a: "K is for Kite", fact: "Kites fly high when the wind blows." }
    ]
  },
  bodyparts: {
    title: "Body Parts",
    icon: "🧠",
    color: "#FF9F45",
    cards: [
      { q: "👀", a: "Eyes", fact: "Your eyes help you see the world." },
      { q: "👃", a: "Nose", fact: "Your nose helps you smell and breathe." },
      { q: "👂", a: "Ears", fact: "Your ears help you hear sounds." },
      { q: "🧠", a: "Brain", fact: "Your brain controls your whole body." },
      { q: "❤️", a: "Heart", fact: "Your heart pumps blood all day and night." },
      { q: "🦷", a: "Teeth", fact: "You use teeth to chew your food." },
      { q: "✋", a: "Hand", fact: "You have 5 fingers on each hand." },
      { q: "🦶", a: "Foot", fact: "Your feet help you stand and walk." },
      { q: "💪", a: "Arm", fact: "Your arms help you lift and carry things." },
      { q: "🦵", a: "Leg", fact: "Your legs help you run and jump." }
    ]
  },
  vehicles: {
    title: "Vehicles",
    icon: "🚗",
    color: "#4E9CF1",
    cards: [
      { q: "🚗", a: "Car", fact: "Cars usually have four wheels." },
      { q: "🚌", a: "Bus", fact: "Buses can carry many passengers at once." },
      { q: "🚂", a: "Train", fact: "Trains travel on tracks called rails." },
      { q: "✈️", a: "Airplane", fact: "Airplanes fly high up in the sky." },
      { q: "🚁", a: "Helicopter", fact: "Helicopters can fly straight up and down." },
      { q: "🚢", a: "Ship", fact: "Ships travel across oceans and seas." },
      { q: "🚲", a: "Bicycle", fact: "Bicycles have two wheels and no engine." },
      { q: "🚀", a: "Rocket", fact: "Rockets travel into outer space." },
      { q: "🚒", a: "Fire Truck", fact: "Fire trucks rush to help put out fires." },
      { q: "🚑", a: "Ambulance", fact: "Ambulances rush people to the hospital." }
    ]
  },
  planetsScience: {
    title: "Science & Space",
    icon: "🪐",
    color: "#7C6CE8",
    cards: [
      { q: "☀️", a: "The Sun", fact: "The Sun is actually a giant star." },
      { q: "🌍", a: "Earth", fact: "Earth is the only planet known to have life." },
      { q: "🌙", a: "The Moon", fact: "The Moon orbits around the Earth." },
      { q: "🪐", a: "Saturn", fact: "Saturn has beautiful rings made of ice and rock." },
      { q: "⭐", a: "Star", fact: "Stars are giant balls of burning gas." },
      { q: "🌈", a: "Rainbow", fact: "Rainbows appear when sunlight meets raindrops." },
      { q: "❄️", a: "Snowflake", fact: "No two snowflakes are exactly alike." },
      { q: "🌋", a: "Volcano", fact: "Volcanoes can erupt with hot melted rock." },
      { q: "🧲", a: "Magnet", fact: "Magnets can pull certain metals toward them." },
      { q: "💧", a: "Water Drop", fact: "Water can be a liquid, solid ice, or gas." }
    ]
  },
  countries: {
    title: "Countries & Flags",
    icon: "🌍",
    color: "#3FBF8F",
    cards: [
      { q: "🇺🇸", a: "United States", fact: "The USA has 50 states." },
      { q: "🇬🇧", a: "United Kingdom", fact: "The UK includes England, Scotland & Wales." },
      { q: "🇫🇷", a: "France", fact: "France is famous for the Eiffel Tower." },
      { q: "🇮🇳", a: "India", fact: "India is home to the Taj Mahal." },
      { q: "🇯🇵", a: "Japan", fact: "Japan is known as the Land of the Rising Sun." },
      { q: "🇧🇷", a: "Brazil", fact: "Brazil is home to the Amazon Rainforest." },
      { q: "🇦🇺", a: "Australia", fact: "Australia is home to kangaroos and koalas." },
      { q: "🇨🇦", a: "Canada", fact: "Canada has the longest coastline in the world." },
      { q: "🇪🇬", a: "Egypt", fact: "Egypt is home to the ancient pyramids." },
      { q: "🇨🇳", a: "China", fact: "China is home to the Great Wall." }
    ]
  },
  occupations: {
    title: "Jobs & Helpers",
    icon: "👩‍⚕️",
    color: "#FF7A7A",
    cards: [
      { q: "👩‍⚕️", a: "Doctor", fact: "Doctors help people feel better when sick." },
      { q: "👨‍🚒", a: "Firefighter", fact: "Firefighters keep us safe from fires." },
      { q: "👮", a: "Police Officer", fact: "Police officers help keep everyone safe." },
      { q: "👩‍🏫", a: "Teacher", fact: "Teachers help us learn new things every day." },
      { q: "👨‍🌾", a: "Farmer", fact: "Farmers grow the food that we eat." },
      { q: "👩‍🍳", a: "Chef", fact: "Chefs cook delicious meals for people." },
      { q: "👨‍✈️", a: "Pilot", fact: "Pilots fly airplanes high in the sky." },
      { q: "👷", a: "Builder", fact: "Builders construct houses and buildings." },
      { q: "🧑‍🚀", a: "Astronaut", fact: "Astronauts travel to outer space." },
      { q: "👩‍🔬", a: "Scientist", fact: "Scientists explore and discover new things." }
    ]
  },
  timesTables: {
    title: "Times Tables",
    icon: "✖️",
    color: "#5B8DEF",
    ageHint: "6-10",
    cards: [
      { q: "2 × 3", a: "6", fact: "2 × 3 means 2 groups of 3." },
      { q: "3 × 3", a: "9", fact: "3 × 3 is the same as 3 + 3 + 3." },
      { q: "4 × 2", a: "8", fact: "Multiplying by 2 means doubling!" },
      { q: "5 × 5", a: "25", fact: "5 times tables always end in 0 or 5." },
      { q: "6 × 2", a: "12", fact: "6 × 2 is double 6." },
      { q: "7 × 3", a: "21", fact: "7 × 3 is the same as 7+7+7." },
      { q: "8 × 2", a: "16", fact: "Doubling 8 gives you 16." },
      { q: "9 × 3", a: "27", fact: "9 times tables: the digits always add up to 9!" },
      { q: "10 × 4", a: "40", fact: "Multiplying by 10 just adds a zero." },
      { q: "6 × 6", a: "36", fact: "6 × 6 is a 'square number'." },
      { q: "7 × 7", a: "49", fact: "7 × 7 is also a square number." },
      { q: "8 × 8", a: "64", fact: "8 × 8 = 64, a favorite in chess boards (8×8 squares)!" }
    ]
  },
  worldCapitals: {
    title: "World Capitals",
    icon: "🗺️",
    color: "#3FA7A0",
    ageHint: "7-10",
    cards: [
      { q: "🇺🇸", a: "Washington, D.C.", fact: "Washington, D.C. is not part of any US state." },
      { q: "🇬🇧", a: "London", fact: "London sits on the River Thames." },
      { q: "🇫🇷", a: "Paris", fact: "Paris is nicknamed 'The City of Light'." },
      { q: "🇮🇳", a: "New Delhi", fact: "New Delhi is part of India's capital territory." },
      { q: "🇯🇵", a: "Tokyo", fact: "Tokyo is one of the most populated cities on Earth." },
      { q: "🇨🇦", a: "Ottawa", fact: "Ottawa is Canada's capital, not Toronto!" },
      { q: "🇦🇺", a: "Canberra", fact: "Canberra was specially built to be Australia's capital." },
      { q: "🇪🇬", a: "Cairo", fact: "Cairo sits along the Nile, the longest river in the world." },
      { q: "🇮🇹", a: "Rome", fact: "Rome is home to the ancient Colosseum." },
      { q: "🇩🇪", a: "Berlin", fact: "Berlin was once divided by a famous wall." }
    ]
  },
  scienceAdvanced: {
    title: "Science Explorers",
    icon: "🔬",
    color: "#8A6FD4",
    ageHint: "7-10",
    cards: [
      { q: "🦴", a: "Skeleton", fact: "The human body has 206 bones." },
      { q: "🫁", a: "Lungs", fact: "Lungs bring oxygen into your blood." },
      { q: "🌡️", a: "Thermometer", fact: "Thermometers measure temperature." },
      { q: "🔭", a: "Telescope", fact: "Telescopes let us see faraway stars and planets." },
      { q: "🧪", a: "Test Tube", fact: "Scientists use test tubes to mix and test liquids." },
      { q: "⚛️", a: "Atom", fact: "Everything around you is made of tiny atoms." },
      { q: "🌪️", a: "Tornado", fact: "Tornadoes are spinning columns of very fast wind." },
      { q: "🧬", a: "DNA", fact: "DNA carries the instructions that make you, you!" },
      { q: "🪨", a: "Rock Cycle", fact: "Rocks slowly change form over millions of years." },
      { q: "🔋", a: "Battery", fact: "Batteries store energy as chemicals inside them." }
    ]
  }
};

/* ===================================================================
   VIDEO LIBRARY — hand-curated, not search-driven.
   Every entry below was individually verified (channel + title checked
   against the real YouTube page) before being added. Only videos from
   well-established, reputable children's-education channels are
   included: Super Simple Songs, SciShow Kids, National Geographic
   Kids, and Sesame Street/Sesame Workshop.

   IMPORTANT FOR WHOEVER MAINTAINS THIS APP: YouTube content can change
   or be taken down at any time, and no automated check is perfectly
   future-proof. Please spot-check this list yourselves before/after
   deploying, and only add new entries the same way — a specific,
   verified video ID from a channel you trust, never a search query.
   =================================================================== */
const VIDEO_LIBRARY = {
  alphabet: {
    title: "Alphabet & Phonics",
    icon: "🔤",
    color: "#FF6FA5",
    videos: [
      { id: "vD98OvvDNEs", title: "The Alphabet Song", channel: "Super Simple Songs" },
      { id: "kDdg2M1_EuE", title: "The Alphabet Is So Much Fun", channel: "Super Simple Songs" }
    ]
  },
  counting: {
    title: "Counting & Numbers",
    icon: "🔢",
    color: "#4EC5F1",
    videos: [
      { id: "7D4K9oi7oBM", title: "Top 10 Counting Songs", channel: "Super Simple Songs" },
      { id: "S84fcGdEULk", title: "Counting Up To 20 with the Roundabouts", channel: "Super Simple Songs" }
    ]
  },
  shapesColors: {
    title: "Shapes & Colors",
    icon: "🔺",
    color: "#FFC93C",
    videos: [
      { id: "TJhfl5vdxp4", title: "The Shape Song #1", channel: "Super Simple Songs" },
      { id: "Asb8N0nz9OI", title: "I See Something Pink (Colors Song)", channel: "Super Simple Songs" }
    ]
  },
  science: {
    title: "Science & Nature",
    icon: "🔬",
    color: "#8A6FD4",
    videos: [
      { id: "XtSq1wcFSEI", title: "Your Body's Senses", channel: "SciShow Kids" },
      { id: "RvRU_4XWPlw", title: "Solving Problems Around the Fort!", channel: "SciShow Kids" },
      { id: "4VinwOQkHGg", title: "The Yuckiest Animals", channel: "SciShow Kids" }
    ]
  },
  animals: {
    title: "Amazing Animals",
    icon: "🦁",
    color: "#6BCB77",
    videos: [
      { id: "eUunYTYia3I", title: "Amazing Animals (Compilation)", channel: "National Geographic Kids" }
    ]
  },
  habits: {
    title: "Healthy Habits",
    icon: "🪥",
    color: "#FF9F45",
    videos: [
      { id: "lv7vZoR5zAI", title: "Brushy Brush Song (Animated)", channel: "Sesame Street" }
    ]
  }
};

/* Emoji pools reused by the mini-games (kept separate from GK content) */
const GAME_EMOJI = {
  memory: ["🍎","🐶","🚗","⭐","🎈","🐝","🌈","🍕","🐬","🦋","🎁","🍩","🐸","🚀","🌸","🍉","🐼","🦄"],
  oddOne: ["🍎","🐶","🚗","⭐","🎈","🐝","🌈","🍕","🐬","🦋","🎁","🍩","🐸","🚀","🌸","🍉","🐼","🦄","🐨","🐝"],
  sortShapes: ["🔴","🟦","🔺","🟢","🟨","🟣","⭐","🟠"],
  countObjects: ["🍎","🐶","⭐","🎈","🐝","🌸","🍩","🦋"]
};

/* ===================================================================
   LEVEL PROGRESSIONS
   Every leveled game climbs from ages ~4 to ~10 across 10 stages, so a
   kid always has a next, slightly-harder level to reach for instead of
   replaying the same difficulty.
   =================================================================== */

const MEMORY_LEVELS = [
  { pairs: 3,  cols: 3, timeLimit: null, ages: "4-5" },
  { pairs: 4,  cols: 4, timeLimit: null, ages: "4-5" },
  { pairs: 5,  cols: 4, timeLimit: null, ages: "5-6" },
  { pairs: 6,  cols: 4, timeLimit: 70,   ages: "5-6" },
  { pairs: 6,  cols: 4, timeLimit: 50,   ages: "6-7" },
  { pairs: 8,  cols: 4, timeLimit: 80,   ages: "6-7" },
  { pairs: 8,  cols: 4, timeLimit: 60,   ages: "7-8" },
  { pairs: 10, cols: 5, timeLimit: 90,   ages: "7-8" },
  { pairs: 10, cols: 5, timeLimit: 70,   ages: "8-9" },
  { pairs: 12, cols: 6, timeLimit: 100,  ages: "9-10" }
];

const ODD_LEVELS = [
  { size: 3, rounds: 6,  timeLimit: null, ages: "4-5" },
  { size: 3, rounds: 8,  timeLimit: null, ages: "4-5" },
  { size: 4, rounds: 8,  timeLimit: null, ages: "5-6" },
  { size: 4, rounds: 8,  timeLimit: 12,   ages: "5-6" },
  { size: 4, rounds: 10, timeLimit: 10,   ages: "6-7" },
  { size: 5, rounds: 10, timeLimit: 10,   ages: "6-7" },
  { size: 5, rounds: 10, timeLimit: 8,    ages: "7-8" },
  { size: 5, rounds: 12, timeLimit: 7,    ages: "7-8" },
  { size: 6, rounds: 12, timeLimit: 7,    ages: "8-9" },
  { size: 6, rounds: 14, timeLimit: 6,    ages: "9-10" }
];

const SORT_LEVELS = [
  { pieces: 3, timeLimit: null, ages: "4-5" },
  { pieces: 4, timeLimit: null, ages: "4-5" },
  { pieces: 5, timeLimit: null, ages: "5-6" },
  { pieces: 5, timeLimit: 45,   ages: "5-6" },
  { pieces: 6, timeLimit: 45,   ages: "6-7" },
  { pieces: 6, timeLimit: 35,   ages: "6-7" },
  { pieces: 7, timeLimit: 40,   ages: "7-8" },
  { pieces: 7, timeLimit: 30,   ages: "7-8" },
  { pieces: 8, timeLimit: 35,   ages: "8-9" },
  { pieces: 8, timeLimit: 25,   ages: "9-10" }
];

/* Count & Tap doubles as an early bridge into visual math: later levels
   show simple addition/subtraction/multiplication scenes instead of a
   flat count. */
const COUNT_LEVELS = [
  { mode: "count", max: 5,  ages: "3-4" },
  { mode: "count", max: 10, ages: "4-5" },
  { mode: "count", max: 15, ages: "5-6" },
  { mode: "add",   max: 10, ages: "5-6" },
  { mode: "add",   max: 20, ages: "6-7" },
  { mode: "sub",   max: 15, ages: "6-7" },
  { mode: "sub",   max: 20, ages: "7-8" },
  { mode: "mult",  max: 5,  ages: "7-8" },
  { mode: "mixed", max: 30, ages: "8-9" },
  { mode: "mixed", max: 50, ages: "9-10" }
];

/* Math Quiz: real arithmetic, climbing from counting up to two-step
   word problems. Each level's `gen` returns { text, answer }. */
const MATH_LEVELS = [
  { label: "Adding to 5",        ages: "4-5",  gen: () => genArith(1, 4, "+") },
  { label: "Adding to 10",       ages: "5-6",  gen: () => genArith(1, 9, "+") },
  { label: "Subtracting to 10",  ages: "5-6",  gen: () => genArith(1, 10, "-") },
  { label: "Add & Subtract 20",  ages: "6-7",  gen: () => genArith(1, 20, Math.random() < 0.5 ? "+" : "-") },
  { label: "Times Tables 2-5",   ages: "7-8",  gen: () => genMult(2, 5) },
  { label: "Times Tables 2-10",  ages: "7-8",  gen: () => genMult(2, 10) },
  { label: "Simple Division",    ages: "8-9",  gen: () => genDiv(2, 10) },
  { label: "Mixed Up to 50",     ages: "8-9",  gen: () => genMixed(50) },
  { label: "Word Problems",      ages: "9-10", gen: () => genWordProblem(20) },
  { label: "Big Word Problems",  ages: "9-10", gen: () => genWordProblem(100) }
];

function genArith(min, max, op){
  let a = randInt(min, max), b = randInt(min, max);
  if (op === "-" && b > a) [a, b] = [b, a];
  const answer = op === "+" ? a + b : a - b;
  return { text: `${a} ${op} ${b} = ?`, answer };
}
function genMult(min, max){
  const a = randInt(min, max), b = randInt(2, 10);
  return { text: `${a} × ${b} = ?`, answer: a * b };
}
function genDiv(min, max){
  const b = randInt(2, max);
  const answer = randInt(1, 10);
  const a = b * answer;
  return { text: `${a} ÷ ${b} = ?`, answer };
}
function genMixed(cap){
  const ops = ["+", "-", "×"];
  const op = ops[randInt(0, 2)];
  if (op === "×"){
    const a = randInt(2, 9), b = randInt(2, 9);
    return { text: `${a} × ${b} = ?`, answer: a * b };
  }
  let a = randInt(1, cap), b = randInt(1, cap);
  if (op === "-" && b > a) [a, b] = [b, a];
  return { text: `${a} ${op} ${b} = ?`, answer: op === "+" ? a + b : a - b };
}
const WORD_PROBLEM_NAMES = ["Sam","Mia","Leo","Zara","Omar","Ava","Ravi","Elle"];
const WORD_PROBLEM_ITEMS = ["apples","stickers","marbles","coins","balloons","crayons","toy cars","cookies"];
function genWordProblem(cap){
  const name = WORD_PROBLEM_NAMES[randInt(0, WORD_PROBLEM_NAMES.length - 1)];
  const item = WORD_PROBLEM_ITEMS[randInt(0, WORD_PROBLEM_ITEMS.length - 1)];
  const templates = [
    () => {
      const a = randInt(5, cap), b = randInt(1, Math.min(a, cap));
      return { text: `${name} has ${a} ${item}. ${name} gives away ${b}. How many are left?`, answer: a - b };
    },
    () => {
      const a = randInt(1, cap / 2), b = randInt(1, cap / 2);
      return { text: `${name} has ${a} ${item} and finds ${b} more. How many ${item} now?`, answer: a + b };
    },
    () => {
      const groups = randInt(2, 5), each = randInt(2, Math.max(2, Math.floor(cap / groups)));
      return { text: `${name} has ${groups} bags with ${each} ${item} in each. How many ${item} in total?`, answer: groups * each };
    }
  ];
  return templates[randInt(0, templates.length - 1)]();
}

/* Number Patterns: fill in the missing number in a sequence. Each level
   returns a full sequence array plus the index that should be blanked. */
const SEQUENCE_LEVELS = [
  { label: "Counting by 1s (to 10)",  ages: "4-5",  gen: () => genSequence(1, 1, 1, 10) },
  { label: "Counting by 1s (to 20)",  ages: "5-6",  gen: () => genSequence(1, 1, 1, 20) },
  { label: "Counting by 2s",          ages: "5-6",  gen: () => genSequence(2, 2, 0, 20) },
  { label: "Counting by 5s",          ages: "6-7",  gen: () => genSequence(5, 5, 0, 50) },
  { label: "Counting by 10s",         ages: "6-7",  gen: () => genSequence(10, 10, 0, 100) },
  { label: "Counting Down",           ages: "7-8",  gen: () => genSequence(-1, -1, 5, 20) },
  { label: "Skip Counting by 3s",     ages: "7-8",  gen: () => genSequence(3, 3, 0, 30) },
  { label: "Skip Counting by 4s",     ages: "8-9",  gen: () => genSequence(4, 4, 0, 40) },
  { label: "Doubling Patterns",       ages: "8-9",  gen: () => genSequenceMult(2, 1, 6) },
  { label: "Mixed Patterns",          ages: "9-10", gen: () => genSequenceMixed() }
];
function genSequence(stepMin, stepMax, min, max){
  const step = randInt(stepMin, stepMax);
  const len = 5;
  const maxStart = Math.max(min, max - step * (len - 1));
  const start = randInt(min, Math.max(min, maxStart));
  const seq = Array.from({ length: len }, (_, i) => start + step * i);
  const blankIndex = randInt(1, len - 2);
  return { seq, blankIndex, answer: seq[blankIndex] };
}
function genSequenceMult(factor, start, len){
  const seq = [start];
  for (let i = 1; i < len; i++) seq.push(seq[i - 1] * factor);
  const blankIndex = randInt(1, len - 2);
  return { seq, blankIndex, answer: seq[blankIndex] };
}
function genSequenceMixed(){
  const step = randInt(2, 6);
  const start = randInt(1, 10);
  const len = 5;
  const seq = Array.from({ length: len }, (_, i) => start + step * i);
  const blankIndex = randInt(2, len - 2);
  return { seq, blankIndex, answer: seq[blankIndex] };
}

/* Word Scramble: 10 word banks climbing from 3-letter to tricky
   GK-flavoured vocabulary. */
const WORD_LEVELS = [
  { ages: "4-5",  words: ["CAT","DOG","SUN","HAT","BAT","CUP","BUS","BOX"] },
  { ages: "4-5",  words: ["FROG","LION","STAR","FISH","MOON","DUCK","CAKE"] },
  { ages: "5-6",  words: ["TIGER","ZEBRA","HAPPY","APPLE","HOUSE","WATER"] },
  { ages: "5-6",  words: ["ROCKET","RABBIT","YELLOW","PLANET","GARDEN"] },
  { ages: "6-7",  words: ["ELEPHANT","DINOSAUR","RAINBOW","BICYCLE"] },
  { ages: "6-7",  words: ["PENGUIN","CRAYON","JUNGLE","OCTOPUS"] },
  { ages: "7-8",  words: ["ASTRONAUT","TELESCOPE","VOLCANO","CONTINENT"] },
  { ages: "7-8",  words: ["DICTIONARY","CALCULATOR","MOUNTAIN"] },
  { ages: "8-9",  words: ["TEMPERATURE","MULTIPLY","LIBRARY","SCIENTIST"] },
  { ages: "9-10", words: ["MULTIPLICATION","GEOGRAPHY","MICROSCOPE"] }
];

/* ===================================================================
   TELLING TIME — 10 levels, analog clock rendered live in JS/CSS.
   Levels 1-7 ask "what time is it?"; 8-10 ask elapsed-time questions.
   =================================================================== */
const TIME_LEVELS = [
  { label: "O'Clock",          ages: "4-5",  genMinute: () => 0 },
  { label: "Half Past",        ages: "5-6",  genMinute: () => [0, 30][randInt(0, 1)] },
  { label: "Quarter Hours",    ages: "6-7",  genMinute: () => [0, 15, 30, 45][randInt(0, 3)] },
  { label: "Five Minutes",     ages: "6-7",  genMinute: () => randInt(0, 11) * 5 },
  { label: "Five Minutes II",  ages: "7-8",  genMinute: () => randInt(0, 11) * 5 },
  { label: "Any Minute",       ages: "7-8",  genMinute: () => randInt(0, 59) },
  { label: "Any Minute II",    ages: "8-9",  genMinute: () => randInt(0, 59) },
  { label: "Elapsed Time",     ages: "8-9",  elapsed: true, deltas: [15, 30, 45] },
  { label: "Elapsed Time II",  ages: "9-10", elapsed: true, deltas: [30, 45, 60, 90] },
  { label: "Time Word Problems", ages: "9-10", elapsed: true, deltas: [45, 60, 90, 120] }
];
function formatClockTime(hour12, minute){
  const h = hour12 === 0 ? 12 : hour12;
  return `${h}:${String(minute).padStart(2, "0")}`;
}
function buildTimeChoices(hour12, minute){
  const correct = formatClockTime(hour12, minute);
  const choices = new Set([correct]);
  let guard = 0;
  while (choices.size < 4 && guard < 40){
    const dm = [5, 10, 15, 30, -5, -10, -15, -30][randInt(0, 7)];
    let total = ((hour12 % 12) * 60 + minute + dm + 720) % 720;
    let h = Math.floor(total / 60), m = total % 60;
    choices.add(formatClockTime(h, m));
    guard++;
  }
  return shuffle([...choices]);
}

/* ===================================================================
   COIN COUNTING — 10 levels. Coins are rendered as styled circles
   (not emoji, since there's no distinct penny/nickel/dime emoji).
   =================================================================== */
const MONEY_LEVELS = [
  { label: "Pennies",                  ages: "4-5",  coins: [1],            count: [2, 6] },
  { label: "Nickels",                  ages: "5-6",  coins: [5],            count: [1, 5] },
  { label: "Dimes",                    ages: "5-6",  coins: [10],           count: [1, 5] },
  { label: "Pennies & Nickels",        ages: "6-7",  coins: [1, 5],         count: [2, 5] },
  { label: "Nickels & Dimes",          ages: "6-7",  coins: [5, 10],        count: [2, 5] },
  { label: "Pennies, Nickels & Dimes", ages: "7-8",  coins: [1, 5, 10],     count: [3, 6] },
  { label: "Quarters",                 ages: "7-8",  coins: [25],           count: [1, 4] },
  { label: "All Coins",                ages: "8-9",  coins: [1, 5, 10, 25], count: [3, 6] },
  { label: "All Coins II",             ages: "8-9",  coins: [1, 5, 10, 25], count: [4, 7] },
  { label: "Big Totals",               ages: "9-10", coins: [1, 5, 10, 25], count: [5, 8] }
];
const COIN_LABELS = { 1: "1¢", 5: "5¢", 10: "10¢", 25: "25¢" };
const COIN_COLORS = { 1: "#C77B3F", 5: "#B9BEC5", 10: "#D9DCE1", 25: "#C9CDD3" };
function formatMoney(cents){
  return cents < 100 ? `${cents}¢` : `$${(cents / 100).toFixed(2)}`;
}

/* ===================================================================
   LETTER & NUMBER TRACING — a free-practice deck, not a scored level
   ladder. Kids pick any character and trace it on a canvas.
   =================================================================== */
const TRACE_ITEMS = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  ..."0123456789".split("")
];

/* ===================================================================
   BADGES — checked against a snapshot of stats/levels/streak/stars.
   See Badges.checkAll() in progress.js.
   =================================================================== */
const BADGES = [
  { id: "first_steps",   icon: "🌱", name: "First Steps",   desc: "Complete your first game",        check: s => s.gamesPlayed >= 1 },
  { id: "perfect_round",  icon: "🌟", name: "Perfect Round", desc: "Earn 3 stars on any level",       check: s => s.hasPerfectStars },
  { id: "bookworm",       icon: "📚", name: "Bookworm",      desc: "Browse 5 flashcard decks",        check: s => s.decksBrowsed.length >= 5 },
  { id: "math_whiz",      icon: "🧮", name: "Math Whiz",     desc: "Reach Math Quiz level 5",         check: s => (s.levels.math?.unlocked || 1) >= 5 },
  { id: "word_wizard",    icon: "🔤", name: "Word Wizard",   desc: "Reach Word Scramble level 3",     check: s => (s.levels.scramble?.unlocked || 1) >= 3 },
  { id: "clock_master",   icon: "🕐", name: "Clock Master",  desc: "Reach Telling Time level 5",      check: s => (s.levels.time?.unlocked || 1) >= 5 },
  { id: "money_smart",    icon: "💰", name: "Money Smart",   desc: "Reach Coin Counting level 5",     check: s => (s.levels.money?.unlocked || 1) >= 5 },
  { id: "little_artist",  icon: "🎨", name: "Little Artist", desc: "Trace 10 letters or numbers",     check: s => s.tracedCount >= 10 },
  { id: "puzzle_master",  icon: "🧩", name: "Puzzle Master",  desc: "Reach Shadow Match level 5",      check: s => (s.levels.shadow?.unlocked || 1) >= 5 },
  { id: "streak_3",       icon: "🔥", name: "3-Day Streak",  desc: "Play 3 days in a row",            check: s => s.streak >= 3 },
  { id: "streak_7",       icon: "🔥", name: "Week Streak",   desc: "Play 7 days in a row",            check: s => s.streak >= 7 },
  { id: "star_collector", icon: "⭐", name: "Star Collector", desc: "Earn 50 stars total",             check: s => s.totalStars >= 50 },
  { id: "star_master",    icon: "💫", name: "Star Master",   desc: "Earn 150 stars total",            check: s => s.totalStars >= 150 }
];

/* Home-screen garden that grows with total stars. */
const GARDEN_STAGES = [
  { min: 0,   emoji: "🌰", label: "A Tiny Seed" },
  { min: 10,  emoji: "🌱", label: "A Little Sprout" },
  { min: 30,  emoji: "🌿", label: "A Growing Seedling" },
  { min: 60,  emoji: "🌳", label: "A Young Tree" },
  { min: 100, emoji: "🌸", label: "A Blooming Tree" },
  { min: 150, emoji: "🌺", label: "A Garden in Full Bloom" },
  { min: 220, emoji: "🌈", label: "A Magical Garden!" }
];

/* ===================================================================
   PROFILES — avatar choices offered when creating/editing a profile.
   =================================================================== */
const AVATAR_OPTIONS = [
  { id: "fox",    emoji: "🦊", color: "#FF9F45" },
  { id: "bear",   emoji: "🐻", color: "#C77B3F" },
  { id: "bunny",  emoji: "🐰", color: "#FF6FA5" },
  { id: "cat",    emoji: "🐱", color: "#9B72CF" },
  { id: "dog",    emoji: "🐶", color: "#4EC5F1" },
  { id: "unicorn",emoji: "🦄", color: "#FFC93C" },
  { id: "panda",  emoji: "🐼", color: "#6BCB77" },
  { id: "lion",   emoji: "🦁", color: "#E0A030" }
];

/* ===================================================================
   ZIGGY'S SHOP — spend stars to customize the mascot. Colors change
   the star's fill; accessories layer an emoji on top. Everyone starts
   owning the free defaults.
   =================================================================== */
const SHOP_ITEMS = [
  { id: "color_gold",    type: "color", name: "Classic Gold", value: "#FFC93C",                                   cost: 0  },
  { id: "color_pink",    type: "color", name: "Bubblegum",    value: "#FF6FA5",                                   cost: 15 },
  { id: "color_sky",     type: "color", name: "Sky Blue",     value: "#4EC5F1",                                   cost: 15 },
  { id: "color_green",   type: "color", name: "Mint",         value: "#6BCB77",                                   cost: 15 },
  { id: "color_purple",  type: "color", name: "Grape",        value: "#9B72CF",                                   cost: 20 },
  { id: "color_rainbow", type: "color", name: "Rainbow",      value: "linear-gradient(135deg,#FF6FA5,#FFC93C,#4EC5F1,#6BCB77)", cost: 60 },
  { id: "acc_none",    type: "accessory", name: "No Accessory", emoji: "",   cost: 0  },
  { id: "acc_bow",     type: "accessory", name: "Bow Tie",      emoji: "🎀", cost: 25 },
  { id: "acc_glasses", type: "accessory", name: "Cool Shades",  emoji: "🕶️", cost: 30 },
  { id: "acc_hat",     type: "accessory", name: "Top Hat",      emoji: "🎩", cost: 35 },
  { id: "acc_crown",   type: "accessory", name: "Crown",        emoji: "👑", cost: 80 }
];

/* ===================================================================
   SHADOW MATCH — a jigsaw-style spatial puzzle without needing image
   assets: emoji rendered with a CSS filter become solid silhouettes,
   and kids match each colorful object to its correct shadow.
   =================================================================== */
const SHADOW_LEVELS = [
  { pairs: 3, timeLimit: null, ages: "4-5" },
  { pairs: 4, timeLimit: null, ages: "4-5" },
  { pairs: 5, timeLimit: null, ages: "5-6" },
  { pairs: 5, timeLimit: 50,   ages: "5-6" },
  { pairs: 6, timeLimit: 50,   ages: "6-7" },
  { pairs: 6, timeLimit: 40,   ages: "6-7" },
  { pairs: 7, timeLimit: 45,   ages: "7-8" },
  { pairs: 7, timeLimit: 35,   ages: "7-8" },
  { pairs: 8, timeLimit: 40,   ages: "8-9" },
  { pairs: 8, timeLimit: 30,   ages: "9-10" }
];
GAME_EMOJI.shadowItems = ["🐶","🐱","🐰","🦋","🌳","🚗","✈️","⚽","🎈","🌟","🐦","🌵","🏠","🎸","🐢","🍄"];

/* Feelings — a social-emotional-learning deck. */
FLASHCARD_DECKS.feelings = {
  title: "My Feelings",
  icon: "🥰",
  color: "#FF9AC1",
  cards: [
    { q: "😀", a: "Happy",     fact: "Happy is how you feel when something makes you smile." },
    { q: "😢", a: "Sad",       fact: "It's okay to feel sad sometimes — talking about it helps." },
    { q: "😠", a: "Angry",     fact: "Taking deep breaths can help when you feel angry." },
    { q: "😨", a: "Scared",    fact: "Everyone feels scared sometimes — a hug can help!" },
    { q: "😲", a: "Surprised", fact: "Surprised is how you feel when something unexpected happens." },
    { q: "😴", a: "Tired",     fact: "Your body tells you it's tired when it needs rest." },
    { q: "🥰", a: "Loved",     fact: "Feeling loved makes your heart feel warm and happy." },
    { q: "😕", a: "Confused",  fact: "It's okay to ask questions when you feel confused." },
    { q: "😌", a: "Calm",      fact: "Calm is a peaceful, relaxed feeling." },
    { q: "🤗", a: "Proud",     fact: "You feel proud when you've done something great!" }
  ]
};
