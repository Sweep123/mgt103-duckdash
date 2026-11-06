/* Store Rankings: category tabs, a big #1 card with a sample basket, then #2–#5 as a list.
 * Store names are real Hoboken-area stores; distances, prices and ratings are made up. */

const STORES = {
  shoprite: { name: "ShopRite of Hoboken", ini: "SR", color: "var(--fresh)", dist: "0.9 mi", walk: "18 min walk", hours: "Open till 11 PM", price: 1 },
  hmart: { name: "H Mart, Jersey City", ini: "HM", color: "var(--forest)", dist: "2.6 mi", walk: "PATH + 6 min walk", hours: "Open till 10 PM", price: 1 },
  acme: { name: "ACME, Washington St", ini: "AC", color: "#6E9A7E", dist: "0.5 mi", walk: "10 min walk", hours: "Open till 10 PM", price: 2 },
  kings: { name: "Kings Food Market", ini: "KF", color: "#8A5A10", dist: "0.7 mi", walk: "14 min walk", hours: "Open till 9 PM", price: 3 },
  farmboy: { name: "Hoboken Farmboy", ini: "FB", color: "var(--amber)", dist: "0.4 mi", walk: "8 min walk", hours: "Open till 9 PM", price: 2 },
  market: { name: "Hoboken Farmers Market", ini: "FM", color: "var(--fresh-dark)", dist: "0.8 mi", walk: "16 min walk", hours: "Tuesdays, seasonal", price: 2 },
};

// Each category: note, then ranked entries [storeKey, rating, reviews, one-line highlight]
// The #1 entry also gets a "why" line and a sample basket.
const RANKINGS = {
  meat: {
    note: "Ranked on price per pound for chicken, beef and pork, plus how fresh people said it was.",
    why: "Family packs of chicken thighs are $1.89/lb most weeks. That's the pack most splits on DuckDash start from.",
    basket: [["Chicken thighs", "per lb", "$1.89"], ["Ground beef 80/20", "per lb", "$4.29"], ["Pork shoulder", "per lb", "$2.49"], ["Chicken breast", "per lb", "$3.99"]],
    vs: "$2.07 less than ACME for the same four things",
    list: [
      ["shoprite", 4.3, 212, "Family packs, weekly digital coupons"],
      ["hmart", 4.4, 97, "Thin-sliced pork belly for $5.99/lb"],
      ["acme", 3.8, 164, "Good BOGO weeks, pricey otherwise"],
      ["farmboy", 3.6, 58, "Small meat counter, decent sausage"],
      ["kings", 3.4, 71, "Nice quality, but $6.49/lb thighs"],
    ],
  },
  produce: {
    note: "Ranked on freshness ratings and price per pound for the stuff students actually buy.",
    why: "Greens last about twice as long as the supermarket bagged ones, and bruised-fruit boxes go for $3 at close.",
    basket: [["Baby spinach", "per lb", "$4.50"], ["Grape tomatoes", "pint", "$3.00"], ["Apples", "per lb", "$2.25"], ["Bell peppers", "each", "$1.00"]],
    vs: "Pricier than ShopRite, but people said nothing went bad within a week",
    list: [
      ["market", 4.7, 88, "Seasonal, cash or Venmo"],
      ["hmart", 4.5, 97, "Cheap scallions, bok choy, mushrooms"],
      ["farmboy", 4.2, 133, "Good avocados, open late-ish"],
      ["shoprite", 3.9, 212, "Fine if you check the dates"],
      ["acme", 3.3, 164, "Bagged salad goes bad fast"],
    ],
  },
  staples: {
    note: "Ranked on price for rice, pasta, beans, oats, flour and cooking oil.",
    why: "Store-brand pasta is $0.89 a box, and the 10 lb rice bag works out to 7¢ a serving.",
    basket: [["Pasta, store brand", "1 lb", "$0.89"], ["Rolled oats", "42 oz", "$3.79"], ["Black beans", "15 oz can", "$0.99"], ["Canola oil", "48 oz", "$4.29"]],
    vs: "$3.12 less than ACME for the same four things",
    list: [
      ["shoprite", 4.4, 212, "Store brand everything"],
      ["hmart", 4.2, 97, "20 lb rice bags for $22.49"],
      ["acme", 3.7, 164, "Fine for a quick trip"],
      ["farmboy", 3.5, 133, "Good bulk nuts, small selection"],
      ["kings", 3.1, 71, "Skip unless it's on sale"],
    ],
  },
};

const priceLevel = n => `<span class="plevel" aria-label="Price level ${n} of 3">${"$".repeat(n)}<i>${"$".repeat(3 - n)}</i></span>`;

function renderStores(key) {
  const cat = RANKINGS[key];
  const [topKey, topRating, topReviews] = cat.list[0];
  const top = STORES[topKey];
  const total = cat.basket.reduce((sum, row) => sum + parseFloat(row[2].slice(1)), 0);

  document.getElementById("storeNote").textContent = cat.note;

  document.getElementById("topStore").innerHTML = `
    <article class="top-store">
      <div class="main">
        <span class="rank-big">#1</span>
        <h2>${top.name}</h2>
        <span class="rating">${stars(topRating)} ${topRating} <small>(${topReviews} ratings)</small> &nbsp; ${priceLevel(top.price)}</span>
        <p class="why">${cat.why}</p>
        <div class="sub">
          <span>${icon("map-pin", "ic-sm")}${top.dist} from Howe Center · ${top.walk}</span>
          <span>${icon("clock", "ic-sm")}${top.hours}</span>
        </div>
        <a class="link-arrow" href="groups.html">Splits from here ${icon("arrow-right", "ic-sm")}</a>
      </div>
      <div class="basket">
        <h4>A typical basket here</h4>
        <table>
          <tbody>${cat.basket.map(([item, unit, price]) => `<tr><td>${item} <small>· ${unit}</small></td><td>${price}</td></tr>`).join("")}</tbody>
          <tfoot><tr><td>Total</td><td>$${total.toFixed(2)}</td></tr></tfoot>
        </table>
        <p class="vs">${cat.vs}</p>
      </div>
    </article>`;

  document.getElementById("stores").innerHTML = cat.list.slice(1).map(([k, rating, reviews, note], i) => {
    const s = STORES[k];
    return `<div class="store-row" data-toast="Store page would open here">
      <span class="rk">${i + 2}</span>
      <span class="slogo" style="background:${s.color}">${s.ini}</span>
      <div><h3>${s.name}</h3><div class="sub"><b>${note}</b> · ${s.dist}</div></div>
      <span class="rating rating-col">${stars(rating)} ${rating} <small>(${reviews})</small></span>
      ${priceLevel(s.price)}
      <span class="chev">${icon("chevron-right", "ic-sm")}</span>
    </div>`;
  }).join("");

  refreshIcons();
}

document.getElementById("storeTabs").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  document.querySelectorAll("#storeTabs button").forEach(x => x.classList.toggle("active", x === b));
  renderStores(b.dataset.s);
});

renderStores("meat");
