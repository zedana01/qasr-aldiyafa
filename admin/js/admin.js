/**
 * Qasr Al-Diyafa Restaurant Executive Admin Engine
 * PIN protected (default: 1234)
 * Full CRUD for Dishes, Categories, Pages, Image Upload (Base64 file upload + URL), and Live Sync
 */

const DEFAULT_DATA = {
  "restaurantInfo": {
    "name": "مطعم قصر الضيافة للولائم والمأكولات العربية الفاخرة",
    "shortName": "قصر الضيافة",
    "enName": "QASR AL-DIYAFA LUXURY ARABIAN RESTAURANT",
    "tagline": "روائع الطهي العربي الأصيل والولائم الملكية",
    "phone": "01027093535",
    "phoneDisplay": "+966 50 123 4567 / 01027093535",
    "whatsapp": "01027093535",
    "whatsappFormatted": "201027093535",
    "email": "booking@qasr-aldiyafa.com",
    "currency": "ر.س",
    "address": "طريق الملك فهد، حي المروج، الرياض، المملكة العربية السعودية",
    "branches": "الرياض: طريق الملك فهد | جدة: طريق الكورنيش | القاهرة: التجمع الخامس، شارع التسعين",
    "workingHours": "يومياً من الساعة 12:00 ظهراً وحتى 01:30 بعد منتصف الليل",
    "adminPin": "1234"
  },
  "categories": [
    {
      "id": "all",
      "slug": "all",
      "name": "كل الأصناف الملكية",
      "badge": "المائدة الملكية الكاملة"
    },
    {
      "id": "grills",
      "slug": "grills",
      "name": "مشويات وولائم عربية",
      "badge": "على الفحم والحطب"
    },
    {
      "id": "mains",
      "slug": "mains",
      "name": "كبسات وطواجن أصيلة",
      "badge": "مطهوة ببطء في الفخار"
    },
    {
      "id": "desserts",
      "slug": "desserts",
      "name": "حلويات وضيافة شرقية",
      "badge": "بالعسل والسمن الفلاحي"
    },
    {
      "id": "salads",
      "slug": "salads",
      "name": "مقبلات وشوربات عربية",
      "badge": "طازجة ومحضرة يومياً"
    }
  ],
  "dishes": [
    {
      "id": 1,
      "name": "ريش ضأن نعيمي مشوية على الفحم",
      "cat": "grills",
      "catName": "مشويات",
      "price": 145,
      "oldPrice": 175,
      "badge": "اختيار الشيف",
      "badgeIcon": "fa-solid fa-crown",
      "image": "images/lamb_chops.jpg",
      "desc": "ريش غنم نعيمي طازجة متبلة بالبهارات النجدية وزيت الزيتون، مشوية على الفحم الطبيعي مع البصل المشوي.",
      "inclusions": "ريش ضأن نعيمي بلدي، بصل مشوي، طماطم مشوية، خبز صاج ساخن، صوص ثومية وطحينة",
      "rating": 5,
      "featured": true
    },
    {
      "id": 2,
      "name": "كباب حاتي مشوي بالخلطة السرية",
      "cat": "grills",
      "catName": "مشويات",
      "price": 120,
      "oldPrice": 140,
      "badge": "الأكثر طلباً",
      "badgeIcon": "fa-solid fa-fire",
      "image": "images/kofta.jpg",
      "desc": "لحم بلدي مفروم مع التوابل الشرقية ودهن اللية، مشوي على السيخ ويُقدم مع سلطة الطحينة الحارة وخبز الصاج.",
      "inclusions": "لحم بلدي طازج، بهارات شرقية حاتية، سلطة طحينة، بقدونس وبصل بالسماق",
      "rating": 5,
      "featured": true
    },
    {
      "id": 3,
      "name": "أوصال لحم تيس بلدي مدخن على الحطب",
      "cat": "grills",
      "catName": "مشويات",
      "price": 135,
      "oldPrice": 160,
      "badge": "تحضير خاص",
      "badgeIcon": "fa-solid fa-award",
      "image": "images/smoked_meat.jpg",
      "desc": "قطع لحم طرية متبلة بماء الورد والهيل العماني، مشوية ببطء ومقدمة مع الفلفل المشوي والليمون المعتق.",
      "inclusions": "لحم تيس بلدي مدخن، هيل نيبالي، ماء ورد جبلي، صوص دبس رمان مدخن",
      "rating": 5,
      "featured": true
    },
    {
      "id": 4,
      "name": "مندي لحم نعيمي بالزعفران الملكي",
      "cat": "mains",
      "catName": "كبسات وطواجن",
      "price": 165,
      "oldPrice": 195,
      "badge": "وليمة ملكية",
      "badgeIcon": "fa-solid fa-crown",
      "image": "images/mandi.jpg",
      "desc": "لحم غنم ندي طازج مطهو في حفرة المندي بالحطب، يُقدم فوق أرز بسمتي بالزعفران والمكسرات الذهبية المقرمشة.",
      "inclusions": "لحم نعيمي بلدي، أرز بسمتي عنبر، زعفران إيراني فاخر، لوز وكاجو وصنوبر، صوص الدقوس الحار",
      "rating": 5,
      "featured": true
    },
    {
      "id": 5,
      "name": "طاجن عكّاوي وموزات بالبصل القاورمة",
      "cat": "mains",
      "catName": "كبسات وطواجن",
      "price": 150,
      "oldPrice": 180,
      "badge": "وصفة تراثية",
      "badgeIcon": "fa-solid fa-fire",
      "image": "images/tajin.jpg",
      "desc": "طاجن فخاري مصري أصيل غني بقطع العكّاوي المطهوة على نار هادئة مع صوص البصل المكرمل وجوزة الطيب والمستكة.",
      "inclusions": "عكّاوي بقري بلدي، بصل قاورمة مكرمل، فخار صعيدي أصلي، صوص مسبك، خبز بلدي ساخن",
      "rating": 5,
      "featured": true
    },
    {
      "id": 6,
      "name": "شوا عماني تقليدي ببهارات ظفار",
      "cat": "mains",
      "catName": "كبسات وطواجن",
      "price": 170,
      "oldPrice": 210,
      "badge": "بهارات ظفار",
      "badgeIcon": "fa-solid fa-award",
      "image": "images/omani_shuwa.jpg",
      "desc": "لحم مطهو تحت الأرض لمدة 24 ساعة مغلفاً بخيش النخيل ومتبلاً بالخل العماني الحامض والفلفل والثوم المعمر.",
      "inclusions": "لحم تيس عماني تقليدي، تتبيلة شواء ظفارية، أرز زعفران، لومي صحاري، صوص التمر الهندي",
      "rating": 5,
      "featured": true
    },
    {
      "id": 7,
      "name": "كنافة نابلسية بالقشطة والفستق",
      "cat": "desserts",
      "catName": "حلويات",
      "price": 55,
      "oldPrice": 70,
      "badge": "سمن فلاحي",
      "badgeIcon": "fa-solid fa-crown",
      "image": "images/kunafa.jpg",
      "desc": "شعيرات الكنافة الذهبية المقرمشة المحضرة بالسمن البلدي الفلاحي، محشوة بقشطة طازجة ومسقية بشربات الزهر الخفيف.",
      "inclusions": "كنافة طازجة، سمن بلدي فلاحي، قشطة عربية غنية، شربات زهر البرتقال، فستق حلبي مدقوق",
      "rating": 5,
      "featured": true
    },
    {
      "id": 8,
      "name": "الحلوى العمانية السلطانية بالزعفران",
      "cat": "desserts",
      "catName": "حلويات",
      "price": 65,
      "oldPrice": 80,
      "badge": "ضيافة سلطانية",
      "badgeIcon": "fa-solid fa-award",
      "image": "images/omani_halwa.jpg",
      "desc": "الحلوى العمانية التقليدية الفاخرة المحضرة بماء الورد الجبلي، الهيل النيبالي، الزعفران الإيراني والمكسرات المحمصة.",
      "inclusions": "حلوى سلطانية بالزعفران، ماء ورد الجبل الأخضر، هيل نيبالي، لوز وجوز محمص، تُقدم مع القهوة العربية",
      "rating": 5,
      "featured": true
    },
    {
      "id": 9,
      "name": "معصوب ملكي بالعسل والقشطة والتمر",
      "cat": "desserts",
      "catName": "حلويات",
      "price": 50,
      "oldPrice": 65,
      "badge": "تراث حجازي",
      "badgeIcon": "fa-solid fa-fire",
      "image": "images/masoub.jpg",
      "desc": "موز مهروس مع خبز الفطير الأسمر الساخن، تعلوه طبقات القشطة وعسل السدر الجبلي الطبيعي وحبات اللوز المقرمش.",
      "inclusions": "فطير بر أسمر، موز بلدي ناضج، قشطة طازجة، عسل سدر دوعني حر، لوز محمص، حبة بركة",
      "rating": 5,
      "featured": true
    },
    {
      "id": 10,
      "name": "سلطة فتوش بدبس الرمان والخبز المقرمش",
      "cat": "salads",
      "catName": "مقبلات وسلطات",
      "price": 40,
      "oldPrice": 50,
      "badge": "طازج 100%",
      "badgeIcon": "fa-solid fa-leaf",
      "image": "images/fattoush.jpg",
      "desc": "خضار موسمية طازجة مع أوراق النعناع والجرجير، حبوب الرمان الحامضة، والخبز المحمص مع تتبيلة دبس الرمان الفاخرة.",
      "inclusions": "خيار، طماطم كرزية، خس روماني، نعناع طازج، سماق بلدي، دبس رمان معتق، زيت زيتون بكر",
      "rating": 5,
      "featured": true
    },
    {
      "id": 11,
      "name": "طحينة ومتبل باذنجان مشوي على الفحم",
      "cat": "salads",
      "catName": "مقبلات وسلطات",
      "price": 38,
      "oldPrice": 48,
      "badge": "نكهة أصيلة",
      "badgeIcon": "fa-solid fa-crown",
      "image": "images/mutabbal.jpg",
      "desc": "باذنجان رومي مشوي على الفحم الطبيعي مهروس مع الطحينة السمراء وعصير الليمون، يعلوه زيت زيتون بكر ممتاز.",
      "inclusions": "باذنجان مدخن، طحينة سمسم صافية، ثوم، ليمون، زيت زيتون بكر معصور على البارد، حبات رمان",
      "rating": 5,
      "featured": true
    },
    {
      "id": 12,
      "name": "شوربة كوارع وموزات بالليمون والمستكة",
      "cat": "salads",
      "catName": "مقبلات وسلطات",
      "price": 45,
      "oldPrice": 60,
      "badge": "غنية ومغذية",
      "badgeIcon": "fa-solid fa-fire",
      "image": "images/soup.jpg",
      "desc": "مرقة غنية ومغذية مستخلصة على نار هادئة، بنكهة المستكة وحبات الهيل وثوم الطشة المحمر والخبز البلدي المقرمش.",
      "inclusions": "مرق كوارع وموزات ضأن، مستكة يونانية، طشة ثوم وكزبرة، ليمون أضاليا، خبز مقرمش",
      "rating": 5,
      "featured": true
    }
  ],
  "pages": {
    "home": {
      "heroTitle": "روائع الطهي العربي الأصيل والولائم الملكية",
      "heroDesc": "نأخذكم في رحلة إلى عوالم النكهات التراثية المطهوة على أصولها، من أشهى الكبسات النجدية والمندي والمشويات الفاخرة إلى الطواجن الفخارية والحلويات الشرقية العريقة.",
      "heroImg": "images/hero_slide1.jpg",
      "heroBadgeTitle": "ولائم ملكية خاصة",
      "heroBadgeSub": "أفخم مجالس الضيافة العربية",
      "storyTitle": "أصالة الطهي العربي وتراث الموائد العريقة",
      "storyP1": "في قصر الضيافة، لا نقدم مجرد وجبات، بل نعيد إحياء فنون الطهي العربي المتوارثة عبر الأجيال. ننتقي لحومنا النعيمية والبلدية الطازجة بعناية فائقة، ونطهوها باستخدام التوابل الأصلية المحمصة وحطب السمر الطبيعي ليخرج كل طبق بعبق الأصالة والفخامة.",
      "storyP2": "سواء كنت تخطط لوليمة عائلية دافئة، عشاء عمل فاخر، أو مناسبة احتفالية خاصة في مجالسنا التراثية الملكية، نعدك بتجربة ضيافة استثنائية تحاكي كرم الضيافة العربية الأصيلة في أبهى صورها."
    },
    "about": {
      "heroTitle": "قصة مطعم قصر الضيافة",
      "heroSubtitle": "أكثر من عقدين من الشغف في تقديم أصول الطهي العربي العريق والولائم الملكية في أجواء من الفخامة التراثية.",
      "storyTitle": "نحن لا نطهو الطعام فحسب، بل نحفظ هوية المائدة العربية",
      "storyP1": "انطلقت رحلتنا من إيمان راسخ بأن المطبخ العربي هو أحد أثرى مطابخ العالم في التنوع والعمق والتاريخ. من أودية ظفار إلى نجد العذية، ومن صعيد مصر الخالد إلى شواطئ الخليج، جمعنا لكم نخبة من أمهر الطهاة وحفظة الوصفات التراثية.",
      "storyP2": "نلتزم بأعلى معايير الجودة الغذائية، مستخدمين أجود الذبائح البلدية الطازجة والسمن الفلاحي النقي وزيت الزيتون المعصور على البارد، لنقدم لأحبائنا وضيوفنا ولائم تليق بمقامهم الرفيع.",
      "image": "images/story_dish1.jpg"
    },
    "contact": {
      "heroTitle": "تواصل مع قصر الضيافة",
      "heroSubtitle": "يسعدنا دائماً استقبال استفساراتكم وحجوزاتكم للولائم والمناسبات الخاصة على مدار الساعة.",
      "whatsapp": "01027093535",
      "phone": "01027093535",
      "email": "booking@qasr-aldiyafa.com",
      "address": "طريق الملك فهد، حي المروج، الرياض، المملكة العربية السعودية",
      "workingHours": "يومياً من الساعة 12:00 ظهراً وحتى 01:30 بعد منتصف الليل"
    }
  }
};

