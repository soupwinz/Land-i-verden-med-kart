/***********************
  FEILVISNING (i Koder)
************************/
window.onerror = function (msg, url, line) {
  const el = document.getElementById("globalFeedback");
  if (el) {
    el.textContent = `JS-feil: ${msg} (linje ${line})`;
    el.className = "feedback bad";
  }
};

/***********************
  DATA (198)
************************/
const DATA = {
  "Europa": [
    "Albania","Andorra","Belarus","Belgia","Bosnia-Hercegovina","Bulgaria","Danmark","Estland","Finland","Frankrike",
    "Hellas","Irland","Island","Italia","Kosovo","Kroatia","Latvia","Liechtenstein","Litauen","Luxembourg","Malta",
    "Moldova","Monaco","Montenegro","Nederland","Nord-Makedonia","Norge","Polen","Portugal","Romania","Russland",
    "San Marino","Serbia","Slovakia","Slovenia","Spania","Storbritannia","Sveits","Sverige","Tsjekkia","Tyskland",
    "Ukraina","Ungarn","Vatikanstaten","Østerrike","Kypros"
  ],
  "Asia": [
    "Afghanistan","Armenia","Aserbajdsjan","Bahrain","Bangladesh","Bhutan","Brunei","De forente arabiske emirater",
    "Filippinene","Georgia","India","Indonesia","Irak","Iran","Israel","Japan","Jordan","Kambodsja","Kasakhstan","Kina",
    "Kirgisistan","Kuwait","Laos","Libanon","Malaysia","Maldivene","Mongolia","Myanmar","Nepal","Nord-Korea","Oman",
    "Pakistan","Palestina","Qatar","Saudi-Arabia","Singapore","Sri Lanka","Sør-Korea","Syria","Tadsjikistan","Thailand",
    "Timor-Leste","Turkmenistan","Tyrkia","Usbekistan","Vietnam","Yemen","Taiwan"
  ],
  "Afrika": [
    "Algerie","Angola","Benin","Botswana","Burkina Faso","Burundi","Den sentralafrikanske republikk",
    "Den demokratiske republikken Kongo","Djibouti","Egypt","Ekvatorial-Guinea","Elfenbenskysten","Eritrea","Eswatini",
    "Etiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Kamerun","Kapp Verde","Kenya","Komorene","Kongo",
    "Lesotho","Liberia","Libya","Madagaskar","Malawi","Mali","Marokko","Mauritania","Mauritius","Mosambik","Namibia",
    "Niger","Nigeria","Rwanda","São Tomé og Príncipe","Senegal","Seychellene","Sierra Leone","Somalia","Sudan",
    "Sør-Afrika","Sør-Sudan","Tanzania","Togo","Tsjad","Tunisia","Uganda","Vest-Sahara","Zambia","Zimbabwe"
  ],
  "Amerika": [
    "Antigua og Barbuda","Argentina","Bahamas","Barbados","Belize","Bolivia","Brasil","Canada","Chile","Colombia",
    "Costa Rica","Cuba","Den dominikanske republikk","Dominica","Ecuador","El Salvador","Grenada","Guatemala","Guyana",
    "Haiti","Honduras","Jamaica","Mexico","Nicaragua","Panama","Paraguay","Peru","Saint Kitts og Nevis","Saint Lucia",
    "Saint Vincent og Grenadinene","Surinam","Trinidad og Tobago","Uruguay","USA","Venezuela"
  ],
  "Oseania": [
    "Australia","Fiji","Kiribati","Marshalløyene","Mikronesia","Nauru","New Zealand","Palau","Papua Ny-Guinea",
    "Salomonøyene","Samoa","Tonga","Tuvalu","Vanuatu"
  ]
};

