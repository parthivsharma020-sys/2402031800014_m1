const games = [
  { name: "Shadow Blade", genre: "Action", price: 899, old: 1499, emoji: "⚔️" },
  { name: "Dragon Quest", genre: "RPG", price: 1199, old: 1999, emoji: "🐉" },
  { name: "Strike Force", genre: "FPS", price: 749, old: 999, emoji: "🔫" },
  { name: "Neon Racer", genre: "Racing", price: 599, old: 899, emoji: "🏎️" },
  {
    name: "World Cup 2026",
    genre: "Sports",
    price: 999,
    old: 1499,
    emoji: "⚽",
  },
  { name: "Space Hunter", genre: "Action", price: 799, old: 1299, emoji: "🚀" },
  { name: "Dungeon Kings", genre: "RPG", price: 649, old: 999, emoji: "🗡️" },
  { name: "Warzone", genre: "FPS", price: 0, old: 0, emoji: "💣" },
  { name: "Speed Kings", genre: "Racing", price: 349, old: 599, emoji: "🏁" },
  { name: "Cricket Pro", genre: "Sports", price: 699, old: 999, emoji: "🏏" },
];

let cart = [];
let activeFilter = "All";

function cardHTML(g) {
  const priceHTML =
    g.price === 0
      ? '<span style="color:green;font-weight:bold;">FREE</span>'
      : `<span class="price">₹${g.price}</span><span class="old-price">₹${g.old}</span>`;
  return `<div class="col-6 col-md-4 col-lg-3">
    <div class="game-card">
      <div class="game-emoji">${g.emoji}</div>
      <div class="game-body">
        <div class="genre-badge">${g.genre}</div>
        <div class="game-title">${g.name}</div>
        <div>${priceHTML}</div>
        <button class="add-btn" onclick="addCart('${g.name}')">Add to Cart</button>
      </div>
    </div>
  </div>`;
}

function showPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-link")
    .forEach((n) => n.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");
  const nl = document.getElementById("nav-" + id);
  if (nl) nl.classList.add("active");
  window.scrollTo(0, 0);
  if (id === "store") renderStore();
  if (id === "cart") renderCart();
}

function renderHome() {
  document.getElementById("home-cards").innerHTML = games
    .slice(0, 4)
    .map(cardHTML)
    .join("");
}

function renderStore() {
  const q = (document.getElementById("search-box")?.value || "").toLowerCase();
  const list = games.filter(
    (g) =>
      (activeFilter === "All" || g.genre === activeFilter) &&
      g.name.toLowerCase().includes(q),
  );
  const wrap = document.getElementById("store-cards");
  wrap.innerHTML = list.map(cardHTML).join("");
  document.getElementById("no-results").style.display = list.length
    ? "none"
    : "block";
}

function setFilter(f, el) {
  activeFilter = f;
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  renderStore();
}

function addCart(name) {
  if (cart.find((c) => c.name === name)) {
    showToast("Already in cart!");
    return;
  }
  const g = games.find((g) => g.name === name);
  cart.push(g);
  document.getElementById("cart-count").textContent = cart.length;
  showToast("Added: " + name);
}

function removeCart(name) {
  cart = cart.filter((c) => c.name !== name);
  document.getElementById("cart-count").textContent = cart.length;
  renderCart();
}

function renderCart() {
  const wrap = document.getElementById("cart-items");
  if (!cart.length) {
    wrap.innerHTML =
      '<div style="text-align:center;padding:40px;color:#999;"><div style="font-size:3rem;">🛒</div><p>Your cart is empty.</p><button class="btn-red" onclick="showPage(\'store\')">Shop Now</button></div>';
    document.getElementById("sub-total").textContent = "₹0";
    document.getElementById("grand-total").textContent = "₹0";
    return;
  }
  wrap.innerHTML = cart
    .map(
      (g) => `
    <div class="cart-row">
      <div class="cart-emoji">${g.emoji}</div>
      <div>
        <strong>${g.name}</strong><br>
        <span style="color:#e94560;font-weight:bold;">${g.price === 0 ? "FREE" : "₹" + g.price}</span>
      </div>
      <button class="remove-btn" onclick="removeCart('${g.name}')">Remove</button>
    </div>`,
    )
    .join("");
  const total = cart.reduce((s, g) => s + g.price, 0);
  document.getElementById("sub-total").textContent = "₹" + total;
  document.getElementById("grand-total").textContent = "₹" + total;
}

function checkout() {
  if (!cart.length) {
    showToast("Cart is empty!");
    return;
  }
  cart = [];
  document.getElementById("cart-count").textContent = 0;
  renderCart();
  showToast("Order placed! Thank you 🎉");
}

function sendMsg() {
  const n = document.getElementById("c-name").value.trim();
  const e = document.getElementById("c-email").value.trim();
  const m = document.getElementById("c-msg").value.trim();
  if (!n || !e || !m) {
    showToast("Please fill all fields.");
    return;
  }
  showToast("Message sent! We will reply soon.");
  ["c-name", "c-email", "c-msg"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window._t);
  window._t = setTimeout(() => t.classList.remove("show"), 2800);
}

renderHome();
