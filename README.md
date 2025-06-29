# 🛒 Интернет-магазин электроники

Простой и современный интернет-магазин товаров на базе React с использованием TypeScript, SCSS, Redux Toolkit, RTK Query и JSON Server.

## 🧰 Технологии

- **React** + **TypeScript**
- **Vite** — сборщик проекта
- **SCSS** — стилизация
- **Ant Design (antd)** — UI-компоненты
- **Redux Toolkit (RTK Query)** — управление состоянием и запросами к API
- **JSON Server** — mock backend
- **Lodash** — утилиты для работы с данными
- **Concurrently** — запуск нескольких команд одновременно

---

## 📦 Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/Airathabib/electronics_store.git
```

2. Перейдите в папку проекта:

```bash
cd electronics_store
```

3. Установите зависимости:

```bash
npm install
```

---

## ▶️ Запуск приложения

Запустите проект в режиме разработки:

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173)

> ⚠️ JSON Server автоматически запускается вместе с Vite благодаря `concurrently`.

---

## 🗂️ Структура проекта

```
src/
├── assets/                # Изображения и статические файлы
├── components/            # Переиспользуемые компоненты
├── features/              # Фичи приложения (например, комментарии, модальное окно)
├── pages/                 # Страницы  (например,Избранное, Корзина )
├── store/                 # Redux Store и слайсы
├── handlers/              # Вспомогательные функции (hooks, helpers)
├── App.tsx                # Главный компонент
└── main.tsx               # Точка входа
```

---

## 💡 Основные возможности

- Просмотр списка товаров
- Поиск и фильтрация по категориям
- Детальная страница товара
- Корзина покупок
- Поддержка Redux для управления состоянием
- RTK Query для работы с API
- Адаптивный дизайн под мобильные устройства

---

## 🛠️ Дополнительные команды

| Команда           | Описание                      |
| ----------------- | ----------------------------- |
| `npm run dev`     | Запуск локального сервера     |
| `npm run build`   | Сборка production версии      |
| `npm run preview` | Предпросмотр собранной версии |
| `npm run lint`    | Проверка кода через ESLint    |

---

## 📝 Линтер и стиль кодирования

Проект использует **ESLint** с поддержкой TypeScript и React. Настройки взяты из официальных рекомендаций:

- `@typescript-eslint/eslint-plugin`
- `eslint-plugin-react`
- `tseslint.configs.recommendedTypeChecked`

---

## 🤝 Автор

**AiratHabib**  
GitHub: [https://github.com/Airathabib](https://github.com/Airathabib)
