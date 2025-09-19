class Carousel {
    selectors = {
        carousel: '[data-js-carousel-items]',
        item: '[data-js-carousel-item]',
        dots: '[data-js-carousel-dots]',
        dot: '[data-js-carousel-dot]',
        prev: '[data-js-carousel-prev]',
        next: '[data-js-carousel-next]'
    }
    classes = {
        carouselDot: 'carousel__dot'
    }
    stateClases = {
        isActive: 'is-active'
    }

    constructor() {
        this.carouselElement = document.querySelector(this.selectors.carousel);
        this.itemElements = document.querySelectorAll(this.selectors.item);
        this.dotsElement = document.querySelector(this.selectors.dots);
        this.prevElement = document.querySelector(this.selectors.prev);
        this.nextElement = document.querySelector(this.selectors.next);
        this.addDots();
        this.bindEvents();
        this.setTimer();
    }

    addDots() {
        this.itemElements.forEach((_, index) => {
            let dot = document.createElement("span");
            dot.classList.add(this.classes.carouselDot);
            dot.dataset.jsCarouselDot = '';
            if (index === 0) dot.classList.add(this.stateClases.isActive);
            dot.dataset.index = index;
            this.dotsElement.appendChild(dot);
        });
        this.dotElements = document.querySelectorAll(this.selectors.dot);
    }

    showItem(index) {
        this.itemElements.forEach((item, idx) => {
            item.classList.remove(this.stateClases.isActive);
            this.dotElements[idx].classList.remove(this.stateClases.isActive);
            if (idx === index) {
                item.classList.add(this.stateClases.isActive);
                this.dotElements[idx].classList.add(this.stateClases.isActive);
            }
        });
    }

    setTimer(time = 4000) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.showNextItem(), time);
    }

    showNextItem() {
        let index;
        this.itemElements.forEach((item, idx) => {
            if (item.classList.contains(this.stateClases.isActive)) {
                index = idx;
            }
        });
        this.showItem((index + 1) % this.itemElements.length);
        this.setTimer();
    }

    bindEvents(){
        this.prevElement.addEventListener("click", () => {
            let index = [...this.itemElements].findIndex((item) =>
                item.classList.contains(this.stateClases.isActive)
            );
            this.showItem((index - 1 + this.itemElements.length) % this.itemElements.length);
            this.setTimer();
        });

        this.nextElement.addEventListener("click", () => {
            let index = [...this.itemElements].findIndex((item) =>
                item.classList.contains(this.stateClases.isActive)
            );
            this.showItem((index + 1) % this.itemElements.length);
            this.setTimer();
        });

        this.dotElements.forEach((dot) => {
            dot.addEventListener("click", () => {
                let index = parseInt(dot.dataset.index);
                this.showItem(index);
                this.setTimer();
            });
        });
    }
}

export default Carousel;