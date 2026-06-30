/* ===========================
   CARFIND — main.js
=========================== */

const FUEL_KA    = { gas: 'ბენზინი', diesel: 'დიზელი', electric: 'ელექტრო', hybrid: 'ჰიბრიდი' };
const FUEL_EMOJI = { gas: '⛽', diesel: '🛢', electric: '⚡', hybrid: '🌿' };
const FUEL_BADGE = { gas: 'badge-gas', diesel: 'badge-diesel', electric: 'badge-electric', hybrid: 'badge-hybrid' };
const TRANS_KA   = { a: 'ავტომატი', m: 'მექანიკა' };
const DRIVE_KA   = { fwd: 'FWD', rwd: 'RWD', awd: 'AWD', '4wd': '4WD' };


// ---- COOKIES ----
(function initCookies() {
  const bar        = document.getElementById('cookieBar');
  const acceptBtn  = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');

  if (localStorage.getItem('cf_cookies')) {
    bar.classList.add('hidden');
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cf_cookies', 'accepted');
    bar.classList.add('hidden');
  });

  declineBtn.addEventListener('click', () => {
    localStorage.setItem('cf_cookies', 'declined');
    bar.classList.add('hidden');
  });
})();


// ---- HEADER SCROLL ----
(function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


// ---- BURGER MENU ----
(function initBurger() {
  const btn     = document.getElementById('burgerBtn');
  const links   = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  function closeMenu() {
    btn.classList.remove('active');
    links.classList.remove('open');
    overlay.classList.remove('open');
  }

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    links.classList.toggle('open');
    overlay.classList.toggle('open');
  });

  overlay.addEventListener('click', closeMenu);
  links.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
})();


// ---- SCROLL TO TOP ----
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


// ---- MULTISELECT ----
(function initMultiselect() {
  document.querySelectorAll('.multiselect').forEach(group => {
    group.querySelectorAll('.ms-option').forEach(btn => {
      btn.addEventListener('click', () => btn.classList.toggle('active'));
    });
  });
})();


// ---- SCROLL REVEAL ----
const sr = ScrollReveal({ distance: '30px', duration: 700, easing: 'ease' });
sr.reveal('.hero-content',  { origin: 'bottom', delay: 100 });
sr.reveal('.about-text',    { origin: 'left' });
sr.reveal('.about-visual',  { origin: 'right', delay: 150 });


// ---- TOP PICKS ----
(function renderTopPicks() {
  const picks = [
    { rank: '01', emoji: '🏎', title: 'Toyota Camry',  desc: 'საიმედოობა + კომფორტი ერთ პაკეტში. ოჯახის სრულყოფილი მანქანა.',  tag: 'საუკეთესო ღირებულება' },
    { rank: '02', emoji: '⚡', title: 'Tesla Model 3', desc: 'ელექტრო რევოლუცია. სრულად ელექტრო, ნულოვანი გამონაბოლქვი.',      tag: 'ელექტრო #1'           },
    { rank: '03', emoji: '🚙', title: 'BMW 3 Series',  desc: 'სპორტული ხასიათი, პრემიუმ ინტერიერი, გერმანული სიზუსტე.',        tag: 'პრემიუმ არჩევანი'     },
  ];

  const grid = document.getElementById('picksGrid');
  grid.innerHTML = picks.map(p => `
    <article class="pick-card">
      <div class="pick-rank">${p.rank}</div>
      <div class="pick-emoji">${p.emoji}</div>
      <h3 class="pick-title">${p.title}</h3>
      <p class="pick-desc">${p.desc}</p>
      <span class="pick-tag">${p.tag}</span>
    </article>
  `).join('');

  sr.reveal('#picksGrid .pick-card', { origin: 'bottom', interval: 150 });
})();


