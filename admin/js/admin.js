/**
 * Qasr Al-Diyafa Full Admin Control Panel Engine
 * - Full Categories CRUD (Add, Edit, Delete, Slug, Real Modals)
 * - Full Dishes CRUD with Device Image Upload
 * - Full Pages Content Editors (Home, Menu, About Us, Reservation, Contact)
 * - Save and Cancel for every page
 * - Live Client-Side Sync
 */

const DEFAULT_DATA = {
  "restaurantInfo": {
    "name": "مطعم قصر الضيافة للولائم والمأكولات العربية الفاخرة",
    "shortName": "قصر الضيافة",
    "enName": "QASR AL-DIYAFA LUXURY ARABIAN RESTAURANT",
    "tagline": "روائع الطهي العربي الأصيل والولائم الملكية",
    "phone": "01027093535",
    "whatsapp": "01027093535",
    "whatsappFormatted": "201027093535",
    "email": "booking@qasr-aldiyafa.com",
    "currency": "ر.س",
    "address": "طريق الملك فهد، حي المروج، الرياض، المملكة العربية السعودية",
    "workingHours": "يومياً من الساعة 12:00 ظهراً وحتى 01:30 بعد منتصف الليل",
    "adminPin": "1234"
  },
  "categories": [
    { "id": "all", "slug": "all", "name": "كل الأصناف الملكية", "badge": "المائدة الملكية الكاملة" },
    { "id": "grills", "slug": "grills", "name": "مشويات وولائم عربية", "badge": "على الفحم والحطب" },
    { "id": "mains", "slug": "mains", "name": "كبسات وطواجن أصيلة", "badge": "مطهوة ببطء في الفخار" },
    { "id": "desserts", "slug": "desserts", "name": "حلويات وضيافة شرقية", "badge": "بالعسل والسمن الفلاحي" },
    { "id": "salads", "slug": "salads", "name": "مقبلات وشوربات عربية", "badge": "طازجة ومحضرة يومياً" }
  ],
  "dishes": [
    {
      "id": 1,
      "cat": "grills",
      "catName": "مشويات وولائم عربية",
      "name": "ريش ضأن مشوية على الفحم",
      "price": 145,
      "oldPrice": 175,
      "badge": "الأكثر طلباً",
      "badgeIcon": "fa-solid fa-fire",
      "image": "images/lamb_chops.jpg",
      "desc": "ريش غنم نعيمي بلدي متبلة بالزعفران والبهارات النجدية ومشوية على نار هادئة.",
      "inclusions": "أرز بسمتي عنبر، طحينة بالسمسم، ثومية بلدية، سلطة خضراء، خبز تنور طازج"
    },
    {
      "id": 2,
      "cat": "grills",
      "catName": "مشويات وولائم عربية",
      "name": "كفتة قصر الضيافة المشوية",
      "price": 95,
      "oldPrice": 115,
      "badge": "وصفة الشيف",
      "badgeIcon": "fa-solid fa-crown",
      "image": "images/kofta.jpg",
      "desc": "لحم بقري بلدي مفروم مع دهن الضأن والبصل المشوي والبهارات الحلبية الفاخرة.",
      "inclusions": "أرز زعفران، خضار مشوية، بطاطس ويدجز مبهرة، صلصة دقوس حارة"
    },
    {
      "id": 3,
      "cat": "grills",
      "catName": "مشويات وولائم عربية",
      "name": "لحم مدخن على خشب البلوط",
      "price": 185,
      "oldPrice": 220,
      "badge": "إصدار ملكي VIP",
      "badgeIcon": "fa-solid fa-gem",
      "image": "images/smoked_meat.jpg",
      "desc": "ضلوع بقرية مدخنة لمدة 14 ساعة بنكهة الحطب الطبيعي والصلصة الخاصة.",
      "inclusions": "سلطة كولسلو بالعسل، صوص باربكيو مدخن، مخللات شامية، ذرة مشوية"
    },
    {
      "id": 4,
      "cat": "mains",
      "catName": "كبسات وطواجن أصيلة",
      "name": "مندي لحم تيس بلدي بالحطب",
      "price": 160,
      "oldPrice": 190,
      "badge": "تراث أصيل",
      "badgeIcon": "fa-solid fa-star",
      "image": "images/mandi.jpg",
      "desc": "لحم تيس طازج مطهو في برميل الفخار تحت الأرض على حرارة جمر السمر الطبيعي.",
      "inclusions": "أرز بشاور هندي، كشنة بصل وزبيب، صوص حار، مرق لحم غني، لبن بالنعناع"
    },
    {
      "id": 5,
      "cat": "mains",
      "catName": "كبسات وطواجن أصيلة",
      "name": "طاجن عكاوي بالبصل القاورمة",
      "price": 130,
      "oldPrice": 155,
      "badge": "فخاريات بلدي",
      "badgeIcon": "fa-solid fa-fire-burner",
      "image": "images/tajin.jpg",
      "desc": "عكاوي بقري مسبكة في الطاجن الفخاري مع البصل الصغير وجوزة الطيب والسمن البلدي.",
      "inclusions": "أرز مصري بالشعرية، طرشي بلدي، خبز بلدي ساخن، ملوخية طازجة بالطشة"
    },
    {
      "id": 6,
      "cat": "mains",
      "catName": "كبسات وطواجن أصيلة",
      "name": "شواء عماني أصيل بالتنور",
      "price": 175,
      "oldPrice": 210,
      "badge": "وليمة ظفارية",
      "badgeIcon": "fa-solid fa-award",
      "image": "images/omani_shuwa.jpg",
      "desc": "لحم مدفون بورق الموز والتوابل الظفارية المعتقة ومطهو لمدة 24 ساعة في تنور أرضي.",
      "inclusions": "أرز قبولي عماني، سلطة حمص ناعمة، صوص تمر هندي متبل، خبز عماني رقاق"
    },
    {
      "id": 7,
      "cat": "desserts",
      "catName": "حلويات وضيافة شرقية",
      "name": "كنافة نابلسية بالجبنة البلدية",
      "price": 55,
      "oldPrice": 70,
      "badge": "طازجة ساخنة",
      "badgeIcon": "fa-solid fa-heart",
      "image": "images/kunafa.jpg",
      "desc": "كنافة خشنة محشوة بجبن العكاوي الفاخر ومسقية بالقطر المعطر بماء الورد والفستق الحلبي.",
      "inclusions": "فستق حلبي محمص، شيرة عسل نحل نقية، قشطة بلدي طازجة"
    },
    {
      "id": 8,
      "cat": "desserts",
      "catName": "حلويات وضيافة شرقية",
      "name": "حلوى عمانية بالزعفران والهيل",
      "price": 65,
      "oldPrice": 80,
      "badge": "ضيافة ملكية",
      "badgeIcon": "fa-solid fa-crown",
      "image": "images/omani_halwa.jpg",
      "desc": "مطبوخة على نار هادئة في قدور النحاس بالسمن العماني والزعفران الإيراني الفاخر والمكسرات.",
      "inclusions": "دلة قهوة عربية بالهيل، تمر خلاص فاخر، كاجو ولوز محمص"
    },
    {
      "id": 9,
      "cat": "desserts",
      "catName": "حلويات وضيافة شرقية",
      "name": "معصوب ملكي بالقشطة والعسل",
      "price": 45,
      "oldPrice": 60,
      "badge": "الأكثر حباً",
      "badgeIcon": "fa-solid fa-thumbs-up",
      "image": "images/masoub.jpg",
      "desc": "فطير بر مخبوز ومفروم مع الموز الطازج ومغطى بطبقة وفيرة من القشطة وعسل السدر الطبيعي.",
      "inclusions": "حبة سوداء، جبنة شيدر مبشورة، كورن فليكس مقرمش، مكسرات"
    },
    {
      "id": 10,
      "cat": "salads",
      "catName": "مقبلات وشوربات عربية",
      "name": "فتوش شامي بدبس الرمان",
      "price": 35,
      "oldPrice": 45,
      "badge": "طازج يومياً",
      "badgeIcon": "fa-solid fa-leaf",
      "image": "images/fattoush.jpg",
      "desc": "خضروات طازجة مع الخبز المحمص المقرمش والسماق البلدي وزيت الزيتون البكر ودبس الرمان الجبلي.",
      "inclusions": "صوص دبس الرمان، حبوب رمان طازجة، نعناع بري أخضر"
    },
    {
      "id": 11,
      "cat": "salads",
      "catName": "مقبلات وشوربات عربية",
      "name": "متبل باذنجان مشوي بالرمان",
      "price": 38,
      "oldPrice": 48,
      "badge": "مقبلات فاخرة",
      "badgeIcon": "fa-solid fa-utensils",
      "image": "images/mutabbal.jpg",
      "desc": "باذنجان رومي مدخن على اللهب ومهروس مع الطحينة السمراء وزيت الزيتون الفلسطيني وفصوص الرمان.",
      "inclusions": "زيت زيتون بكر معصور على البارد، خبز عربي دافئ، مخللات مشكلة"
    },
    {
      "id": 12,
      "cat": "salads",
      "catName": "مقبلات وشوربات عربية",
      "name": "شوربة كوارع مخلية بالليمون",
      "price": 48,
      "oldPrice": 60,
      "badge": "مغذية وشهية",
      "badgeIcon": "fa-solid fa-bowl-food",
      "image": "images/soup.jpg",
      "desc": "مرق كوارع بلدي صافي غني بالبهارات المستكة والحبهان ومخلى بالكامل مع شرائح الليمون الأخضر.",
      "inclusions": "خبز محمص مقرمش، أرز أبيض جانبي، صلصة طماطم بالخل والثوم"
    }
  ],
  "pages": {
    "home": {
      "heroTitle": "روائع الطهي العربي الأصيل والولائم الملكية",
      "heroDesc": "نأخذكم في رحلة إلى عوالم النكهات التراثية المطهوة على أصولها، من أشهى الكبسات النجدية والمندي والمشويات الفاخرة إلى الطواجن الفخارية والحلويات الشرقية العريقة.",
      "heroImg": "images/hero_slide1.jpg",
      "storyTitle": "أصالة الطهي العربي وتراث الموائد العريقة",
      "storyDesc": "منذ بدايتنا ونحن نلتزم بفلسفة كرم الضيافة الأصيلة: استخدام أجود اللحوم النعيمية والمكونات البلدية الطازجة، وإحياء فنون الطبخ العربي المتوارثة من كبسات ومندي الخليج الفاخرة إلى أشهى الطواجن المصرية والشوا العماني الأصيل."
    },
    "menu": {
      "heroTitle": "قائمة المأكولات والولائم الفاخرة",
      "heroSubtitle": "نقدم لكم تشكيلة ملكية من أرقى أطباق اللحوم البلدية والمشويات والطواجن والحلويات الشرقية المعدة بحرفية تامة.",
      "heroImg": "images/hero_slide2.jpg"
    },
    "about": {
      "heroTitle": "قصة مطعم قصر الضيافة",
      "heroSubtitle": "أكثر من عقدين من الشغف في تقديم أصول الطهي العربي العريق والولائم الملكية في أجواء من الفخامة التراثية.",
      "storyTitle": "نحن لا نطهو الطعام فحسب، بل نحفظ هوية المائدة العربية",
      "storyP1": "انطلقت رحلتنا من إيمان راسخ بأن المطبخ العربي هو أحد أثرى مطابخ العالم في التنوع والعمق والتاريخ. من أودية ظفار إلى نجد العذية، ومن صعيد مصر الخالد إلى شواطئ الخليج، جمعنا لكم نخبة من أمهر الطهاة وحفظة الوصفات التراثية.",
      "storyP2": "نلتزم بأعلى معايير الجودة الغذائية، مستخدمين أجود الذبائح البلدية الطازجة والسمن الفلاحي النقي وزيت الزيتون المعصور على البارد، لنقدم لأحبائنا وضيوفنا ولائم تليق بمقامهم الرفيع.",
      "image": "images/story_dish1.jpg"
    },
    "reservation": {
      "heroTitle": "حجز مائدة مسبق وولائم خاصة",
      "heroSubtitle": "احجز طاولتك أو مجلسك الملكي المفضل مسبقاً لضمان أفضل تجربة ضيافة لك ولعائلتك وضيوفك الكرام في أجواء تراثية مريحة وراقية.",
      "heroImg": "images/hero_slide1.jpg",
      "boxTitle": "استمارة حجز مائدة مسبق",
      "boxDesc": "املأ بياناتك وسيصلك تأكيد فوري عبر الواتساب والرسائل النصية خلال دقائق معدودة لتجهيز مائدتك على أكمل وجه."
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

// ==========================================================================
// 1. INITIALIZATION & AUTH
// ==========================================================================
function initData() {
  loadAppData();

  if (!appData || !Array.isArray(appData.dishes) || appData.dishes.length === 0) {
    appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    saveAppData();
  }

  if (!appData.restaurantInfo) appData.restaurantInfo = { ...DEFAULT_DATA.restaurantInfo };
  if (!appData.categories) appData.categories = [ ...DEFAULT_DATA.categories ];
  if (!appData.pages) appData.pages = JSON.parse(JSON.stringify(DEFAULT_DATA.pages));

  checkAuth();
}

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
    document.getElementById('authError').style.display = 'block';
    document.getElementById('pinInput').value = '';
    document.getElementById('pinInput').focus();
  }
}

function logoutAdmin() {
  sessionStorage.removeItem('qasr_admin_authed');
  window.location.reload();
}

// ==========================================================================
// 2. TABS NAVIGATION & UI
// ==========================================================================
function switchTab(tabId, clickedEl) {
  document.querySelectorAll('.admin-tab-pane').forEach(el => el.style.display = 'none');
  const target = document.getElementById(tabId);
  if (target) target.style.display = 'block';

  document.querySelectorAll('.sidebar-menu .menu-link').forEach(l => l.classList.remove('active'));
  if (clickedEl) clickedEl.classList.add('active');

  // Update Main Header Title
  const titles = {
    'tabOverview': 'لوحة الإحصائيات العامة',
    'tabDishes': 'قائمة الطعام والأطباق',
    'tabCategories': 'إدارة أقسام المنيو والتصنيفات',
    'tabHomeEditor': 'تعديل الصفحة الرئيسية (Home)',
    'tabAboutEditor': 'تعديل قصة قصر الضيافة (من نحن)',
    'tabMenuEditor': 'تعديل صفحة قائمة الطعام (Menu)',
    'tabReservationEditor': 'تعديل صفحة حجز طاولة وولائم',
    'tabContactEditor': 'تعديل صفحة اتصل بنا والموقع',
    'tabReservations': 'سجل الحجوزات والطلبات',
    'tabCMS': 'بيانات المطعم والتواصل',
    'tabBackup': 'النسخ الاحتياطي واستعادة البيانات'
  };
  const titleEl = document.getElementById('pageMainHeaderTitle');
  if (titleEl && titles[tabId]) titleEl.textContent = titles[tabId];

  // Populate form if switching to page editors
  populateAllPagesForms();
}

function showToast(msg) {
  const toast = document.getElementById('adminToast');
  const txt = document.getElementById('toastMsg');
  if (toast && txt) {
    txt.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => { toast.classList.remove('active'); }, 3000);
  }
}