let appData = null;
let currentEditingDishId = null;

// 1. INITIALIZATION
function initData() {
  const local = localStorage.getItem('qasr_data');
  if (local) {
    try {
      appData = JSON.parse(local);
    } catch(e) {
      console.error('Error parsing local qasr_data:', e);
    }
  }

  if (!appData || !Array.isArray(appData.dishes) || appData.dishes.length === 0) {
    appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    saveAppData();
  }

  if (!appData.restaurantInfo) appData.restaurantInfo = { ...DEFAULT_DATA.restaurantInfo };
  if (!appData.categories) appData.categories = [ ...DEFAULT_DATA.categories ];
  if (!appData.pages) appData.pages = JSON.parse(JSON.stringify(DEFAULT_DATA.pages));

  checkAuth();
}

// 2. AUTHENTICATION
function checkAuth() {
  const authed = sessionStorage.getItem('qasr_admin_authed');
  const authScreen = document.getElementById('authScreen');
  if (authed === 'true') {
    authScreen.style.display = 'none';
    renderDashboard();
  } else {
    authScreen.style.display = 'flex';
    setTimeout(() => {
      const pinInp = document.getElementById('pinInput');
      if (pinInp) pinInp.focus();
    }, 150);
  }
}

function handleAuth(e) {
  e.preventDefault();
  const pin = document.getElementById('pinInput').value.trim();
  const validPin = (appData && appData.restaurantInfo && appData.restaurantInfo.adminPin) ? appData.restaurantInfo.adminPin : '1234';

  if (pin === validPin) {
    sessionStorage.setItem('qasr_admin_authed', 'true');
    document.getElementById('authScreen').style.display = 'none';
    renderDashboard();
    showToast('تم تسجيل الدخول بنجاح، مرحباً بك في لوحة تحكم قصر الضيافة!');
  } else {
    const err = document.getElementById('authError');
    err.style.display = 'block';
    document.getElementById('pinInput').value = '';
    setTimeout(() => { err.style.display = 'none'; }, 4000);
  }
}

