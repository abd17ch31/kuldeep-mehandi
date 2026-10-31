const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});




// Hero section 2

const cards = document.querySelectorAll(".blog-card");

cards.forEach(clickedCard => {
  clickedCard.addEventListener("click", () => {

    cards.forEach(card => {
      card.classList.remove("active");
      card.classList.add("side");
    });

    clickedCard.classList.add("active");
    clickedCard.classList.remove("side");
  });
});

// Hero section 3

// Optional: future animations / scroll effects
console.log("Long hero section loaded");




// hero section 1

gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create("slideshow-wipe", "0.625, 0.05, 0, 1");

/* =========================
   LOADING ANIMATION (AS IT IS)
========================= */
function initCrispLoadingAnimation() {
  const container = document.querySelector(".crisp-header");
  const heading = container.querySelectorAll(".crisp-header__h1");
  const revealImages = container.querySelectorAll(".crisp-loader__group > *");
  const isScaleUp = container.querySelectorAll(".crisp-loader__media");
  const isScaleDown = container.querySelectorAll(".crisp-loader__media .is--scale-down");
  const isRadius = container.querySelectorAll(".crisp-loader__media.is--scaling.is--radius");
  const smallElements = container.querySelectorAll(".crisp-header__top, .crisp-header__p");
  const sliderNav = container.querySelectorAll(".crisp-header__slider-nav > *");

  const tl = gsap.timeline({
    defaults: { ease: "expo.inOut" },
    onStart: () => container.classList.remove("is--hidden")
  });

  let split;
  if (heading.length) {
    split = new SplitText(heading, { type: "words", mask: "words" });
    gsap.set(split.words, { yPercent: 110 });
  }

  if (revealImages.length) {
    tl.fromTo(revealImages, { xPercent: 500 }, {
      xPercent: -500,
      duration: 2.5,
      stagger: 0.05
    });
  }

  if (isScaleDown.length) {
    tl.to(isScaleDown, {
      scale: 0.5,
      duration: 2,
      stagger: { each: 0.05, from: "edges", ease: "none" },
      onComplete: () => isRadius.forEach(el => el.classList.remove("is--radius"))
    }, "-=0.1");
  }

  if (isScaleUp.length) {
    tl.fromTo(isScaleUp, {
      width: "10em",
      height: "10em"
    }, {
      width: "100vw",
      height: "100dvh",
      duration: 2
    }, "<0.5");
  }

  if (sliderNav.length) {
    tl.from(sliderNav, {
      yPercent: 150,
      stagger: 0.05,
      duration: 1
    }, "-=0.9");
  }

  if (split?.words.length) {
    tl.to(split.words, {
      yPercent: 0,
      stagger: 0.075,
      duration: 1
    }, "<0.1");
  }

  if (smallElements.length) {
    tl.from(smallElements, { opacity: 0, duration: 0.2 }, "<0.15");
  }

  tl.call(() => container.classList.remove("is--loading"), null, "+=0.45");
}

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(initCrispLoadingAnimation);
});

