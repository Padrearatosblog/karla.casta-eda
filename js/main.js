// ==== HELPERS ====
const $id = (id) => document.getElementById(id);
const setHref = (id, url) => {
  const el = $id(id);
  if (el) el.href = url;
};
const setText = (id, text) => {
  const el = $id(id);
  if (el) el.textContent = text;
};

// ==== CONFIG ====
const PHONE_E164 = "34611431885"; // +34 611 431 885 (sin + ni espacios)
const IG_URL = "https://instagram.com/karla.masajesybelleza";
const WA_TEXT = encodeURIComponent(
  "Hola Karla, me gustaría reservar una cita. ¿Qué disponibilidad tienes esta semana?"
);

const waLink = `https://wa.me/${PHONE_E164}?text=${WA_TEXT}`;

// Botones principales
setHref("btnWhats", waLink);
setHref("btnWhats2", waLink);
setHref("btnIg", IG_URL);

// WhatsApp por categoría
const waMasajes = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
  "Hola Karla, quiero reservar un masaje. ¿Qué disponibilidad tienes?"
)}`;
const waMadero = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
  "Hola Karla, quiero información sobre maderoterapia (3/6/9 sesiones). ¿Qué me recomiendas?"
)}`;
const waBelleza = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
  "Hola Karla, quiero reservar un servicio de belleza (semipermanente / lifting). ¿Disponibilidad?"
)}`;

setHref("waMasajes", waMasajes);
setHref("waMadero", waMadero);
setHref("waBelleza", waBelleza);

// Año en footer
setText("year", new Date().getFullYear());

// Maps
const MAPS_URL =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("C/ Bidemokarte 1, Huarte, Peluquería Ilea");
setHref("btnMaps", MAPS_URL);

// ==== Reveal ====
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  // Fallback: si el navegador no soporta IO, muéstralo todo
  reveals.forEach((el) => el.classList.add("on"));
}

// ==== Smooth scroll ====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (ev) => {
    const hash = a.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    ev.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ==== Tabs ====
const data = {
  bienestar: {
    title: "Bienestar",
    img: "img/bienestar.jpg",
    alt: "Masaje de bienestar",
    items: [
      "Masaje relajante con aceites esenciales",
      "Masaje facial japonés",
      "Masaje cráneo-facial",
      "Masaje descontracturante",
      "Masaje para piernas cansadas",
      "Masaje con piedras calientes",
      "Masaje de pies",
    ],
    note: "Perfecto si buscas soltar tensión, desconectar y recuperar energía.",
  },
  reductores: {
    title: "Reductores",
    img: "img/reductores.jpg",
    alt: "Tratamientos reductores y maderoterapia",
    items: [
      "Drenaje linfático y circulatorio",
      "Masaje anticelulítico y drenaje brasileño",
      "Maderoterapia moldeadora",
    ],
    note: "Enfoque en circulación, textura y definición. Ideal con plan de sesiones.",
  },
  belleza: {
    title: "Belleza",
    img: "img/belleza.jpg",
    alt: "Tratamientos de belleza",
    items: [
      "Lifting y tinte de pestañas",
      "Extensión de pestañas pelo a pelo",
      "Depilación de cejas con pinza",
      "Diseño de cejas con henna",
      "Manicura",
      "Esmaltado semipermanente",
      "Uñas de gel / polygel",
    ],
    note: "Acabados finos y naturales, cuidando siempre la salud de pestañas y uñas.",
  },
  depilacion: {
    title: "Depilación",
    img: "img/depilacion.jpg",
    alt: "Depilación facial y corporal",
    items: [
      "Depilación facial con cera caliente (labio y mentón)",
      "Depilación corporal con cera templada",
    ],
    note: "Piel más suave y limpia. Te indico cuidados post-tratamiento para evitar irritación.",
  },
};

const tabs = document.querySelectorAll(".tab");
const content = $id("tabContent");
const tabImage = $id("tabImage");

function renderTab(key) {
  const d = data[key];
  if (!d || !content || !tabImage) return;

  content.innerHTML = `
    <h3>${d.title}</h3>
    <ul class="bullets">
      ${d.items.map((i) => `<li>${i}</li>`).join("")}
    </ul>
    <div class="hint">
      <b>Recomendación:</b> ${d.note}
    </div>
    <div class="heroCTA" style="margin-top:14px;">
      <a class="btn btn-primary" href="${waLink}">Reservar por WhatsApp →</a>
      <a class="btn" href="#mi-trabajo">Conocer más ↑</a>
    </div>
  `;

  tabImage.src = d.img;
  tabImage.alt = d.alt;
}

tabs.forEach((t) => {
  t.addEventListener("click", () => {
    tabs.forEach((x) => {
      x.classList.remove("active");
      x.setAttribute("aria-selected", "false");
    });
    t.classList.add("active");
    t.setAttribute("aria-selected", "true");
    renderTab(t.dataset.tab);
  });
});

// Inicial
renderTab("bienestar");
