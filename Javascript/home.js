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

document.addEventListener("DOMContentLoaded", async () => {
  const blogsWrapper = document.getElementById("blogs-wrapper");
  const skeletons = document.getElementById("skeletons");
  const errorPlaceholder = document.getElementById("error-placeholder");

  try {
    skeletons.classList.remove("hidden");
    blogsWrapper.classList.add("opacity-0");
    errorPlaceholder.classList.add("hidden");

    const response = await fetch(`${API_URL}/blog`);
    if (!response.ok) throw new Error("Network response was not ok");

    const blogs = await response.json();
    if (!blogs || blogs.length === 0) throw new Error("No blogs found");

    const sortedBlogs = blogs.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const latestBlogs = sortedBlogs.slice(0, 4);

    blogsWrapper.innerHTML = latestBlogs
      .map(
        (blog) => `
        <a
          href="${`./blog-open.html?blogId=${encodeURIComponent(
            blog.id
          )}&title=${encodeURIComponent(
            String(blog.title)
              .trim()
              .toLowerCase()
              .replace(/[^a-z0-9\s]/g, "")
              .replace(/\s+/g, "-")
          )}`}"
        >
          <div class="cursor-pointer sm:p-2 md:max-w-[320px]">
            <div class="home-blog-card sm:p-2 md:max-w-[320px] sm:hover:rounded-xl sm:hover:shadow-md sm:hover:shadow-black/30 sm:hover:border sm:hover:border-primaryBlue/20 transition-shadow">
              <div class="home-blog-card-image w-full h-[250px] rounded-lg overflow-hidden">
                <img
                  src="${blog.thumbnailimageurl}"
                  alt="${blog.title}"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 class="home-blog-card-title md:max-w-[320px] text-xl font-bold text-primaryTextBlack ">
                ${blog.title}
              </h2>
              <a
                href="${`./blog-open.html?blogId=${encodeURIComponent(
                  blog.id
                )}&title=${encodeURIComponent(
                  String(blog.title)
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "")
                    .replace(/\s+/g, "-")
                )}`}"
                class="read-more-blog-btn w-fit px-3 py-2 text-sm text-white font-semibold rounded-full bg-primaryBlue hover:bg-secondaryBlue"
              >
                <span>Read More</span>
              </a>
            </div>
          </div>
        </a>
    `
      )
      .join("");

    skeletons.classList.add("hidden");
    blogsWrapper.classList.remove("opacity-0");
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    skeletons.classList.add("hidden");
    errorPlaceholder.textContent =
      error.message === "No blogs found"
        ? "No blogs found."
        : "Error loading blogs. Please try again later.";
    errorPlaceholder.classList.remove("hidden");
  }
});
