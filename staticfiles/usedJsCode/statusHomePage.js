const swipers = new Swiper('.swiper', {
    
    // loop: true,
    breakpoints: {
        // Breakpoint from 0 up
        0: {
            slidesPerView: 3,
            spaceBetween: 2,
        },
        400: {
            slidesPerView: 3,
        },
        // Breakpoint from 640 up
        640: {
            slidesPerView: 4,
        },
        // Breakpoint from 768 up
        768: {
            slidesPerView: 5,
        },
        // Breakpoint from 1024 up
        1024: {
            slidesPerView: 5,
        }
    }
});