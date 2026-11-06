/* Store Rankings: category tabs and ranked store cards. */

// Each store: [name, logo initials, logo color, rating, review count, price level 1-3, distance, hours note, highlights, top badge]
const storeSets = {
  meat: {
    note: "Ranked by average price per lb across chicken, beef and pork, plus student ratings.",
    list: [
      ["Costco", "CO", "#C0392B", 4.6, 812, 1, "2.1 mi", "Membership needed", ["Chicken thighs $1.99/lb", "Bulk packs"], "Best for splits"],
      ["Aldi", "AL", "#1F5FA8", 4.4, 640, 1, "0.8 mi", "Open til 9pm", ["Ground beef $3.49/lb", "Rotating deals"], null],
      ["Walmart", "WM", "#2D6CC0", 4.0, 1033, 1, "1.6 mi", "Open 24 hrs", ["Pork chops $2.79/lb"], null],
      ["Stop & Shop", "SS", "#7A3E9D", 3.7, 402, 2, "1.2 mi", "Student discount", ["Weekly BOGO"], null],
      ["Whole Foods", "WF", "#00674B", 3.9, 288, 3, "2.8 mi", "Prime deals", ["Organic options"], null],
    ],
  },
  produce: {
    note: "Ranked by freshness ratings, variety and price per pound of common fruits & veggies.",
    list: [
      ["Trader Joe's", "TJ", "#B22222", 4.7, 920, 2, "1.4 mi", "Open til 9pm", ["Bagged greens", "Great frozen veg"], "Student favorite"],
      ["Aldi", "AL", "#1F5FA8", 4.5, 640, 1, "0.8 mi", "Open til 9pm", ["Avocados $0.69", "Berries deals"], null],
      ["Farmers Market", "FM", "#3E7C59", 4.8, 214, 2, "Campus Green", "Saturdays only", ["Local & seasonal"], null],
      ["Whole Foods", "WF", "#00674B", 4.3, 288, 3, "2.8 mi", "Prime deals", ["Widest selection"], null],
      ["Walmart", "WM", "#2D6CC0", 3.5, 1033, 1, "1.6 mi", "Open 24 hrs", ["Lowest base prices"], null],
    ],
  },
  staples: {
    note: "Ranked by price on rice, pasta, beans, oats, flour and cooking oil.",
    list: [
      ["Aldi", "AL", "#1F5FA8", 4.8, 640, 1, "0.8 mi", "Open til 9pm", ["Pasta $0.85/lb", "Oats $2.49"], "Cheapest overall"],
      ["Costco", "CO", "#C0392B", 4.6, 812, 1, "2.1 mi", "Membership needed", ["25 lb rice $19.99"], null],
      ["Walmart", "WM", "#2D6CC0", 4.2, 1033, 1, "1.6 mi", "Open 24 hrs", ["Great Value brand"], null],
      ["Trader Joe's", "TJ", "#B22222", 4.0, 920, 2, "1.4 mi", "Open til 9pm", ["Unique pantry items"], null],
      ["Target", "TG", "#CC0000", 3.6, 507, 2, "1.9 mi", "Circle deals", ["Good & Gather brand"], null],
    ],
  },
};

const star = on => `<svg viewBox="0 0 24 24" class="${on ? "" : "off"}"><use href="#i-star"/></svg>`;

function renderStores(key) {
  const set = storeSets[key];
  document.getElementById("storeNote").textContent = set.note;
  document.getElementById("stores").innerHTML = set.list.map((r, i) => `
    <div class="card hover store">
      <div class="rank ${i < 3 ? "r" + (i + 1) : ""}">${i + 1}</div>
      <div class="slogo" style="background:${r[2]}">${r[1]}</div>
      <div>
        <h3>${r[0]} ${r[9] ? `<span class="badge">★ ${r[9]}</span>` : ""}</h3>
        <div class="stars">${[1, 2, 3, 4, 5].map(n => star(n <= Math.round(r[3]))).join("")}<b>${r[3].toFixed(1)}</b><small>(${r[4]} reviews)</small></div>
        <div class="sub"><span><svg class="icon"><use href="#i-pin"/></svg>${r[6]}</span><span><svg class="icon"><use href="#i-clock"/></svg>${r[7]}</span></div>
        <div class="hl">${r[8].map(t => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
      <div class="right">
        <div class="plevel">${"$".repeat(r[5])}<i>${"$".repeat(3 - r[5])}</i></div>
        <button class="btn sm ghost" data-toast="Store page would open here">View deals</button>
      </div>
    </div>`).join("");
}

document.getElementById("storeTabs").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  document.querySelectorAll("#storeTabs button").forEach(x => x.classList.toggle("active", x === b));
  renderStores(b.dataset.s);
});

renderStores("meat");