// ---- CAR IMAGES ----
const DIRECT_IMAGES = {
  'honda-cr-v-hybrid-2023': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0QDlsdv5bJ7ojfgbgMbynb_qLEuBDEl8DtigVgV1BTQ&s=10',
  'honda-civic-2022':       'https://cimg3.ibsrv.net/ibimg/hgm/1920x1080-1/100/810/2022-honda-civic-sdn_100810827.jpg',
  'volkswagen-golf-2022':   'https://media.vw.com/assets/images/hero/14757-2022GolfR12.jpg',
  'toyota-camry-2022':      'https://vehicle-images.carscommerce.inc/c3f1-110008038/4T1C11AK6NU655615/9ee0be458454327484210888e0950318.jpg',
  'toyota-corolla-2021':    'https://cdn.motor1.com/images/mgl/vE9NY/s1/toyota-corolla-gr-sport.jpg',
  'ford-mustang-2023':      'https://cimg3.ibsrv.net/ibimg/hgm/1920x1080-1/100/872/2023-ford-mustang-carroll-shelby-centennial-edition_100872307.jpg',
  'bmw-m3-2023':            'https://cka-dash.s3.amazonaws.com/089-0723-BTA21460/mainimage.jpg',
  'audi-a4-2022':           'https://media.ed.edmunds-media.com/audi/a4/2022/oem/2022_audi_a4_sedan_prestige-s-line_fq_oem_2_1600.jpg',
  'mercedes-c-class-2023':  'https://media.ed.edmunds-media.com/mercedes-benz/c-class/2023/oem/2023_mercedes-benz_c-class_sedan_amg-c-43_fq_oem_1_1600.jpg',
  'subaru-outback-2022':    'https://hips.hearstapps.com/hmg-prod/images/2022-subaru-outback-wilderness-107-1617043965.jpg?crop=0.707xw:0.596xh;0.218xw,0.101xh&resize=2048:*',
  'bmw-x5-2022':            'https://hips.hearstapps.com/hmg-prod/images/2020-bmw-x5-m-140-1582911136.jpg?crop=0.915xw:0.772xh;0,0.178xh&resize=2048:*',
  'nissan-leaf-2023':       'https://di-uploads-pod36.dealerinspire.com/nissanofrochesterinc/uploads/2022/08/2023-nissan-leaf-led-headlights.jpg',
  'tesla-model-y-2023':     'https://images.hgmsites.net/med/2023-tesla-model-y_100886991_m.webp',
  'kia-ev6-2023':           'https://hips.hearstapps.com/hmg-prod/images/2023-kia-ev6-gt-002-1669747412.jpg?crop=0.536xw:0.455xh;0.318xw,0.394xh&resize=2048:*',
  'toyota-rav4-hybrid-2023':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpZUKerJRxvbgepejgMhhvTNIQZHvfcQqjk-UnPf20r_S1zPvV5L1q4rb&s=10',
  'tesla-model-3-2023':     'https://www.auto-data.net/images/f49/Tesla-Model-3-facelift-2023.jpg',
  'hyundai-ioniq-5-2023':   'https://images.carexpert.com.au/resize/1200/-/cms/v1/media/2023-03-2023-hyundai-ioniq-5-technniq-awd-hero-16x9-1.jpg',
  'mazda-cx-5-2022':        'https://cdn-fastly.autoguide.com/media/2023/06/29/13439578/mazda-cx-5-review-specs-pricing-videos-and-more.jpg?size=720x845&nocrop=1',
};

function getCarImageUrl(car) {
  const key = `${car.make}-${car.model}-${car.year}`
    .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return DIRECT_IMAGES[key] || `images/${key}.jpg`;
}

const MAKE_TAGS = {
  toyota: 'toyotacamry,sedan', bmw: 'bmw,m3', tesla: 'tesla,model3',
  honda: 'honda,civic', audi: 'audia4,sedan', ford: 'fordmustang',
  mercedes: 'mercedesamg', kia: 'kia,ev6', hyundai: 'hyundai,ioniq',
  volkswagen: 'volkswagen,golf', mazda: 'mazda,cx5',
  nissan: 'nissanleaf', subaru: 'subaruoutback,suv',
};