function logoutAdmin() {
  sessionStorage.removeItem('qasr_admin_authed');
  window.location.reload();
}

function toggleSidebar() {
  const sb = document.getElementById('adminSidebar');
  if (sb) sb.classList.toggle('open');
}

// 3. TAB CONTROLLER
function switchTab(tabId, btn) {
  document.querySelectorAll('.admin-tab-pane').forEach(p => p.style.display = 'none');
  const target = document.getElementById(tabId);
  if (target) target.style.display = 'block';

  if (btn) {
    document.querySelectorAll('.sidebar-menu .menu-link').forEach(l => l.classList.remove('active'));
    btn.classList.add('active');
  }

  const titles = {
    'tabOverview': 'نظرة عامة وإحصائيات المطعم',
    'tabDishes': 'إدارة وتحديث أصناف المنيو',
    'tabCategories': 'أقسام وتصنيفات المأكولات',
    'tabPages': 'محرر وتعديل محتوى الصفحات والبانرات والصور',
    'tabReservations': 'سجل طلبات الحجز والاستفسارات',
    'tabCMS': 'إعدادات المطعم العامة وبيانات التواصل',
    'tabBackup': 'النسخ الاحتياطي واستعادة البيانات'
  };
  document.getElementById('headerTitle').textContent = titles[tabId] || 'لوحة التحكم الشاملة';

  const sb = document.getElementById('adminSidebar');
  if (sb && window.innerWidth <= 900) sb.classList.remove('open');
}