/* =========================
   SLIDER WITH AUTOPLAY
========================= */
function initSlideShow(el) {
  const ui = {
    el,
    slides: [...el.querySelectorAll('[data-slideshow="slide"]')],
    inner: [...el.querySelectorAll('[data-slideshow="parallax"]')],
    thumbs: [...el.querySelectorAll('[data-slideshow="thumb"]')]
  };

  let current = 0;
  let animating = false;
  const length = ui.slides.length;
  const animationDuration = 1.5;

  /* ===== AUTOPLAY ===== */
  let autoPlay = null;
  const AUTO_DELAY = 4000;

  ui.slides.forEach((s, i) => s.dataset.index = i);
  ui.thumbs.forEach((t, i) => t.dataset.index = i);

  ui.slides[0].classList.add("is--current");
  ui.thumbs[0].classList.add("is--current");

  function navigate(direction, targetIndex = null) {
    if (animating) return;
    animating = true;

    const previous = current;
    current = targetIndex ?? (direction === 1 ? (current + 1) % length : (current - 1 + length) % length);

    const currentSlide = ui.slides[previous];
    const currentInner = ui.inner[previous];
    const nextSlide = ui.slides[current];
    const nextInner = ui.inner[current];

    gsap.timeline({
      defaults: { duration: animationDuration, ease: "slideshow-wipe" },
      onStart() {
        nextSlide.classList.add("is--current");
        ui.thumbs[previous].classList.remove("is--current");
        ui.thumbs[current].classList.add("is--current");
      },
      onComplete() {
        currentSlide.classList.remove("is--current");
        animating = false;
      }
    })
      .to(currentSlide, { xPercent: -direction * 100 }, 0)
      .to(currentInner, { xPercent: direction * 75 }, 0)
      .fromTo(nextSlide, { xPercent: direction * 100 }, { xPercent: 0 }, 0)
      .fromTo(nextInner, { xPercent: -direction * 75 }, { xPercent: 0 }, 0);
  }

  /* ===== AUTOPLAY CONTROLS ===== */
  function startAutoPlay() {
    stopAutoPlay();
    autoPlay = setInterval(() => {
      if (!animating) navigate(1);
    }, AUTO_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlay) clearInterval(autoPlay);
  }

  /* ===== THUMB CLICK ===== */
  ui.thumbs.forEach(thumb => {
    thumb.addEventListener("click", e => {
      const index = +e.currentTarget.dataset.index;
      if (index === current || animating) return;
      stopAutoPlay();
      navigate(index > current ? 1 : -1, index);
      startAutoPlay();
    });
  });

  el.addEventListener("mouseenter", stopAutoPlay);
  el.addEventListener("mouseleave", startAutoPlay);

  document.addEventListener("visibilitychange", () =>
    document.hidden ? stopAutoPlay() : startAutoPlay()
  );

  startAutoPlay();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-slideshow="wrap"]').forEach(initSlideShow);
});


// popup buttons


const fab = document.getElementById("fab");
const fabToggle = document.getElementById("fabToggle");

let lastScrollY = window.scrollY;

/* Toggle FAB */
fabToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  fab.classList.toggle("active");
});

/* Click outside → close */
document.addEventListener("click", (e) => {
  if (!fab.contains(e.target)) {
    fab.classList.remove("active");
  }
});

/* Hide on scroll down, show on scroll up */
window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    fab.classList.add("hide");
  } else {
    fab.classList.remove("hide");
  }
  lastScrollY = window.scrollY;
});



// popup contact button - GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap === 'undefined') {
        console.error('GSAP library not loaded');
        return;
    }

    const floatingBtn = document.getElementById('floatingContactBtn');
    const contactPopup = document.getElementById('contactPopup');
    const contactIcons = document.querySelectorAll('.contact-icon-btn');
    let isOpen = false;

    // Toggle popup on button click
    floatingBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        floatingBtn.classList.toggle('active');
        floatingBtn.setAttribute('aria-expanded', isOpen);

        if (isOpen) {
            openPopup();
        } else {
            closePopup();
        }
    });

    // Keyboard accessibility
    floatingBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            floatingBtn.click();
        }
    });

    function openPopup() {
        // Show popup container
        gsap.to(contactPopup, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            onStart: function() {
                contactPopup.classList.add('active');
            }
        });

        // Animate icons with stagger
        gsap.fromTo(contactIcons,
            {
                opacity: 0,
                scale: 0,
                y: 20
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.7)",
                stagger: {
                    amount: 0.3,
                    from: "start"
                },
                delay: 0.1
            }
        );
    }

    function closePopup() {
        // Animate icons out
        gsap.to(contactIcons, {
            opacity: 0,
            scale: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in",
            stagger: {
                amount: 0.2,
                from: "end"
            }
        });

        // Hide popup container
        gsap.to(contactPopup, {
            opacity: 0,
            scale: 0.8,
            y: 20,
            duration: 0.4,
            ease: "power2.in",
            delay: 0.2,
            onComplete: function() {
                contactPopup.classList.remove('active');
            }
        });
    }

    // Add hover effects with GSAP
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            gsap.to(icon, {
                scale: 1.15,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        icon.addEventListener('mouseleave', function() {
            gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Keyboard accessibility for icons
        icon.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Allow default link behavior
            }
        });
    });

    // Close popup when clicking outside (optional)
    document.addEventListener('click', function(e) {
        if (isOpen && 
            !floatingBtn.contains(e.target) && 
            !contactPopup.contains(e.target)) {
            isOpen = false;
            floatingBtn.classList.remove('active');
            floatingBtn.setAttribute('aria-expanded', false);
            closePopup();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) {
            isOpen = false;
            floatingBtn.classList.remove('active');
            floatingBtn.setAttribute('aria-expanded', false);
            closePopup();
        }
    });
});