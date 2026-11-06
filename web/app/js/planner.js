/*
 * Meal Planner
 * - Main view shows 3 days at a time; arrows move 3 days, "Today" jumps back.
 * - "Calendar view" opens a popup with a Week view or a 4-week view.
 *   Clicking any day there jumps the 3-day view to that day.
 * All data is placeholder.
 */

const START = new Date(2026, 10, 2); // Mon, Nov 2 2026 = day 0
const TOTAL_DAYS = 56;               // 8 weeks of placeholder data
const TODAY = 8;                     // Tue, Nov 10
const meals = [["Breakfast", "☀️"], ["Lunch", "🥪"], ["Dinner", "🌙"]];

// name: [emoji, cook time, color class, cost per serving]
const RECIPES = {
  "Overnight oats": ["🥣", "5 min", "c2", "$0.90"],
  "Spinach egg scramble": ["🍳", "10 min", "c1", "$1.40"],
  "Chicken burrito bowl": ["🌯", "25 min", "c1", "$2.40"],
  "Garlic spinach pasta": ["🍝", "20 min", "c3", "$2.10"],
  "Chickpea curry": ["🍛", "30 min", "c5", "$1.95"],
  "Turkey wrap": ["🥪", "5 min", "c2", "$2.20"],
  "Sheet-pan chicken": ["🍗", "35 min", "c1", "$3.10"],
  "Tortilla pizzas": ["🍕", "15 min", "c3", "$2.00"],
  "Banana pancakes": ["🥞", "15 min", "c2", "$1.10"],
  "Beef tacos": ["🌮", "20 min", "c5", "$2.60"],
  "Veggie fried rice": ["🍜", "15 min", "c1", "$1.50"],
  "Beef chili": ["🍲", "45 min", "c5", "$2.80"],
  "Leftover burrito bowl": ["🥗", "0 min", "c4", "$0.00"],
  "Curry leftovers": ["🍛", "0 min", "c4", "$0.00"],
};

// Hand-placed meals for the current week (Nov 9–15). Key = "day-meal".
const FIXED = {
  "7-0": "Overnight oats", "7-2": "Chicken burrito bowl",
  "8-0": "Spinach egg scramble", "8-1": "Leftover burrito bowl", "8-2": "Garlic spinach pasta",
  "9-1": "Turkey wrap", "9-2": "Chickpea curry",
  "10-0": "Overnight oats", "10-2": "Sheet-pan chicken",
  "11-1": "Curry leftovers", "11-2": "Tortilla pizzas",
  "12-0": "Banana pancakes", "12-2": "Beef tacos",
  "13-1": "Veggie fried rice",
};
const FILLER = Object.keys(RECIPES).filter(n => !/left/i.test(n));

// Placeholder: other weeks get a predictable pattern, later weeks are emptier.
function mealAt(day, meal) {
  if (day >= 7 && day < 14) return FIXED[`${day}-${meal}`] || null;
  const busy = day < 21 ? 7 : 4;
  if ((day * 5 + meal * 3) % 10 >= busy) return null;
  return FILLER[(day * 3 + meal * 5) % FILLER.length];
}

function dateOf(day) { const d = new Date(START); d.setDate(d.getDate() + day); return d; }
const fmt = (d, opts) => d.toLocaleDateString("en-US", opts);
const wkday = day => fmt(dateOf(day), { weekday: "short" });
const short = day => fmt(dateOf(day), { month: "short", day: "numeric" });
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

/* ---------- 3-day view ---------- */
let start = TODAY;

function recipeCard(name, big) {
  const [e, time, color, cost] = RECIPES[name];
  return `<div class="rc ${color}"><span class="e">${e}</span><b>${name}</b><small>${big ? `<span>⏱ ${time}</span><span>${cost} / serving</span>` : `⏱ ${time}`}</small></div>`;
}

function renderThreeDays() {
  const days = [start, start + 1, start + 2];
  let html = `<div></div>` + days.map(d =>
    `<div class="hd ${d === TODAY ? "today" : ""}">${wkday(d)}<small>${short(d)}</small></div>`).join("");
  meals.forEach(([meal, emoji], mi) => {
    html += `<div class="meal">${emoji}<span class="ml"> ${meal}</span></div>`;
    days.forEach(d => {
      const name = mealAt(d, mi);
      html += name
        ? `<div class="slot">${recipeCard(name, true)}</div>`
        : `<div class="slot empty" title="Add a recipe" data-toast="Recipe picker would open here">+</div>`;
    });
  });
  document.getElementById("cal").innerHTML = html;
  document.getElementById("rangeLabel").textContent = `${wkday(start)} ${short(start)} – ${wkday(start + 2)} ${short(start + 2)}`;
  document.getElementById("prevDays").disabled = start === 0;
  document.getElementById("nextDays").disabled = start >= TOTAL_DAYS - 3;
}