const ALIASES = new Map([
  // USA / UK
  ["usa","USA"], ["us","USA"], ["united states","USA"], ["united states of america","USA"],
  ["uk","Storbritannia"], ["united kingdom","Storbritannia"], ["great britain","Storbritannia"], ["britain","Storbritannia"],

  // Europe
  ["belarus","Belarus"], ["hviterussland","Belarus"],
  ["czechia","Tsjekkia"], ["czech republic","Tsjekkia"],
  ["north macedonia","Nord-Makedonia"], ["macedonia","Nord-Makedonia"],
  ["russian federation","Russland"], ["russia","Russland"],
  ["vatican","Vatikanstaten"], ["vatican city","Vatikanstaten"], ["holy see","Vatikanstaten"],

  // Asia
  ["uae","De forente arabiske emirater"], ["united arab emirates","De forente arabiske emirater"],
  ["south korea","Sør-Korea"], ["republic of korea","Sør-Korea"],
  ["north korea","Nord-Korea"], ["dprk","Nord-Korea"],
  ["turkey","Tyrkia"], ["turkiye","Tyrkia"], ["türkiye","Tyrkia"],
  ["east timor","Timor-Leste"], ["timor leste","Timor-Leste"],
  ["palestine","Palestina"], ["state of palestine","Palestina"],
  ["taipei","Taiwan"], ["republic of china","Taiwan"],

  // Africa
  ["ivory coast","Elfenbenskysten"], ["cote d ivoire","Elfenbenskysten"], ["côte d ivoire","Elfenbenskysten"],
  ["western sahara","Vest-Sahara"],
  ["cabo verde","Kapp Verde"], ["cape verde","Kapp Verde"],
  ["swaziland","Eswatini"],
  ["drc","Den demokratiske republikken Kongo"],
  ["dr congo","Den demokratiske republikken Kongo"],
  ["democratic republic of the congo","Den demokratiske republikken Kongo"],
  ["congo kinshasa","Den demokratiske republikken Kongo"],
  ["republic of the congo","Kongo"],
  ["congo brazzaville","Kongo"],

  // Americas / Oceania
  ["dominican republic","Den dominikanske republikk"],
  ["suriname","Surinam"],
  ["new zealand","New Zealand"],
  ["papua new guinea","Papua Ny-Guinea"],
  ["solomon islands","Salomonøyene"],
  ["marshall islands","Marshalløyene"],
  ["micronesia","Mikronesia"], ["federated states of micronesia","Mikronesia"]
]);