// ==========================================================================
// 3. DASHBOARD RENDERING
// ==========================================================================
function renderDashboard() {
  if (!appData) return;

  const dishes = appData.dishes || [];
  const categories = appData.categories || [];
  const reservations = getStoredReservations();

  document.getElementById('statDishesCount').textContent = dishes.length;
  document.getElementById('statCatsCount').textContent = categories.length;
  document.getElementById('statResCount').textContent = reservations.length;
  if (appData.restaurantInfo && appData.restaurantInfo.phone) {
    document.getElementById('statWhatsApp').textContent = appData.restaurantInfo.phone;
  }

  populateCategorySelect();
  renderDishesTable(dishes);
  renderCategoriesTable(categories);
  renderReservationsTable(reservations);
  populateAllPagesForms();
  populateGeneralSettings();
}

function getStoredReservations() {
  try {
    const raw = localStorage.getItem('qasr_reservations_data') || localStorage.getItem('qasr_reservations');
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    return [];
  }
}

function renderReservationsTable(list) {
  const tbody = document.getElementById('reservationsTableBody');
  if (!tbody) return;
  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:30px; color:#94a3b8;">لا توجد أي طلبات حجز حالياً.</td></tr>';
    return;
  }
  tbody.innerHTML = list.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td style="font-weight:800; color:#fff;">${r.name || 'عميل'}</td>
      <td><a href="https://wa.me/${(r.phone || '').replace(/[^0-9]/g, '')}" target="_blank" style="color:#c59d27; text-decoration:none;"><i class="fa-brands fa-whatsapp"></i> ${r.phone}</a></td>
      <td><span class="badge badge-primary">${r.guests || 'طاولة'}</span></td>
      <td>${r.date || '-'}</td>
      <td>${r.time || '-'}</td>
      <td>${r.seating || 'مجلس عام'}</td>
      <td style="font-size:13px; color:#cbd5e1;">${r.notes || '-'}</td>
    </tr>
  `).join('');
}

// ==========================================================================
// 4. DISHES CRUD & IMAGE UPLOAD
// ==========================================================================
function populateCategorySelect() {
  const sel = document.getElementById('modalDishCat');
  const filterSel = document.getElementById('adminDishCatFilter');
  if (!appData || !appData.categories) return;

  const options = appData.categories
    .filter(c => c.slug !== 'all')
    .map(c => `<option value="${c.slug}">${c.name}</option>`)
    .join('');

  if (sel) sel.innerHTML = options;
  if (filterSel) {
    filterSel.innerHTML = '<option value="all">كل الأقسام والتصنيفات</option>' +
      appData.categories.filter(c => c.slug !== 'all').map(c => `<option value="${c.slug}">${c.name}</option>`).join('');
  }
}

function renderDishesTable(dishes) {
  const tbody = document.getElementById('dishesTableBody');
  if (!tbody) return;
  if (dishes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:#94a3b8;">لا توجد أطباق مسجلة.</td></tr>';
    return;
  }
  tbody.innerHTML = dishes.map(d => {
    const imgSrc = d.image.startsWith('data:') ? d.image : (d.image.startsWith('http') ? d.image : `../${d.image}`);
    return `
    <tr>
      <td><img src="${imgSrc}" class="dish-img-thumb" alt="${d.name}" onerror="this.src='../images/mandi.jpg'"></td>
      <td>
        <div style="font-weight:800; color:#ffffff; font-size:14.5px;">${d.name}</div>
        <div style="font-size:12px; color:#94a3b8; max-width:280px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${d.desc || ''}</div>
      </td>
      <td><span class="badge badge-primary">${d.catName || d.cat}</span></td>
      <td style="font-weight:900; color:#c59d27;">${d.price} ر.س</td>
      <td style="color:#94a3b8; text-decoration:line-through;">${d.oldPrice ? d.oldPrice + ' ر.س' : '-'}</td>
      <td><span class="badge badge-primary"><i class="${d.badgeIcon || 'fa-solid fa-crown'}"></i> ${d.badge || 'مميز'}</span></td>
      <td>
        <div style="display:flex; gap:8px;">
          <button type="button" class="btn btn-outline btn-sm" onclick="editDish(${d.id})"><i class="fa-solid fa-pen-to-square"></i> تعديل</button>
          <button type="button" class="btn btn-danger btn-sm" onclick="deleteDish(${d.id})"><i class="fa-solid fa-trash"></i> حذف</button>
        </div>
      </td>
    </tr>
    `;
  }).join('');
}

function filterAdminDishes() {
  const q = document.getElementById('adminDishSearch').value.trim().toLowerCase();
  const cat = document.getElementById('adminDishCatFilter').value;
  let filtered = appData.dishes || [];

  if (cat !== 'all') {
    filtered = filtered.filter(d => d.cat === cat);
  }
  if (q) {
    filtered = filtered.filter(d => d.name.toLowerCase().includes(q) || (d.desc && d.desc.toLowerCase().includes(q)));
  }
  renderDishesTable(filtered);
}

function openAddDishModal() {
  document.getElementById('dishModalTitle').textContent = 'إضافة طبق جديد للمنيو';
  document.getElementById('modalDishId').value = '';
  document.getElementById('modalDishName').value = '';
  document.getElementById('modalDishPrice').value = '';
  document.getElementById('modalDishOldPrice').value = '';
  document.getElementById('modalDishBadge').value = 'اختيار الشيف';
  document.getElementById('modalDishImage').value = 'images/mandi.jpg';
  document.getElementById('modalDishInclusions').value = '';
  document.getElementById('modalDishDesc').value = '';
  updateDishImgPreview('images/mandi.jpg');
  document.getElementById('dishModal').classList.add('active');
}

function editDish(id) {
  const dish = (appData.dishes || []).find(d => d.id === id);
  if (!dish) return;
  document.getElementById('dishModalTitle').textContent = 'تعديل طبق: ' + dish.name;
  document.getElementById('modalDishId').value = dish.id;
  document.getElementById('modalDishName').value = dish.name;
  document.getElementById('modalDishCat').value = dish.cat;
  document.getElementById('modalDishPrice').value = dish.price;
  document.getElementById('modalDishOldPrice').value = dish.oldPrice || '';
  document.getElementById('modalDishBadge').value = dish.badge || 'مميز';
  document.getElementById('modalDishImage').value = dish.image || 'images/mandi.jpg';
  document.getElementById('modalDishInclusions').value = dish.inclusions || '';
  document.getElementById('modalDishDesc').value = dish.desc || '';
  updateDishImgPreview(dish.image || 'images/mandi.jpg');
  document.getElementById('dishModal').classList.add('active');
}

function closeDishModal() {
  document.getElementById('dishModal').classList.remove('active');
}

function updateDishImgPreview(src) {
  const prev = document.getElementById('modalDishImgPreview');
  if (prev && src && src.trim()) {
    const fixed = src.startsWith('data:') ? src : (src.startsWith('http') ? src : `../${src}`);
    prev.src = fixed;
    prev.style.display = 'block';
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
    showToast('تم تحميل صورة الطبق بنجاح من جهازك!');
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
    desc: document.getElementById('modalDishDesc').value.trim()
  };

  if (idVal) {
    const idx = appData.dishes.findIndex(d => d.id === parseInt(idVal));
    if (idx !== -1) {
      appData.dishes[idx] = { ...appData.dishes[idx], ...dishData };
      showToast('تم تحديث بيانات الطبق بنجاح!');
    }
  } else {
    const newId = appData.dishes.length ? Math.max(...appData.dishes.map(d => d.id || 0)) + 1 : 1;
    appData.dishes.unshift({ id: newId, ...dishData });
    showToast('تمت إضافة الطبق الجديد بنجاح!');
  }

  saveAppData();
  closeDishModal();
  renderDishesTable(appData.dishes);
  document.getElementById('statDishesCount').textContent = appData.dishes.length;
}

function deleteDish(id) {
  const dish = (appData.dishes || []).find(d => d.id === id);
  if (!dish) return;
  if (!confirm(`هل أنت متأكد من حذف طبق "${dish.name}" من المنيو؟`)) return;

  appData.dishes = appData.dishes.filter(d => d.id !== id);
  saveAppData();
  renderDishesTable(appData.dishes);
  document.getElementById('statDishesCount').textContent = appData.dishes.length;
  showToast('تم حذف الطبق بنجاح!');
}

// ==========================================================================
// 5. CATEGORIES FULL CRUD
// ==========================================================================
function renderCategoriesTable(cats) {
  const tbody = document.getElementById('categoriesTableBody');
  if (!tbody) return;
  tbody.innerHTML = cats.map(c => {
    const isAll = (c.id === 'all' || c.slug === 'all');
    return `
    <tr>
      <td style="font-weight:800; font-size:15px; color:#ffffff;">${c.name}</td>
      <td><code style="background:rgba(197,157,39,0.1); padding:4px 10px; border-radius:6px; color:#c59d27; font-weight:700; border:1px solid rgba(197,157,39,0.2);">${c.slug}</code></td>
      <td><span class="badge badge-primary">${c.badge || 'أصناف مختارة'}</span></td>
      <td>
        <div style="display:flex; gap:8px; justify-content:center;">
          <button type="button" class="btn btn-outline btn-sm" onclick="editCategory('${c.id || c.slug}')">
            <i class="fa-solid fa-pen-to-square"></i> تعديل
          </button>
          ${!isAll ? `
          <button type="button" class="btn btn-danger btn-sm" onclick="deleteCategory('${c.id || c.slug}')">
            <i class="fa-solid fa-trash"></i> حذف
          </button>` : `
          <span style="font-size:12px; color:#94a3b8; padding:5px 8px;">(رئيسي)</span>
          `}
        </div>
      </td>
    </tr>
    `;
  }).join('');
}

function openAddCategoryModal() {
  document.getElementById('categoryModalTitle').textContent = 'إضافة قسم مأكولات جديد';
  document.getElementById('modalCatOriginalId').value = '';
  document.getElementById('modalCatName').value = '';
  document.getElementById('modalCatSlug').value = '';
  document.getElementById('modalCatBadge').value = 'أصناف مختارة';
  document.getElementById('categoryModal').classList.add('active');
}

function editCategory(catId) {
  const cat = (appData.categories || []).find(c => c.id === catId || c.slug === catId);
  if (!cat) return;
  document.getElementById('categoryModalTitle').textContent = 'تعديل قسم المأكولات: ' + cat.name;
  document.getElementById('modalCatOriginalId').value = cat.id || cat.slug;
  document.getElementById('modalCatName').value = cat.name;
  document.getElementById('modalCatSlug').value = cat.slug;
  document.getElementById('modalCatBadge').value = cat.badge || '';
  document.getElementById('categoryModal').classList.add('active');
}

function closeCategoryModal() {
  document.getElementById('categoryModal').classList.remove('active');
}

function handleSaveCategory(e) {
  e.preventDefault();
  const origId = document.getElementById('modalCatOriginalId').value;
  const name = document.getElementById('modalCatName').value.trim();
  const slug = document.getElementById('modalCatSlug').value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const badge = document.getElementById('modalCatBadge').value.trim() || 'أصناف مختارة';

  if (!slug) {
    alert('يرجى إدخال معرف إنجليزي صالح للقسم');
    return;
  }

  if (origId) {
    const idx = appData.categories.findIndex(c => c.id === origId || c.slug === origId);
    if (idx !== -1) {
      const oldSlug = appData.categories[idx].slug;
      appData.categories[idx] = { id: slug, slug: slug, name: name, badge: badge };
      if (oldSlug !== slug) {
        (appData.dishes || []).forEach(d => {
          if (d.cat === oldSlug) {
            d.cat = slug;
            d.catName = name;
          }
        });
      }
      showToast('تم تعديل بيانات القسم بنجاح!');
    }
  } else {
    if (appData.categories.some(c => c.slug === slug)) {
      alert('هذا المعرف الإنجليزي مستخدم بالفعل، يرجى اختيار معرف آخر.');
      return;
    }
    appData.categories.push({ id: slug, slug: slug, name: name, badge: badge });
    showToast('تمت إضافة القسم الجديد بنجاح!');
  }

  saveAppData();
  closeCategoryModal();
  renderCategoriesTable(appData.categories);
  populateCategorySelect();
  document.getElementById('statCatsCount').textContent = appData.categories.length;
}

function deleteCategory(catId) {
  if (catId === 'all') {
    alert('لا يمكن حذف قسم "كل الأصناف" لأنه القسم الرئيسي.');
    return;
  }
  const cat = (appData.categories || []).find(c => c.id === catId || c.slug === catId);
  if (!cat) return;
  if (!confirm(`هل أنت متأكد من حذف قسم "${cat.name}"؟`)) return;

  appData.categories = appData.categories.filter(c => c.id !== catId && c.slug !== catId);
  saveAppData();
  renderCategoriesTable(appData.categories);
  populateCategorySelect();
  document.getElementById('statCatsCount').textContent = appData.categories.length;
  showToast('تم حذف القسم بنجاح!');
}

// ==========================================================================
// 6. ALL 5 PAGES EDITORS & DEVICE IMAGE UPLOAD
// ==========================================================================
function updateHomeHeroImgPreview(src) {
  const prev = document.getElementById('previewHomeHeroImg');
  if (prev && src && src.trim()) {
    const fixed = src.startsWith('data:') ? src : (src.startsWith('http') ? src : `../${src}`);
    prev.src = fixed;
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
    showToast('تم رفع صورة البانر من جهازك!');
  };
  reader.readAsDataURL(file);
}

function updateMenuImgPreview(src) {
  const prev = document.getElementById('previewMenuHeroImg');
  if (prev && src && src.trim()) {
    const fixed = src.startsWith('data:') ? src : (src.startsWith('http') ? src : `../${src}`);
    prev.src = fixed;
  }
}

function handleMenuImgFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    document.getElementById('pageMenuHeroImg').value = base64;
    updateMenuImgPreview(base64);
    showToast('تم رفع صورة بانر المنيو من جهازك!');
  };
  reader.readAsDataURL(file);
}

function updateAboutImgPreview(src) {
  const prev = document.getElementById('previewAboutImg');
  if (prev && src && src.trim()) {
    const fixed = src.startsWith('data:') ? src : (src.startsWith('http') ? src : `../${src}`);
    prev.src = fixed;
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
    showToast('تم رفع صورة قصة الضيافة من جهازك!');
  };
  reader.readAsDataURL(file);
}

function updateResImgPreview(src) {
  const prev = document.getElementById('previewResHeroImg');
  if (prev && src && src.trim()) {
    const fixed = src.startsWith('data:') ? src : (src.startsWith('http') ? src : `../${src}`);
    prev.src = fixed;
  }
}

function handleResImgFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    document.getElementById('pageResHeroImg').value = base64;
    updateResImgPreview(base64);
    showToast('تم رفع صورة بانر الحجز من جهازك!');
  };
  reader.readAsDataURL(file);
}

function populateAllPagesForms() {
  if (!appData) return;
  if (!appData.pages) appData.pages = JSON.parse(JSON.stringify(DEFAULT_DATA.pages));
  const p = appData.pages;

  // Home
  if (p.home) {
    if (document.getElementById('pageHomeHeroTitle')) document.getElementById('pageHomeHeroTitle').value = p.home.heroTitle || '';
    if (document.getElementById('pageHomeHeroDesc')) document.getElementById('pageHomeHeroDesc').value = p.home.heroDesc || '';
    if (document.getElementById('pageHomeHeroImg')) {
      document.getElementById('pageHomeHeroImg').value = p.home.heroImg || 'images/hero_slide1.jpg';
      updateHomeHeroImgPreview(p.home.heroImg || 'images/hero_slide1.jpg');
    }
    if (document.getElementById('pageHomeStoryTitle')) document.getElementById('pageHomeStoryTitle').value = p.home.storyTitle || '';
    if (document.getElementById('pageHomeStoryDesc')) document.getElementById('pageHomeStoryDesc').value = p.home.storyDesc || '';
  }

  // About
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

  // Menu
  if (p.menu) {
    if (document.getElementById('pageMenuHeroTitle')) document.getElementById('pageMenuHeroTitle').value = p.menu.heroTitle || '';
    if (document.getElementById('pageMenuHeroSub')) document.getElementById('pageMenuHeroSub').value = p.menu.heroSubtitle || '';
    if (document.getElementById('pageMenuHeroImg')) {
      document.getElementById('pageMenuHeroImg').value = p.menu.heroImg || 'images/hero_slide2.jpg';
      updateMenuImgPreview(p.menu.heroImg || 'images/hero_slide2.jpg');
    }
  }

  // Reservation
  if (p.reservation) {
    if (document.getElementById('pageResHeroTitle')) document.getElementById('pageResHeroTitle').value = p.reservation.heroTitle || '';
    if (document.getElementById('pageResHeroSub')) document.getElementById('pageResHeroSub').value = p.reservation.heroSubtitle || '';
    if (document.getElementById('pageResHeroImg')) {
      document.getElementById('pageResHeroImg').value = p.reservation.heroImg || 'images/hero_slide1.jpg';
      updateResImgPreview(p.reservation.heroImg || 'images/hero_slide1.jpg');
    }
    if (document.getElementById('pageResBoxTitle')) document.getElementById('pageResBoxTitle').value = p.reservation.boxTitle || '';
    if (document.getElementById('pageResBoxDesc')) document.getElementById('pageResBoxDesc').value = p.reservation.boxDesc || '';
  }

  // Contact
  if (p.contact) {
    if (document.getElementById('pageContactHeroTitle')) document.getElementById('pageContactHeroTitle').value = p.contact.heroTitle || '';
    if (document.getElementById('pageContactHeroSub')) document.getElementById('pageContactHeroSub').value = p.contact.heroSubtitle || '';
    if (document.getElementById('pageContactWhatsApp')) document.getElementById('pageContactWhatsApp').value = p.contact.whatsapp || '01027093535';
    if (document.getElementById('pageContactPhone')) document.getElementById('pageContactPhone').value = p.contact.phone || '01027093535';
    if (document.getElementById('pageContactEmail')) document.getElementById('pageContactEmail').value = p.contact.email || 'booking@qasr-aldiyafa.com';
    if (document.getElementById('pageContactAddress')) document.getElementById('pageContactAddress').value = p.contact.address || '';
    if (document.getElementById('pageContactWorkingHours')) document.getElementById('pageContactWorkingHours').value = p.contact.workingHours || '';
  }
}

function savePageData(pageKey) {
  if (!appData) return;
  if (!appData.pages) appData.pages = {};

  if (pageKey === 'home') {
    appData.pages.home = {
      heroTitle: document.getElementById('pageHomeHeroTitle').value.trim(),
      heroDesc: document.getElementById('pageHomeHeroDesc').value.trim(),
      heroImg: document.getElementById('pageHomeHeroImg').value.trim() || 'images/hero_slide1.jpg',
      storyTitle: document.getElementById('pageHomeStoryTitle').value.trim(),
      storyDesc: document.getElementById('pageHomeStoryDesc').value.trim()
    };
    showToast('تم حفظ تعديلات الصفحة الرئيسية بنجاح!');
  } else if (pageKey === 'about') {
    appData.pages.about = {
      heroTitle: document.getElementById('pageAboutHeroTitle').value.trim(),
      heroSubtitle: document.getElementById('pageAboutHeroSub').value.trim(),
      storyTitle: document.getElementById('pageAboutStoryTitle').value.trim(),
      storyP1: document.getElementById('pageAboutStoryP1').value.trim(),
      storyP2: document.getElementById('pageAboutStoryP2').value.trim(),
      image: document.getElementById('pageAboutImg').value.trim() || 'images/story_dish1.jpg'
    };
    showToast('تم حفظ تعديلات قصة الضيافة (من نحن) بنجاح!');
  } else if (pageKey === 'menu') {
    appData.pages.menu = {
      heroTitle: document.getElementById('pageMenuHeroTitle').value.trim(),
      heroSubtitle: document.getElementById('pageMenuHeroSub').value.trim(),
      heroImg: document.getElementById('pageMenuHeroImg').value.trim() || 'images/hero_slide2.jpg'
    };
    showToast('تم حفظ تعديلات صفحة المنيو بنجاح!');
  } else if (pageKey === 'reservation') {
    appData.pages.reservation = {
      heroTitle: document.getElementById('pageResHeroTitle').value.trim(),
      heroSubtitle: document.getElementById('pageResHeroSub').value.trim(),
      heroImg: document.getElementById('pageResHeroImg').value.trim() || 'images/hero_slide1.jpg',
      boxTitle: document.getElementById('pageResBoxTitle').value.trim(),
      boxDesc: document.getElementById('pageResBoxDesc').value.trim()
    };
    showToast('تم حفظ تعديلات صفحة الحجز بنجاح!');
  } else if (pageKey === 'contact') {
    appData.pages.contact = {
      heroTitle: document.getElementById('pageContactHeroTitle').value.trim(),
      heroSubtitle: document.getElementById('pageContactHeroSub').value.trim(),
      whatsapp: document.getElementById('pageContactWhatsApp').value.trim() || '01027093535',
      phone: document.getElementById('pageContactPhone').value.trim() || '01027093535',
      email: document.getElementById('pageContactEmail').value.trim(),
      address: document.getElementById('pageContactAddress').value.trim(),
      workingHours: document.getElementById('pageContactWorkingHours').value.trim()
    };
    if (appData.restaurantInfo) {
      appData.restaurantInfo.whatsapp = appData.pages.contact.whatsapp;
      appData.restaurantInfo.phone = appData.pages.contact.phone;
      appData.restaurantInfo.email = appData.pages.contact.email;
      appData.restaurantInfo.address = appData.pages.contact.address;
      appData.restaurantInfo.hours = appData.pages.contact.workingHours;
    }
    showToast('تم حفظ تعديلات صفحة اتصل بنا بنجاح!');
  }

  saveAppData();
}

function resetPageData(pageKey) {
  if (!confirm('هل تريد إلغاء التعديلات واستعادة البيانات السابقة؟')) return;
  loadAppData();
  populateAllPagesForms();
  showToast('تمت استعادة البيانات بنجاح!');
}

// ==========================================================================
// 7. GENERAL SETTINGS & BACKUP/RESTORE
// ==========================================================================
function saveGeneralSettings() {
  if (!appData) return;
  if (!appData.restaurantInfo) appData.restaurantInfo = {};

  const name = document.getElementById('settingRestName').value.trim();
  const phone = document.getElementById('settingRestPhone').value.trim();
  const wa = document.getElementById('settingRestWa').value.trim();
  const email = document.getElementById('settingRestEmail').value.trim();
  const address = document.getElementById('settingRestAddress').value.trim();
  const hours = document.getElementById('settingRestHours').value.trim();
  const pin = document.getElementById('settingAdminPin').value.trim() || '1234';

  if (name) appData.restaurantInfo.name = name;
  if (phone) appData.restaurantInfo.phone = phone;
  if (wa) appData.restaurantInfo.whatsapp = wa;
  if (email) appData.restaurantInfo.email = email;
  if (address) appData.restaurantInfo.address = address;
  if (hours) appData.restaurantInfo.hours = hours;
  if (pin) appData.restaurantInfo.adminPin = pin;

  saveAppData();
  showToast('تم حفظ بيانات المطعم ورمز المرور بنجاح!');
}

function populateGeneralSettings() {
  if (!appData || !appData.restaurantInfo) return;
  const info = appData.restaurantInfo;

  if (document.getElementById('settingRestName') && info.name) document.getElementById('settingRestName').value = info.name;
  if (document.getElementById('settingRestPhone') && info.phone) document.getElementById('settingRestPhone').value = info.phone;
  if (document.getElementById('settingRestWa') && info.whatsapp) document.getElementById('settingRestWa').value = info.whatsapp;
  if (document.getElementById('settingRestEmail') && info.email) document.getElementById('settingRestEmail').value = info.email;
  if (document.getElementById('settingRestAddress') && info.address) document.getElementById('settingRestAddress').value = info.address;
  if (document.getElementById('settingRestHours') && info.hours) document.getElementById('settingRestHours').value = info.hours;
  if (document.getElementById('settingAdminPin') && info.adminPin) document.getElementById('settingAdminPin').value = info.adminPin;
}

function exportJSONBackup() {
  const jsonStr = JSON.stringify(appData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `qasr-aldiyafa-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('تم تنزيل النسخة الاحتياطية بنجاح!');
}

function importJSONBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported && Array.isArray(imported.dishes)) {
        appData = imported;
        saveAppData();
        renderDashboard();
        showToast('تمت استعادة النسخة الاحتياطية بنجاح!');
      } else {
        alert('ملف النسخة الاحتياطية غير صالح.');
      }
    } catch(err) {
      alert('حدث خطأ أثناء قراءة الملف: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function resetToDefaultData() {
  if (!confirm('تحذير: هل أنت متأكد من رغبتك في استعادة كافة بيانات الموقع والأطباق والأقسام إلى إعدادات المصنع الأصلية؟')) return;
  localStorage.removeItem('qasr_data');
  appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveAppData();
  renderDashboard();
  showToast('تمت استعادة إعدادات المصنع الأصلية بنجاح!');
}

function clearAllReservations() {
  if (!confirm('هل تريد مسح سجل الحجوزات بالكامل؟')) return;
  localStorage.removeItem('qasr_reservations_data');
  localStorage.removeItem('qasr_reservations');
  document.getElementById('statResCount').textContent = '0';
  renderReservationsTable([]);
  showToast('تم مسح سجل الحجوزات بنجاح!');
}

// ==========================================================================
// 8. STORAGE PERSISTENCE
// ==========================================================================
function saveAppData() {
  try {
    localStorage.setItem('qasr_data', JSON.stringify(appData));
  } catch(e) {
    console.error('Error saving appData to localStorage:', e);
  }
}

function loadAppData() {
  try {
    const raw = localStorage.getItem('qasr_data');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.dishes)) {
        appData = parsed;
      }
    }
  } catch(e) {
    console.error('Error loading appData from localStorage:', e);
  }
}

// ==========================================================================
// START ADMIN SYSTEM
// ==========================================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initData);
} else {
  initData();
}
