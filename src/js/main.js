hamburger.addEventListener('click', menuToggle);
function menuToggle() {
    document.getElementsByTagName('nav')[0].classList.toggle('show-menu');
}
/**
 * Загружаем данные
 */
fetch('/src/json/events.json')
    .then(function(response) {
        return response.json();
    })
    .then(function (res) {
        render(res.events);
    })
    .catch( alert );



/**
 * Первая функция для работы с данными -
 * выбор нужной функции рендера под конкрутный размер карточки
 */
function render(events) {
    let card = null;
    events.forEach(event => {
        switch (event.size) {
            case 's':
                card = renderCard(event);
                card.querySelector('.card').classList.add('card-size-s');
                break;
            case 'm':
                card = renderCard(event);
                card.querySelector('.card').classList.add('card-size-m');
                break;
            case 'l':
                card = renderCard(event);
                card.querySelector('.card').classList.add('card-size-l');
        }
        eventslist.appendChild(card);
    })
}


/**
 * Рендер карточки
 */
function renderCard(event) {
    let t = document.querySelector('#cardtemplate').content.cloneNode(true); // Получение template и его клонирование

    let card = t.querySelector('.card'); // Главный Node с карточкой, все изменения будут в нем
    let cardHead = renderCardHead(event); // Рендеринг верхней части карточки
    let cardContent = renderCardContent(event); // Рендеринг главной части карточки

    card.querySelector('.card-body').appendChild(cardHead);
    card.querySelector('.card-body').appendChild(cardContent);
    if(event.type === 'critical') card.classList.add('card-critical');

    return t;
}



/**
 * Рендер заголовков карточки
 */
function renderCardHead(event) {
    let h = document.querySelector('#headertemplate').content.cloneNode(true);

    h.querySelector('.card-head-icon img').src = '/dist/img/icons/' + event.icon + '.svg';
    h.querySelector('.card-head-text').innerHTML = event.title;
    h.querySelector('.card-head-meta-text').innerHTML = event.source;
    h.querySelector('.card-head-meta-time').innerHTML = event.time;

    return h;
}



/**
 * Рендер контента в карточке
 */
function renderCardContent(event) {
    let c = document.querySelector('#contenttemplate').content.cloneNode(true);

    // Если есть описание, то добавляем его в контент
    if(event.description) {
        c.querySelector('.card-content-text').innerHTML = event.description;
    }

    // Если есть какие-то контролы, для которых есть data, то добавляем. Котнтролы выбираются только исходя из event.source
    // То есть они выбор никак не зависит от размера карточки. И если есть Сенсор микроклимата с size=l или size=m, то подставится один и тот
    // же контрол.
    if(event.data) {
        let control = null;

        switch (event.source) {
            case 'Сенсор микроклимата':
                control = renderThermalControl(event.data);
                break;
            case 'Яндекс.Станция':
                control = renderPlayerControl(event.data);
                break;
            case 'Холодильник':
                control = renderButtonsControl(event.data);
                break;
            case 'Сенсор движения':
                control = renderImageControl(event.data);
                break;
            case 'Сенсоры потребления':
                control = renderGraphControl(event.data);
                break;
        }
        c.querySelector('.card-content-control').appendChild(control);
    }

    return c;
}

function renderThermalControl(data) {
    let tc = document.querySelector('#thermaltemplate').content.cloneNode(true);

    tc.querySelector('.temprature-value').innerHTML = 'Температура <b>' + data.temperature + '\t&deg;C</b>';
    tc.querySelector('.humidity-value').innerHTML = 'Влажность <b>' + data.humidity + '%</b>';

    return tc;
}

function renderPlayerControl(data) {
    let pc = document.querySelector('#playertemplate').content.cloneNode(true);

    pc.querySelector('.track-info-icon > img').src = data.albumcover;
    pc.querySelector('.track-artist-name').innerHTML = data.artist;
    pc.querySelector('.track-name').innerHTML = data.track.name;
    pc.querySelector('.track-length').innerHTML = data.track.length;
    pc.querySelector('.volume-value').innerHTML = data.volume + '%';
    pc.querySelector('.volume-slider').style.left = data.volume + '%';

    return pc;
}

function renderButtonsControl(data) {
    let bc = document.querySelector('#buttonstemplate').content.cloneNode(true);

    bc.querySelector('.button-first').innerHTML = data.buttons[0];
    bc.querySelector('.button-second').innerHTML = data.buttons[1];

    return bc;
}

function renderImageControl(data) {
    let ic = document.querySelector('#imagetemplate').content.cloneNode(true);

    return ic;
}

function renderGraphControl(data) {
    let gc = document.querySelector('#graphtemplate').content.cloneNode(true);

    return gc;
}