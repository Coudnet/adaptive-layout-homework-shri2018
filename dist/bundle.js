/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/main.js */ \"./src/js/main.js\");\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_main_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scss_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/base.scss */ \"./src/scss/base.scss\");\n/* harmony import */ var _scss_base_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_base_scss__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("hamburger.addEventListener('click', menuToggle);\r\nfunction menuToggle() {\r\n    document.getElementsByTagName('nav')[0].classList.toggle('show-menu');\r\n}\r\n/**\r\n * Загружаем данные\r\n */\r\nfetch('/src/json/events.json')\r\n    .then(function(response) {\r\n        return response.json();\r\n    })\r\n    .then(function (res) {\r\n        render(res.events);\r\n    })\r\n    .catch( alert );\r\n\r\n\r\n\r\n/**\r\n * Первая функция для работы с данными -\r\n * выбор нужной функции рендера под конкрутный размер карточки\r\n */\r\nfunction render(events) {\r\n    let card = null;\r\n    events.forEach(event => {\r\n        switch (event.size) {\r\n            case 's':\r\n                card = renderCard(event);\r\n                card.querySelector('.card').classList.add('card-size-s');\r\n                break;\r\n            case 'm':\r\n                card = renderCard(event);\r\n                card.querySelector('.card').classList.add('card-size-m');\r\n                break;\r\n            case 'l':\r\n                card = renderCard(event);\r\n                card.querySelector('.card').classList.add('card-size-l');\r\n        }\r\n        eventslist.appendChild(card);\r\n    })\r\n}\r\n\r\n\r\n/**\r\n * Рендер карточки\r\n */\r\nfunction renderCard(event) {\r\n    let t = document.querySelector('#cardtemplate').content.cloneNode(true); // Получение template и его клонирование\r\n\r\n    let card = t.querySelector('.card'); // Главный Node с карточкой, все изменения будут в нем\r\n    let cardHead = renderCardHead(event); // Рендеринг верхней части карточки\r\n    let cardContent = renderCardContent(event); // Рендеринг главной части карточки\r\n\r\n    card.querySelector('.card-body').appendChild(cardHead);\r\n    card.querySelector('.card-body').appendChild(cardContent);\r\n    if(event.type === 'critical') card.classList.add('card-critical');\r\n\r\n    return t;\r\n}\r\n\r\n\r\n\r\n/**\r\n * Рендер заголовков карточки\r\n */\r\nfunction renderCardHead(event) {\r\n    let h = document.querySelector('#headertemplate').content.cloneNode(true);\r\n\r\n    h.querySelector('.card-head-icon img').src = '/dist/img/icons/' + event.icon + '.svg';\r\n    h.querySelector('.card-head-text').innerHTML = event.title;\r\n    h.querySelector('.card-head-meta-text').innerHTML = event.source;\r\n    h.querySelector('.card-head-meta-time').innerHTML = event.time;\r\n\r\n    return h;\r\n}\r\n\r\n\r\n\r\n/**\r\n * Рендер контента в карточке\r\n */\r\nfunction renderCardContent(event) {\r\n    let c = document.querySelector('#contenttemplate').content.cloneNode(true);\r\n\r\n    // Если есть описание, то добавляем его в контент\r\n    if(event.description) {\r\n        c.querySelector('.card-content-text').innerHTML = event.description;\r\n    }\r\n\r\n    // Если есть какие-то контролы, для которых есть data, то добавляем. Котнтролы выбираются только исходя из event.source\r\n    // То есть они выбор никак не зависит от размера карточки. И если есть Сенсор микроклимата с size=l или size=m, то подставится один и тот\r\n    // же контрол.\r\n    if(event.data) {\r\n        let control = null;\r\n\r\n        switch (event.source) {\r\n            case 'Сенсор микроклимата':\r\n                control = renderThermalControl(event.data);\r\n                break;\r\n            case 'Яндекс.Станция':\r\n                control = renderPlayerControl(event.data);\r\n                break;\r\n            case 'Холодильник':\r\n                control = renderButtonsControl(event.data);\r\n                break;\r\n            case 'Сенсор движения':\r\n                control = renderImageControl(event.data);\r\n                break;\r\n            case 'Сенсоры потребления':\r\n                control = renderGraphControl(event.data);\r\n                break;\r\n        }\r\n        c.querySelector('.card-content-control').appendChild(control);\r\n    }\r\n\r\n    return c;\r\n}\r\n\r\nfunction renderThermalControl(data) {\r\n    let tc = document.querySelector('#thermaltemplate').content.cloneNode(true);\r\n\r\n    tc.querySelector('.temprature-value').innerHTML = 'Температура <b>' + data.temperature + '\\t&deg;C</b>';\r\n    tc.querySelector('.humidity-value').innerHTML = 'Влажность <b>' + data.humidity + '%</b>';\r\n\r\n    return tc;\r\n}\r\n\r\nfunction renderPlayerControl(data) {\r\n    let pc = document.querySelector('#playertemplate').content.cloneNode(true);\r\n\r\n    pc.querySelector('.track-info-icon > img').src = data.albumcover;\r\n    pc.querySelector('.track-artist-name').innerHTML = data.artist;\r\n    pc.querySelector('.track-name').innerHTML = data.track.name;\r\n    pc.querySelector('.track-length').innerHTML = data.track.length;\r\n    pc.querySelector('.volume-value').innerHTML = data.volume + '%';\r\n    pc.querySelector('.volume-slider').style.left = data.volume + '%';\r\n\r\n    return pc;\r\n}\r\n\r\nfunction renderButtonsControl(data) {\r\n    let bc = document.querySelector('#buttonstemplate').content.cloneNode(true);\r\n\r\n    bc.querySelector('.button-first').innerHTML = data.buttons[0];\r\n    bc.querySelector('.button-second').innerHTML = data.buttons[1];\r\n\r\n    return bc;\r\n}\r\n\r\nfunction renderImageControl(data) {\r\n    let ic = document.querySelector('#imagetemplate').content.cloneNode(true);\r\n\r\n    return ic;\r\n}\r\n\r\nfunction renderGraphControl(data) {\r\n    let gc = document.querySelector('#graphtemplate').content.cloneNode(true);\r\n\r\n    return gc;\r\n}\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/scss/base.scss":
/*!****************************!*\
  !*** ./src/scss/base.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/scss/base.scss?");

/***/ })

/******/ });