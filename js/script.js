const grid = document.querySelector("#game-grid");
const search = document.querySelector("#game-search");
const count = document.querySelector("#result-count");
document.querySelector("#current-year").textContent = new Date().getFullYear();
const playerIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19zM16 5.5a3 3 0 0 1 0 5.8m1 3a4.5 4.5 0 0 1 3.5 4.4V19h-3"/></svg>';
const imageFiles = {
  110327: "110327.jpg",
  115746: "115746.jpg",
  167355: "167355.png",
  233078: "233078.jpg",
  373106: "373106.jpg",
  450539: "450539.jpg",
};

function renderGames() {
  const query = search.value.trim().toLocaleLowerCase("es");
  const visible = games.filter(([name]) =>
    name.toLocaleLowerCase("es").includes(query),
  );
  count.textContent = `${visible.length} ${visible.length === 1 ? "juego" : "juegos"}`;
  grid.innerHTML = visible.length
    ? visible
        .map(([name, id, ideal, solo]) => {
          const number = games.findIndex((game) => game[0] === name) + 1;
          const url = id
            ? `https://boardgamegeek.com/boardgame/${id}`
            : "https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=Carnival%20of%20Sins";
          const imageFile = imageFiles[id] || `${id}.webp`;
          return `<article class="game-card">
      <div class="cover" aria-hidden="true"><img class="cover-image" src="img/${imageFile}" alt="" loading="lazy" decoding="async" /></div>
      <div class="card-body">
        <div class="card-meta"><span class="game-index">N.º ${String(number).padStart(2, "0")}</span><span class="solo-tag">${solo ? `Solitario ${solo}` : "Mejor en compañía"}</span></div>
        <h2 class="game-title">${name}</h2>
        <div class="ideal"><span class="ideal-label">Ideal · orientativo</span><span class="players">${playerIcon}${ideal} jugadores</span></div>
        <a class="bgg-link" href="${url}" target="_blank" rel="noreferrer" aria-label="${name}: ficha en BoardGameGeek"><span>Ficha en BoardGameGeek</span><span aria-hidden="true">↗</span></a>
      </div>
    </article>`;
        })
        .join("")
    : '<p class="empty">No hay juegos que coincidan con esa búsqueda.</p>';
}

search.addEventListener("input", renderGames);
renderGames();

const themeButton = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const savedTheme = localStorage.getItem("juegos-theme");
const themeIcons = {
  dark: '<path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z"/>',
  light:
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
};

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#1e211d" : "#f2f0e9";
  themeIcon.innerHTML = themeIcons[theme];
}

applyTheme(savedTheme === "light" ? "light" : "dark");

themeButton.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme;
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("juegos-theme", next);
});

const backToTopButton = document.querySelector("#back-to-top");
const backToTopThreshold = 360;

function updateBackToTopVisibility() {
  const isVisible = window.scrollY > backToTopThreshold;
  backToTopButton.classList.toggle("is-visible", isVisible);
  backToTopButton.setAttribute("aria-hidden", String(!isVisible));
  backToTopButton.tabIndex = isVisible ? 0 : -1;
}

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
updateBackToTopVisibility();

backToTopButton.addEventListener("click", () => {
  const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  window.scrollTo({ top: 0, behavior });
});