/***********************
  ISO2 (canonical -> ISO)
************************/
const ISO2 = {
  "Afghanistan":"AF","Albania":"AL","Algerie":"DZ","Andorra":"AD","Angola":"AO","Antigua og Barbuda":"AG",
  "Argentina":"AR","Armenia":"AM","Australia":"AU","Aserbajdsjan":"AZ","Bahamas":"BS","Bahrain":"BH","Bangladesh":"BD",
  "Barbados":"BB","Belarus":"BY","Belgia":"BE","Belize":"BZ","Benin":"BJ","Bhutan":"BT","Bolivia":"BO","Bosnia-Hercegovina":"BA",
  "Botswana":"BW","Brasil":"BR","Brunei":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI","Canada":"CA","Chile":"CL",
  "Colombia":"CO","Costa Rica":"CR","Cuba":"CU","Danmark":"DK","Den dominikanske republikk":"DO","Den sentralafrikanske republikk":"CF",
  "Den demokratiske republikken Kongo":"CD","Djibouti":"DJ","Dominica":"DM","Ecuador":"EC","Egypt":"EG","Ekvatorial-Guinea":"GQ",
  "El Salvador":"SV","Elfenbenskysten":"CI","Eritrea":"ER","Estland":"EE","Eswatini":"SZ","Etiopia":"ET","Fiji":"FJ",
  "Filippinene":"PH","Finland":"FI","Frankrike":"FR","Gabon":"GA","Gambia":"GM","Georgia":"GE","Ghana":"GH","Grenada":"GD",
  "Guatemala":"GT","Guinea":"GN","Guinea-Bissau":"GW","Guyana":"GY","Haiti":"HT","Hellas":"GR","Honduras":"HN","India":"IN",
  "Indonesia":"ID","Irak":"IQ","Iran":"IR","Irland":"IE","Island":"IS","Israel":"IL","Italia":"IT","Japan":"JP","Jamaica":"JM",
  "Jordan":"JO","Kamerun":"CM","Kambodsja":"KH","Kapp Verde":"CV","Kasakhstan":"KZ","Kenya":"KE","Kina":"CN","Kirgisistan":"KG",
  "Kiribati":"KI","Komorene":"KM","Kongo":"CG","Kosovo":"XK","Kroatia":"HR","Kuwait":"KW","Kypros":"CY","Laos":"LA","Latvia":"LV",
  "Lesotho":"LS","Libanon":"LB","Liberia":"LR","Libya":"LY","Liechtenstein":"LI","Litauen":"LT","Luxembourg":"LU","Madagaskar":"MG",
  "Malawi":"MW","Malaysia":"MY","Maldivene":"MV","Mali":"ML","Malta":"MT","Marokko":"MA","Marshalløyene":"MH","Mauritania":"MR",
  "Mauritius":"MU","Mexico":"MX","Mikronesia":"FM","Moldova":"MD","Monaco":"MC","Mongolia":"MN","Montenegro":"ME","Mosambik":"MZ",
  "Myanmar":"MM","Namibia":"NA","Nauru":"NR","Nederland":"NL","Nepal":"NP","New Zealand":"NZ","Nicaragua":"NI","Niger":"NE","Nigeria":"NG",
  "Nord-Korea":"KP","Nord-Makedonia":"MK","Norge":"NO","Oman":"OM","Pakistan":"PK","Palau":"PW","Palestina":"PS","Panama":"PA","Papua Ny-Guinea":"PG",
  "Paraguay":"PY","Peru":"PE","Polen":"PL","Portugal":"PT","Qatar":"QA","Romania":"RO","Russland":"RU","Rwanda":"RW",
  "Saint Kitts og Nevis":"KN","Saint Lucia":"LC","Saint Vincent og Grenadinene":"VC","Salomonøyene":"SB","Samoa":"WS","San Marino":"SM",
  "Saudi-Arabia":"SA","Senegal":"SN","Serbia":"RS","Seychellene":"SC","Sierra Leone":"SL","Singapore":"SG","Slovakia":"SK","Slovenia":"SI",
  "Somalia":"SO","Spania":"ES","Sri Lanka":"LK","Storbritannia":"GB","Sudan":"SD","Surinam":"SR","Sveits":"CH","Sverige":"SE","Sør-Afrika":"ZA",
  "Sør-Korea":"KR","Sør-Sudan":"SS","Syria":"SY","São Tomé og Príncipe":"ST","Tadsjikistan":"TJ","Taiwan":"TW","Tanzania":"TZ","Thailand":"TH",
  "Timor-Leste":"TL","Togo":"TG","Tonga":"TO","Trinidad og Tobago":"TT","Tsjad":"TD","Tsjekkia":"CZ","Tunisia":"TN","Tyrkia":"TR",
  "Turkmenistan":"TM","Tuvalu":"TV","Tyskland":"DE","Uganda":"UG","Ukraina":"UA","Ungarn":"HU","Uruguay":"UY","USA":"US","Usbekistan":"UZ",
  "Vanuatu":"VU","Vatikanstaten":"VA","Venezuela":"VE","Vest-Sahara":"EH","Vietnam":"VN","Yemen":"YE","Zambia":"ZM","Zimbabwe":"ZW","Østerrike":"AT"
};

/***********************
  STATE / STORAGE
************************/
const STORAGE_KEY = "landquiz_198_clean_v1";
let isFinished = false;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(st) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
}

const state = loadState();

function ensureContinent(cont) {
  if (!Array.isArray(state[cont])) state[cont] = [];
}

function totalAll() {
  return Object.values(DATA).reduce((a, arr) => a + arr.length, 0);
}
function totalFound() {
  return Object.keys(DATA).reduce((a, c) => a + (state[c]?.length || 0), 0);
}

/***********************
  NORMALIZE / INDEX
************************/
function normalize(s) {
  return s.toLowerCase().trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'".,()-]/g, " ")
    .replace(/\s+/g, " ");
}

function buildIndex() {
  const idx = new Map();
  for (const [cont, arr] of Object.entries(DATA)) {
    for (const c of arr) idx.set(normalize(c), { cont, canonical: c });
  }
  for (const [alias, canonical] of ALIASES.entries()) {
    const hit = idx.get(normalize(canonical));
    if (hit) idx.set(normalize(alias), hit);
  }
  return idx;
}
const INDEX = buildIndex();

/***********************
  UI HELPERS
************************/
function setGlobal(msg, ok) {
  const el = document.getElementById("globalFeedback");
  el.textContent = msg || "";
  el.className = "feedback " + (msg ? (ok ? "ok" : "bad") : "");
}

