/* =========================================
   MEDMAC - main.js
   - Mobile menu
   - Reveal on scroll
   - Hero slider (3 images)
   - Counters
   - Projects data (AR/EN)
   - Project details via query string ?id=1
   - WhatsApp form submit
   - Simple Lightbox for gallery
   ========================================= */

function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return [...root.querySelectorAll(sel)]; }

function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

(function mobileMenu(){
  const burger = qs("[data-burger]");
    const menu = qs("[data-menu]");
    
  if(!burger || !menu) return;

  burger.addEventListener("click", ()=>{
    menu.classList.toggle("open");
  });

  qsa("a", menu).forEach(a=>{
    a.addEventListener("click", ()=> menu.classList.remove("open"));
  });

  document.addEventListener("click", (e)=>{
    const inside = menu.contains(e.target) || burger.contains(e.target);
    if(!inside) menu.classList.remove("open");
  });
})();

(function revealOnScroll(){
  const items = qsa(".reveal");
  if(!items.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add("in-view");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el=> io.observe(el));
})();

(function heroSlider(){
  const slides = qsa("[data-slide]");
  if(!slides.length) return;

  let idx = 0;
  slides[idx].classList.add("active");

  setInterval(()=>{
    slides[idx].classList.remove("active");
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add("active");
  }, 4200);
})();

