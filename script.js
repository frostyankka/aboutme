document.addEventListener('DOMContentLoaded', () => {
    // слайдер
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slides img');
    const totalSlides = slides.length;
    const slider = document.querySelector('.slider');
    const prevSliderBtn = document.querySelector('.prev');
    const nextSliderBtn = document.querySelector('.next');

    if (slider && prevSliderBtn && nextSliderBtn && totalSlides) {
        function updateSlider() {
            const offset = -slideIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }
        function nextSlide() {
            slideIndex = (slideIndex + 1) % totalSlides;
            updateSlider();
        }
        function prevSlide() {
            slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        prevSliderBtn.addEventListener('click', prevSlide);
        nextSliderBtn.addEventListener('click', nextSlide);
        updateSlider();
    }

    // кнопки контактов
    const tgBtn = document.querySelector('.tg');
    const vkBtn = document.querySelector('.vk');
    const dsBtn = document.querySelector('.ds');

    if (tgBtn) tgBtn.addEventListener('click', () => window.open('https://t.me/frost_minusvibe', '_blank'));
    if (vkBtn) vkBtn.addEventListener('click', () => window.open('https://vk.com/bby_karinna', '_blank'));
    if (dsBtn) dsBtn.addEventListener('click', () => window.open('https://discord.gg/skUW9kfT', '_blank'));

//LIGHTBOX
    const mediaElements = document.querySelectorAll('.gallery-img'); // все img и video
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeLightboxBtn = document.querySelector('.lightbox-close');
    const prevLightboxBtn = document.querySelector('.lightbox-prev');
    const nextLightboxBtn = document.querySelector('.lightbox-next');

    if (lightbox && lightboxImg && lightboxVideo && closeLightboxBtn && prevLightboxBtn && nextLightboxBtn && mediaElements.length) {
    let currentIndex = 0;

    function openLightbox(index) {
        const element = mediaElements[index];
        const isVideo = element.tagName === 'VIDEO';

        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'none';

        if (isVideo) {
            const src = element.getAttribute('src') || element.querySelector('source')?.getAttribute('src');
            if (src) {
                lightboxVideo.src = src;
                lightboxVideo.load();
                lightboxVideo.style.display = 'block';
            } else {
                console.warn('Видео без источника', element);
            }
        } else {
            // картинка
            lightboxImg.src = element.src;
            lightboxImg.style.display = 'block';
        }
        lightbox.style.display = 'flex';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % mediaElements.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + mediaElements.length) % mediaElements.length;
        openLightbox(currentIndex);
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = '';
            lightboxVideo.load();
        }
    }

    mediaElements.forEach((el, idx) => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = idx;
            openLightbox(idx);
        });
    });

    closeLightboxBtn.addEventListener('click', closeLightbox);
    nextLightboxBtn.addEventListener('click', showNext);
    prevLightboxBtn.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display !== 'flex') return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

    //функция для работы с картами (image-map)
    function setupImageMap(mapName) {
        const mapImg = document.querySelector(`img[usemap="#${mapName}"]`);
        const map = document.querySelector(`map[name="${mapName}"]`);
        if (!mapImg || !map) return;

        const areas = map.querySelectorAll('area');
        areas.forEach(area => {
            const orig = area.getAttribute('coords');
            if (orig) area.setAttribute('data-original', orig);
        });

        function resizeMap() {
            const imgRect = mapImg.getBoundingClientRect();
            const naturalW = mapImg.naturalWidth;
            const naturalH = mapImg.naturalHeight;
            if (!naturalW || !naturalH) return;

            const scaleX = imgRect.width / naturalW;
            const scaleY = imgRect.height / naturalH;

            areas.forEach(area => {
                const orig = area.getAttribute('data-original');
                if (!orig) return;
                const coords = orig.split(',').map(Number);
                const newCoords = [];
                for (let i = 0; i < coords.length; i++) {
                    if (i % 2 === 0) {
                        newCoords.push(Math.round(coords[i] * scaleX));
                    } else {
                        newCoords.push(Math.round(coords[i] * scaleY));
                    }
                }
                area.setAttribute('coords', newCoords.join(','));
            });
        }

        mapImg.addEventListener('load', resizeMap);
        window.addEventListener('resize', resizeMap);
        resizeMap();
    }

    //карты для разных страниц
    setupImageMap('worldmap');
    setupImageMap('achievmentsmap');

    //модальное окно для текста
    const textModal = document.getElementById('textModal');
    const modalText = document.getElementById('modalText');
    const modalClose = document.querySelector('.text-modal-close');

    if (textModal && modalText && modalClose) {
        //обработчик кликов на всех area
        const allAreas = document.querySelectorAll('area');
        allAreas.forEach(area => {
            area.addEventListener('click', (e) => {
                e.preventDefault();
                const text = area.getAttribute('data-text');
                if (text) {
                    modalText.innerHTML = text;
                    textModal.style.display = 'flex';
                }
            });
        });

        modalClose.addEventListener('click', () => {
            textModal.style.display = 'none';
        });

        textModal.addEventListener('click', (e) => {
            if (e.target === textModal) {
                textModal.style.display = 'none';
            }
        });
    }
});
