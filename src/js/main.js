import {Flucha} from "flucha";
import {MainPage} from "./RenderScripts/mainPageRender"
import {VideoPage} from "./RenderScripts/videoPageRender"
import {VideoStreamControl} from "./VideoStreams/main"

getCurrentPage();

/**
 * Главный объект для Flucha, в который добавляются данные,
 * методы обновления данных для store,
 * actions и функция рендера
 */
const flucha = new Flucha({
    el: "#app",
    data: {
        page: 1
    },
    actions: {
        changePage: {
            update: function () {
                return function (page){
                    this.data.page = page;
                }
            }
        },
        init: {
            update: function () {
                return function () {
                    this.data.page = 1;
                }
            }
        }
    },
    render: function () {
        return function () {
            switch (this.data.page) {
                case 1:
                    fetch('http://localhost:8000/api/events')
                        .then((response) => {
                            return response.json();
                        })
                        .then((res) => {
                            MainPage.init(res.data, this.el);
                            menuActiveTab();
                        })
                        .catch( alert );
                    break;
                case 2:
                    VideoPage.init(this.el);
                    const control = new VideoStreamControl();
                    control.init();
                    menuActiveTab();
            }
        }
    }
});

/**
 * Обработчики переключения вкладок
 */
document.querySelector(".video-page").addEventListener("click", () => {
    saveNewPage(2);
});

document.querySelector(".main-page").addEventListener("click", () => {
    saveNewPage(1);
});

/**
 * Обработчик раскрытия меню гамбургер на мобилках
 */
hamburger.addEventListener('click', menuToggle);
function menuToggle() {
    document.getElementsByTagName('nav')[0].classList.toggle('show-menu');
}

/**
 * Добавление класса для активной вкладки
 */
function menuActiveTab() {
    const videoTab = document.querySelector(".video-page");
    const eventsTab = document.querySelector(".main-page");
    switch (flucha.data.page) {
        case 1:
            eventsTab.classList.add("current");
            videoTab.classList.remove("current");
            break;
        case 2:
            eventsTab.classList.remove("current");
            videoTab.classList.add("current");
    }
}

/**
 * Получение текущей вкладки
 */
function getCurrentPage() {
    fetch("http://localhost:8000/page", {mode: 'cors'})
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            flucha.emit("changePage", res.page);
        })
        .catch( alert );
}

/**
 * Сохранение новой вкладки
 */
function saveNewPage(page) {
    fetch("http://localhost:8000/page", {
            mode: 'no-cors',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `page=${page}`
        })
        .then((res) => {
            flucha.emit("changePage", page);
        })
        .catch( alert );
}