(function counters(){
  const els = qsa("[data-count]");
  if(!els.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(!en.isIntersecting) return;
      const el = en.target;
      const target = Number(el.getAttribute("data-count") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1200;
      const start = performance.now();

      function tick(t){
        const p = Math.min(1, (t - start) / duration);
        const val = Math.floor(p * target);
        el.textContent = val.toLocaleString("en-US") + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.35 });

  els.forEach(el=> io.observe(el));
})();

/* ---------------------------
   Projects Data (UPDATED)
   Featured 9 projects with details (as requested)
--------------------------- */

const PROJECTS_AR = [
  {
    id: 1,
    title: "Swiss Hotel",
    city: "مكة المكرمة",
    year: "2012",
    scope: "الدور الأرضي مطاعم وخدمات + 15 دور متكرر",
    materials: ["رخام", "جرانيت", "سيراميك", "بورسلان"],
    desc: "تنفيذ تشطيبات رخام وجرانيت بمستوى فندقي: مداخل ولوبيات وممرات بتفاصيل دقيقة وتشطيب نهائي نظيف.",
    heroImg: "assets/images/img22.png",
    gallery: ["assets/images/img22.png","assets/images/img70.png","assets/images/img28.png"]
  },
  {
    id: 2,
    title: "Alaryyan Towers",
    city: "مكة المكرمة",
    year: "2011–2014",
    scope: "4 أبراج فندقية + أسواق + مواقف + خدمات + مطاعم + 19 دور متكرر",
    materials: ["رخام", "جرانيت", "حجر طبيعي"],
    desc: "مشروع متعدد الأبراج مع عناية بتطابق العروق ومعالجة الحواف في المساحات العامة لإظهار فخامة متجانسة.",
    heroImg: "assets/images/img52.png",
    gallery: ["assets/images/img40.png","assets/images/img52.png","assets/images/img53.png","assets/images/img54.png","assets/images/img71.png","assets/images/img23.png"]
  },
  {
    id: 3,
    title: "Alsafwa Towers",
    city: "مكة المكرمة",
    year: "2007–2010",
    scope: "خمسة أبراج + فندق 5 نجوم + أسواق تجارية + مواقف سيارات",
    materials: ["رخام", "جرانيت", "سيراميك"],
    desc: "تنفيذ راقٍ للمداخل والممرات والمساحات الحيوية بخامات مختارة وتشطيب يليق بمستوى مشروع فندقي ضخم.",
    heroImg: "assets/images/img45.png",
    gallery: ["assets/images/img56.png","assets/images/img57.png","assets/images/img58.png","assets/images/img59.png","assets/images/img3.png","assets/images/img2.png"]
  },
  {
    id: 4,
    title: "Alwaha Palace",
    city: "الرياض",
    year: "2015",
    scope: "قصر سكني على مساحة 1000 م² (تشطيبات رخامية فاخرة)",
    materials: ["رخام", "جرانيت", "بورسلان"],
    desc: "تشطيبات داخلية فاخرة مع اهتمام بالزوايا والبروفايلات وتناسق الألوان مع الإضاءة لإخراج Premium فعلاً.",
    heroImg: "assets/images/img5.png",
    gallery: ["assets/images/img6.png","assets/images/img7.png","assets/images/img9.png","assets/images/img10.png","assets/images/img11.png","assets/images/img13.png","assets/images/img15.png"]
  },
  {
    id: 5,
    title: "Outhman Bin Affan Mosque",
    city: "مكة المكرمة",
    year: "2015",
    scope: "تنفيذ أعمال مسجد (أرضيات/حوائط/تفاصيل تشطيب)",
    materials: ["رخام", "جرانيت", "حجر"],
    desc: "أعمال مساجد تتطلب دقة عالية في الالتقاءات والزوايا والفواصل، مع خامات تتحمل الاستخدام وسهلة العناية.",
    heroImg: "assets/images/img31.png",
    gallery: ["assets/images/img32.png","assets/images/img33.png","assets/images/img35.png"]
  },
  {
    id: 6,
    title: "Diamond Beach Hotel",
    city: "السعودية",
    year: "2008",
    scope: "مشروع فندقي/سكني (تشطيبات رخام وحجر)",
    materials: ["رخام", "جرانيت", "سيراميك"],
    desc: "تشطيبات متينة ومناسبة للاستخدام اليومي مع الحفاظ على لمسة فخامة في مناطق الاستقبال والخدمات.",
    heroImg: "assets/images/img36.png",
    gallery: ["assets/images/img37.png","assets/images/img38.png","assets/images/img39.png","assets/images/img41.png"]
  },
  {
    id: 7,
    title: "Al Oulayyan Hotels",
    city: "السعودية",
    year: "—",
    scope: "تشطيبات رخامية وحجرية لمساحات الاستقبال والخدمات ضمن مشاريع فندقية",
    materials: ["رخام", "حجر طبيعي", "بورسلان"],
    desc: "تركيز على جودة التفاصيل في المداخل واللوبيات والممرات لإحساس فندقي راقٍ ومتوازن.",
    heroImg: "assets/images/img42.png",
    gallery: ["assets/images/img42.png","assets/images/img43.png"]
  },
  {
    id: 8,
    title: "Zahran Business Center",
    city: "جدة",
    year: "2010–2011",
    scope: "الدور الأرضي أسواق + مواقف + 14 دور متكرر",
    materials: ["رخام", "جرانيت", "سيراميك", "بورسلان"],
    desc: "تنفيذ لوبيات ومساحات داخلية بخامات مختارة ومسارات تركيب دقيقة تناسب الاستخدام اليومي العالي.",
    heroImg: "assets/images/img46.png",
    // gallery: ["assets/images/img31.png","assets/images/img19.png","assets/images/img21.png","assets/images/img11.png"]
  },
  {
    id: 9,
    title: "Tayba Residential",
    city: "جدة",
    year: "2014–2016",
    scope: "مجموعة مباني سكنية + (تشطيبات رخام/سيراميك/بورسلان)",
    materials: ["سيراميك", "رخام", "بورسلان"],
    desc: "تنفيذ سكني يعتمد على المتانة والعملية مع الحفاظ على لمسة فخامة في المداخل والمساحات المشتركة.",
    heroImg: "assets/images/img47.png",
    gallery: ["assets/images/img48.png"]
  }
];

const PROJECTS_EN = [
  {
    id: 1,
    title: "Swiss Hotel",
    city: "Makkah",
    year: "2012",
    scope: "Ground floor restaurants & services + 15 typical floors",
    materials: ["Marble", "Granite", "Ceramic", "Porcelain"],
    desc: "Hotel-grade marble and granite finishing for entrances, lobbies and corridors with clean details and premium handover.",
    heroImg: "assets/images/img22.png",
    gallery: ["assets/images/img22.png","assets/images/img70.png","assets/images/img28.png"]
  },
  {
    id: 2,
    title: "Alaryyan Towers",
    city: "Makkah",
    year: "2011–2014",
    scope: "4 hotel towers + retail + parking + services + restaurants + 19 typical floors",
    materials: ["Marble", "Granite", "Natural Stone"],
    desc: "A multi-tower landmark with refined vein matching and edge finishing across key public areas.",
    heroImg: "assets/images/img52.png",
    gallery: ["assets/images/img40.png","assets/images/img52.png","assets/images/img53.png","assets/images/img54.png","assets/images/img71.png","assets/images/img23.png"]
  },
  {
    id: 3,
    title: "Alsafa Towers",
    city: "Makkah",
    year: "2007–2010",
    scope: "Five towers + 5-star hotel + retail + parking",
    materials: ["Marble", "Granite", "Ceramic"],
    desc: "High-end finishing for major entrances, corridors and key areas — designed to match a large luxury hotel destination.",
    heroImg: "assets/images/img45.png",
    gallery: ["assets/images/img56.png","assets/images/img57.png","assets/images/img58.png","assets/images/img59.png","assets/images/img3.png","assets/images/img2.png"]
  },
  {
    id: 4,
    title: "Alwaha Palace",
    city: "Riyadh",
    year: "2015",
    scope: "1000 m² residential palace (premium marble works)",
    materials: ["Marble", "Granite", "Porcelain"],
    desc: "Luxury interiors with refined edges, profiles and lighting harmony for a truly premium outcome.",
    heroImg: "assets/images/img5.png",
    gallery: ["assets/images/img6.png","assets/images/img7.png","assets/images/img9.png","assets/images/img10.png","assets/images/img11.png","assets/images/img13.png","assets/images/img15.png"]
  },
  {
    id: 5,
    title: "Othman Bin Affan Mosque",
    city: "Makkah",
    year: "2015",
    scope: "Mosque works (floors/walls/finishing details)",
    materials: ["Marble", "Granite", "Stone"],
    desc: "Precision mosque execution with clean joints, accurate corners and durable materials built for high usage.",
    heroImg: "assets/images/img31.png",
    gallery: ["assets/images/img32.png","assets/images/img33.png","assets/images/img35.png"]
  },
  {
    id: 6,
    title: "Diamond Beach Hotel",
    city: "Saudi Arabia",
    year: "2008",
    scope: "Hotel/residential finishing (marble & stone works)",
    materials: ["Marble", "Granite", "Ceramic"],
    desc: "Durable solutions for daily use while maintaining a premium look in reception and service areas.",
    heroImg: "assets/images/img36.png",
    gallery: ["assets/images/img37.png","assets/images/img38.png","assets/images/img39.png","assets/images/img41.png"]
  },
  {
    id: 7,
    title: "Al Oulayyan Hotels",
    city: "Saudi Arabia",
    year: "—",
    scope: "Marble & stone finishing for reception and service areas across hotel projects",
    materials: ["Marble", "Natural Stone", "Porcelain"],
    desc: "Detail-focused hotel finishing for entrances, lobbies and corridors that feels premium and consistent.",
    heroImg: "assets/images/img42.png",
    gallery: ["assets/images/img42.png","assets/images/img43.png"]
  },
  {
    id: 8,
    title: "Zahran Business Center",
    city: "Jeddah",
    year: "2010–2011",
    scope: "Ground floor retail + parking + 14 typical floors",
    materials: ["Marble", "Granite", "Ceramic", "Porcelain"],
    desc: "Premium interiors for lobbies and shared areas with precise installation paths built for high daily traffic.",
    heroImg: "assets/images/img46.png"
    // gallery intentionally omitted (same as AR)
  },
  {
    id: 9,
    title: "Tayna Residential",
    city: "Jeddah",
    year: "2014–2016",
    scope: "Residential buildings (marble/ceramic/porcelain finishing)",
    materials: ["Ceramic", "Marble", "Porcelain"],
    desc: "Residential execution focused on durability and practicality, with premium entrances and neat shared-area finishing.",
    heroImg: "assets/images/img47.png",
    gallery: ["assets/images/img48.png"]
  }
];


/* ---------------------------
   Projects listing render
--------------------------- */
(function renderProjects(){
  const wrap = qs("[data-projects]");
  if(!wrap) return;

  const isEN = document.documentElement.getAttribute("lang") === "en";
  const data = isEN ? PROJECTS_EN : PROJECTS_AR;

  wrap.innerHTML = data.map(p => `
    <a class="project-card reveal" href="${isEN ? "project-en.html" : "project.html"}?id=${p.id}">
      <div class="project-thumb">
        <img src="${p.heroImg}" alt="${p.title}">
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="chip-row">
          <span class="chip">${p.city}</span>
          <span class="chip">${p.year}</span>
          <span class="chip">${p.scope}</span>
        </div>
      </div>
    </a>
  `).join("");

  // Re-run reveal observer for newly injected cards
  const items = qsa(".reveal", wrap);
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add("in-view");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el=> io.observe(el));
})();

