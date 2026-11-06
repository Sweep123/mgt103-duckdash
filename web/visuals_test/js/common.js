/*
 * Shared pieces used on every page: icon sprite, top nav, footer, toast,
 * profile menu, hamburger menu and chip toggles.
 * Each page sets <body data-page="..."> so the right tab is highlighted.
 * Edit the nav or footer here and every page updates.
 */

const NAV_TABS = [
  ["home", "index.html", "Home"],
  ["groups", "groups.html", "Group Finder"],
  ["planner", "planner.html", "Meal Planner"],
  ["recipes", "recipes.html", "Recipes"],
  ["stores", "stores.html", "Store Rankings"],
];

const ICON_SPRITE = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
    <symbol id="i-cal" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></symbol>
    <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></symbol>
    <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
    <symbol id="i-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>
    <symbol id="i-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
    <symbol id="i-cart" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/></symbol>
    <symbol id="i-heart" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
    <symbol id="i-alert" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></symbol>
    <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></symbol>
    <symbol id="duck" viewBox="0 0 40 40"><path d="M14 10a7 7 0 0 1 13.4 2.8c-.1.8.4 1.5 1.1 1.7l3.5 1c.9.3.9 1.5 0 1.8l-3.2 1.2c3.2 1.6 5.2 4.6 5.2 8.2 0 5.3-5.6 8.3-13 8.3S6 32 6 26.5c0-2 1-3.4 2.6-3.8 2.3-.6 4.6.6 6.6.3 1.6-.2 2.2-1.3 1.2-2.6A7 7 0 0 1 14 10z" fill="#1F3D2B"/><circle cx="21.5" cy="11.5" r="1.6" fill="#F7F4EC"/><path d="M13 27c3 2.5 8 2.5 12 0" stroke="#3E7C59" stroke-width="2" fill="none" stroke-linecap="round"/></symbol>
  </defs>
</svg>`;

function navTabs(current) {
  return NAV_TABS.map(([id, href, label]) =>
    `<a class="tab${id === current ? " active" : ""}" href="${href}"${id === current ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");
}

function headerHTML(current) {
  return `
<header class="nav">
  <div class="wrap">
    <a href="index.html" class="logo" aria-label="DuckDash home">
      <span class="logo-mark"><svg width="30" height="30"><use href="#duck"/></svg></span>
      <span>Duck<em>Dash</em></span>
    </a>
    <div class="nav-right">
      <nav class="tabs" aria-label="Main">${navTabs(current)}</nav>
      <button class="profile" id="profileBtn" aria-label="Profile">JD
        <div class="profile-menu" id="profileMenu">
          <div class="who"><b>Jordan Duck</b><small>Class of '28 · Oak Hall</small></div>
          <a href="#">My profile</a>
          <a href="#">My splits <span class="badge" style="float:right">3</span></a>
          <a href="#">Dietary preferences</a>
          <a href="#">Settings</a>
          <a href="#">Log out</a>
        </div>
      </button>
      <button class="hamburger" id="hamburger" aria-label="Open menu"><svg class="icon" style="width:24px;height:24px"><use href="#i-menu"/></svg></button>
    </div>
  </div>
  <div class="mobile-menu" id="mobileMenu"><div class="wrap">${navTabs(current)}</div></div>
</header>`;
}

const FOOTER_HTML = `
<footer>
  <div class="wrap">
    <div>
      <div class="logo"><span class="logo-mark"><svg width="30" height="30"><use href="#duck"/></svg></span><span>Duck<em>Dash</em></span></div>
      <p>Bulk prices. Zero waste. Groceries made for students who cook for themselves.</p>
    </div>
    <div><h4>Features</h4><a href="groups.html">Group Finder</a><a href="planner.html">Meal Planner</a><a href="recipes.html">Recipes</a><a href="stores.html">Store Rankings</a></div>
    <div><h4>Company</h4><a href="#">About</a><a href="#">Campus ambassadors</a><a href="#">Contact</a></div>
    <div><h4>Help</h4><a href="#">How splits work</a><a href="#">Safety &amp; pickup</a><a href="#">FAQ</a></div>
    <div class="copy"><span>© 2026 DuckDash · MGT 103 prototype</span><span>Placeholder data for demo purposes</span></div>
  </div>
</footer>
<div class="toast" id="toast"></div>`;

/* ---------- Inject shared layout ---------- */
document.body.insertAdjacentHTML("afterbegin", ICON_SPRITE + headerHTML(document.body.dataset.page));
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
  toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
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