// 4. TOAST NOTIFIER
function showToast(msg) {
  const t = document.getElementById('adminToast');
  document.getElementById('toastMsg').textContent = msg;
  t.style.display = 'flex';
  setTimeout(() => { t.style.display = 'none'; }, 3500);
}

// 5. RENDER DASHBOARD
function renderDashboard() {
  if (!appData) return;

  const dishes = appData.dishes || [];
  const categories = appData.categories || [];
  const reservations = getStoredReservations();

  // Update Stats
  document.getElementById('statDishesCount').textContent = dishes.length;
  document.getElementById('statCatsCount').textContent = categories.length;
  document.getElementById('statResCount').textContent = reservations.length;
  if (appData.restaurantInfo && appData.restaurantInfo.phone) {
    document.getElementById('statWhatsApp').textContent = appData.restaurantInfo.phone;
  }

  populateCategorySelect();
  renderOverviewReservations(reservations);
  renderDishesTable(dishes);
  renderCategoriesTable(categories);
  renderReservationsTable(reservations);
  populatePagesForm();
  populateCMSForm();
}

function populateCategorySelect() {
  const sel = document.getElementById('modalDishCat');
  if (!sel || !appData || !appData.categories) return;
  const cats = appData.categories.filter(c => c.slug !== 'all');
  sel.innerHTML = cats.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');
}

function getStoredReservations() {
  try {
    const raw = localStorage.getItem('qasr_reservations');
    return raw ? JSON.parse(raw) : [
      { id: 1, name: 'سلطان القحطاني', phone: '0501234567', guests: 'وليمة عائلية (12 شخصاً)', date: '2026-10-25', time: '02:30 ظهراً', notes: 'خروف مندي نعيمي كامل في المجلس الملكي' },
      { id: 2, name: 'فهد المطيري', phone: '0559876543', guests: '4 أشخاص', date: '2026-10-24', time: '08:30 مساءً', notes: 'طاولة vip عائلية مع بارتشن' }
    ];
  } catch(e) {
    return [];
  }
}