/* ---------------------------
   Project detail render
--------------------------- */
(function renderProjectDetail(){
  const root = qs("[data-project-detail]");
  if(!root) return;

  const isEN = document.documentElement.getAttribute("lang") === "en";
  const data = isEN ? PROJECTS_EN : PROJECTS_AR;

  const id = Number(getQueryParam("id") || "1");
  const p = data.find(x => x.id === id) || data[0];

  qs("[data-p-title]").textContent = p.title;
  qs("[data-p-desc]").textContent = p.desc;

  qs("[data-p-hero]").src = p.heroImg;
  qs("[data-p-hero]").alt = p.title;

  qs("[data-p-meta]").innerHTML = `
    <div class="chip-row">
      <span class="chip">${isEN ? "City" : "المدينة"}: ${p.city}</span>
      <span class="chip">${isEN ? "Year" : "السنة"}: ${p.year}</span>
      <span class="chip">${isEN ? "Scope" : "النطاق"}: ${p.scope}</span>
    </div>
  `;

  qs("[data-p-materials]").innerHTML = p.materials.map(m=>`<span class="chip">${m}</span>`).join("");

  const gal = qs("[data-p-gallery]");
  if(gal){
    gal.innerHTML = p.gallery.map(src=>`
      <div class="g-item reveal" data-lightbox>
        <img src="${src}" alt="${p.title}">
      </div>
    `).join("");

    // ✅ Re-init reveal for newly injected gallery items
    const newItems = qsa(".reveal", gal);
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add("in-view");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    newItems.forEach(el=> io.observe(el));
  }

})();

