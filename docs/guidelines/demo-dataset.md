# Decode — Канонический демо-датасет

**Один связный демо-датасет для всех экранов: любое число, дата или имя на вайрфрейме обязано сшиваться с этим файлом.** До этого демо-данные писались поэкранно — и на первом полном аудите разошлись (суммы, даты, счётчики трапов, имя продукта не сходились между экранами одного флоу).

**Дата:** 2026-07-11 · **Источник:** [аудит 2026-07-11](../../design/audit-2026-07-11-full.md), тема I «Когерентность демо-датасета и копирайта» (45 находок, включая единственный Blocker).

> **Правило синхронизации:** меняешь демо-число/дату/имя на любом фрейме → правишь этот файл **в том же коммите**. Single source of truth — здесь, не в Figma.

## Точка отсчёта

**TODAY = 10 June 2026.** Все относительные даты на всех экранах считаются от неё:

| Дата | Относительная формула |
|---|---|
| 14 Jun | «in 4 days» |
| 24 Jun | «in 14 days» |
| 28 Jun | «in 18 days» |

## Hero-документ — «Klarna Financing offer»

Отсканирован/сохранён **14 May 2026**. Это **НЕ «Pay in 3»**: Pay in 3 — три беспроцентных платежа, а наш сценарий — процентный кредит. Любое «Pay in 3» в копии hero-дока заменяется на **«Financing»**.

| Факт | Значение | Provenance |
|---|---|---|
| Purchase price (headline) | **£348** | From your doc |
| Продукт | Credit agreement over **6 months** | From your doc |
| Representative APR | **39.9%** | From your doc |
| Платежи | **6 monthly payments of £68.67** | From your doc |
| Total repayable | **£412** = «£64 more than the £348 headline price» | **Calculated** |
| Late fee | **£5** if an instalment is **14+ days late** | From your doc, **p.2 §4** |
| Goes on your credit file | **YES** (Experian + TransUnion) | From your doc |
| First payment | **28 May 2026** (already paid) | — |
| Next payment | **28 Jun 2026** | — |
| Traps (**2**) | Late fee £5 · No Section 75 protection | — |

**Канонический AI-summary (дословно):**

> A credit agreement for £348 paid over 6 monthly instalments of £68.67 at 39.9% APR — £412 in total, £64 of it interest. Miss a payment and a £5 late fee applies, and it may show on your credit file.

## Watch-слой — 6 commitments, «Watching 2 of 6»

### Строки Overview

| Commitment | Каноническая строка |
|---|---|
| Klarna | Klarna · 3 plans — **£294 due this week** · Overlap (next payment **14 Jun**) |
| Boiler cover | Renews **in 14 days** · **24 Jun** — **£312** · Auto-renew (last year £265 → **+£47, +18%**) |
| Clearpay · Sofa | **£62** · due **8 Jul** |
| PayPal · Headphones *(below fold / calendar)* | **£34** · **12 Jul** |

### Суммарные плитки и заголовки

| Элемент | Каноническое значение |
|---|---|
| Summary-плитки | Due 7d **£294** · 30 days **£668** · 60 days **£702** |
| Headline «COMMITTED · 30 DAYS» | **£668** |
| Субтотал секции NEEDS ATTENTION | **£294** |
| Субтотал секции RENEWING SOON | **£312** |
| Субтотал секции ACTIVE | **£96** |
| Trap-чип | «3 traps cost you £180/year» — без изменений |

## Alerts (дословно)

- «Klarna payment due · In 4 days · 14 Jun · £294 — third of three overlapping plans»
- «Boiler cover auto-renews · In 14 days · 24 Jun · £312 — up £47 (+18%) on last year»

## Vault — меты списка (документы, не планы)

- «Klarna Financing offer — 14 May 2026 · Decoded · 2 traps»
- «Boiler cover renewal · Decoded · 2 traps»
- «Clearpay · Sofa · Decoded · 1 trap»

## Голос (voice)

- **Contractions везде:** can't, won't, we'll, you'll — никаких «cannot / we will» (тон сегмента 18–25).
- Деструктивная confirm-формула — ровно одна, дословно: **«This can't be undone.»**

## Арифметическая сверка

Любая правка датасета обязана проходить эти равенства (и наоборот: если равенство ломается — правка неканонична):

| Проверка | Арифметика | Итог |
|---|---|---|
| Due 7d | только Klarna, 14 Jun | **£294** ✓ |
| 30-days тотал | 294 + 312 + 62 | **£668** ✓ |
| 60-days тотал | 668 + 34 | **£702** ✓ |
| Total repayable | 6 × 68.67 = 412.02 | **≈ £412** ✓ |
| Interest-дельта | 412 − 348 | **£64** ✓ |
| Boiler-рост | 265 + 47 = 312; 47 / 265 ≈ 17.7% | **£312, ≈ +18%** ✓ |
| Субтотал ACTIVE | 62 + 34 | **£96** ✓ |