function updateCounters() {
  const found = totalFound();
  const all = totalAll();
  document.getElementById("totalCounts").textContent = `Totalt: ${found} / ${all} — ${all - found} gjenstår`;
  document.getElementById("mapCounts").textContent = `${found} / ${all}`;
  document.getElementById("modalCounts").textContent = `(${found}/${all})`;
}

/***********************
  MISSING
************************/
function computeMissing() {
  const res = {};
  for (const [cont, arr] of Object.entries(DATA)) {
    ensureContinent(cont);
    const s = new Set(state[cont]);
    res[cont] = arr.filter(x => !s.has(x));
  }
  return res;
}

function showResults() {
  const results = document.getElementById("results");
  const missingTotals = document.getElementById("missingTotals");
  const missingByContinent = document.getElementById("missingByContinent");

  const missing = computeMissing();
  const missingCount = Object.values(missing).reduce((a, arr) => a + arr.length, 0);
  missingTotals.textContent = `${missingCount} land gjenstår (av ${totalAll()}).`;

  missingByContinent.innerHTML = "";
  for (const [cont, list] of Object.entries(missing)) {
    const block = document.createElement("div");
    block.className = "missingBlock";

    const h3 = document.createElement("h3");
    h3.textContent = `${cont} — ${list.length} gjenstår`;
    block.appendChild(h3);

    const wrap = document.createElement("div");
    wrap.className = "missingList";

    list.slice().sort((a,b)=>a.localeCompare(b,"no")).forEach(name => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = name;
      wrap.appendChild(chip);
    });

    block.appendChild(wrap);
    missingByContinent.appendChild(block);
  }

  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

/***********************
  MAP: style + show only 198 + color found
************************/
function getFoundSet() {
  const s = new Set();
  for (const cont of Object.keys(DATA)) {
    for (const c of (state[cont] || [])) s.add(c);
  }
  return s;
}

function styleSvgRoot(svg) {
  // Sørg for at den skalerer pent i rammen
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  // Hvis viewBox mangler: prøv å lage en
  if (!svg.getAttribute("viewBox")) {
    try {
      const bb = svg.getBBox();
      svg.setAttribute("viewBox", `${bb.x} ${bb.y} ${bb.width} ${bb.height}`);
    } catch {}
  }
}

function ensureBaseCss(svg) {
  // Legg inn minimal CSS i SVG, så vi alltid får grå/grønn + grenser
  let style = svg.querySelector("style[data-landquiz]");
  if (!style) {
    style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    style.setAttribute("data-landquiz", "1");
    style.textContent = `
      .country { fill: #e6e6e6; stroke: #666; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
      .country.found { fill: #1ea84a; }
    `;
    svg.insertBefore(style, svg.firstChild);
  }
}

// Hjelpere for <g id="no"> vs <path id="no">
function setCountryVisible(el, canonical) {
  if (!el) return;
  const tag = (el.tagName || "").toLowerCase();

  if (tag === "g") {
    el.style.display = "";
    const shapes = el.querySelectorAll("path, polygon, polyline");
    shapes.forEach(s => {
      s.style.display = "";
      s.classList.add("country");
      s.setAttribute("data-canonical", canonical);
    });
    return;
  }

  el.style.display = "";
  el.classList.add("country");
  el.setAttribute("data-canonical", canonical);
}

function hideIfCountryId(el) {
  const id = (el.id || "").toLowerCase();
  const countryIdRegex = /^[a-z]{2}$/; // no, se, us osv.
  const isCountry = countryIdRegex.test(id) || id === "xk"; // Kosovo
  if (!isCountry) return;

  el.style.display = "none";
  const tag = (el.tagName || "").toLowerCase();
  if (tag === "g") {
    el.querySelectorAll("path, polygon, polyline").forEach(s => {
      s.style.display = "none";
      s.classList.remove("country","found");
      s.removeAttribute("data-canonical");
    });
  } else {
    el.classList.remove("country","found");
    el.removeAttribute("data-canonical");
  }
}

function applyMapColors(svg) {
  if (!svg) return;
  const found = getFoundSet();
  svg.querySelectorAll(".country").forEach(el => {
    const canonical = el.getAttribute("data-canonical");
    if (canonical && found.has(canonical)) el.classList.add("found");
    else el.classList.remove("found");
  });
}