const MODEL_FALLBACKS = {
  'tesla-model 3':    { tags: 'teslamodel3,electric', lock: 31 },
  'tesla-model y':    { tags: 'teslamodely,suv',       lock: 32 },
  'toyota-rav4 hybrid': { tags: 'toyotarav4,hybrid',   lock: 33 },
  'honda-cr-v hybrid':  { tags: 'hondacrv,hybrid',     lock: 34 },
};

function getFallbackUrl(car) {
  const makeModel = `${car.make.toLowerCase()}-${car.model.toLowerCase()}`;
  const specific  = MODEL_FALLBACKS[makeModel];
  if (specific) return `https://loremflickr.com/800/450/${specific.tags}?lock=${specific.lock}`;

  const make = car.make.toLowerCase();
  const tags = MAKE_TAGS[make] || `${make},car`;
  const lock = Object.keys(MAKE_TAGS).indexOf(make) + 1 || 1;
  return `https://loremflickr.com/800/450/${tags}?lock=${lock}`;
}



// ---- API ----
const API_KEY = 'YOUR_API_NINJA_KEY';

async function fetchCars(params) {
  let q = 'limit=12';
  if (params.make)         q += `&make=${params.make}`;
  if (params.model)        q += `&model=${params.model}`;
  if (params.year)         q += `&year=${params.year}`;
  if (params.fuel_type)    q += `&fuel_type=${params.fuel_type}`;
  if (params.transmission) q += `&transmission=${params.transmission}`;

  const res = await fetch(`https://api.api-ninjas.com/v1/cars?${q}`, {
    headers: { 'X-Api-Key': API_KEY }
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}


// ---- RENDER CARS ----
function renderCars(cars) {
  const grid    = document.getElementById('carsGrid');
  const countEl = document.getElementById('resultsCount');

  if (!cars || cars.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>მოცემული პარამეტრებით მანქანა ვერ მოიძებნა. სცადე სხვა ფილტრი.</p>
      </div>`;
    countEl.textContent = 'ნაპოვნი: 0 შედეგი';
    countEl.style.color = '';
    return;
  }

  countEl.textContent = `ნაპოვნი: ${cars.length} შედეგი`;
  countEl.style.color = '';

  grid.innerHTML = cars.map(car => {
    const imgUrl    = getCarImageUrl(car);
    const fallback  = getFallbackUrl(car);
    const fuelLabel = FUEL_KA[car.fuel_type]    || car.fuel_type || '—';
    const fuelEmoji = FUEL_EMOJI[car.fuel_type] || '🚗';
    const fuelClass = FUEL_BADGE[car.fuel_type] || '';

    return `
      <article class="car-card">
        <div class="car-card-img">
          <div class="car-img-fallback" style="display:none">${fuelEmoji}</div>
          <img
            src="${imgUrl}"
            alt="${car.make} ${car.model}"
            onload="this.classList.add('loaded')"
            onerror="
              if (!this.dataset.fb) {
                this.dataset.fb = '1';
                this.src = '${fallback}';
              } else {
                this.style.display='none';
                this.previousElementSibling.style.display='flex';
              }
            "
          />
        </div>
        <div class="car-card-body">
          <span class="car-badge">${car.year || '—'}</span>
          <h3 class="car-name">${car.make || ''} ${car.model || ''}</h3>
          <div class="car-specs">
            <div class="spec-item">
              <span class="spec-label">ძრავი</span>
              <span class="spec-value">${car.cylinders ? car.cylinders + ' ცილ.' : '—'}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">ტრანსმისია</span>
              <span class="spec-value">${TRANS_KA[car.transmission] || car.transmission || '—'}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">საწვავი</span>
              <span class="spec-value car-badge ${fuelClass}" style="display:inline-block;margin:0;padding:3px 8px">${fuelEmoji} ${fuelLabel}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">წამყვანი</span>
              <span class="spec-value">${DRIVE_KA[car.drive] || car.drive || '—'}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">მ/მ (ქ.)</span>
              <span class="spec-value">${car.city_mpg ? car.city_mpg + ' mpg' : '—'}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">კლასი</span>
              <span class="spec-value">${car.class ? car.class.replace(/-/g, ' ') : '—'}</span>
            </div>
          </div>
        </div>
      </article>`;
  }).join('');

}


// ---- FILTER HELPERS ----
function getSelectedFuels() {
  return [...document.querySelectorAll('#fuelMultiselect .ms-option.active')]
    .map(b => b.dataset.value);
}
function getSelectedTrans() {
  return [...document.querySelectorAll('#transMultiselect .ms-option.active')]
    .map(b => b.dataset.value);
}


// ---- CLEAR FILTERS ----
document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('filterMake').value  = '';
  document.getElementById('filterModel').value = '';
  document.getElementById('filterYear').value  = '';
  document.getElementById('heroSearch').value  = '';

  document.querySelectorAll('.ms-option').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('#fuelMultiselect .ms-option[data-value="gas"], #fuelMultiselect .ms-option[data-value="diesel"]')
    .forEach(b => b.classList.add('active'));
  document.querySelectorAll('#transMultiselect .ms-option')
    .forEach(b => b.classList.add('active'));
});


// ---- MOCK DATA ----
const MOCK_CARS = [
  { make: 'Toyota',     model: 'Camry',       year: 2022, fuel_type: 'gas',      transmission: 'a', cylinders: 4, city_mpg: 28,  drive: 'fwd', class: 'midsize-car' },
  { make: 'Toyota',     model: 'Corolla',      year: 2021, fuel_type: 'gas',      transmission: 'm', cylinders: 4, city_mpg: 30,  drive: 'fwd', class: 'compact-car' },
  { make: 'Toyota',     model: 'RAV4 Hybrid',  year: 2023, fuel_type: 'hybrid',   transmission: 'a', cylinders: 4, city_mpg: 42,  drive: 'awd', class: 'suv'         },
  { make: 'BMW',        model: 'M3',            year: 2023, fuel_type: 'gas',      transmission: 'a', cylinders: 6, city_mpg: 19,  drive: 'rwd', class: 'compact-car' },
  { make: 'BMW',        model: 'X5',            year: 2022, fuel_type: 'hybrid',   transmission: 'a', cylinders: 6, city_mpg: 30,  drive: 'awd', class: 'suv'         },
  { make: 'Tesla',      model: 'Model 3',       year: 2023, fuel_type: 'electric', transmission: 'a', cylinders: 0, city_mpg: 140, drive: 'rwd', class: 'midsize-car' },
  { make: 'Tesla',      model: 'Model Y',       year: 2023, fuel_type: 'electric', transmission: 'a', cylinders: 0, city_mpg: 131, drive: 'awd', class: 'suv'         },
  { make: 'Honda',      model: 'Civic',         year: 2022, fuel_type: 'gas',      transmission: 'm', cylinders: 4, city_mpg: 31,  drive: 'fwd', class: 'compact-car' },
  { make: 'Honda',      model: 'CR-V Hybrid',   year: 2023, fuel_type: 'hybrid',   transmission: 'a', cylinders: 4, city_mpg: 40,  drive: 'awd', class: 'suv'         },
  { make: 'Audi',       model: 'A4',            year: 2022, fuel_type: 'gas',      transmission: 'a', cylinders: 4, city_mpg: 24,  drive: 'awd', class: 'midsize-car' },
  { make: 'Ford',       model: 'Mustang',       year: 2023, fuel_type: 'gas',      transmission: 'a', cylinders: 8, city_mpg: 15,  drive: 'rwd', class: 'sports-car'  },
  { make: 'Mercedes',   model: 'C-Class',       year: 2023, fuel_type: 'gas',      transmission: 'a', cylinders: 4, city_mpg: 22,  drive: 'rwd', class: 'compact-car' },
  { make: 'Kia',        model: 'EV6',           year: 2023, fuel_type: 'electric', transmission: 'a', cylinders: 0, city_mpg: 134, drive: 'rwd', class: 'midsize-car' },
  { make: 'Hyundai',    model: 'Ioniq 5',       year: 2023, fuel_type: 'electric', transmission: 'a', cylinders: 0, city_mpg: 132, drive: 'awd', class: 'midsize-car' },
  { make: 'Volkswagen', model: 'Golf',          year: 2022, fuel_type: 'gas',      transmission: 'm', cylinders: 4, city_mpg: 29,  drive: 'fwd', class: 'compact-car' },
  { make: 'Mazda',      model: 'CX-5',          year: 2022, fuel_type: 'gas',      transmission: 'a', cylinders: 4, city_mpg: 25,  drive: 'awd', class: 'suv'         },
  { make: 'Nissan',     model: 'Leaf',          year: 2023, fuel_type: 'electric', transmission: 'a', cylinders: 0, city_mpg: 121, drive: 'fwd', class: 'compact-car' },
  { make: 'Subaru',     model: 'Outback',       year: 2022, fuel_type: 'gas',      transmission: 'a', cylinders: 4, city_mpg: 26,  drive: 'awd', class: 'suv'         },
];


// ---- SEARCH ----
async function doSearch(heroMake = '') {
  const loader  = document.getElementById('loader');
  const grid    = document.getElementById('carsGrid');
  const countEl = document.getElementById('resultsCount');

  const make  = heroMake || document.getElementById('filterMake').value.trim();
  const model = document.getElementById('filterModel').value.trim();
  const year  = document.getElementById('filterYear').value.trim();
  const fuels = getSelectedFuels();
  const trans = getSelectedTrans();

  grid.innerHTML = '';
  loader.classList.remove('hidden');
  countEl.textContent = 'ვეძებთ...';

  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });

  try {
    const params = { make, model, year, fuel_type: fuels[0] || '', transmission: trans[0] || '' };
    const cars   = await fetchCars(params);
    loader.classList.add('hidden');
    renderCars(cars);
  } catch (_) {
    // Demo mode — ადგილობრივი ფილტრაცია
    let filtered = MOCK_CARS.slice();

    if (make) {
      const q = make.toLowerCase();
      filtered = filtered.filter(c =>
        c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q)
      );
    }
    if (model) {
      const q = model.toLowerCase();
      filtered = filtered.filter(c => c.model.toLowerCase().includes(q));
    }
    if (year) {
      filtered = filtered.filter(c => c.year >= parseInt(year, 10));
    }
    if (fuels.length > 0) {
      filtered = filtered.filter(c => fuels.includes(c.fuel_type));
    }
    if (trans.length > 0) {
      filtered = filtered.filter(c => trans.includes(c.transmission));
    }

    loader.classList.add('hidden');
    renderCars(filtered);

    if (filtered.length > 0) {
      countEl.textContent = `Demo — ${filtered.length} შედეგი`;
      countEl.style.color = 'var(--gold)';
    }
  }
}


// ---- SEARCH EVENTS ----
document.getElementById('searchBtn').addEventListener('click', () => doSearch());

document.getElementById('heroSearchBtn').addEventListener('click', () => {
  const val = document.getElementById('heroSearch').value.trim();
  if (val) document.getElementById('filterMake').value = val;
  doSearch(val);
});

document.getElementById('heroSearch').addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const val = e.target.value.trim();
  if (val) document.getElementById('filterMake').value = val;
  doSearch(val);
});

document.getElementById('filterMake').addEventListener('keydown',  e => { if (e.key === 'Enter') doSearch(); });
document.getElementById('filterModel').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });


// ---- INITIAL LOAD ----
window.addEventListener('DOMContentLoaded', () => doSearch());