function renderOverviewReservations(list) {
  const tbody = document.getElementById('overviewRecentReservations');
  if (!tbody) return;
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding:24px;">لا توجد طلبات حجز مسجلة حتى الآن</td></tr>';
    return;
  }

  const wa = (appData.restaurantInfo && appData.restaurantInfo.whatsappFormatted) ? appData.restaurantInfo.whatsappFormatted : '201027093535';

  tbody.innerHTML = list.slice(0, 5).map((r, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td style="font-weight:800;">${r.name}</td>
      <td><a href="tel:${r.phone}" style="color:var(--primary); font-weight:700; text-decoration:none;">${r.phone}</a></td>
      <td><span class="badge badge-primary">${r.guests || r.type || 'طاولة عائلية'}</span></td>
      <td>${r.date || 'اليوم'}</td>
      <td>${r.time || 'مساءً'}</td>
      <td>
        <a href="https://wa.me/${wa}?text=مرحباً%20${encodeURIComponent(r.name)}،%20يسعدنا%20خدمتكم%20في%20مطعم%20قصر%20الضيافة" target="_blank" class="btn btn-outline btn-sm" style="color:#25d366;">
          <i class="fa-brands fa-whatsapp"></i> تواصل
        </a>
      </td>
    </tr>
  `).join('');
}

// 6. DISHES MANAGER
function renderDishesTable(dishes) {
  const tbody = document.getElementById('dishesTableBody');
  if (!tbody) return;
  if (!dishes.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:28px; color:#94a3b8;">لا توجد أصناف مسجلة. اضغط "إضافة صنف جديد" بالأعلى!</td></tr>';
    return;
  }

  tbody.innerHTML = dishes.map(d => {
    const imgSrc = d.image.startsWith('data:') ? d.image : (d.image.startsWith('http') ? d.image : `../${d.image}`);
    return `
    <tr>
      <td><img src="${imgSrc}" alt="${d.name}" class="dish-thumb" onerror="this.src='../images/mandi.jpg'"></td>
      <td style="font-weight:800; max-width:240px; line-height:1.4;">${d.name}</td>
      <td><span class="badge badge-primary">${d.catName || d.cat}</span></td>
      <td style="font-weight:900; color:#c59d27; font-size:15px; white-space:nowrap;">
        ${Number(d.price).toLocaleString('en-US')} ر.س
        ${d.oldPrice ? `<div style="font-size:11.5px; color:#94a3b8; text-decoration:line-through;">${Number(d.oldPrice).toLocaleString('en-US')} ر.س</div>` : ''}
      </td>
      <td><span class="badge badge-warning">${d.badge || 'مميز'}</span></td>
      <td>
        <input type="checkbox" style="cursor:pointer; transform:scale(1.2);" ${d.featured !== false ? 'checked' : ''} onchange="toggleDishFeatured(${d.id}, this.checked)" title="تفعيل في الصفحة الرئيسية">
      </td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-outline btn-sm" onclick="editDish(${d.id})" title="تعديل"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteDish(${d.id})" title="حذف"><i class="fa-solid fa-trash"></i></button>
          <a href="../dish-detail.html?id=${d.id}" target="_blank" class="btn btn-outline btn-sm" title="معاينة"><i class="fa-solid fa-eye"></i></a>
        </div>
      </td>
    </tr>
  `}).join('');
}

function filterAdminDishes() {
  const q = document.getElementById('dishSearchInput').value.toLowerCase().trim();
  const dishes = appData.dishes || [];
  const filtered = dishes.filter(d => (d.name && d.name.toLowerCase().includes(q)) || (d.catName && d.catName.toLowerCase().includes(q)));
  renderDishesTable(filtered);
}

function toggleDishFeatured(dishId, isFeatured) {
  const dish = appData.dishes.find(d => d.id === dishId);
  if (dish) {
    dish.featured = isFeatured;
    saveAppData();
    showToast('تم تحديث حالة الظهور في الصفحة الرئيسية');
  }
}

function openAddDishModal() {
  currentEditingDishId = null;
  document.getElementById('dishModalTitle').textContent = 'إضافة صنف جديد لقائمة المأكولات';
  document.getElementById('dishForm').reset();
  document.getElementById('modalDishId').value = '';
  document.getElementById('modalDishImgPreview').style.display = 'none';
  populateCategorySelect();
  document.getElementById('dishModal').style.display = 'flex';
}

function editDish(id) {
  const dish = appData.dishes.find(d => d.id === id);
  if (!dish) return;
  currentEditingDishId = id;
  populateCategorySelect();

  document.getElementById('dishModalTitle').textContent = 'تعديل الصنف: ' + dish.name;
  document.getElementById('modalDishId').value = dish.id;
  document.getElementById('modalDishName').value = dish.name;
  document.getElementById('modalDishCat').value = dish.cat;
  document.getElementById('modalDishPrice').value = dish.price;
  document.getElementById('modalDishOldPrice').value = dish.oldPrice || '';
  document.getElementById('modalDishBadge').value = dish.badge || '';
  document.getElementById('modalDishImage').value = dish.image;
  document.getElementById('modalDishInclusions').value = dish.inclusions || '';
  document.getElementById('modalDishDesc').value = dish.desc;

  updateDishImgPreview(dish.image);
  document.getElementById('dishModal').style.display = 'flex';
}

function closeDishModal() {
  document.getElementById('dishModal').style.display = 'none';
}

function updateDishImgPreview(src) {
  const prev = document.getElementById('modalDishImgPreview');
  if (src && src.trim()) {
    const fixedSrc = src.startsWith('data:') ? src : (src.startsWith('http') ? src : `../${src}`);
    prev.src = fixedSrc;
    prev.style.display = 'block';
  } else {
    prev.style.display = 'none';
  }
}

function setDishPresetImg(path) {
  document.getElementById('modalDishImage').value = path;
  updateDishImgPreview(path);
}

function handleDishImageFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    document.getElementById('modalDishImage').value = base64;
    updateDishImgPreview(base64);
    showToast('تم تحميل صورة الصنف من جهازك بنجاح!');
  };
  reader.readAsDataURL(file);
}

function handleSaveDish(e) {
  e.preventDefault();
  const idVal = document.getElementById('modalDishId').value;
  const catVal = document.getElementById('modalDishCat').value;
  
  const catObj = (appData.categories || []).find(c => c.slug === catVal);
  const catName = catObj ? catObj.name : catVal;

  const dishData = {
    name: document.getElementById('modalDishName').value.trim(),
    cat: catVal,
    catName: catName,
    price: parseInt(document.getElementById('modalDishPrice').value) || 0,
    oldPrice: parseInt(document.getElementById('modalDishOldPrice').value) || null,
    badge: document.getElementById('modalDishBadge').value.trim() || 'مميز',
    badgeIcon: 'fa-solid fa-crown',
    image: document.getElementById('modalDishImage').value.trim() || 'images/mandi.jpg',
    inclusions: document.getElementById('modalDishInclusions').value.trim(),
    desc: document.getElementById('modalDishDesc').value.trim(),
    rating: 5,
    featured: true
  };

  if (idVal) {
    const idx = appData.dishes.findIndex(d => d.id === parseInt(idVal));
    if (idx !== -1) {
      appData.dishes[idx] = { ...appData.dishes[idx], ...dishData };
      showToast('تم تحديث الصنف بنجاح!');
    }
  } else {
    const newId = appData.dishes.length ? Math.max(...appData.dishes.map(d => d.id || 0)) + 1 : 1;
    appData.dishes.unshift({ id: newId, ...dishData });
    showToast('تمت إضافة الصنف الجديد بنجاح!');
  }

  saveAppData();
  closeDishModal();
  renderDishesTable(appData.dishes);
  document.getElementById('statDishesCount').textContent = appData.dishes.length;
}

function deleteDish(id) {
  if (!confirm('هل أنت متأكد من رغبتك في حذف هذا الطبق نهائياً؟')) return;
  appData.dishes = appData.dishes.filter(d => d.id !== id);
  saveAppData();
  renderDishesTable(appData.dishes);
  document.getElementById('statDishesCount').textContent = appData.dishes.length;
  showToast('تم حذف الصنف بنجاح');
}

// 7. CATEGORIES MANAGER
function renderCategoriesTable(cats) {
  const tbody = document.getElementById('categoriesTableBody');
  if (!tbody) return;
  tbody.innerHTML = cats.map(c => `
    <tr>
      <td style="font-weight:800;">${c.name}</td>
      <td><code style="background:#f1f5f9; padding:3px 8px; border-radius:6px; color:#c59d27; font-weight:700;">${c.slug}</code></td>
      <td><span class="badge badge-primary">${c.badge}</span></td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="alert('قسم رئيسي معتمد')"><i class="fa-solid fa-lock"></i> نشط</button>
      </td>
    </tr>
  `).join('');
}

function openAddCategoryModal() {
  const name = prompt('أدخل اسم القسم الجديد (مثال: بحريات وأسماك):');
  if (!name) return;
  const slug = prompt('أدخل المعرف بالإنجليزية (Slug - مثال: seafood):');
  if (!slug) return;
  const badge = prompt('الشارة الترويجية (مثال: طازج يومياً):') || 'أصناف مختارة';

  appData.categories.push({
    id: slug,
    slug: slug,
    name: name,
    badge: badge
  });
  saveAppData();
  renderCategoriesTable(appData.categories);
  populateCategorySelect();
  document.getElementById('statCatsCount').textContent = appData.categories.length;
  showToast('تمت إضافة القسم الجديد بنجاح!');
}

// 8. PAGES EDITOR (Home, About Us, Contact Us)
function switchPageSubTab(subId) {
  document.querySelectorAll('.page-sub-pane').forEach(p => p.style.display = 'none');
  const target = document.getElementById(subId);
  if (target) target.style.display = 'block';

  const btnHome = document.getElementById('btnPageSubHome');
  const btnAbout = document.getElementById('btnPageSubAbout');
  const btnContact = document.getElementById('btnPageSubContact');

  if (btnHome) btnHome.className = (subId === 'pageSubHome') ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
  if (btnAbout) btnAbout.className = (subId === 'pageSubAbout') ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
  if (btnContact) btnContact.className = (subId === 'pageSubContact') ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
}

function updateHomeHeroImgPreview(src) {
  const prev = document.getElementById('previewHomeHeroImg');
  if (prev && src && src.trim()) {
    const fixed = src.startsWith('data:') ? src : (src.startsWith('http') ? src : `../${src}`);
    prev.src = fixed;
    prev.style.display = 'block';
  }
}

function handleHomeHeroImgFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    document.getElementById('pageHomeHeroImg').value = base64;
    updateHomeHeroImgPreview(base64);
    showToast('تم تحميل صورة البانر من جهازك!');
  };
  reader.readAsDataURL(file);
}

function setHomeHeroPreset(path) {
  document.getElementById('pageHomeHeroImg').value = path;
  updateHomeHeroImgPreview(path);
}

function updateAboutImgPreview(src) {
  const prev = document.getElementById('previewAboutImg');
  if (prev && src && src.trim()) {
    const fixed = src.startsWith('data:') ? src : (src.startsWith('http') ? src : `../${src}`);
    prev.src = fixed;
    prev.style.display = 'block';
  }
}

function handleAboutImgFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    document.getElementById('pageAboutImg').value = base64;
    updateAboutImgPreview(base64);
    showToast('تم تحميل صورة قصة الضيافة من جهازك!');
  };
  reader.readAsDataURL(file);
}

function populatePagesForm() {
  if (!appData || !appData.pages) return;
  const p = appData.pages;

  if (p.home) {
    if (document.getElementById('pageHomeHeroTitle')) document.getElementById('pageHomeHeroTitle').value = p.home.heroTitle || '';
    if (document.getElementById('pageHomeHeroDesc')) document.getElementById('pageHomeHeroDesc').value = p.home.heroDesc || '';
    if (document.getElementById('pageHomeHeroImg')) {
      document.getElementById('pageHomeHeroImg').value = p.home.heroImg || 'images/hero_slide1.jpg';
      updateHomeHeroImgPreview(p.home.heroImg || 'images/hero_slide1.jpg');
    }
    if (document.getElementById('pageHomeStoryTitle')) document.getElementById('pageHomeStoryTitle').value = p.home.storyTitle || '';
  }

  if (p.about) {
    if (document.getElementById('pageAboutHeroTitle')) document.getElementById('pageAboutHeroTitle').value = p.about.heroTitle || '';
    if (document.getElementById('pageAboutHeroSub')) document.getElementById('pageAboutHeroSub').value = p.about.heroSubtitle || '';
    if (document.getElementById('pageAboutStoryTitle')) document.getElementById('pageAboutStoryTitle').value = p.about.storyTitle || '';
    if (document.getElementById('pageAboutStoryP1')) document.getElementById('pageAboutStoryP1').value = p.about.storyP1 || '';
    if (document.getElementById('pageAboutStoryP2')) document.getElementById('pageAboutStoryP2').value = p.about.storyP2 || '';
    if (document.getElementById('pageAboutImg')) {
      document.getElementById('pageAboutImg').value = p.about.image || 'images/story_dish1.jpg';
      updateAboutImgPreview(p.about.image || 'images/story_dish1.jpg');
    }
  }

  if (p.contact) {
    if (document.getElementById('pageContactHeroTitle')) document.getElementById('pageContactHeroTitle').value = p.contact.heroTitle || '';
    if (document.getElementById('pageContactHeroSub')) document.getElementById('pageContactHeroSub').value = p.contact.heroSubtitle || '';
    if (document.getElementById('pageContactWhatsApp')) document.getElementById('pageContactWhatsApp').value = p.contact.whatsapp || '01027093535';
    if (document.getElementById('pageContactPhone')) document.getElementById('pageContactPhone').value = p.contact.phone || '01027093535';
    if (document.getElementById('pageContactEmail')) document.getElementById('pageContactEmail').value = p.contact.email || '';
    if (document.getElementById('pageContactAddress')) document.getElementById('pageContactAddress').value = p.contact.address || '';
    if (document.getElementById('pageContactWorkingHours')) document.getElementById('pageContactWorkingHours').value = p.contact.workingHours || '';
  }
}

function saveAllPagesData() {
  if (!appData) return;
  if (!appData.pages) appData.pages = {};

  appData.pages.home = {
    heroTitle: document.getElementById('pageHomeHeroTitle').value.trim(),
    heroDesc: document.getElementById('pageHomeHeroDesc').value.trim(),
    heroImg: document.getElementById('pageHomeHeroImg').value.trim() || 'images/hero_slide1.jpg',
    storyTitle: document.getElementById('pageHomeStoryTitle').value.trim()
  };

  appData.pages.about = {
    heroTitle: document.getElementById('pageAboutHeroTitle').value.trim(),
    heroSubtitle: document.getElementById('pageAboutHeroSub').value.trim(),
    storyTitle: document.getElementById('pageAboutStoryTitle').value.trim(),
    storyP1: document.getElementById('pageAboutStoryP1').value.trim(),
    storyP2: document.getElementById('pageAboutStoryP2').value.trim(),
    image: document.getElementById('pageAboutImg').value.trim() || 'images/story_dish1.jpg'
  };

  appData.pages.contact = {
    heroTitle: document.getElementById('pageContactHeroTitle').value.trim(),
    heroSubtitle: document.getElementById('pageContactHeroSub').value.trim(),
    whatsapp: document.getElementById('pageContactWhatsApp').value.trim(),
    phone: document.getElementById('pageContactPhone').value.trim(),
    email: document.getElementById('pageContactEmail').value.trim(),
    address: document.getElementById('pageContactAddress').value.trim(),
    workingHours: document.getElementById('pageContactWorkingHours').value.trim()
  };

  if (appData.restaurantInfo) {
    appData.restaurantInfo.whatsapp = appData.pages.contact.whatsapp;
    appData.restaurantInfo.whatsappFormatted = appData.pages.contact.whatsapp.replace(/[^0-9]/g, '');
    appData.restaurantInfo.phone = appData.pages.contact.phone;
    appData.restaurantInfo.email = appData.pages.contact.email;
    appData.restaurantInfo.address = appData.pages.contact.address;
  }

  saveAppData();
  showToast('تم حفظ كافة تعديلات الصفحات والصور بنجاح! تظهر فوراً على الموقع.');
}

// 9. RESERVATIONS MANAGER
function renderReservationsTable(list) {
  const tbody = document.getElementById('reservationsTableBody');
  if (!tbody) return;
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:28px; color:#94a3b8;">لا توجد طلبات حجز مسجلة</td></tr>';
    return;
  }

  const wa = (appData.restaurantInfo && appData.restaurantInfo.whatsappFormatted) ? appData.restaurantInfo.whatsappFormatted : '201027093535';

  tbody.innerHTML = list.map((r, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td style="font-weight:800;">${r.name}</td>
      <td><a href="tel:${r.phone}" style="color:var(--primary); font-weight:700; text-decoration:none;">${r.phone}</a></td>
      <td><span class="badge badge-primary">${r.guests || r.type || 'وليمة'}</span></td>
      <td>${r.date || 'اليوم'}</td>
      <td>${r.time || 'مساءً'}</td>
      <td style="max-width:240px; font-size:12.5px; color:#475569;">${r.notes || '-'}</td>
      <td>
        <a href="https://wa.me/${wa}?text=مرحباً%20${encodeURIComponent(r.name)}،%20يسعدنا%20خدمتكم%20في%20مطعم%20قصر%20الضيافة" target="_blank" class="btn btn-outline btn-sm" style="color:#25d366;">
          <i class="fa-brands fa-whatsapp"></i> رد
        </a>
      </td>
    </tr>
  `).join('');
}

