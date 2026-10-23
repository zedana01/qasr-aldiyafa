/**
 * Qasr Al-Diyafa Full Storefront Synchronization Engine
 * Automatically reflects all Admin changes live across all 5 pages:
 * - Dishes CRUD & Image updates
 * - Category filters
 * - Home, Menu, About, Reservation, Contact page texts & images
 * - Direct WhatsApp ordering & Phone numbers
 */

(function() {
    function getAppData() {
        try {
            const raw = localStorage.getItem('qasr_data');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && (Array.isArray(parsed.dishes) || parsed.restaurantInfo || parsed.pages)) {
                    return parsed;
                }
            }
        } catch(e) {
            console.error('Error reading qasr_data:', e);
        }
        return null;
    }

    function renderCard(d, waFormatted) {
        const badgeIcon = d.badgeIcon || 'fa-solid fa-crown';
        const badgeText = d.badge || 'مميز';
        const catName = d.catName || 'مأكولات';
        const priceSar = d.price || 120;
        const waMsg = encodeURIComponent(`مرحباً مطعم قصر الضيافة، أود طلب: ${d.name} بسعر ${priceSar} ر.س`);
        const imgSrc = d.image || 'images/mandi.jpg';

        return `
        <div class="food-card" data-cat="${d.cat}">
          <div class="food-thumb-wrap">
            <a href="dish-detail.html?id=${d.id}" style="display:block; width:100%; height:100%;">
              <img decoding="async" src="${imgSrc}" alt="${d.name}" loading="eager" onerror="this.src='images/mandi.jpg'">
            </a>
            <span class="card-badge-cat">${catName}</span>
            <span class="card-badge-special"><i class="${badgeIcon}"></i> ${badgeText}</span>
          </div>
          <div class="food-card-body">
            <h4><a href="dish-detail.html?id=${d.id}" style="color:inherit; text-decoration:none;">${d.name}</a></h4>
            <p>${d.desc}</p>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-top:14px; padding-top:12px; border-top:1px dashed rgba(212,175,55,0.25);">
              <div style="font-size:18px; font-weight:900; color:#c59d27;">${Number(priceSar).toLocaleString('en-US')} <span style="font-size:12px; font-weight:700;">ر.س</span></div>
              <div style="display:flex; gap:6px;">
                <a href="https://wa.me/${waFormatted}?text=${waMsg}" target="_blank" rel="noopener" class="btn-card-order" style="background:linear-gradient(135deg, #c59d27, #987515); color:#0c0907; border:1px solid #dfbe87;" title="طلب مباشر عبر واتساب">
                  <i class="fa-brands fa-whatsapp"></i> واتساب
                </a>
                <a href="dish-detail.html?id=${d.id}" class="btn-card-detail" title="تفاصيل المكونات والطلب">
                  <i class="fa-solid fa-arrow-left"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        `;
    }

    function syncStorefront() {
        const data = getAppData();
        if (!data) return;

        const info = data.restaurantInfo || {};
        const pages = data.pages || {};
        const wa = (info.whatsapp || '01027093535').replace(/[^0-9]/g, '');

        // 1. Sync WhatsApp and phone numbers across all pages
        document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
            const currentHref = a.getAttribute('href');
            if (currentHref) {
                a.setAttribute('href', currentHref.replace(/wa\.me\/[0-9]+/, `wa.me/${wa}`));
            }
        });

        // 2. Home Page Sync
        if (pages.home) {
            const h = pages.home;
            const heroTitle = document.getElementById('heroTitle');
            if (heroTitle && h.heroTitle) heroTitle.textContent = h.heroTitle;

            const heroDesc = document.getElementById('heroDesc');
            if (heroDesc && h.heroDesc) heroDesc.textContent = h.heroDesc;

            const heroSlide1 = document.getElementById('heroSlide1');
            if (heroSlide1 && h.heroImg) {
                heroSlide1.style.backgroundImage = `url('${h.heroImg}')`;
            }

            const storyTitle = document.getElementById('storyTitle');
            if (storyTitle && h.storyTitle) storyTitle.textContent = h.storyTitle;

            const storyDesc1 = document.getElementById('storyDesc1');
            if (storyDesc1 && h.storyDesc) storyDesc1.textContent = h.storyDesc;
        }

        // 3. Menu Page Sync
        if (pages.menu) {
            const m = pages.menu;
            const menuHeroTitle = document.getElementById('menuHeroTitle');
            if (menuHeroTitle && m.heroTitle) menuHeroTitle.textContent = m.heroTitle;

            const menuHeroSub = document.getElementById('menuHeroSub');
            if (menuHeroSub && m.heroSubtitle) menuHeroSub.textContent = m.heroSubtitle;

            const menuBannerSec = document.getElementById('menuBannerSec');
            if (menuBannerSec && m.heroImg) {
                menuBannerSec.style.backgroundImage = `linear-gradient(rgba(11,15,18,0.85), rgba(11,15,18,0.92)), url('${m.heroImg}')`;
            }
        }

        // 4. About Page Sync
        if (pages.about) {
            const ab = pages.about;
            const abHeroTitle = document.getElementById('aboutHeroTitle');
            if (abHeroTitle && ab.heroTitle) abHeroTitle.textContent = ab.heroTitle;

            const abHeroSub = document.getElementById('aboutHeroSub');
            if (abHeroSub && ab.heroSubtitle) abHeroSub.textContent = ab.heroSubtitle;

            const abStoryTitle = document.getElementById('aboutStoryTitle');
            if (abStoryTitle && ab.storyTitle) abStoryTitle.textContent = ab.storyTitle;

            const abStoryP1 = document.getElementById('aboutStoryP1');
            if (abStoryP1 && ab.storyP1) abStoryP1.textContent = ab.storyP1;

            const abStoryP2 = document.getElementById('aboutStoryP2');
            if (abStoryP2 && ab.storyP2) abStoryP2.textContent = ab.storyP2;

            const abMainImg = document.getElementById('aboutMainImg');
            if (abMainImg && ab.image) abMainImg.src = ab.image;
        }

        // 5. Reservation Page Sync
        if (pages.reservation) {
            const res = pages.reservation;
            const resHeroTitle = document.getElementById('resHeroTitle');
            if (resHeroTitle && res.heroTitle) resHeroTitle.textContent = res.heroTitle;

            const resHeroSub = document.getElementById('resHeroSub');
            if (resHeroSub && res.heroSubtitle) resHeroSub.textContent = res.heroSubtitle;

            const resHeroBannerSec = document.getElementById('resHeroBannerSec');
            if (resHeroBannerSec && res.heroImg) {
                resHeroBannerSec.style.backgroundImage = `linear-gradient(rgba(18, 14, 10, 0.65), rgba(28, 22, 16, 0.78)), url('${res.heroImg}')`;
            }

            const resBoxTitle = document.getElementById('resBoxTitle');
            if (resBoxTitle && res.boxTitle) resBoxTitle.textContent = res.boxTitle;

            const resBoxDesc = document.getElementById('resBoxDesc');
            if (resBoxDesc && res.boxDesc) resBoxDesc.textContent = res.boxDesc;
        }

        // 6. Contact Page Sync
        if (pages.contact) {
            const ct = pages.contact;
            const ctHeroTitle = document.getElementById('contactHeroTitle');
            if (ctHeroTitle && ct.heroTitle) ctHeroTitle.textContent = ct.heroTitle;

            const ctHeroSub = document.getElementById('contactHeroSub');
            if (ctHeroSub && ct.heroSubtitle) ctHeroSub.textContent = ct.heroSubtitle;

            const ctWaLink = document.getElementById('contactWaLink');
            if (ctWaLink && ct.whatsapp) {
                const cleanWa = ct.whatsapp.replace(/[^0-9]/g, '');
                ctWaLink.href = `https://wa.me/${cleanWa}`;
                ctWaLink.textContent = ct.whatsapp;
            }

            const ctPhoneLink = document.getElementById('contactPhoneLink');
            if (ctPhoneLink && ct.phone) {
                ctPhoneLink.href = `tel:${ct.phone.replace(/[^0-9]/g, '')}`;
                ctPhoneLink.textContent = ct.phone;
            }

            const ctAddressText = document.getElementById('contactAddressText');
            if (ctAddressText && ct.address) ctAddressText.textContent = ct.address;
        }

        // 7. Food Dishes Dynamic Cards Sync (on index.html & menu.html)
        if (Array.isArray(data.dishes) && data.dishes.length > 0) {
            const foodGrid = document.getElementById('foodCardsGrid');
            if (foodGrid) {
                const activeFilter = document.querySelector('.cat-filter-btn.active');
                const selectedCat = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';

                foodGrid.innerHTML = data.dishes.map(d => renderCard(d, wa)).join('');

                if (selectedCat && selectedCat !== 'all') {
                    document.querySelectorAll('#foodCardsGrid .food-card').forEach(card => {
                        card.style.display = (card.getAttribute('data-cat') === selectedCat) ? 'flex' : 'none';
                    });
                }
            }
        }

        // 8. Dish Detail Page Sync (dish-detail.html)
        const params = new URLSearchParams(window.location.search);
        const dishId = params.get('id');
        if (dishId && Array.isArray(data.dishes)) {
            const dish = data.dishes.find(d => d.id === dishId);
            if (dish) {
                const detailTitle = document.getElementById('detailTitle');
                if (detailTitle) detailTitle.textContent = dish.name;

                const detailBreadcrumb = document.getElementById('detailBreadcrumb');
                if (detailBreadcrumb) detailBreadcrumb.textContent = dish.name;

                const detailImg = document.getElementById('detailImg');
                if (detailImg) detailImg.src = dish.image || 'images/mandi.jpg';

                const detailBadge = document.getElementById('detailBadge');
                if (detailBadge) detailBadge.innerHTML = `<i class="${dish.badgeIcon || 'fa-solid fa-crown'}"></i> ${dish.badge || 'مميز'}`;

                const detailCat = document.getElementById('detailCat');
                if (detailCat) detailCat.textContent = dish.catName || 'مأكولات';

                const detailDesc = document.getElementById('detailDesc');
                if (detailDesc) detailDesc.textContent = dish.desc;

                const detailInclusions = document.getElementById('detailInclusions');
                if (detailInclusions) detailInclusions.textContent = dish.inclusions || 'أرز بسمتي فاخر، بهارات ملكية، سلطات ومقبلات';

                const detailPrice = document.getElementById('detailPrice');
                if (detailPrice) detailPrice.innerHTML = `${Number(dish.price).toLocaleString('en-US')} <span style="font-size:16px;">ر.س</span>`;

                const detailOldPrice = document.getElementById('detailOldPrice');
                if (detailOldPrice) {
                    detailOldPrice.textContent = dish.oldPrice ? `${Number(dish.oldPrice).toLocaleString('en-US')} ر.س` : '';
                }

                const detailWaBtn = document.getElementById('detailWaBtn');
                if (detailWaBtn) {
                    const msg = encodeURIComponent(`مرحباً مطعم قصر الضيافة، أود طلب: ${dish.name} بسعر ${Number(dish.price).toLocaleString('en-US')} ر.س`);
                    detailWaBtn.href = `https://wa.me/${wa}?text=${msg}`;
                }
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', syncStorefront);
    } else {
        syncStorefront();
    }
})();
