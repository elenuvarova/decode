# Decode — архитектура и стек (рабочие правила)

> Дистилляция проверенной методологии (курс-промпты 00–10 + new-feature) под Decode.
> Целевая платформа: **iPhone, последняя iOS**. Web-прототип собирается mobile-first,
> десктоп — вторичная адаптация.

## Стек прототипа (по умолчанию)

| Слой | Выбор | Примечание |
|---|---|---|
| Фреймворк | **Next.js (App Router)** | React приходит вместе с Next |
| Язык | **TypeScript (strict)** | без типов AI делает на 30–50% больше итераций |
| Стили | **Tailwind v4** | конфиг живёт в CSS (`@theme`), НЕ в `tailwind.config.ts` |
| UI-база | **shadcn/ui** (копипаст, не зависимость) | кастомизируем под свои токены |
| Иконки | **lucide-react** + SF Symbols-стиль для iOS-паттернов | |
| Архитектура | **Feature-Sliced Design** + мягкий Atomic внутри `shared/ui/` | |
| Утилиты | `cva` + `clsx` + `tailwind-merge` (`cn()`) | ставятся на init |
| Данные прототипа | **Моки** в `entities/<e>/api/mock-*.ts` через хуки | бэкенд подключается заменой `getX()` без переписывания экранов |

**AI-бэкенд** (FastAPI + Claude vision + Postgres/pgvector — паттерн Chroma) — отдельный
сервис, подключается ПОСЛЕ прототипа на моках. Финальное решение по shell
(PWA vs Expo/RN) — после ресёрча `research/07-tech-ios-pwa-vs-native.md`.

**Открытый вопрос:** структура репо — продукт в корне или в `product/` (как в курсе).
Сейчас в корне лежит workshop-шаблон (backend/frontend) — не трогаем до решения.

## FSD: 6 слоёв, импорты только вниз

```
src/
├── app/        ← роутинг, провайдеры, глобальные стили + layout.tsx с постоянной обвязкой
├── pages/      ← экраны целиком (по одному на маршрут), только контент — без обвязки
├── widgets/    ← крупные блоки (TabBar, Header) — подключаются в layout.tsx
├── features/   ← действия пользователя (scan-document, ask-question, snooze-reminder)
├── entities/   ← бизнес-сущности (document, commitment, reminder) — из модели данных
└── shared/
    ├── ui/     ← UI-кит (atoms / molecules / UI-organisms, БЕЗ домена)
    ├── lib/    ← утилиты (cn и пр.)
    ├── api/    ← базовый api-клиент
    └── config/ ← env, константы
```

`app → pages → widgets → features → entities → shared`. Запрещено: импорт соседнего
слайса на том же уровне; импорт из слоя выше.

### Граница shared/ui ↔ домен

Как только компонент знает о домене (`Document`, `Commitment`, `TrapFlag`) — он уходит
из `shared/ui/`:

| Компонент | Где живёт |
|---|---|
| `Modal`, `Toast`, `BottomSheet`, `DataList` | `shared/ui/` (UI-organism без домена) |
| `DocumentCard`, `TrapFlagCard`, `CostBreakdown` | `entities/document/ui/` |
| `ScanButton`, `AskAnythingInput` | `features/<name>/ui/` |
| `TabBar`, `CockpitHeader` | `widgets/<name>/` |

### Правила, которые ломаются чаще всего

1. **Чистый корень.** Весь код в `src/`, разовые скрипты в `scripts/` (TS), доки в `docs/`.
   Никаких `components/`/`lib/`/дампов в корне. Гард: `find . -maxdepth 1 -name "*.js" -not -name "*.config.js"` → пусто.
2. **Имена страниц.** Компонент экрана — всегда `<Screen>Screen` (`CockpitScreen`,
   `VaultScreen`), именованный экспорт в `pages/<name>/ui/`. Слово `page` — только за
   файлом-маршрутом Next `src/app/.../page.tsx` (тонкий адаптер: `export default CockpitScreen`).
3. **Обвязка — в layout, не в страницах.** TabBar/Header живут в
   `app/(app)/layout.tsx` (route-группа), страницы рендерят только контент — иначе
   обвязка перемонтируется на каждом переходе («мигает меню»). Публичные экраны
   (onboarding) — в `(public)/` со своим layout.
