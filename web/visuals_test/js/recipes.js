/* Recipes: sub-tabs (What I Have / Recently Bought / My Recipes) and recipe cards. */

// Each recipe: [emoji, name, time, price per serving, diet tags, image color class, match label]
const recipeSets = {
  have: {
    strip: `<b>In your kitchen:</b> <span class="pill">🍚 Rice</span><span class="pill">🥚 Eggs</span><span class="pill">🥬 Spinach</span><span class="pill">🍗 Chicken</span><span class="pill">🧄 Garlic</span><span class="pill">🍅 Tomatoes</span><a class="btn sm ghost" style="margin-left:auto" href="#">Edit pantry</a>`,
    list: [
      ["🍳", "Spinach & egg fried rice", "15 min", "$1.80", ["Vegetarian", "High protein"], "bg1", "Have 5/5"],
      ["🍝", "Garlic spinach pasta", "20 min", "$2.10", ["Vegetarian"], "bg2", "Have 4/5"],
      ["🍗", "Lemon garlic chicken", "30 min", "$3.40", ["High protein", "Gluten-free"], "bg3", "Have 4/6"],
      ["🍅", "Shakshuka", "25 min", "$2.25", ["Vegetarian", "Gluten-free"], "bg4", "Have 5/6"],
      ["🥘", "Chicken & rice skillet", "35 min", "$2.90", ["High protein"], "bg5", "Have 5/7"],
      ["🥗", "Warm spinach salad", "10 min", "$1.60", ["Vegan", "Under 20 min"], "bg6", "Have 3/4"],
    ],
  },
  recent: {
    strip: `<b>Bought in the last 7 days:</b> <span class="pill">🥑 Avocados · Mon</span><span class="pill">🧀 Cheddar · Mon</span><span class="pill">🫘 Black beans · Sat</span><span class="pill">🥩 Ground beef · Sat</span>`,
    list: [
      ["🌮", "Beef & bean tacos", "20 min", "$2.60", ["High protein"], "bg3", "Uses 3 recent"],
      ["🥑", "Avocado toast + egg", "10 min", "$1.90", ["Vegetarian", "Under 20 min"], "bg6", "Uses 1 recent"],
      ["🧀", "Cheesy bean quesadillas", "15 min", "$1.70", ["Vegetarian"], "bg2", "Uses 2 recent"],
      ["🍲", "Beef chili", "45 min", "$2.80", ["High protein", "Gluten-free"], "bg5", "Uses 3 recent"],
      ["🥙", "Burrito bowls", "25 min", "$2.40", ["Gluten-free"], "bg1", "Uses 4 recent"],
    ],
  },
  mine: {
    strip: `<b>Your saved &amp; created recipes</b> <span class="pill">❤️ 4 favorites</span><span class="pill">✍️ 2 created</span>`,
    list: [
      ["🥣", "Mom's overnight oats", "5 min", "$0.90", ["Vegetarian", "Under 20 min"], "bg2", "Created by you"],
      ["🍛", "Dorm chickpea curry", "30 min", "$1.95", ["Vegan", "Gluten-free"], "bg5", "Saved"],
      ["🍜", "Veggie fried rice", "15 min", "$1.50", ["Vegetarian"], "bg1", "Saved"],
      ["🍕", "Tortilla pizzas", "15 min", "$2.00", ["Vegetarian"], "bg3", "Created by you"],
      "add",
    ],
  },
};

function recipeCard(r, saved) {
  return `<div class="card hover recipe">
    <div class="img ${r[5]}">${r[0]}<span class="badge">${r[3]} / serving</span><button class="fav ${saved ? "on" : ""}" aria-label="Save"><svg class="icon" style="width:18px;height:18px"><use href="#i-heart"/></svg></button></div>
    <div class="body">
      <span class="match">${r[6]}</span>
      <h3>${r[1]}</h3>
      <div class="info"><span><svg class="icon"><use href="#i-clock"/></svg>${r[2]}</span><span><svg class="icon"><use href="#i-users"/></svg>2 servings</span></div>
      <div class="tags">${r[4].map(t => `<span class="tag">${t}</span>`).join("")}</div>
    </div>
  </div>`;
}

const addCard = `<div class="card add-card hover" data-toast="Recipe editor would open here"><div><span class="plus">＋</span>Add your own recipe</div></div>`;

function renderRecipes(key) {
  const set = recipeSets[key];
  document.getElementById("recStrip").innerHTML = set.strip;
  document.getElementById("recipes").innerHTML = set.list
    .map(r => r === "add" ? addCard : recipeCard(r, key === "mine"))
    .join("");
}

document.getElementById("recTabs").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  document.querySelectorAll("#recTabs button").forEach(x => x.classList.toggle("active", x === b));
  renderRecipes(b.dataset.r);
});

document.getElementById("recipes").addEventListener("click", e => {
  const fav = e.target.closest(".fav");
  if (fav) fav.classList.toggle("on");
});

renderRecipes("have");