function goTo(day) { start = clamp(day, 0, TOTAL_DAYS - 3); renderThreeDays(); }

document.getElementById("prevDays").onclick = () => goTo(start - 3);
document.getElementById("nextDays").onclick = () => goTo(start + 3);
document.getElementById("todayBtn").onclick = () => goTo(TODAY);

/* ---------- Calendar popup ---------- */
const modal = document.getElementById("calModal");
let mode = "week";
let calStart = 0; // first day shown in the popup (always a Monday)

const inRange = d => d >= start && d < start + 3;

function renderWeek() {
  const days = Array.from({ length: 7 }, (_, i) => calStart + i);
  let html = `<div></div>` + days.map(d =>
    `<div class="hd ${d === TODAY ? "today" : ""} ${inRange(d) ? "inrange" : ""}" data-day="${d}">${wkday(d)}<small>${short(d)}</small></div>`).join("");
  meals.forEach(([meal, emoji], mi) => {
    html += `<div class="meal">${emoji} ${meal}</div>`;
    days.forEach(d => {
      const name = mealAt(d, mi);
      html += name ? `<div class="slot" data-day="${d}">${recipeCard(name, false)}</div>`
                   : `<div class="slot empty" data-day="${d}">+</div>`;
    });
  });
  return `<div class="scroll-x"><div class="cal">${html}</div></div>`;
}

function renderMonth() {
  let html = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => `<div class="mh">${d}</div>`).join("");
  for (let d = calStart; d < calStart + 28; d++) {
    const lines = meals.map((_, mi) => mealAt(d, mi)).filter(Boolean).map(name => {
      const [e, , color] = RECIPES[name];
      return `<div class="mline ${color}" title="${name}">${e}<span class="mn"> ${name}</span></div>`;
    }).join("");
    const cls = [d === TODAY && "today", inRange(d) && "inrange", d < TODAY && "past"].filter(Boolean).join(" ");
    const label = dateOf(d).getDate() === 1 ? fmt(dateOf(d), { month: "short" }) + " 1" : dateOf(d).getDate();
    html += `<div class="mday ${cls}" data-day="${d}"><span class="dn" style="${String(label).length > 2 ? "width:auto;padding:0 6px" : ""}">${label}</span>${lines}</div>`;
  }
  return `<div class="month">${html}</div>
    <div class="cal-legend"><span><i style="background:var(--sage)"></i>Showing in planner</span><span><i style="background:var(--fresh)"></i>Today</span></div>`;
}

function renderCal() {
  const span = mode === "week" ? 7 : 28;
  document.getElementById("calBody").innerHTML = mode === "week" ? renderWeek() : renderMonth();
  document.getElementById("calLabel").textContent = `${short(calStart)} – ${short(calStart + span - 1)}`;
  document.getElementById("calPrev").disabled = calStart === 0;
  document.getElementById("calNext").disabled = calStart + span >= TOTAL_DAYS;
}

function openCal() {
  calStart = Math.floor(start / 7) * 7;
  if (mode === "month") calStart = clamp(calStart, 0, TOTAL_DAYS - 28);
  renderCal();
  modal.classList.add("open");
}
const closeCal = () => modal.classList.remove("open");

document.getElementById("openCal").onclick = openCal;

document.getElementById("calMode").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  mode = b.dataset.mode;
  document.querySelectorAll("#calMode button").forEach(x => x.classList.toggle("active", x === b));
  if (mode === "month") calStart = clamp(calStart, 0, TOTAL_DAYS - 28);
  renderCal();
});

document.getElementById("calPrev").onclick = () => {
  calStart = Math.max(0, calStart - (mode === "week" ? 7 : 28)); renderCal();
};
document.getElementById("calNext").onclick = () => {
  const span = mode === "week" ? 7 : 28;
  calStart = Math.min(TOTAL_DAYS - span, calStart + span); renderCal();
};

modal.addEventListener("click", e => {
  if (e.target === modal || e.target.closest("[data-close]")) return closeCal();
  const day = e.target.closest("[data-day]");
  if (day) { goTo(+day.dataset.day); closeCal(); }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeCal(); });

renderThreeDays();
