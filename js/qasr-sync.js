/**
 * Qasr Al-Diyafa Live Client-Side Synchronization Engine
 * Automatically reflects all Admin changes:
 * - Dishes CRUD & Image updates
 * - Category filters
 * - Home, About, Contact page texts & images
 * - Direct WhatsApp ordering
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
        const imgSrc = d.image.startsWith('data:') ? d.image : (d.image.startsWith('http') ? d.image : d.image);

        return `
        <div class="food-card" data-cat="${d.cat}">
          <div class="food-thumb-wrap">
            <a href="dish-detail.html?id=${d.id}" style="display:block; width:100%; height:100%;">
              <img decoding="async" src="${imgSrc}" alt="${d.name}" loading="lazy" onerror="this.src='images/mandi.jpg'">
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
                <a href="https://wa.me/${waFormatted}?text=${waMsg}" target="_blank" rel="noopener" class="btn-card-order" style="background:#c59d27; color:#fff; border-color:#c59d27;" title="طلب مباشر عبر واتساب">
                  <i class="fa-brands fa-whatsapp"></i> واتساب
                </a>
                <a href="dish-detail.html?id=${d.id}" class="btn-card-order" title="تفاصيل الصنف">
                  <i class="fa-solid fa-arrow-left"></i>
                </a>
              </div>
            </div>
          </div>
        </div>`;
    }

    function syncStorefront() {
        const data = getAppData();
        if (!data) return;

        const dishes = data.dishes || [];
        const info = data.restaurantInfo || {};
        const pages = data.pages || {};
        const wa = info.whatsappFormatted || '201027093535';

        // 1. Update WhatsApp links
        document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
            const currentHref = a.getAttribute('href');
            if (currentHref && wa) {
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

            const storyTitle = document.getElementById('storyTitle');
            if (storyTitle && h.storyTitle) storyTitle.textContent = h.storyTitle;
        }

        // 3. About Page Sync
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

        // 4. Contact Page Sync
        if (pages.contact) {
            const ct = pages.contact;
            const ctHeroTitle = document.getElementById('contactHeroTitle');
            if (ctHeroTitle && ct.heroTitle) ctHeroTitle.textContent = ct.heroTitle;

            const ctHeroSub = document.getElementById('contactHeroSub');
            if (ctHeroSub && ct.heroSubtitle) ctHeroSub.textContent = ct.heroSubtitle;

            const ctWaLink = document.getElementById('contactWaLink');
            if (ctWaLink && ct.whatsapp) {
                const clean = ct.whatsapp.replace(/[^0-9]/g, '');
                ctWaLink.href = `https://wa.me/${clean}`;
                ctWaLink.textContent = ct.whatsapp;
            }

            const ctPhoneLink = document.getElementById('contactPhoneLink');
            if (ctPhoneLink && ct.phone) {
                ctPhoneLink.href = `tel:${ct.phone}`;
                ctPhoneLink.textContent = ct.phone;
            }

            const ctAddressText = document.getElementById('contactAddressText');
            if (ctAddressText && ct.address) ctAddressText.textContent = ct.address;
        }

        // 5. Food Grid Sync
        const foodGrid = document.getElementById('foodCardsGrid');
        if (foodGrid && dishes.length > 0) {
            foodGrid.innerHTML = dishes.map(d => renderCard(d, wa)).join('');

            // Re-apply filter if active
            const activeFilter = document.querySelector('.cat-filter-btn.active');
            if (activeFilter) {
                const fVal = activeFilter.getAttribute('data-filter') || 'all';
                document.querySelectorAll('#foodCardsGrid .food-card').forEach(card => {
                    const cCat = card.getAttribute('data-cat');
                    card.style.display = (fVal === 'all' || cCat === fVal) ? 'flex' : 'none';
                });
            }
        }

        // 6. Dish Detail Page Sync
        const detailTitle = document.getElementById('detailTitle');
        if (detailTitle) {
            const urlParams = new URLSearchParams(window.location.search);
            const dishId = parseInt(urlParams.get('id')) || 1;
            const dish = dishes.find(d => d.id === dishId) || dishes[0];

            if (dish) {
                document.title = `${dish.name} | مطعم قصر الضيافة`;
                detailTitle.textContent = dish.name;

                const detailBreadcrumb = document.getElementById('detailBreadcrumb');
                if (detailBreadcrumb) detailBreadcrumb.textContent = dish.name;

                const detailImg = document.getElementById('detailImg');
                if (detailImg) {
                    const imgSrc = dish.image.startsWith('data:') ? dish.image : (dish.image.startsWith('http') ? dish.image : dish.image);
                    detailImg.src = imgSrc;
                }

                const detailBadge = document.getElementById('detailBadge');
                if (detailBadge) {
                    detailBadge.innerHTML = `<i class="${dish.badgeIcon || 'fa-solid fa-crown'}"></i> ${dish.badge || 'مميز'}`;
                }

                const detailCat = document.getElementById('detailCat');
                if (detailCat) detailCat.textContent = dish.catName || 'مأكولات فاخرة';

                const detailDesc = document.getElementById('detailDesc');
                if (detailDesc) detailDesc.textContent = dish.desc;

                const detailInclusions = document.getElementById('detailInclusions');
                if (detailInclusions) detailInclusions.textContent = dish.inclusions || 'تحضير خاص طازج يومياً';

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