function clearAllReservations() {
  if (!confirm('هل أنت متأكد من مسح جميع طلبات الحجز من السجل؟')) return;
  localStorage.setItem('qasr_reservations', JSON.stringify([]));
  renderReservationsTable([]);
  renderOverviewReservations([]);
  document.getElementById('statResCount').textContent = 0;
  showToast('تم إفراغ سجل الحجوزات بنجاح');
}

// 10. CMS & RESTAURANT INFO
function populateCMSForm() {
  if (!appData || !appData.restaurantInfo) return;
  const a = appData.restaurantInfo;
  if (document.getElementById('cmsName')) document.getElementById('cmsName').value = a.name || '';
  if (document.getElementById('cmsEnName')) document.getElementById('cmsEnName').value = a.enName || '';
  if (document.getElementById('cmsWhatsApp')) document.getElementById('cmsWhatsApp').value = a.whatsapp || '01027093535';
  if (document.getElementById('cmsPhone')) document.getElementById('cmsPhone').value = a.phone || '01027093535';
  if (document.getElementById('cmsEmail')) document.getElementById('cmsEmail').value = a.email || '';
  if (document.getElementById('cmsAddress')) document.getElementById('cmsAddress').value = a.address || '';
  if (document.getElementById('cmsAdminPin')) document.getElementById('cmsAdminPin').value = a.adminPin || '1234';
}