function setupMapObject(obj) {
  if (!obj) return;

  obj.addEventListener("load", () => {
    const doc = obj.contentDocument;
    const svg = doc && doc.querySelector("svg");
    if (!svg) return;

    styleSvgRoot(svg);
    ensureBaseCss(svg);

    // Skjul kun land-id'er, ikke alt
    svg.querySelectorAll("[id]").forEach(hideIfCountryId);

    // Vis kun våre 198
    for (const cont of Object.keys(DATA)) {
      for (const canonical of DATA[cont]) {
        const code = ISO2[canonical];
        if (!code) continue;
        const id = code.toLowerCase();

        const el = svg.getElementById(id);
        if (!el) continue;

        setCountryVisible(el, canonical);
      }
    }

    // Fjern Antarktis om det finnes
    const aq = svg.getElementById("aq");
    if (aq) aq.style.display = "none";

    applyMapColors(svg);
  });
}

/***********************
  PAN/ZOOM (uten bibliotek)
************************/
function setupPanZoom() {
  const viewport = document.getElementById("panzoomViewport");
  const obj = document.getElementById("worldMapObjModal");

  // Vi pan/zoomer selve <object>-elementet med CSS transform
  let scale = 1;
  let tx = 0;
  let ty = 0;

  let pointers = new Map();
  let start = { scale: 1, tx: 0, ty: 0 };
  let pinchStartDist = 0;
  let pinchStartCenter = { x: 0, y: 0 };

  function apply() {
    obj.style.transformOrigin = "0 0";
    obj.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  }

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }

  function center(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  function clampScale(s) {
    return Math.max(1, Math.min(20, s));
  }

  viewport.addEventListener("pointerdown", (e) => {
    viewport.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 1) {
      start = { scale, tx, ty };
    }

    if (pointers.size === 2) {
      const pts = Array.from(pointers.values());
      pinchStartDist = distance(pts[0], pts[1]);
      pinchStartCenter = center(pts[0], pts[1]);
      start = { scale, tx, ty };
    }
  });

  viewport.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 1) {
      const p = Array.from(pointers.values())[0];
      // Vi trenger delta – bruk movement hvis mulig, ellers beregn grovt
      // Vi bruker start + forskjell fra første pos.
      // Løsning: lagre en "last" pos pr pointer
      // (enkel variant):
      // Bruk prev fra start? (ok nok i praksis)
      // Her: vi panorerer ved å legge til movement (best)
      tx += e.movementX || 0;
      ty += e.movementY || 0;
      apply();
    }

    if (pointers.size === 2) {
      const pts = Array.from(pointers.values());
      const d = distance(pts[0], pts[1]);
      const c = center(pts[0], pts[1]);

      const factor = d / (pinchStartDist || d);
      const newScale = clampScale(start.scale * factor);

      // Zoom rundt pinch-senter
      const rect = viewport.getBoundingClientRect();
      const cx = c.x - rect.left;
      const cy = c.y - rect.top;

      const sx = (cx - start.tx) / start.scale;
      const sy = (cy - start.ty) / start.scale;

      scale = newScale;
      tx = cx - sx * scale;
      ty = cy - sy * scale;

      apply();
    }
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size === 0) {
      // små justeringer kan legges til senere, men ikke nødvendig
    }
  }

  viewport.addEventListener("pointerup", endPointer);
  viewport.addEventListener("pointercancel", endPointer);
  viewport.addEventListener("pointerleave", endPointer);

  // Reset når modal åpnes
  return function reset() {
    scale = 1; tx = 0; ty = 0;
    pointers.clear();
    apply();
  };
}

