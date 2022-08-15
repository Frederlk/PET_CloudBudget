import Swiper, { Navigation, Autoplay, Keyboard } from "swiper";
import "../../scss/base/swiper.scss";

function initSliders() {
    if (document.querySelector(".slider-focused__slider")) {
        new Swiper(".slider-focused__slider", {
            modules: [Navigation, Autoplay, Keyboard],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: -395,
            autoHeight: false,
            speed: 1000,
            watchOverflow: true,
            adaptiveHeight: true,
            simulateTouch: true,
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },
            loop: true,
            loopedSlides: 2,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    spaceBetween: 0,
                },
                479.98: {
                    spaceBetween: 0,
                },
                991.98: {
                    effect: "slide",
                    spaceBetween: -395,
                },
            },
        });
    }
}

window.addEventListener("load", function (e) {
    initSliders();
});
