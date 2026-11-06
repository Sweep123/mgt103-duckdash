/*
 * Shared pieces used on every page: duck logo, top nav, footer, toast,
 * profile menu, hamburger menu, chip toggles and icon rendering.
 * Each page sets <body data-page="..."> so the right tab is highlighted.
 * Edit the nav or footer here and every page updates.
 *
 * Icons come from Lucide (loaded from unpkg before this file).
 * Write them as <i data-lucide="egg"></i> or with icon("egg"),
 * then call refreshIcons() after adding new HTML.
 */

const NAV_TABS = [
  ["home", "index.html", "Home"],
  ["groups", "groups.html", "Group Finder"],
  ["planner", "planner.html", "Meal Planner"],
  ["recipes", "recipes.html", "Recipes"],
  ["stores", "stores.html", "Store Rankings"],
];

function icon(name, cls = "") {
  return `<i data-lucide="${name}"${cls ? ` class="${cls}"` : ""}></i>`;
}
function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

// The duck. Used in the logo, the footer and the home page.
const DUCK_SPRITE = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="duck" viewBox="0 0 40 40">
    <path d="M14 10a7 7 0 0 1 13.4 2.8c-.1.8.4 1.5 1.1 1.7l3.5 1c.9.3.9 1.5 0 1.8l-3.2 1.2c3.2 1.6 5.2 4.6 5.2 8.2 0 5.3-5.6 8.3-13 8.3S6 32 6 26.5c0-2 1-3.4 2.6-3.8 2.3-.6 4.6.6 6.6.3 1.6-.2 2.2-1.3 1.2-2.6A7 7 0 0 1 14 10z" fill="#1F3D2B"/>
    <circle cx="21.5" cy="11.5" r="1.6" fill="#F7F4EC"/>
    <path d="M13 27c3 2.5 8 2.5 12 0" stroke="#3E7C59" stroke-width="2" fill="none" stroke-linecap="round"/>
  </symbol>
</svg>`;

const LOGO = `<span class="logo-mark"><svg width="28" height="28"><use href="#duck"/></svg></span><span>Duck<em>Dash</em></span>`;

function navTabs(current) {
  return NAV_TABS.map(([id, href, label]) =>
    `<a class="tab${id === current ? " active" : ""}" href="${href}"${id === current ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");
}

function headerHTML(current) {
  return `
<header class="nav">
  <div class="wrap">
    <a href="index.html" class="logo" aria-label="DuckDash home">${LOGO}</a>
    <div class="nav-right">
      <nav class="tabs" aria-label="Main">${navTabs(current)}</nav>
      <button class="profile" id="profileBtn" aria-label="Profile">JL
        <div class="profile-menu" id="profileMenu">
          <div class="who"><b>Jordan Lee</b><small>Davis Hall, 3rd floor · Class of '28</small></div>
          <a href="#">My splits <span class="badge">2 active</span></a>
          <a href="#">Pantry</a>
          <a href="#">Diet stuff (no pork)</a>
          <a href="#">Venmo handle</a>
          <a href="#">Log out</a>
        </div>
      </button>
      <button class="hamburger" id="hamburger" aria-label="Open menu">${icon("menu")}</button>
    </div>
  </div>
  <div class="mobile-menu" id="mobileMenu"><div class="wrap">${navTabs(current)}</div></div>
</header>`;
}

const FOOTER_HTML = `
<footer>
  <div class="wrap">
    <div>
      <div class="logo">${LOGO}</div>
      <p>Made by four Stevens students who got tired of throwing out half a bag of spinach every week.</p>
    </div>
    <div><h4>The app</h4><a href="groups.html">Group Finder</a><a href="planner.html">Meal Planner</a><a href="recipes.html">Recipes</a><a href="stores.html">Store Rankings</a></div>
    <div><h4>Questions</h4><a href="#">How pickups work</a><a href="#">What if someone flakes?</a><a href="#">Email us</a></div>
    <div class="copy"><span>© 2026 DuckDash · Hoboken, NJ · MGT 103 project</span><span>Prototype. Names, prices and ratings are made up.</span></div>
  </div>
</footer>
<div class="toast" id="toast" role="status"></div>`;

/* ---------- Inject shared layout ---------- */
document.body.insertAdjacentHTML("afterbegin", DUCK_SPRITE + headerHTML(document.body.dataset.page));
document.body.insertAdjacentHTML("beforeend", FOOTER_HTML);

/* ---------- Hamburger + profile menu ---------- */
document.getElementById("hamburger").onclick = () =>
  document.getElementById("mobileMenu").classList.toggle("open");
const profileMenu = document.getElementById("profileMenu");
document.getElementById("profileBtn").onclick = e => { e.stopPropagation(); profileMenu.classList.toggle("open"); };
document.addEventListener("click", () => profileMenu.classList.remove("open"));

/* ---------- Toast: any element with data-toast="message" ---------- */
const toastEl = document.getElementById("toast");
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 2400);
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-toast]");
  if (t) toast(t.dataset.toast);
});

/* ---------- Chip groups: one active chip at a time (visual only) ---------- */
document.querySelectorAll(".chips").forEach(group => group.addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  group.querySelectorAll(".chip").forEach(x => x.classList.toggle("active", x === chip));
}));

/* Star rating with a partial last star, e.g. stars(4.3) */
function stars(rating) {
  return `<span class="stars" aria-label="${rating} out of 5"><i style="width:${rating / 5 * 100}%"></i></span>`;
}

refreshIcons();
