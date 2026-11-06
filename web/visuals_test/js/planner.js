/*
 * Meal Planner
 * - Main view shows 3 days at a time; arrows move 3 days, "Today" jumps back.
 * - "Whole week" opens a popup with a Week view or a 4-week view.
 *   Clicking any day there jumps the 3-day view to that day.
 * All data is placeholder.
 */

const START = new Date(2026, 10, 2); // Mon, Nov 2 2026 = day 0
const TOTAL_DAYS = 56;               // 8 weeks of placeholder data
const TODAY = 8;                     // Tue, Nov 10
const meals = [["Breakfast", "sunrise"], ["Lunch", "sun"], ["Dinner", "moon"]];

// name: [lucide icon, cook time, tint class, cost per serving]
const RECIPES = {
  "Overnight oats": ["milk", "5 min", "c2", "$0.87"],
  "Spinach egg scramble": ["egg", "10 min", "c1", "$1.42"],
  "Chicken burrito bowl": ["salad", "25 min", "c1", "$2.38"],
  "Garlic spinach pasta": ["utensils", "20 min", "c3", "$2.07"],
  "Chickpea curry": ["cooking-pot", "30 min", "c5", "$1.93"],
  "Turkey & cheddar wrap": ["sandwich", "5 min", "c2", "$2.21"],
  "Sheet-pan chicken thighs": ["drumstick", "35 min", "c2", "$3.06"],
  "Tortilla pizzas": ["pizza", "15 min", "c3", "$1.98"],
  "Banana pancakes": ["croissant", "15 min", "c5", "$1.13"],
  "Beef tacos": ["beef", "20 min", "c5", "$2.64"],
  "Egg fried rice": ["egg-fried", "15 min", "c1", "$1.47"],
  "Beef chili": ["soup", "45 min", "c5", "$2.79"],
  "Leftover burrito bowl": ["refrigerator", "2 min", "c4", "$0"],
  "Leftover curry": ["refrigerator", "2 min", "c4", "$0"],
};

// Hand-placed meals for the current week (Nov 9–15). Key = "day-meal".
const FIXED = {
  "7-0": "Overnight oats", "7-2": "Chicken burrito bowl",
  "8-0": "Spinach egg scramble", "8-1": "Leftover burrito bowl", "8-2": "Sheet-pan chicken thighs",
  "9-1": "Turkey & cheddar wrap", "9-2": "Garlic spinach pasta",
  "10-0": "Overnight oats", "10-2": "Chickpea curry",
  "11-1": "Leftover curry", "11-2": "Tortilla pizzas",
  "12-0": "Banana pancakes", "12-2": "Beef tacos",
  "13-1": "Egg fried rice",
};
const FILLER = Object.keys(RECIPES).filter(n => !/leftover/i.test(n));

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
  const [ic, time, tint, cost] = RECIPES[name];
  const details = big
    ? `<span>${time}</span><span>${cost === "$0" ? "already paid for" : cost + " a serving"}</span>`
    : time;
  return `<div class="rc ${tint}">${icon(ic)}<b>${name}</b><small>${details}</small></div>`;
}

function renderThreeDays() {
  const days = [start, start + 1, start + 2];
  let html = `<div></div>` + days.map(d =>
    `<div class="hd ${d === TODAY ? "today" : ""}">${d === TODAY ? "Today" : wkday(d)}<small>${short(d)}</small></div>`).join("");
  meals.forEach(([meal, ic], mi) => {
    html += `<div class="meal">${icon(ic, "ic-sm")}<span class="ml">${meal}</span></div>`;
    days.forEach(d => {
      const name = mealAt(d, mi);
      html += name
        ? `<div class="slot">${recipeCard(name, true)}</div>`
        : `<div class="slot empty" title="Add a meal" data-toast="Recipe picker would open here">${icon("plus")}</div>`;
    });
  });
  document.getElementById("cal").innerHTML = html;
  document.getElementById("rangeLabel").textContent = `${short(start)} – ${short(start + 2)}`;
  document.getElementById("prevDays").disabled = start === 0;
  document.getElementById("nextDays").disabled = start >= TOTAL_DAYS - 3;
  refreshIcons();
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
  meals.forEach(([meal, ic], mi) => {
    html += `<div class="meal">${icon(ic, "ic-sm")} ${meal}</div>`;
    days.forEach(d => {
      const name = mealAt(d, mi);
      html += name ? `<div class="slot" data-day="${d}">${recipeCard(name, false)}</div>`
                   : `<div class="slot empty" data-day="${d}">${icon("plus", "ic-sm")}</div>`;
    });
  });
  return `<div class="scroll-x"><div class="cal">${html}</div></div>`;
}

function renderMonth() {
  let html = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => `<div class="mh">${d}</div>`).join("");
  for (let d = calStart; d < calStart + 28; d++) {
    const lines = meals.map((_, mi) => mealAt(d, mi)).filter(Boolean).map(name => {
      const [ic, , tint] = RECIPES[name];
      return `<div class="mline ${tint}" title="${name}">${icon(ic)}<span class="mn">${name}</span></div>`;
    }).join("");
    const cls = [d === TODAY && "today", inRange(d) && "inrange", d < TODAY && "past"].filter(Boolean).join(" ");
    const n = dateOf(d).getDate();
    const label = n === 1 ? fmt(dateOf(d), { month: "short" }) + " 1" : n;
    html += `<div class="mday ${cls}" data-day="${d}"><span class="dn">${label}</span>${lines}</div>`;
  }
  return `<div class="month">${html}</div>
    <div class="cal-legend"><span><i style="background:var(--sage);border:1px solid var(--line)"></i>In your 3-day view</span><span><i style="background:var(--forest)"></i>Today</span></div>`;
}

function renderCal() {
  const span = mode === "week" ? 7 : 28;
  document.getElementById("calBody").innerHTML = mode === "week" ? renderWeek() : renderMonth();
  document.getElementById("calLabel").textContent = `${short(calStart)} – ${short(calStart + span - 1)}`;
  document.getElementById("calPrev").disabled = calStart === 0;
  document.getElementById("calNext").disabled = calStart + span >= TOTAL_DAYS;
  refreshIcons();
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
