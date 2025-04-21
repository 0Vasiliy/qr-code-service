#!/bin/bash

# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Переход в директорию сборки
cd .output/public

# Инициализация git репозитория
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Добавление удаленного репозитория
git remote add origin https://github.com/your-username/qr-code-service.git

# Отправка в ветку gh-pages
git push -f origin HEAD:gh-pages

# Возврат в корневую директорию
cd ../.. 