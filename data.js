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
  }
};

/* Emoji pools reused by the mini-games (kept separate from GK content) */
const GAME_EMOJI = {
  memory: ["🍎","🐶","🚗","⭐","🎈","🐝","🌈","🍕","🐬","🦋","🎁","🍩","🐸","🚀","🌸","🍉","🐼","🦄"],
  oddOne: ["🍎","🐶","🚗","⭐","🎈","🐝","🌈","🍕","🐬","🦋","🎁","🍩","🐸","🚀","🌸","🍉","🐼","🦄","🐨","🐝"],
  sortShapes: ["🔴","🟦","🔺","🟢","🟨","🟣","⭐","🟠"],
  countObjects: ["🍎","🐶","⭐","🎈","🐝","🌸","🍩","🦋"]
};