function saveCMSData() {
  if (!appData) return;
  if (!appData.restaurantInfo) appData.restaurantInfo = {};

  appData.restaurantInfo.name = document.getElementById('cmsName').value.trim();
  appData.restaurantInfo.enName = document.getElementById('cmsEnName').value.trim();
  appData.restaurantInfo.whatsapp = document.getElementById('cmsWhatsApp').value.trim();
  appData.restaurantInfo.whatsappFormatted = appData.restaurantInfo.whatsapp.replace(/[^0-9]/g, '');
  appData.restaurantInfo.phone = document.getElementById('cmsPhone').value.trim();
  appData.restaurantInfo.email = document.getElementById('cmsEmail').value.trim();
  appData.restaurantInfo.address = document.getElementById('cmsAddress').value.trim();
  appData.restaurantInfo.adminPin = document.getElementById('cmsAdminPin').value.trim() || '1234';

  saveAppData();
  showToast('تم حفظ كافة إعدادات المطعم بنجاح!');
  document.getElementById('statWhatsApp').textContent = appData.restaurantInfo.phone;
}

// 11. PERSISTENCE & BACKUP
function saveAppData() {
  try {
    localStorage.setItem('qasr_data', JSON.stringify(appData));
  } catch(e) {
    console.error('Failed to save to localStorage:', e);
    showToast('تنبيه: حجم الصور كبير جداً، يرجى استخدام صور أصغر حجماً');
  }
}

function exportDataJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
  const dl = document.createElement('a');
  dl.setAttribute("href", dataStr);
  dl.setAttribute("download", "qasr_backup.json");
  document.body.appendChild(dl);
  dl.click();
  dl.remove();
  showToast('تم تنزيل النسخة الاحتياطية qasr_backup.json بنجاح!');
}

function importDataJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && (parsed.dishes || parsed.restaurantInfo)) {
        appData = parsed;
        saveAppData();
        renderDashboard();
        showToast('تم استيراد البيانات وتطبيقها بنجاح!');
      } else {
        alert('الملف المحدد لا يحتوي على بنية بيانات قصر الضيافة الصحيحة.');
      }
    } catch(err) {
      alert('حدث خطأ أثناء قراءة ملف JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function resetDefaultData() {
  if (!confirm('تحذير: هل أنت متأكد من رغبتك في إعادة تعيين كافة البيانات إلى الإعدادات النموذجية الأصلية؟')) return;
  appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveAppData();
  renderDashboard();
  showToast('تمت استعادة البيانات النموذجية بنجاح!');
}

// Launch
document.addEventListener('DOMContentLoaded', () => {
  initData();
});