/***********************
  RENDER CONTINENTS
************************/
function render() {
  const root = document.getElementById("continents");
  const tpl = document.getElementById("continentTpl");
  root.innerHTML = "";

  for (const [cont, countries] of Object.entries(DATA)) {
    ensureContinent(cont);

    const node = tpl.content.cloneNode(true);
    const nameEl = node.querySelector(".name");
    const countsEl = node.querySelector(".counts");
    const input = node.querySelector(".input");
    const feedback = node.querySelector(".feedback");
    const list = node.querySelector(".list");

    nameEl.textContent = cont;
    input.disabled = isFinished;

    function setFeedback(msg, ok) {
      feedback.textContent = msg || "";
      feedback.className = "feedback " + (msg ? (ok ? "ok" : "bad") : "");
    }

    function updateCounts() {
      const found = state[cont].length;
      const total = countries.length;
      countsEl.textContent = `${found} / ${total} funnet — ${total - found} gjenstår`;
    }

    function renderList() {
      list.innerHTML = "";
      const items = state[cont].slice().sort((a,b)=>a.localeCompare(b,"no"));

      items.forEach(c => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = c;

        const del = document.createElement("button");
        del.type = "button";
        del.textContent = "×";
        del.title = "Fjern";

        del.addEventListener("click", () => {
          state[cont] = state[cont].filter(x => x !== c);
          saveState(state);
          updateCounts();
          updateCounters();
          renderList();
          setFeedback("", true);
          setGlobal("", true);
          refreshMaps();
        });

        chip.appendChild(del);
        list.appendChild(chip);
      });
    }

    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      if (isFinished) return;

      const raw = input.value;
      input.value = "";

      const key = normalize(raw);
      if (!key) return;

      const hit = INDEX.get(key);
      if (!hit) {
        setFeedback("Ikke gjenkjent som land i fasiten.", false);
        return;
      }

      if (hit.cont !== cont) {
        setFeedback(`Det landet ligger under: ${hit.cont}.`, false);
        return;
      }

      if (state[cont].includes(hit.canonical)) {
        setFeedback("Du har allerede skrevet det.", false);
        return;
      }

      state[cont].push(hit.canonical);
      saveState(state);

      renderList();
      updateCounts();
      updateCounters();
      setFeedback("Godkjent ✅", true);
      setGlobal(`+ ${hit.canonical}`, true);
      refreshMaps();
    });

    updateCounts();
    renderList();
    root.appendChild(node);
  }

  updateCounters();
}

/***********************
  MAP REFRESH (inline + modal)
************************/
function getSvgFromObject(objId) {
  const obj = document.getElementById(objId);
  const doc = obj && obj.contentDocument;
  return doc ? doc.querySelector("svg") : null;
}

function refreshMaps() {
  const svg1 = getSvgFromObject("worldMapObj");
  const svg2 = getSvgFromObject("worldMapObjModal");
  applyMapColors(svg1);
  applyMapColors(svg2);
}

/***********************
  MODAL OPEN/CLOSE
************************/
let resetPanZoom = null;

function openModal() {
  const modal = document.getElementById("mapModal");
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  updateCounters();
  if (resetPanZoom) resetPanZoom();
}

function closeModal() {
  const modal = document.getElementById("mapModal");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
}

/***********************
  INIT
************************/
function setInputsDisabled(disabled) {
  document.querySelectorAll(".continent .input").forEach(inp => {
    inp.disabled = disabled;
    inp.placeholder = disabled ? "Avsluttet (trykk Nullstill for ny runde)" : "Skriv et land og trykk Enter…";
  });
}

document.getElementById("resetAll").addEventListener("click", () => {
  for (const c of Object.keys(DATA)) state[c] = [];
  saveState(state);

  isFinished = false;
  document.getElementById("results").hidden = true;
  setInputsDisabled(false);

  render();
  refreshMaps();
  setGlobal("Nullstilt.", true);
});

document.getElementById("finishBtn").addEventListener("click", () => {
  isFinished = true;
  setInputsDisabled(true);
  setGlobal("Avsluttet. Se listen over land du mangler under.", true);
  showResults();
});

document.getElementById("closeResults").addEventListener("click", () => {
  document.getElementById("results").hidden = true;
});

// Modal knapper
document.getElementById("openMap").addEventListener("click", openModal);
document.getElementById("closeMap").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  closeModal();
}, true);
document.getElementById("mapModal").addEventListener("click", (e) => {
  if (e.target && e.target.id === "mapModal") closeModal();
});

// Start
document.addEventListener("DOMContentLoaded", () => {
  // Tving modal lukket ved start (Koder-sikkerhet)
  closeModal();

  // Render UI
  render();

  // Sett opp kart-objektene
  setupMapObject(document.getElementById("worldMapObj"));
  setupMapObject(document.getElementById("worldMapObjModal"));

  // Sett opp pan/zoom i modal
  resetPanZoom = setupPanZoom();

  // Når kartet er lastet: oppdater farger
  setTimeout(refreshMaps, 300);
});