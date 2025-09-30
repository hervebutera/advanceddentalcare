// window.addEventListener('scroll', function () {

//   if ( (window.scrollY ) > (hero_header.offsetHeight - 160) ) {

//       navbar.style.backgroundColor = "#6f16eb"; //0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
//       nav_link_item.forEach(item => {
//           item.style.color = "white";
//       })
//       logo_text.style.color = "white"
//       // nav_links_div.style.borderBlockColor = "white";
//       menu_open_svg.style.stroke = "#ffffff";
//   } else {
//       navbar.style.backgroundColor = "#FFFFFF";
//       nav_link_item.forEach(item => {
//           item.style.color = "black";
//       })
//       logo_text.style.color = "black";
//       // nav_links_div.style.borderBlockColor = "#374151bf";
//       menu_open_svg.style.stroke = "#000000";

//   }
// });

// Partners Slider Functionality - Only run on index.html
if (
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname.endsWith("/")
) {
  document.addEventListener("DOMContentLoaded", () => {
    const partnersSlider = document.getElementById("partnersSlider");
    const partnersPrevBtn = document.getElementById("partnersPrevBtn");
    const partnersNextBtn = document.getElementById("partnersNextBtn");

    if (!partnersSlider || !partnersPrevBtn || !partnersNextBtn) {
      console.log(
        "Partners slider elements not found, skipping initialization"
      );
      return;
    }

    let currentPartnerSlide = 0;
    const partnerSlides = document.querySelectorAll(".partners-slide");
    const totalPartnerSlides = partnerSlides.length;
    const partnersToShow = window.innerWidth >= 768 ? 6 : 3; // Show 6 on desktop, 3 on mobile
    const partnerSlideWidth = partnerSlides[0].offsetWidth + 32; // width + gap (w-36 + gap-8)
    let isTransitioning = false;

    // Duplicate slides for infinite loop
    function duplicatePartnerSlides() {
      const sliderContent = partnersSlider.innerHTML;
      partnersSlider.innerHTML = sliderContent + sliderContent;
    }

    // Initialize partners slider
    function initPartnersSlider() {
      // Reset current slide to 0
      currentPartnerSlide = 0;
      isTransitioning = false;

      // Duplicate slides for infinite loop
      duplicatePartnerSlides();

      // Set initial position
      partnersSlider.style.transition = "none";
      updatePartnersSliderPosition();

      // Re-enable transitions after a brief delay
      setTimeout(() => {
        partnersSlider.style.transition = "transform 0.5s ease-in-out";
      }, 100);
    }

    // Update partners slider position
    function updatePartnersSliderPosition() {
      const translateX = -currentPartnerSlide * partnerSlideWidth;
      partnersSlider.style.transform = `translateX(${translateX}px)`;
    }

    // Go to next partner slide
    function nextPartnerSlide() {
      if (isTransitioning) return;

      isTransitioning = true;
      currentPartnerSlide++;
      updatePartnersSliderPosition();

      // Reset to beginning when reaching the end of first set
      if (currentPartnerSlide >= totalPartnerSlides) {
        setTimeout(() => {
          currentPartnerSlide = 0;
          partnersSlider.style.transition = "none";
          updatePartnersSliderPosition();
          setTimeout(() => {
            partnersSlider.style.transition = "transform 0.5s ease-in-out";
            isTransitioning = false;
          }, 50);
        }, 500);
      } else {
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }
    }

    // Go to previous partner slide
    function prevPartnerSlide() {
      if (isTransitioning) return;

      isTransitioning = true;
      currentPartnerSlide--;
      updatePartnersSliderPosition();

      // Jump to end of first set when going before beginning
      if (currentPartnerSlide < 0) {
        setTimeout(() => {
          currentPartnerSlide = totalPartnerSlides - 1;
          partnersSlider.style.transition = "none";
          updatePartnersSliderPosition();
          setTimeout(() => {
            partnersSlider.style.transition = "transform 0.5s ease-in-out";
            isTransitioning = false;
          }, 50);
        }, 500);
      } else {
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }
    }

    // Event listeners for partners slider
    partnersNextBtn.addEventListener("click", nextPartnerSlide);
    partnersPrevBtn.addEventListener("click", prevPartnerSlide);

    // Touch/swipe support for mobile
    let partnersStartX = 0;
    let partnersEndX = 0;

    partnersSlider.addEventListener("touchstart", (e) => {
      partnersStartX = e.touches[0].clientX;
    });

    partnersSlider.addEventListener("touchend", (e) => {
      partnersEndX = e.changedTouches[0].clientX;
      handlePartnersSwipe();
    });

    function handlePartnersSwipe() {
      const swipeThreshold = 50;
      const diff = partnersStartX - partnersEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextPartnerSlide(); // Swipe left - next slide
        } else {
          prevPartnerSlide(); // Swipe right - previous slide
        }
      }
    }

    // Auto-play partners slider
    let partnersAutoPlayInterval;

    function startPartnersAutoPlay() {
      partnersAutoPlayInterval = setInterval(nextPartnerSlide, 3000); // Change slide every 3 seconds
    }

    function stopPartnersAutoPlay() {
      clearInterval(partnersAutoPlayInterval);
    }

    // Start auto-play
    startPartnersAutoPlay();

    // Pause auto-play on hover
    partnersSlider.addEventListener("mouseenter", stopPartnersAutoPlay);
    partnersSlider.addEventListener("mouseleave", startPartnersAutoPlay);

    // Handle window resize
    window.addEventListener("resize", () => {
      const newPartnersToShow = window.innerWidth >= 768 ? 6 : 3;
      if (newPartnersToShow !== partnersToShow) {
        initPartnersSlider();
      }
    });

    // Initialize the partners slider
    initPartnersSlider();
  });
}
