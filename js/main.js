/**
 * Qasr Al-Diyafa Main Client Scripts
 * Handles mobile drawer, Ken Burns hero carousel, food category filters, and testimonials slider.
 */

function toggleMobileMenu() {
  var drawer = document.getElementById('mobileMenuDrawer');
  var overlay = document.getElementById('mobileDrawerOverlay');
  if (!drawer) return;
  drawer.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
  document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  var drawer = document.getElementById('mobileMenuDrawer');
  var overlay = document.getElementById('mobileDrawerOverlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// 1. Food Filter Tabs Handler
function initFoodFilter() {
  var buttons = document.querySelectorAll('.cat-filter-btn');
  var cards = document.querySelectorAll('.food-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var filterVal = this.getAttribute('data-filter');
      buttons.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      cards.forEach(function(card) {
        var cardCat = card.getAttribute('data-cat');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 2. Revolving Customer Testimonials Slider
function initTestimonialsSlider() {
  var slides = document.querySelectorAll('.testimonial-slide');
  var dots = document.querySelectorAll('.slider-dot');
  var prevBtn = document.getElementById('prevSlideBtn');
  var nextBtn = document.getElementById('nextSlideBtn');
  var container = document.getElementById('testimonialsSlider');
  if (!slides.length) return;

  var currentIndex = 0;
  var timer = null;

  function showSlide(idx) {
    if (idx >= slides.length) idx = 0;
    if (idx < 0) idx = slides.length - 1;
    currentIndex = idx;

    slides.forEach(function(s, i) {
      if (i === currentIndex) {
        s.classList.add('active-slide');
      } else {
        s.classList.remove('active-slide');
      }
    });

    dots.forEach(function(d, i) {
      if (i === currentIndex) {
        d.classList.add('active-dot');
      } else {
        d.classList.remove('active-dot');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (timer) clearInterval(timer);
  }

  dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      var targetIdx = parseInt(this.getAttribute('data-slide'), 10);
      showSlide(targetIdx);
      startAutoPlay();
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
      startAutoPlay();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
      startAutoPlay();
    });
  }

  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

// 3. Multi-Slide Cinematic Ken Burns Hero Background Carousel
function initHeroSlider() {
  var heroSlides = document.querySelectorAll('.hero-slide-bg');
  var heroDots = document.querySelectorAll('.hero-indicator-dot');
  if (!heroSlides.length) return;

  var currentHeroIdx = 0;
  var heroTimer = null;

  function showHeroSlide(idx) {
    if (idx >= heroSlides.length) idx = 0;
    if (idx < 0) idx = heroSlides.length - 1;
    currentHeroIdx = idx;

    heroSlides.forEach(function(s, i) {
      if (i === currentHeroIdx) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    heroDots.forEach(function(d, i) {
      if (i === currentHeroIdx) {
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });
  }

  function nextHeroSlide() {
    showHeroSlide(currentHeroIdx + 1);
  }

  function startHeroCycle() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(nextHeroSlide, 6500);
  }

  heroDots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      var target = parseInt(this.getAttribute('data-hero-slide'), 10);
      showHeroSlide(target);
      startHeroCycle();
    });
  });

  startHeroCycle();
}

document.addEventListener('DOMContentLoaded', function() {
  initFoodFilter();
  initTestimonialsSlider();
  initHeroSlider();
});