4. **Навигация — `<Link>`** из `next/link` (мягкая, с префетчем), `router.push()` из
   обработчиков. `<a href>` — только внешние ссылки.
5. **Public API слайса** через `index.ts` — наружу только нужное, без глубоких импортов.

## UI-кит: правила сборки

1. **Один компонент = один файл**, варианты через проп `variant` в `cva()`.
2. **Три оси врозь:** `variant` / `size` / `state` — отдельные измерения в `cva` и
   отдельные подписанные блоки в showcase. Не сваливать в один список.
3. Все состояния (hover→**press** для iOS, focus-visible, disabled, loading) — внутри компонента.
4. **Стили только через токены** (`bg-primary`, `text-foreground`). Никаких `bg-[#1A1C1E]`,
   `[16px]`, конкретных шрифтов в компонентах. Гард после каждого компонента:
   `grep -E '#[0-9a-fA-F]{3,8}|\[\d+px\]' src/shared/ui/<c>.tsx` → пусто.
5. Файлы плоско: `shared/ui/button/`, не `shared/ui/atoms/button/`. Atomic — в голове.
6. **Организмы не опциональны** — причина №1 кривого кита: агент останавливается на
   molecules. Sheet/BottomSheet, Modal, Toast, AlertDialog, DropdownMenu, Table/DataList,
   Form, EmptyState — обязательны, если есть в экранах.
7. **Манифест-чекбокс** `docs/ui-kit-manifest.md`: базовый список + инвентаризация
   ВСЕХ визуальных элементов из wireframes (каждый → компонент кита или доменный
   виджет). Этап закрыт только когда нет `[ ]` без согласованного `(skip: …)`.
8. **Showcase `/style-guide`** обязателен: Foundations первой секцией (цвета двумя
   блоками — примитивы и роли, типографика, spacing, radii — читаются из CSS-переменных,
   не хардкодом), каждый компонент с интерактивными контролами и копируемым сниппетом.
   В dev `/` редиректит на style-guide, в прод — нет.
9. **Железное правило DESIGN.md → UIKit → Экран:** нужен новый токен — сначала в
   DESIGN.md; нужен новый variant — сначала в `shared/ui/`; на экране нет ничего,
   чего нет в ките. Блокер, не пожелание.

## iOS-специфика (последняя iOS, iPhone-first)

- **Базовые вьюпорты:** 393×852 (iPhone Pro-класс — основной для wireframes),
  430×932 (Pro Max), 375×667 (нижняя граница). Десктоп — растяжение с max-width.
- **Safe areas:** `viewport-fit=cover` + `env(safe-area-inset-top/bottom)` — Dynamic
  Island сверху (~59pt), home-indicator снизу (34pt). TabBar и нижние CTA учитывают inset.
- **Tap-targets ≥ 44×44pt** (HIG) — на каждом интерактивном элементе.
- **Нет hover.** Все hover-only паттерны запрещены: состояния — press (`:active`),
  действия — всегда видимы или swipe/long-press. Tooltip с важной инфой → видимый текст.
- **Навигация:** нижний TabBar (зона большого пальца), модальные потоки — bottom-sheets,
  не центр-модалки. FAB/основное действие — в пределах thumb-zone.
- **Шрифт:** системный стек SF Pro (`-apple-system, BlinkMacSystemFont, …`), суммы и
  числа — tabular-nums/mono. Размеры в rem (уважение к Dynamic Type).
- **Тёмная тема планируется** → каждый цветовой токен сразу парой light/dark.
- **Клавиатура:** инпуты с правильными `inputmode`/`autocomplete`; нижние элементы
  не перекрываются клавиатурой.

## Процесс фичи (new-feature, кратко)

Спека-first: не писать код без описанного поведения. Интервью (2–6 вопросов: намерение,
крайние случаи, исключения) → бриф в `docs/briefs/<name>.md` → роли по очереди:
исследователь → архитектор (2–3 варианта, выбор с обоснованием) → кодер → ревью логики
по чеклисту брифа → ревью безопасности (IDOR, секреты, инъекции) → тех-лид (MEDIUM+).
Меняешь экран — правишь его `docs/screens/<url>.md` в том же коммите.
