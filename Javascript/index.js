const API_URL = "https://advanceddentalcenter-bn.onrender.com/api";
// const API_URL = "http://localhost:8000/api";

const contact_phone = "+250 700000000";
const contact_email = "info@example.com";
const contact_address = "KG 11 Ave, Kigali, Rwanda";
const mobile_menu = document.getElementById("mobile-menu");
const menu_open_btn = document.getElementById("menu-open");
const mobile_menu_bg_blocker = document.getElementById(
  "mobile-menu-bg-blocker"
);
const hero_header = document.getElementById("hero-header");
const navbar = document.getElementById("navbar");
const nav_link_item = document.querySelectorAll(".nav-link-item");
const logo_text = document.getElementById("logo-text");
// const nav_links_div = document.getElementById("nav-links-div");
const menu_open_svg = document.getElementById("menu-open-svg");

menu_open_btn.addEventListener("click", function () {
  mobile_menu.classList.remove("translate-x-full"); //mobile_menu.classList.remove("custom-left-full");
  mobile_menu.classList.add("translate-x-0");
  mobile_menu.classList.add("custom-width-full"); //custom-width-full
  mobile_menu_bg_blocker.classList.remove("hidden");
  mobile_menu_bg_blocker.classList.add("mobile-menu-bg-blocker");
});

const menu_close_btn = document.getElementById("menu-close");

menu_close_btn.addEventListener("click", function () {
  mobile_menu.classList.remove("translate-x-0"); //custom-width-full
  // mobile_menu.classList.remove("custom-width-full");
  mobile_menu.classList.add("translate-x-full"); //custom-left-full
  mobile_menu_bg_blocker.classList.remove("mobile-menu-bg-blocker");
  mobile_menu_bg_blocker.classList.add("hidden");
});

window.addEventListener("scroll", reveal);

function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 0;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("arrived");
    } else {
      reveals[i].classList.remove("arrived");
    }
  }
}

// window.onload = () => {
document.querySelectorAll(".contact-phone").forEach((item) => {
  item.innerHTML = contact_phone;
  item.href = `tel:${contact_phone}`;
});
document.querySelectorAll(".contact-email").forEach((item) => {
  item.innerHTML = contact_email;
  item.href = `mailto:${contact_email}`;
});
document.querySelectorAll(".contact-address").forEach((item) => {
  item.innerHTML = contact_address;
  item.href = "https://maps.app.goo.gl/keWLks5XDGuE4nZu9";
});
document.querySelectorAll(".contact-phone-icon").forEach((item) => {
  item.href = `tel:${contact_phone}`;
});
document.querySelectorAll(".contact-email-icon").forEach((item) => {
  item.href = `mailto:${contact_email}`;
});
document.querySelectorAll(".contact-address-icon").forEach((item) => {
  item.href = "https://maps.app.goo.gl/keWLks5XDGuE4nZu9";
});
// }

document.addEventListener("DOMContentLoaded", () => {
  // Adding logo for index.html
  document.querySelectorAll(".logo-img-home").forEach((item) => {
    item.src = "./Images/logo.jpg";
  });

  // Adding logo for other html pages
  document.querySelectorAll(".logo-img-others").forEach((item) => {
    item.src = "../Images/logo.jpg";
  });
});

// Services Slider Functionality - Only run on index.html
if (
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname.endsWith("/")
) {
  document.addEventListener("DOMContentLoaded", () => {
    const servicesSlider = document.getElementById("servicesSlider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dots = document.querySelectorAll(".slider-dot");

    if (!servicesSlider || !prevBtn || !nextBtn) {
      console.log("Slider elements not found, skipping slider initialization");
      return;
    }

    let currentSlide = 0;
    const slides = document.querySelectorAll(".services-slide");
    const totalSlides = slides.length;
    const slidesToShow = window.innerWidth >= 768 ? 3 : 1; // Show 3 on desktop, 1 on mobile
    const slideWidth = slides[0].offsetWidth + 16; // width + gap

    // Duplicate slides for infinite loop
    function duplicateSlides() {
      const sliderContent = servicesSlider.innerHTML;
      servicesSlider.innerHTML = sliderContent + sliderContent;
    }

    // Initialize slider
    function initSlider() {
      duplicateSlides();
      updateSliderPosition();
      updateDots();
    }

    // Update slider position
    function updateSliderPosition() {
      const translateX = -currentSlide * slideWidth;
      servicesSlider.style.transform = `translateX(${translateX}px)`;
    }

    // Update dot indicators
    function updateDots() {
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.remove("bg-gray-300");
          dot.classList.add("bg-primaryBlue");
        } else {
          dot.classList.remove("bg-primaryBlue");
          dot.classList.add("bg-gray-300");
        }
      });
    }

    // Go to next slide
    function nextSlide() {
      currentSlide++;
      updateSliderPosition();
      updateDots();

      // Reset to beginning when reaching the end of first set
      if (currentSlide >= totalSlides) {
        setTimeout(() => {
          currentSlide = 0;
          servicesSlider.style.transition = "none";
          updateSliderPosition();
          setTimeout(() => {
            servicesSlider.style.transition = "transform 0.5s ease-in-out";
          }, 50);
        }, 500);
      }
    }

    // Go to previous slide
    function prevSlide() {
      currentSlide--;
      updateSliderPosition();
      updateDots();

      // Jump to end of first set when going before beginning
      if (currentSlide < 0) {
        setTimeout(() => {
          currentSlide = totalSlides - 1;
          servicesSlider.style.transition = "none";
          updateSliderPosition();
          setTimeout(() => {
            servicesSlider.style.transition = "transform 0.5s ease-in-out";
          }, 50);
        }, 500);
      }
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      updateSliderPosition();
      updateDots();
    }

    // Event listeners
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    servicesSlider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    servicesSlider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide(); // Swipe left - next slide
        } else {
          prevSlide(); // Swipe right - previous slide
        }
      }
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    });

    // Auto-play slider (optional)
    let autoPlayInterval;

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Start auto-play
    startAutoPlay();

    // Pause auto-play on hover
    servicesSlider.addEventListener("mouseenter", stopAutoPlay);
    servicesSlider.addEventListener("mouseleave", startAutoPlay);

    // Handle window resize
    window.addEventListener("resize", () => {
      const newSlidesToShow = window.innerWidth >= 768 ? 3 : 1;
      if (newSlidesToShow !== slidesToShow) {
        initSlider();
      }
    });

    // Initialize the slider
    initSlider();
  });
}

const formatDate = (DBdateString) => {
  const dateObj = new Date(DBdateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return {
    year: dateObj.getFullYear(),
    day: dateObj.getDate(),
    month: dateObj.getMonth() + 1,
    monthName: monthNames[dateObj.getMonth()],
    hours: dateObj.getHours().toString().padStart(2, "0"),
    minutes: dateObj.getMinutes().toString().padStart(2, "0"),
    date: `${dateObj.getDate()} ${
      monthNames[dateObj.getMonth()]
    }, ${dateObj.getFullYear()}`,
    time: `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0")}`,
  };
};

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

