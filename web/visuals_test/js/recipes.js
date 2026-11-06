/* Recipes: sub-tabs (What I Have / Recently Bought / My Recipes) and recipe cards.
 * The first recipe in each tab is shown as a bigger "featured" card. */

const pantryTag = (ic, label) => `<span class="tag">${icon(ic)}${label}</span>`;

const recipeSets = {
  have: {
    strip: `<b>In your kitchen:</b>
      ${pantryTag("wheat", "Rice")}${pantryTag("egg", "Eggs")}${pantryTag("leafy-green", "Spinach")}
      ${pantryTag("drumstick", "Chicken thighs")}${pantryTag("cherry", "Grape tomatoes")}${pantryTag("sprout", "Garlic")}
      <a class="link-arrow" href="#">Edit pantry ${icon("arrow-right", "ic-sm")}</a>`,
    list: [
      { icon: "egg-fried", tint: "c1", name: "Egg fried rice with spinach", time: "15 min", cost: "$1.84", tags: ["Vegetarian", "22g protein"], match: "Uses 5 of 5 things you have", cooked: 41,
        desc: "Day-old rice works way better than fresh. Push it to the side, crack two eggs in, then throw the spinach on at the very end." },
      { icon: "utensils", tint: "c3", name: "Garlic spinach pasta", time: "20 min", cost: "$2.07", tags: ["Vegetarian"], match: "Uses 3 of 4", cooked: 28 },
      { icon: "drumstick", tint: "c2", name: "Lemon garlic chicken thighs", time: "35 min", cost: "$2.93", tags: ["34g protein", "Gluten-free"], match: "Uses 3 of 5", cooked: 19 },
      { icon: "cooking-pot", tint: "c5", name: "Shakshuka", time: "25 min", cost: "$2.21", tags: ["Vegetarian"], match: "Uses 3 of 6", cooked: 12 },
      { icon: "salad", tint: "c4", name: "Wilted spinach salad + egg", time: "10 min", cost: "$1.57", tags: ["Vegetarian", "Under 20 min"], match: "Uses 3 of 4", cooked: 7 },
    ],
  },
  recent: {
    strip: `<b>Bought this week:</b>
      ${pantryTag("beef", "Ground beef · Sat")}${pantryTag("bean", "Black beans · Sat")}
      ${pantryTag("banana", "Bananas · Thu")}${pantryTag("pizza", "Mozzarella · Thu")}`,
    list: [
      { icon: "beef", tint: "c2", name: "Beef & black bean tacos", time: "20 min", cost: "$2.62", tags: ["31g protein"], match: "Uses 2 things from Saturday", cooked: 36,
        desc: "One pound of beef plus a can of beans makes eight tacos. Freeze half the filling for next week." },
      { icon: "croissant", tint: "c5", name: "Banana oat pancakes", time: "15 min", cost: "$0.94", tags: ["Vegetarian"], match: "Uses your bananas", cooked: 22 },
      { icon: "pizza", tint: "c3", name: "Cheesy bean quesadillas", time: "12 min", cost: "$1.71", tags: ["Vegetarian", "Under 20 min"], match: "Uses 2 recent", cooked: 17 },
      { icon: "soup", tint: "c1", name: "Beef chili (makes 4)", time: "50 min", cost: "$2.38", tags: ["28g protein", "Gluten-free"], match: "Uses 2 recent", cooked: 9 },
    ],
  },
  mine: {
    strip: `<b>Saved and written by you</b> · 3 saved · 2 of your own`,
    list: [
      { icon: "milk", tint: "c2", name: "Mom's overnight oats", time: "5 min", cost: "$0.87", tags: ["Vegetarian", "No stove"], match: "Written by you", cooked: 14, saved: true,
        desc: "Half cup oats, half cup milk, spoon of yogurt, banana on top. Make three jars on Sunday night." },
      { icon: "cooking-pot", tint: "c5", name: "Dorm chickpea curry", time: "30 min", cost: "$1.93", tags: ["Vegan"], match: "Saved from Priya S.", cooked: 53, saved: true },
      { icon: "egg-fried", tint: "c1", name: "Egg fried rice", time: "15 min", cost: "$1.47", tags: ["Vegetarian"], match: "Saved", cooked: 41, saved: true },
      { icon: "pizza", tint: "c3", name: "Tortilla pizzas", time: "15 min", cost: "$1.98", tags: ["Vegetarian"], match: "Written by you", cooked: 6, saved: true },
      "add",
    ],
  },
};

function recipeCard(r, featured) {
  return `<article class="card hover recipe${featured ? " featured" : ""}">
    <div class="img ${r.tint}">
      <span class="plate">${icon(r.icon)}</span>
      <span class="badge">${r.cost} a serving</span>
      <button class="fav ${r.saved ? "on" : ""}" aria-label="Save">${icon("bookmark")}</button>
    </div>
    <div class="body">
      <span class="match">${r.match}</span>
      <h3>${r.name}</h3>
      ${featured && r.desc ? `<p class="desc">${r.desc}</p>` : ""}
      <div class="info"><span>${icon("clock")}${r.time}</span><span>${icon("flame")}cooked ${r.cooked}× this month</span></div>
      <div class="tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      ${featured ? `<button class="btn sm" style="align-self:flex-start;margin-top:6px" data-toast="Added to Wednesday dinner (prototype)">Add to my planner</button>` : ""}
    </div>
  </article>`;
}

const addCard = `<div class="card add-card" data-toast="Recipe editor would open here"><div>${icon("plus")}Write down a recipe</div></div>`;

function renderRecipes(key) {
  const set = recipeSets[key];
  document.getElementById("recStrip").innerHTML = set.strip;
  document.getElementById("recipes").innerHTML = set.list
    .map((r, i) => r === "add" ? addCard : recipeCard(r, i === 0))
    .join("");
  refreshIcons();
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
