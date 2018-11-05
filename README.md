# ДЗ Архитектура
## Launch this
 ```shell
  git clone https://github.com/Coudnet/adaptive-layout-homework-shri2018
  cd adaptive-layout-homework-shri2018
  git checkout fluxmigration
  npm i
  npm start
  npm node
```
После запуска webpack-server проект будет доступен по адресу **http://localhost:8081**

Для работы приложения необходим сервер тестовых потоков видео:
## Запуск сервера тестовых потоков
```shell
git clone https://github.com/mad-gooze/shri-2018-2-multimedia-homework.git
cd shri-2018-2-multimedia-homework
npm i
npm start
```
 
## Flux фреймворк
Фреймворк называется Flucha  и подключается как npm пакет

https://www.npmjs.com/package/flucha

https://github.com/Coudnet/flucha

## Node JS сервер
Сервер также находится в npm пакете

https://www.npmjs.com/package/node-js-shri2018

https://github.com/Coudnet/nodejs-shri2018

## Сохранение данных на сервере

Node JS сервер отвечает за загрузку JSON событий и за сохранение текущей вкладки.
Вкладка хранится просто как глобальная переменная на сервере