/* Group Finder: sample splits, category filter chips, and the "Start a split" popup. */

const avatarColors = ["#3E7C59", "#E8A33D", "#7B6BB0", "#4F8FB0", "#C26A4F"];

const splits = [
  { e: "🍚", item: "Jasmine rice, 25 lb", store: "Costco", cat: "staples", pp: 4.80, filled: 4, total: 5, spot: "Oak Hall lobby", when: "Fri 5:00 PM", save: 58 },
  { e: "🍗", item: "Chicken thighs, 6 lb", store: "Costco", cat: "meat", pp: 6.00, filled: 2, total: 4, spot: "Library lot", when: "Sat 11:00 AM", save: 40 },
  { e: "🥚", item: "Eggs, 5 dozen", store: "Sam's Club", cat: "dairy", pp: 3.20, filled: 3, total: 5, spot: "Student Union", when: "Fri 5:00 PM", save: 42 },
  { e: "🥑", item: "Avocados, 6-pack", store: "Aldi", cat: "produce", pp: 2.25, filled: 1, total: 3, spot: "West Village", when: "Thu 7:00 PM", save: 44 },
  { e: "🧀", item: "Shredded cheddar, 5 lb", store: "Costco", cat: "dairy", pp: 5.75, filled: 2, total: 3, spot: "Oak Hall lobby", when: "Sun 2:00 PM", save: 36 },
  { e: "🥩", item: "Ground beef 85/15, 5 lb", store: "Costco", cat: "meat", pp: 7.40, filled: 3, total: 4, spot: "Library lot", when: "Sat 11:00 AM", save: 43 },
  { e: "🍝", item: "Pasta variety, 12 boxes", store: "Aldi", cat: "staples", pp: 3.00, filled: 5, total: 6, spot: "Student Union", when: "Mon 6:00 PM", save: 45 },
  { e: "🥦", item: "Frozen broccoli, 4 lb", store: "Trader Joe's", cat: "produce", pp: 2.50, filled: 1, total: 4, spot: "Oak Hall lobby", when: "Wed 4:00 PM", save: 42 },
  { e: "🫘", item: "Black beans, 12 cans", store: "Costco", cat: "staples", pp: 2.70, filled: 2, total: 4, spot: "West Village", when: "Fri 5:00 PM", save: 44 },
];

function renderSplits(filter = "all") {
  document.getElementById("splits").innerHTML = splits
    .filter(s => filter === "all" || s.cat === filter)
    .map((s, i) => {
      const left = s.total - s.filled;
      const avatars = Array.from({ length: s.filled }, (_, k) =>
        `<span style="background:${avatarColors[(i + k) % 5]}">${"ABCDEFGHJKLMNPRST"[(i * 3 + k * 5) % 17]}</span>`
      ).join("");
      return `<div class="card hover split">
        <div class="split-top"><div class="emo">${s.e}</div><div><h3>${s.item}</h3><div class="from">from ${s.store}</div></div></div>
        <div class="price"><b>$${s.pp.toFixed(2)}</b><span>/ person</span><span class="badge" style="margin-left:auto">Save ${s.save}%</span></div>
        <div class="spots"><i style="width:${s.filled / s.total * 100}%"></i></div>
        <div class="meta">
          <div><svg class="icon"><use href="#i-users"/></svg><b style="color:var(--forest)">${left} spot${left > 1 ? "s" : ""} left</b>&nbsp;of ${s.total}</div>
          <div><svg class="icon"><use href="#i-pin"/></svg>${s.spot}</div>
          <div><svg class="icon"><use href="#i-clock"/></svg>${s.when}</div>
        </div>
        <div class="split-foot"><div class="avatars">${avatars}</div><button class="btn sm" data-toast="Joined ${s.item.split(",")[0]} split (prototype)">Join split</button></div>
      </div>`;
    }).join("");
}

document.getElementById("gfChips").addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (chip) renderSplits(chip.dataset.f);
});

/* Popup */
const modal = document.getElementById("splitModal");
document.getElementById("openSplit").onclick = () => modal.classList.add("open");
modal.addEventListener("click", e => {
  if (e.target === modal || e.target.closest("[data-close]")) modal.classList.remove("open");
});
document.addEventListener("keydown", e => { if (e.key === "Escape") modal.classList.remove("open"); });

renderSplits();
