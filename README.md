# ДЗ Архитектура
## Launch this
 ```shell
  git clone https://github.com/Coudnet/adaptive-layout-homework-shri2018
  cd adaptive-layout-homework-shri2018
  git checkout fluxmigration
  npm i
  npm start
```
После запуска webpack-server проект будет доступен по адресу **http://localhost:8081**

Для работы приложения необходимы два сервера:
## Запуск сервера тестовых потоков
 ```shell
  cd servers/video-streams-server
  npm i
  npm start
```

## Запуск Node JS сервера
 ```shell
  cd servers/data-server
  npm i
  npm start
```
 
## Flux фреймворк
Фреймворк называется Flucha  и подключается как npm пакет

https://www.npmjs.com/package/flucha

https://github.com/Coudnet/flucha

## Сохранение данных на сервере

Node JS сервер отвечает за загрузку JSON событий и за сохранение текущей вкладки.
Вкладка хранится просто как глобальная переменная на сервере