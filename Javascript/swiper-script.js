document.addEventListener("DOMContentLoaded", () => {
  new Swiper('.js-testimonials-slider', {
    loop: true, 
    grabCursor: true,
    spaceBetween: 30, 
    pagination: {
      el: '.js-testimonials-pagination', 
      clickable: true, 
    },
    breakpoints: {
      767: {
        slidesPerView: 2, 
      },
    },
  });
});
