import Swiper, { Navigation, Keyboard, EffectFade } from "swiper";
import "../../scss/base/swiper.scss";

function initSliders() {
    if (document.querySelector(".slider-focused__slider")) {
        new Swiper(".slider-focused__slider", {
            modules: [Navigation, Keyboard, EffectFade],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: -395,
            autoHeight: false,
            speed: 1000,
            initialSlide: 1,
            effect: "fade",
            adaptiveHeight: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },
            loopedSlides: 2,
            breakpoints: {
                320: {
                    spaceBetween: 0,
                },
                479.98: {
                    spaceBetween: 0,
                },
                1110: {
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
