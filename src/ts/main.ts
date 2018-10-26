interface ISmartHomeEvent {
    type: string;
    title: string;
    source: string;
    time: string;
    description: string;
    icon: string;
    size: string;
    data?: IEventTemperatureData | IEventMusicData | IEventButtonsData | IEventImageData | IEventStatData;
}

interface IEventStatData {
    type: string;
    values: object[];
}

interface IEventImageData {
    image: string;
}

interface IEventButtonsData {
    buttons: string[];
}

interface IEventTemperatureData {
    temperature: number;
    humidity: number;
}

interface IEventMusicData {
    albumcover: string;
    artist: string;
    track: ITrackInfo;
    volume: number;
}

interface ITrackInfo {
    name: string;
    length: string;
}

let hamburger = document.querySelector("#hamburger");
let eventslist = document.querySelector("#eventslist");
if (hamburger && eventslist) {
    hamburger.addEventListener("click", menuToggle);

    fetch("/src/json/events.json")
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            render(res.events);
        })
        .catch( alert );
}

/**
 * Обработчик раскрытия меню гамбургер на мобилках
 */

function menuToggle(): void {
    document.getElementsByTagName("nav")[0].classList.toggle("show-menu");
}


/**
 * Первая функция для работы с данными -
 * рендер кажой карточки и добавление класса для нужного размера
 * @param events : string
 */
function render(events: ISmartHomeEvent[]): void {
    let cardT: DocumentFragment | null = null;

    events.forEach((event: ISmartHomeEvent) => {
        cardT = renderCard(event);
        if (!cardT) { return null; }

        const card = cardT.querySelector(".card");

        switch (event.size) {
            case "s":
                if (!card) { return; }
                card.classList.add("card-size-s");
                break;
            case "m":
                if (!card) { return; }
                card.classList.add("card-size-m");
                break;
            case "l":
                if (!card) { return; }
                card.classList.add("card-size-l");
        }
        if (!card || !eventslist) { return; }
        eventslist.appendChild(card);
    });
}


/**
 * Рендер карточки
 * @param event
 */
function renderCard(event: ISmartHomeEvent): DocumentFragment | null {
    const t: HTMLTemplateElement | null = document.querySelector("#cardtemplate");
    if (!t) { return null; }

    const te: DocumentFragment | null = (t.cloneNode(true) as HTMLTemplateElement).content;

    const card: HTMLDivElement | null = te.querySelector<HTMLDivElement>(".card");
    const cardBody: HTMLDivElement | null = te.querySelector<HTMLDivElement>(".card-body");
    if (!card || !cardBody) { return null; }
    if (event.type === "critical") {
        card.classList.add("card-critical");
    }

    const cardHead: DocumentFragment | null = renderCardHead(event); // Рендеринг верхней части карточки
    const cardContent = renderCardContent(event); // Рендеринг главной части карточки
    if (!cardHead || !cardContent) { return null; }

    cardBody.appendChild<DocumentFragment>(cardHead);
    cardBody.appendChild<DocumentFragment>(cardContent);

    return te;
}


/**
 * Рендер заголовков карточки
 * @param event
 */
function renderCardHead(event: ISmartHomeEvent): DocumentFragment | null {
    const ht: HTMLTemplateElement | null = document.querySelector("#headertemplate");
    if (!ht) { return null; }

    const h: DocumentFragment | null = (ht.cloneNode(true) as HTMLTemplateElement).content;
    const img: HTMLImageElement | null = h.querySelector(".card-head-icon-source");
    const cardText: HTMLDivElement | null =  h.querySelector(".card-head-text");
    const metaText: HTMLDivElement | null = h.querySelector(".card-head-meta-text");
    const metaTime: HTMLDivElement | null = h.querySelector(".card-head-meta-time");
    if (!img || !cardText || !metaText || !metaTime) { return null; }

    img.src = `/dist/img/icons/${event.icon}.svg`;
    cardText.innerHTML = event.title;
    metaText.innerHTML = event.source;
    metaTime.innerHTML = event.time;

    return h;
}


/**
 * Рендер контента в карточке
 * @param event
 */
