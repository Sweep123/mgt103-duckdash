/* Meal Planner: builds the days × meals calendar from sample data. */

const days = [["Mon", 9], ["Tue", 10], ["Wed", 11], ["Thu", 12], ["Fri", 13], ["Sat", 14], ["Sun", 15]];
const meals = [["Breakfast", "☀️"], ["Lunch", "🥪"], ["Dinner", "🌙"]];
const TODAY = 1; // Tuesday is highlighted

// Key is "dayIndex-mealIndex": [emoji, name, time, color class]
const plan = {
  "0-0": ["🥣", "Overnight oats", "5 min", "c2"], "0-2": ["🌯", "Chicken burrito bowl", "25 min", "c1"],
  "1-0": ["🍳", "Spinach egg scramble", "10 min", "c1"], "1-1": ["🥗", "Leftover burrito bowl", "0 min", "c4"], "1-2": ["🍝", "Garlic spinach pasta", "20 min", "c3"],
  "2-1": ["🥪", "Turkey wrap", "5 min", "c2"], "2-2": ["🍛", "Chickpea curry", "30 min", "c5"],
  "3-0": ["🥣", "Overnight oats", "5 min", "c2"], "3-2": ["🍗", "Sheet-pan chicken", "35 min", "c1"],
  "4-1": ["🍛", "Curry leftovers", "0 min", "c4"], "4-2": ["🍕", "Tortilla pizzas", "15 min", "c3"],
  "5-0": ["🥞", "Banana pancakes", "15 min", "c2"], "5-2": ["🌮", "Beef tacos", "20 min", "c5"],
  "6-1": ["🍜", "Veggie fried rice", "15 min", "c1"],
};

let html = `<div></div>` + days.map(([d, n], i) =>
  `<div class="hd ${i === TODAY ? "today" : ""}">${d}<small>Nov ${n}</small></div>`).join("");

meals.forEach(([meal, emoji], mi) => {
  html += `<div class="meal">${emoji} ${meal}</div>`;
  days.forEach((_, di) => {
    const r = plan[di + "-" + mi];
    html += r
      ? `<div class="slot"><div class="rc ${r[3]}"><span class="e">${r[0]}</span><b>${r[1]}</b><small>⏱ ${r[2]}</small></div></div>`
      : `<div class="slot empty" title="Add a recipe" data-toast="Recipe picker would open here">+</div>`;
  });
});

document.getElementById("cal").innerHTML = html;
