/* Group Finder: sample splits, category filter chips, and the "Start a split" popup. */

// The big chicken split at the top of the page is in groups.html (id="featured").
const FEATURED_CATEGORY = "meat";

const splits = [
  { icon: "egg", tint: "c3", item: "Eggs, 60 count", store: "ShopRite", cat: "dairy", each: 2.69, save: 0.50, filled: 3, total: 5, spot: "Palmer Hall", when: "Fri 5:15 PM", by: ["PS", "JL", "AB"], posted: "2h ago" },
  { icon: "wheat", tint: "c1", item: "Jasmine rice, 20 lb bag", store: "H Mart", cat: "pantry", each: 5.62, save: 3.17, filled: 2, total: 4, spot: "Jonas Hall", when: "Sat 11:00 AM", by: ["BO", "TN"], posted: "5h ago" },
  { icon: "banana", tint: "c5", item: "Bananas, 2 bunches", store: "Hoboken Farmboy", cat: "produce", each: 1.99, save: 0.62, filled: 1, total: 3, spot: "UCC Tower lobby", when: "Thu 7:40 PM", by: ["LK"], posted: "26 min ago" },
  { icon: "milk", tint: "c3", item: "Greek yogurt, 48 oz tub", store: "ShopRite", cat: "dairy", each: 2.49, save: 1.08, filled: 2, total: 3, spot: "Davis Hall lobby", when: "Sun 1:00 PM", by: ["MP", "SR"], posted: "1h ago" },
  { icon: "beef", tint: "c2", item: "Ground beef 80/20, 5 lb", store: "ShopRite", cat: "meat", each: 5.36, save: 1.87, filled: 3, total: 4, spot: "Humphreys Hall", when: "Sat 12:15 PM", by: ["TN", "DR", "BO"], posted: "yesterday" },
  { icon: "leafy-green", tint: "c4", item: "Baby spinach, 1 lb tub", store: "ShopRite", cat: "produce", each: 1.76, save: 1.35, filled: 2, total: 3, spot: "Library steps", when: "Wed 4:00 PM", by: ["MP", "PS"], posted: "1h ago" },
  { icon: "bean", tint: "c1", item: "Black beans, 8 cans", store: "ACME", cat: "pantry", each: 1.98, save: 0.71, filled: 1, total: 4, spot: "Hayden Hall", when: "Sun 2:30 PM", by: ["SR"], posted: "6h ago" },
  { icon: "pizza", tint: "c5", item: "Shredded mozzarella, 2 lb", store: "ShopRite", cat: "dairy", each: 2.93, save: 0.94, filled: 2, total: 3, spot: "Davis Hall lobby", when: "Fri 8:00 PM", by: ["AB", "LK"], posted: "4h ago" },
];

const avatarClass = ["av1", "av2", "av3", "av4"];

function splitCard(s) {
  const left = s.total - s.filled;
  const avatars = s.by.map((ini, k) => `<span class="${avatarClass[k % 4]}">${ini}</span>`).join("");
  return `<article class="card hover split">
    <div class="split-top">
      <span class="food ${s.tint}">${icon(s.icon)}</span>
      <div><h3>${s.item}</h3><div class="from">${s.store} · ${s.posted}</div></div>
    </div>
    <div class="price"><b>$${s.each.toFixed(2)}</b><span>each</span><span class="badge">−$${s.save.toFixed(2)}</span></div>
    <div class="spots"><i style="width:${s.filled / s.total * 100}%"></i></div>
    <div class="meta">
      <div>${icon("users")}<b>${left} spot${left > 1 ? "s" : ""} left</b>&nbsp;of ${s.total}</div>
      <div>${icon("map-pin")}${s.spot}</div>
      <div>${icon("clock")}${s.when}</div>
    </div>
    <div class="split-foot"><div class="avatars">${avatars}</div><button class="btn sm" data-toast="You're in the ${s.item.split(",")[0].toLowerCase()} split. (prototype)">Join</button></div>
  </article>`;
}

function renderSplits(filter = "all") {
  const list = splits.filter(s => filter === "all" || s.cat === filter);
  document.getElementById("splits").innerHTML = list.length
    ? list.map(splitCard).join("")
    : `<p class="empty-note">Nothing here right now. Start one and people on your floor will see it.</p>`;
  document.getElementById("count").textContent = `${list.length} split${list.length === 1 ? "" : "s"}`;
  document.getElementById("featured").style.display = filter === "all" || filter === FEATURED_CATEGORY ? "" : "none";
  refreshIcons();
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
