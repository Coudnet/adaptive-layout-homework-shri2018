import {videoList} from './data.js'  // Данные о видео
import Hls from 'hls.js'

class VideoStreamControl {
    constructor() {
        this.videoList = videoList;
        this.container = null; // .video-container для открытого видео
        this.canvas = null; // canvas для открытого видео
        this.volumeBarCanvasContext = null; // canvas context для открытого видео, на которм отображается бар для громкости
        this.videoTimerId = null; // Таймер для отрисовки видео в canvas
        this.audioTimerId = null; // Таймер для анализа громкости
        this.currentVideo = null; // Объект открытого видео
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.context.createAnalyser();

        // Промежуточный canvas для обработки
        this.backcanvas = document.createElement('canvas');
        this.bc = this.backcanvas.getContext('2d');

        this.analyser.connect(this.context.destination); // Подключение анализатора к аудиовыходу пользователя}
    }

    init() {
        this.videoList.forEach((videoItem) => {
            this.initVideo(videoItem);
        })
    }

    /**
     * Инициализация каждого видео блока
     * Навешивание обработчиков и запись начальных значений для input
     * @param videoItem
     */
    initVideo(videoItem) {
        const video = document.getElementById(videoItem.id);
        const url = videoItem.src;

        const container = video.parentNode;
        const brightnessInput = container.querySelector('.brightness-filter input');
        const contrastInput = container.querySelector('.contrast-filter input');
        const closeBtn = container.querySelector('.close-btn button');

        if (Hls.isSupported()) {
            let hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });

        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.addEventListener('loadedmetadata', function () {
                video.play();
            });
        }
        video.muted = true;
        brightnessInput.addEventListener('change', this.brightnessValueChangeHandlerFactory(this));
        contrastInput.addEventListener('change', this.contrastValueChangeHandlerFactory(this));
        video.addEventListener('click', this.videoClickHandlerFactory(this));
        closeBtn.addEventListener('click', this.buttonClickHandlerFactory(this));
    }

    /**
     * Обработчик открытия видео
     * Инициализация глобальных переменных, которые хранят родителя тега video
     * Запускается анимация(css3) добавлением класса
     * Инициализация стартовых значений яркости, контраста( сохраненных в объекте)
     * При повторном открытии видео, настройки сохраняются
     */
    videoClickHandlerFactory(object) {
        return function (event) {
            object.currentVideo = videoList.find(x => x.id === event.target.id);
            const video = document.getElementById(object.currentVideo.id);
            object.container = event.target.parentNode;
            object.container.classList.add('z-index-1');
            object.container.classList.add('video-open');

            if (!object.currentVideo.source) object.currentVideo.source = object.context.createMediaElementSource(video);

            object.container.querySelector('.brightness-filter input').value = object.currentVideo.brightness;
            object.container.querySelector('.contrast-filter input').value = object.currentVideo.contrast;
            video.muted = false;

            object.initCanvas();
        }
    }

    /**
     * Обработчик закрытия(сворачивания) видео
     */
    buttonClickHandlerFactory(object) {
        return function () {
            object.container.classList.add('z-index-1');
            object.container.classList.add('video-open');
            object.container.classList.remove('video-open');

            object.disableCanvas();

            setTimeout(() => {
                object.container.classList.remove('z-index-1');
            }, 200);
        }
    }

    /**
     * Инициализация canvas для отрисловки видео при открытии
     * Добавление canvas в контейнер с видео, старт отрисовки и анаиза громкости
     */
    initCanvas() {
        const video = this.container.querySelector('video');
        this.canvas = document.createElement('canvas');
        let ctx = this.canvas.getContext('2d');

        const cw = video.clientWidth;
        const ch = video.clientHeight;

        this.canvas.width = cw;
        this.canvas.height = ch;
        this.canvas.classList.add('video-canvas');
        this.backcanvas.width = cw;
        this.backcanvas.height = ch;

        this.container.appendChild(this.canvas);

        this.draw(video, ctx, cw, ch);
        this.volumeAnylyzerStart();

    }

    /**
     * Отрисовка текущего видео потока в canvas при размернутом видео
     * Вызываются функции для обработки изображения - яркость и контраст
     */
    draw(v, c, w, h) {
        let img;
        if (v.paused || v.ended) return false;
        let thiscontext = this;
        this.videoTimerId = setTimeout(function draw2() {
            thiscontext.bc.drawImage(v, 0, 0, w, h);
            img = thiscontext.bc.getImageData(0, 0, w, h);
            thiscontext.brightness(img.data);
            thiscontext.contrast(img.data);
            c.putImageData(img, 0, 0);
            thiscontext.videoTimerId = setTimeout(draw2, 16)
        }, 16);
    }

    /**
     * Старт анализатора громкости.
     * Текущая Video Node подсоединяется к анализатору
     * и запускается рекрсивный таймер для анализа громкости
     */
    volumeAnylyzerStart() {
        this.currentVideo.source.connect(this.analyser);
        this.volumeBarCanvasContext = this.container.querySelector('.volume-bar canvas').getContext('2d');
        this.volumeBarCanvasContext.fillStyle = "#D55240";
        const thiscontext = this;
        this.audioTimerId = setTimeout(function measureVol() {
            let array = new Uint8Array(thiscontext.analyser.fftSize);
            thiscontext.analyser.getByteTimeDomainData(array);
            let average = 0;
            for (let a of array) {
                a = Math.abs(a - 128);
                average += a;
            }
            average /= array.length;
            thiscontext.drawVolumeBar(average);
            thiscontext.audioTimerId = setTimeout(measureVol, 50);
        }, 50);
    }

    /**
     * Отрисовка уровня громкости в canvas
     */
    drawVolumeBar(average) {
        this.volumeBarCanvasContext.clearRect(0, 0, 25, 100);
        this.volumeBarCanvasContext.fillRect(0, 100, 25, -10 * average);
        this.volumeBarCanvasContext.stroke();
    }

    /**
     * Очистка таймеров, которые использовались для отрисчовки canvas с видео и уровня громкости
     * Удаление canvas с видео
     */
    disableCanvas() {
        clearTimeout(this.videoTimerId);
        clearTimeout(this.audioTimerId);
        this.container.removeChild(this.canvas);
        document.getElementById(this.currentVideo.id).muted = true;

        this.canvas = null;
        this.videoTimerId = null;
        this.audioTimerId = null;
        this.currentVideo = null;
    }

    /**
     * Функция для изменения яркости пикселей изображения
     * @param data
     */
    brightness(data) {
        for (let i = 0; i < data.length; i += 4) {
            data[i] = this.truncate(data[i] + this.currentVideo.brightness);
            data[i + 1] = this.truncate(data[i + 1] + this.currentVideo.brightness);
            data[i + 2] = this.truncate(data[i + 2] + this.currentVideo.brightness);
        }
    }

    /**
     * Функция для изменения контраста изображения
     * Формулы взяты из статьи http://thecryptmag.com/Online/56/imgproc_5.html
     * @param data
     */
    contrast(data) {
        const factor = (259 * (this.currentVideo.contrast + 255)) / (255 * (259 - this.currentVideo.contrast));

        for (let i = 0; i < data.length; i += 4) {
            data[i] = this.truncate((factor * (data[i] - 128) + 128));
            data[i + 1] = this.truncate((factor * (data[i + 1] - 128) + 128));
            data[i + 2] = this.truncate((factor * (data[i + 2] - 128) + 128));
        }

    }

    /**
     * Вспомогательная функция для проверки выхода за границы значений пикселя
     * @param val
     * @returns {*}
     */
    truncate(val) {
        if (val < 0) return 0;
        if (val > 255) return 255;
        return val;
    }
    brightnessValueChangeHandlerFactory(object) {
        return function (event) {
            object.currentVideo.brightness = +event.target.value;
        }
    }
    contrastValueChangeHandlerFactory(object) {
        return function (event) {
            object.currentVideo.contrast = +event.target.value;
        }
    }
}

export {VideoStreamControl}