function renderCardContent(event: ISmartHomeEvent): DocumentFragment | null {
    const ct: HTMLTemplateElement | null = document.querySelector("#contenttemplate");
    if (!ct) { return null; }
    const c: DocumentFragment | null =  (ct.cloneNode(true) as HTMLTemplateElement).content;
    const contentText: HTMLDivElement | null = c.querySelector(".card-content-text");
    const contentControl: HTMLDivElement | null = c.querySelector(".card-content-control");
    if (!contentControl || !contentText) { return null; }

    // Если есть описание, то добавляем его в контент
    if (event.description) {
        contentText.innerHTML = event.description;
    }

    // Если есть какие-то контролы, для которых есть data, то добавляем. Котнтролы выбираются только исходя из event.source
    // То есть они выбор никак не зависит от размера карточки. И если есть Сенсор микроклимата с size=l или size=m,
    // то подставится один и тот
    // же контрол.
    if (event.data) {
        let control: DocumentFragment | null = null;

        switch (event.source) {
            case "Сенсор микроклимата":
                control = renderThermalControl(event.data as IEventTemperatureData);
                break;
            case "Яндекс.Станция":
                control = renderPlayerControl(event.data as IEventMusicData);
                break;
            case "Холодильник":
                control = renderButtonsControl(event.data as IEventButtonsData);
                break;
            case "Сенсор движения":
                control = renderImageControl(event.data as IEventImageData);
                break;
            case "Сенсоры потребления":
                control = renderGraphControl(event.data as IEventStatData);
                break;
        }
        if (!control) { return null; }
        contentControl.appendChild<DocumentFragment>(control);
    }

    return c;
}

/**
 * Рендер блока контента для термометра
 * @param data
 */
function renderThermalControl(data: IEventTemperatureData): DocumentFragment | null {
    const ct: HTMLTemplateElement | null = document.querySelector("#thermaltemplate");
    if (!ct) { return null; }

    const c: DocumentFragment | null = (ct.cloneNode(true) as HTMLTemplateElement).content;
    const temperatureValue: HTMLDivElement | null = c.querySelector(".temprature-value");
    const humidityValue: HTMLDivElement | null = c.querySelector(".humidity-value");
    if (!temperatureValue || !humidityValue) { return null; }

    temperatureValue.innerHTML = `Температура <b>${data.temperature}\t&deg;C</b>`;
    humidityValue.innerHTML = `Влажность <b>${data.humidity}%</b>`;

    return c;
}


/**
 * Рендер блока контента для Яндекс.Станция
 * @param data
 */
function renderPlayerControl(data: IEventMusicData): DocumentFragment | null {
    const ct: HTMLTemplateElement | null = document.querySelector("#playertemplate");
    if (!ct) { return null; }

    const c: DocumentFragment | null = (ct.cloneNode(true) as HTMLTemplateElement).content;
    const icon: HTMLImageElement | null = c.querySelector(".track-info-icon-source");
    const artistName: HTMLDivElement | null = c.querySelector(".track-artist-name");
    const trackName: HTMLDivElement | null = c.querySelector(".track-name");
    const trackLength: HTMLDivElement | null = c.querySelector(".track-length");
    const volumeValue: HTMLDivElement | null = c.querySelector(".volume-value");
    const volumeSlider: HTMLDivElement | null = c.querySelector(".volume-slider");
    if (!icon || !artistName || !trackName || !trackLength || !volumeValue || !volumeSlider) { return null; }

    icon.src = data.albumcover;
    artistName.innerHTML = data.artist;
    trackName.innerHTML = data.track.name;
    trackLength.innerHTML = data.track.length;
    volumeValue.innerHTML = `${data.volume}%`;
    volumeSlider.style.left = `${data.volume}%`;

    return c;
}

/**
 * Рендер блока контента для кнопок
 * @param data
 */
function renderButtonsControl(data: IEventButtonsData): DocumentFragment | null {
    const ct: HTMLTemplateElement | null = document.querySelector("#buttonstemplate");
    if (!ct) { return null; }

    const c: DocumentFragment | null = (ct.cloneNode(true) as HTMLTemplateElement).content;
    const firstBtn: HTMLButtonElement | null = c.querySelector(".button-first");
    const secondBtn: HTMLButtonElement | null = c.querySelector(".button-second");
    if (!firstBtn || !secondBtn) { return null; }


    firstBtn.innerHTML = data.buttons[0];
    secondBtn.innerHTML = data.buttons[1];

    return c;
}

/**
 * Рендер блока контента для фото
 * @param data
 */
function renderImageControl(data: IEventImageData): DocumentFragment | null {
    const ct: HTMLTemplateElement | null = document.querySelector("#imagetemplate");
    if (!ct) { return null; }

    return (ct.cloneNode(true) as HTMLTemplateElement).content;
}

/**
 * Рендер блока контента для графика(такой же как фото, но допустим был бы график)
 * @param data
 */
function renderGraphControl(data: IEventStatData): DocumentFragment | null {
    const ct: HTMLTemplateElement | null = document.querySelector("#graphtemplate");
    if (!ct) { return null; }

    return (ct.cloneNode(true) as HTMLTemplateElement).content;
}