/* ---------------------------
   WhatsApp form
--------------------------- */
(function whatsappForm(){
  const form = qs("[data-wa-form]");
  if(!form) return;

  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    // غيّر الرقم ده لرقم الشركة واتساب بصيغة دولية بدون +
    const phone = form.getAttribute("data-wa-phone") || "966505299680";

    const name = qs("[name='name']", form)?.value?.trim() || "";
    const email = qs("[name='email']", form)?.value?.trim() || "";
    const subject = qs("[name='subject']", form)?.value?.trim() || "";
    const message = qs("[name='message']", form)?.value?.trim() || "";

    const isEN = document.documentElement.getAttribute("lang") === "en";
    const text = isEN
      ? `Hello, I'm ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
      : `مرحباً، أنا ${name}\nالإيميل: ${email}\nالموضوع: ${subject}\nالرسالة: ${message}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
})();

/* ---------------------------
   Lightbox (Gallery + project gallery)
--------------------------- */
(function lightbox(){
  const lb = qs(".lightbox");
  if(!lb) return;

  function open(src){
    const img = qs("img", lb);
    img.src = src;
    lb.classList.add("open");
  }
  function close(){
    lb.classList.remove("open");
    const img = qs("img", lb);
    img.src = "";
  }

  document.addEventListener("click", (e)=>{
    const item = e.target.closest("[data-lightbox]");
    if(item){
      const img = item.querySelector("img");
      if(img?.src) open(img.src);
    }
    if(e.target === lb) close();
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") close();
  });
})();

/* Scroll progress bar */
(function scrollProgress(){
  const bar = document.querySelector(".scroll-progress");
  if(!bar) return;

  function onScroll(){
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const height = (doc.scrollHeight - doc.clientHeight) || 1;
    const pct = Math.min(100, Math.max(0, (scrollTop / height) * 100));
    bar.style.width = pct + "%";
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
