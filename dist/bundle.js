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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! ./ts/main.ts */ \"./src/ts/main.ts\");\r\n__webpack_require__(/*! ./scss/base.scss */ \"./src/scss/base.scss\");\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/scss/base.scss":
/*!****************************!*\
  !*** ./src/scss/base.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/scss/base.scss?");

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar hamburger = document.querySelector(\"#hamburger\");\r\nvar eventslist = document.querySelector(\"#eventslist\");\r\nif (hamburger && eventslist) {\r\n    hamburger.addEventListener(\"click\", menuToggle);\r\n    fetch(\"/src/json/events.json\")\r\n        .then(function (response) {\r\n        return response.json();\r\n    })\r\n        .then(function (res) {\r\n        render(res.events);\r\n    })\r\n        .catch(alert);\r\n}\r\n/**\r\n * Обработчик раскрытия меню гамбургер на мобилках\r\n */\r\nfunction menuToggle() {\r\n    document.getElementsByTagName(\"nav\")[0].classList.toggle(\"show-menu\");\r\n}\r\n/**\r\n * Первая функция для работы с данными -\r\n * рендер кажой карточки и добавление класса для нужного размера\r\n * @param events : string\r\n */\r\nfunction render(events) {\r\n    var cardT = null;\r\n    events.forEach(function (event) {\r\n        cardT = renderCard(event);\r\n        if (!cardT) {\r\n            return null;\r\n        }\r\n        var card = cardT.querySelector(\".card\");\r\n        switch (event.size) {\r\n            case \"s\":\r\n                if (!card) {\r\n                    return;\r\n                }\r\n                card.classList.add(\"card-size-s\");\r\n                break;\r\n            case \"m\":\r\n                if (!card) {\r\n                    return;\r\n                }\r\n                card.classList.add(\"card-size-m\");\r\n                break;\r\n            case \"l\":\r\n                if (!card) {\r\n                    return;\r\n                }\r\n                card.classList.add(\"card-size-l\");\r\n        }\r\n        if (!card || !eventslist) {\r\n            return;\r\n        }\r\n        eventslist.appendChild(card);\r\n    });\r\n}\r\n/**\r\n * Рендер карточки\r\n * @param event\r\n */\r\nfunction renderCard(event) {\r\n    var t = document.querySelector(\"#cardtemplate\");\r\n    if (!t) {\r\n        return null;\r\n    }\r\n    var te = t.cloneNode(true).content;\r\n    var card = te.querySelector(\".card\");\r\n    var cardBody = te.querySelector(\".card-body\");\r\n    if (!card || !cardBody) {\r\n        return null;\r\n    }\r\n    if (event.type === \"critical\") {\r\n        card.classList.add(\"card-critical\");\r\n    }\r\n    var cardHead = renderCardHead(event); // Рендеринг верхней части карточки\r\n    var cardContent = renderCardContent(event); // Рендеринг главной части карточки\r\n    if (!cardHead || !cardContent) {\r\n        return null;\r\n    }\r\n    cardBody.appendChild(cardHead);\r\n    cardBody.appendChild(cardContent);\r\n    return te;\r\n}\r\n/**\r\n * Рендер заголовков карточки\r\n * @param event\r\n */\r\nfunction renderCardHead(event) {\r\n    var ht = document.querySelector(\"#headertemplate\");\r\n    if (!ht) {\r\n        return null;\r\n    }\r\n    var h = ht.cloneNode(true).content;\r\n    var img = h.querySelector(\".card-head-icon-source\");\r\n    var cardText = h.querySelector(\".card-head-text\");\r\n    var metaText = h.querySelector(\".card-head-meta-text\");\r\n    var metaTime = h.querySelector(\".card-head-meta-time\");\r\n    if (!img || !cardText || !metaText || !metaTime) {\r\n        return null;\r\n    }\r\n    img.src = \"/dist/img/icons/\" + event.icon + \".svg\";\r\n    cardText.innerHTML = event.title;\r\n    metaText.innerHTML = event.source;\r\n    metaTime.innerHTML = event.time;\r\n    return h;\r\n}\r\n/**\r\n * Рендер контента в карточке\r\n * @param event\r\n */\r\nfunction renderCardContent(event) {\r\n    var ct = document.querySelector(\"#contenttemplate\");\r\n    if (!ct) {\r\n        return null;\r\n    }\r\n    var c = ct.cloneNode(true).content;\r\n    var contentText = c.querySelector(\".card-content-text\");\r\n    var contentControl = c.querySelector(\".card-content-control\");\r\n    if (!contentControl || !contentText) {\r\n        return null;\r\n    }\r\n    // Если есть описание, то добавляем его в контент\r\n    if (event.description) {\r\n        contentText.innerHTML = event.description;\r\n    }\r\n    // Если есть какие-то контролы, для которых есть data, то добавляем. Котнтролы выбираются только исходя из event.source\r\n    // То есть они выбор никак не зависит от размера карточки. И если есть Сенсор микроклимата с size=l или size=m,\r\n    // то подставится один и тот\r\n    // же контрол.\r\n    if (event.data) {\r\n        var control = null;\r\n        switch (event.source) {\r\n            case \"Сенсор микроклимата\":\r\n                control = renderThermalControl(event.data);\r\n                break;\r\n            case \"Яндекс.Станция\":\r\n                control = renderPlayerControl(event.data);\r\n                break;\r\n            case \"Холодильник\":\r\n                control = renderButtonsControl(event.data);\r\n                break;\r\n            case \"Сенсор движения\":\r\n                control = renderImageControl(event.data);\r\n                break;\r\n            case \"Сенсоры потребления\":\r\n                control = renderGraphControl(event.data);\r\n                break;\r\n        }\r\n        if (!control) {\r\n            return null;\r\n        }\r\n        contentControl.appendChild(control);\r\n    }\r\n    return c;\r\n}\r\n/**\r\n * Рендер блока контента для термометра\r\n * @param data\r\n */\r\nfunction renderThermalControl(data) {\r\n    var ct = document.querySelector(\"#thermaltemplate\");\r\n    if (!ct) {\r\n        return null;\r\n    }\r\n    var c = ct.cloneNode(true).content;\r\n    var temperatureValue = c.querySelector(\".temprature-value\");\r\n    var humidityValue = c.querySelector(\".humidity-value\");\r\n    if (!temperatureValue || !humidityValue) {\r\n        return null;\r\n    }\r\n    temperatureValue.innerHTML = \"\\u0422\\u0435\\u043C\\u043F\\u0435\\u0440\\u0430\\u0442\\u0443\\u0440\\u0430 <b>\" + data.temperature + \"\\t&deg;C</b>\";\r\n    humidityValue.innerHTML = \"\\u0412\\u043B\\u0430\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C <b>\" + data.humidity + \"%</b>\";\r\n    return c;\r\n}\r\n/**\r\n * Рендер блока контента для Яндекс.Станция\r\n * @param data\r\n */\r\nfunction renderPlayerControl(data) {\r\n    var ct = document.querySelector(\"#playertemplate\");\r\n    if (!ct) {\r\n        return null;\r\n    }\r\n    var c = ct.cloneNode(true).content;\r\n    var icon = c.querySelector(\".track-info-icon-source\");\r\n    var artistName = c.querySelector(\".track-artist-name\");\r\n    var trackName = c.querySelector(\".track-name\");\r\n    var trackLength = c.querySelector(\".track-length\");\r\n    var volumeValue = c.querySelector(\".volume-value\");\r\n    var volumeSlider = c.querySelector(\".volume-slider\");\r\n    if (!icon || !artistName || !trackName || !trackLength || !volumeValue || !volumeSlider) {\r\n        return null;\r\n    }\r\n    icon.src = data.albumcover;\r\n    artistName.innerHTML = data.artist;\r\n    trackName.innerHTML = data.track.name;\r\n    trackLength.innerHTML = data.track.length;\r\n    volumeValue.innerHTML = data.volume + \"%\";\r\n    volumeSlider.style.left = data.volume + \"%\";\r\n    return c;\r\n}\r\n/**\r\n * Рендер блока контента для кнопок\r\n * @param data\r\n */\r\nfunction renderButtonsControl(data) {\r\n    var ct = document.querySelector(\"#buttonstemplate\");\r\n    if (!ct) {\r\n        return null;\r\n    }\r\n    var c = ct.cloneNode(true).content;\r\n    var firstBtn = c.querySelector(\".button-first\");\r\n    var secondBtn = c.querySelector(\".button-second\");\r\n    if (!firstBtn || !secondBtn) {\r\n        return null;\r\n    }\r\n    firstBtn.innerHTML = data.buttons[0];\r\n    secondBtn.innerHTML = data.buttons[1];\r\n    return c;\r\n}\r\n/**\r\n * Рендер блока контента для фото\r\n * @param data\r\n */\r\nfunction renderImageControl(data) {\r\n    var ct = document.querySelector(\"#imagetemplate\");\r\n    if (!ct) {\r\n        return null;\r\n    }\r\n    return ct.cloneNode(true).content;\r\n}\r\n/**\r\n * Рендер блока контента для графика(такой же как фото, но допустим был бы график)\r\n * @param data\r\n */\r\nfunction renderGraphControl(data) {\r\n    var ct = document.querySelector(\"#graphtemplate\");\r\n    if (!ct) {\r\n        return null;\r\n    }\r\n    return ct.cloneNode(true).content;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/ts/main.ts?");

/***/ })

/******/ });