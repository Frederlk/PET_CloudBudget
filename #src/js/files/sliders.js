//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) { }

let slider_about = new Swiper('.slider-focused__slider', {
	// Эффекты переключения слайдов.
	// Листание
	effect: 'slide',

	// Эффекты переключения слайдов.
	// Cмена прозрачности
	/*effect: 'fade',
	// Дополнение к fade
	fadeEffect: {
		// Параллельная
		// смена прозрачности
		crossFade: true
	},*/

	/*
	// Эффекты переключения слайдов.
	// Переворот
	effect: 'flip',
	// Дополнение к flip
	flipEffect: {
		// Тень
		slideShadows: true,
		// Показ только активного слайда
		limitRotation: true
	},
	*/
	/*
	// Эффекты переключения слайдов.
	// Куб
	effect: 'cube',
	// Дополнение к cube
	cubeEffect: {
		// Настройки тени
		slideShadows: true,
		shadow: true,
		shadowOffset: 20,
		shadowScale: 0.94
	},
	*/

	// Эффекты переключения слайдов.
	/*// Эффект потока
	effect: 'coverflow',
	// Дополнение к coverflow
	coverflowEffect: {
		// Угол
		rotate: 0,
		// Наложение
		stretch: 50,
		// Тень
		slideShadows: true,
	},*/




	observer: true,
	observeParents: true,
	// Количество слайдов для показа
	slidesPerView: 1,
	// Отступ между слайдами
	spaceBetween: -395,
	// Автовысота
	autoHeight: false,
	// Отключение функционала
	// если слайдов меньше чем нужно
	watchOverflow: true,
	adaptiveHeight: true,



	// Скролл
	/*
	scrollbar: {
		el: '.swiper-scrollbar',
		// Возможность перетаскивать скролл
		draggable: true
	},
	*/

	// Включение/отключение
	// перетаскивания на ПК
	simulateTouch: true,
	// Чувствительность свайпа
	touchRatio: 1,

	// Угол срабатывания свайпа/перетаскивания
	touchAngle: 45,
	// Курсор перетаскивания
	grabCursor: true,
	// Переключение при клике на слайд
	slideToClickedSlide: false,

	// Навигация по хешу
	hashNavigation: {
		// Отслеживать состояние
		watchState: true,
	},

	// Управление клавиатурой
	keyboard: {
		// Включить\выключить
		enabled: true,
		// Включить\выключить
		// только когда слайдер
		// в пределах вьюпорта
		onlyInViewport: true,
		// Включить\выключить
		// управление клавишами
		// pageUp, pageDown
		pageUpDown: true,
	},
	// Количество пролистываемых слайдов
	slidesPerGroup: 1,

	// Активный слайд по центру
	centeredSlides: false,

	// Стартовый слайд.
	initialSlide: 0,

	// Мультирядность
	slidesPerColumn: 1,

	// Бесконечный слайдер
	loop: true,

	// Кол-во дублирующих слайдов
	loopedSlides: 2,

	// Свободный режим
	freeMode: false,

	// Автопрокрутка

	autoplay: {
		// Пауза между прокруткой
		delay: 3000,
		// Закончить на последнем слайде
		stopOnLastSlide: false,
		// Отключить после ручного переключения
		disableOnInteraction: false
	},


	// Скорость
	speed: 1000,

	// Вертикальный слайдер
	direction: 'horizontal', //'vertical'

	// Отключить предзагрузка картинок
	preloadImages: false,
	// Lazy Loading
	// (подгрузка картинок)

	lazy: {
		// Подгружать на старте
		// переключения слайда
		loadOnTransitionStart: false,

		// Подгрузить предыдущую
		// и следующую картинки
		loadPrevNext: false,
	},

	// Слежка за видимыми слайдами
	watchSlidesProgress: false,

	// Добавление класса видимым слайдам
	watchSlidesVisibility: false,
	/*

	// Зум картинки
	zoom: {
		// Макимальное увеличение
		maxRatio: 5,
		// Минимальное увеличение
		minRatio: 1,
	},
	*/

	// Миниатюры (превью)
	/*
	thumbs: {
		// Свайпер с мениатюрами
		// и его настройки
		swiper: {
			el: '.image-mini-slider',
			slidesPerView: 5,
		}
	},
	*/

	/*
	// Передача управления
	controller: {
		control: myTextSlider
	},
	*/

	/*
		// Обновить свайпер
		// при изменении элементов слайдера
		observer: true,
		// Обновить свайпер
		// при изменении родительских
		// элементов слайдера
		observeParents: true,
		// Обновить свайпер
		// при изменении дочерних
		// элементов слайда
		observeSlideChildren: true,
	*/

	/*
		// Управление колесом мыши
		mousewheel: {
			// Чувствительность колеса мыши
			sensitivity: 0,
			// Класс объекта на котором
			// будет срабатывать прокрутка мышью.
			//eventsTarget: ".image-slider"
		},
	*/


	breakpoints: {
		320: {
			spaceBetween: 0,
		},
		479.98: {
			spaceBetween: 0,
		},
		992: {
			effect: 'slide',
			spaceBetween: -395,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	},
});
