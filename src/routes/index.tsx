import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Truck, Wallet, RefreshCcw, Star, Flame, Layers, ShieldCheck } from "lucide-react";

import { OrderSheet, type OrderRequest } from "@/components/site/OrderSheet";
import { ProductCard, type Product } from "@/components/site/ProductCard";
import { useActiveTone, useReveal } from "@/components/site/useReveal";

import heroFabric from "@/assets/hero-fabric.jpg";
import blanketCamel from "@/assets/blanket-camel.jpg";
import blanketSheep from "@/assets/blanket-sheep.jpg";
import blanketBamboo from "@/assets/blanket-bamboo.jpg";
import blanketSwan from "@/assets/blanket-swan.jpg";
import pillowCamel from "@/assets/pillow-camel.jpg";
import pillowSheep from "@/assets/pillow-sheep.jpg";
import pillowSwan from "@/assets/pillow-swan.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ліквідація складу — преміальні ковдри та подушки з України" },
      {
        name: "description",
        content:
          "Ковдри та подушки з верблюжої, овечої вовни, бамбука та еко-пуху від українського виробника. Знижки до -55%, доставка Новою Поштою, оплата при отриманні.",
      },
      { property: "og:title", content: "Ліквідація складу українського виробника" },
      {
        property: "og:description",
        content:
          "Преміальна якість натуральних тканин зі знижками до -55%. Підтримай українське — інвестуй у здоровий сон.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BLANKET_SIZES = ["150х210", "175х210", "200х220"];
const PILLOW_SIZES = ["50х70", "70х70", "40х60"];

const blankets: (Product & { tone: string })[] = [
  {
    id: "camel",
    tone: "sand",
    name: 'Ковдра "Верблюжа вовна"',
    tagline: "Хіт продажів",
    badge: "Топ вибір",
    top: true,
    description:
      "Природна терморегуляція: тепло вночі, прохолода вранці. Волокно верблюжого пуху дихає та не накопичує вологу.",
    image: blanketCamel,
    oldPrice: 3480,
    price: 1566,
    sizes: BLANKET_SIZES,
  },
  {
    id: "sheep",
    tone: "cream",
    name: 'Ковдра "Овеча вовна"',
    tagline: "Альпійський затишок",
    description:
      "Класична щільна вовна з м'яким чохлом із мікрофібри. Огортає теплом навіть у нетоплених спальнях.",
    image: blanketSheep,
    oldPrice: 2980,
    price: 1390,
    sizes: BLANKET_SIZES,
  },
  {
    id: "bamboo",
    tone: "sage",
    name: 'Ковдра "Бамбукове волокно"',
    tagline: "Еко та гіпоалергенність",
    description:
      "Свіжість бамбукового волокна: антибактеріальність, нуль пилових кліщів, ідеально для дітей та алергіків.",
    image: blanketBamboo,
    oldPrice: 2740,
    price: 1233,
    sizes: BLANKET_SIZES,
  },
  {
    id: "swan",
    tone: "cloud",
    name: 'Ковдра "Лебединий еко-пух"',
    tagline: "Готельна легкість",
    description:
      "Майже невагома, повітряна пухкість рівня п'ятизіркового готелю. Не збивається та легко переться.",
    image: blanketSwan,
    oldPrice: 3120,
    price: 1450,
    sizes: BLANKET_SIZES,
  },
];

const pillows: Product[] = [
  {
    id: "p-camel",
    name: 'Набір подушок "Верблюжа вовна"',
    tagline: "Premium support",
    description: "Пружна підтримка шиї, що тримає форму роками. У наборі — дві подушки.",
    image: pillowCamel,
    oldPrice: 1480,
    price: 690,
    sizes: PILLOW_SIZES,
  },
  {
    id: "p-sheep",
    name: 'Набір подушок "Овеча вовна"',
    tagline: "Cozy comfort",
    description: "М'яка вовна в чохлі з бавовни — теплий, спокійний сон без перегріву.",
    image: pillowSheep,
    oldPrice: 1290,
    price: 590,
    sizes: PILLOW_SIZES,
  },
  {
    id: "p-swan",
    name: 'Набір подушок "Лебединий еко-пух"',
    tagline: "Cloud softness",
    description: "Хмарна легкість еко-пуху: подушка приймає форму голови та миттєво відновлюється.",
    image: pillowSwan,
    oldPrice: 1360,
    price: 620,
    sizes: PILLOW_SIZES,
  },
];

const reviews = [
  {
    name: "Оксана, Львів",
    rating: 5,
    text: "Замовила верблюжу ковдру — тепло, але не парко. Доставили Новою Поштою за день, оплатила при отриманні.",
  },
  {
    name: "Андрій, Київ",
    rating: 5,
    text: "Якість справді преміальна, шви ідеальні. Приємно, що це українське виробництво.",
  },
  {
    name: "Марина, Одеса",
    rating: 4,
    text: "Бамбукова ковдра для дитини — жодних алергій, легко переться. Ціна за таку якість неймовірна.",
  },
  {
    name: "Ігор, Дніпро",
    rating: 5,
    text: "Взяли набір подушок з еко-пуху. Спимо як у готелі, вранці шия не болить.",
  },
];

function useCountdown(hours = 47) {
  const [left, setLeft] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(left / 3600))}:${p(Math.floor((left % 3600) / 60))}:${p(left % 60)}`;
}

function Index() {
  const [request, setRequest] = useState<OrderRequest | null>(null);
  const tone = useActiveTone("ivory");
  const timer = useCountdown();
  const hero = useReveal<HTMLDivElement>();
  const trust = useReveal<HTMLDivElement>();

  const toneMap: Record<string, string> = {
    ivory: "var(--tone-ivory)",
    sand: "var(--tone-sand)",
    cream: "var(--tone-cream)",
    sage: "var(--tone-sage)",
    cloud: "var(--tone-cloud)",
    grey: "var(--tone-grey)",
  };

  return (
    <div
      className="tone-canvas min-h-screen pb-28"
      style={{ backgroundColor: toneMap[tone] ?? toneMap["ivory"] }}
    >
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="font-display text-lg tracking-wide">
            СОННЕ ПОЛЕ
          </a>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Український виробник
          </span>
          <span className="rounded-full border border-gold/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-gold">
            −55%
          </span>
        </div>
      </header>

      {/* HERO */}
      <section id="top" data-tone="ivory" className="px-5 pt-10 sm:pt-16">
        <div ref={hero.ref} className={`mx-auto max-w-5xl reveal ${hero.shown ? "reveal-in" : ""}`}>
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] backdrop-blur-md">
                <Flame className="h-3.5 w-3.5 text-terracotta" />
                Акція обмежена · {timer}
              </span>
              <h1 className="mt-6 text-4xl leading-[1.05] sm:text-6xl">
                ЛІКВІДАЦІЯ СКЛАДУ УКРАЇНСЬКОГО ВИРОБНИКА
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Преміальна якість натуральних тканин зі знижками до −55%. Підтримай українське —
                інвестуй у здоровий сон.
              </p>
              <a
                href="#catalog"
                className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-ink px-8 text-base font-medium tracking-wide text-ink-foreground transition-transform active:scale-[0.98] sm:w-auto"
              >
                Обрати свій комфорт
              </a>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <span>Натуральні наповнювачі</span>
                <span>Пошито в Україні</span>
                <span>Післяплата</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-hairline shadow-lift">
              <img
                src={heroFabric}
                alt="Макро-знімок преміального шва натуральної тканини"
                width={1408}
                height={1600}
                className="h-[58vw] max-h-[560px] w-full object-cover lg:h-[560px]"
              />
              <div className="glass-card absolute bottom-4 left-4 right-4 rounded-2xl px-5 py-4">
                <p className="eyebrow">Деталі, що видно зблизька</p>
                <p className="mt-1 font-display text-xl">Подвійний шов та чохол із бавовни</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG A */}
      <section id="catalog" className="px-5 pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">Категорія A</p>
          <h2 className="mt-2 text-3xl sm:text-5xl">Преміальні ковдри</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Чотири наповнювачі — чотири характери сну. Прокручуйте, щоб відчути кожен матеріал.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl space-y-10">
          {blankets.map((b) => (
            <div key={b.id} data-tone={b.tone}>
              <ProductCard product={b} onOrder={setRequest} />
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG B */}
      <section id="pillows" data-tone="grey" className="px-5 pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">Категорія B</p>
          <h2 className="mt-2 text-3xl sm:text-5xl">Подушки для комфорту</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Набори по дві подушки. Гортайте на телефоні, порівнюйте на великому екрані.
          </p>
        </div>

        {/* Mobile: swipeable slider */}
        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 sm:hidden">
          {pillows.map((p) => (
            <div key={p.id} className="w-[85vw] shrink-0 snap-center">
              <ProductCard product={p} onOrder={setRequest} />
            </div>
          ))}
        </div>

        {/* Desktop: 2-column grid */}
        <div className="mx-auto mt-8 hidden max-w-5xl grid-cols-2 gap-6 sm:grid">
          {pillows.map((p) => (
            <ProductCard key={p.id} product={p} onOrder={setRequest} />
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section data-tone="ivory" className="px-5 pt-20">
        <div
          ref={trust.ref}
          className={`mx-auto max-w-5xl reveal ${trust.shown ? "reveal-in" : ""}`}
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, t: "Швидка доставка Новою Поштою", s: "1–2 дні по всій Україні" },
              { icon: Wallet, t: "Оплата при отриманні", s: "Післяплата без передоплати" },
              { icon: RefreshCcw, t: "14 днів на обмін", s: "Та повернення без питань" },
            ].map(({ icon: Icon, t, s }) => (
              <div key={t} className="glass-card rounded-3xl p-5">
                <Icon className="h-5 w-5 text-gold" />
                <p className="mt-3 font-display text-xl leading-snug">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <p className="eyebrow">Відгуки</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Що кажуть покупці</h2>
            <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
              {reviews.map((r) => (
                <figure
                  key={r.name}
                  className="glass-card w-[80vw] shrink-0 snap-center rounded-3xl p-6 sm:w-[22rem]"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < r.rating ? "fill-gold text-gold" : "text-hairline"}`}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed">{r.text}</blockquote>
                  <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {r.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-hairline px-5 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-display text-2xl leading-snug sm:text-3xl">
            Теплі ковдри та подушки нового покоління. Вироблено з гордістю в Україні.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Гарантія якості
            </span>
            <span className="inline-flex items-center gap-2">
              <Layers className="h-4 w-4" /> Власне виробництво
            </span>
            <a href="tel:+380671234567" className="text-foreground">
              +38 (067) 123-45-67
            </a>
          </div>
        </div>
      </footer>

      {/* Floating bottom nav */}
      <nav className="fixed bottom-4 left-1/2 z-40 w-[min(92%,26rem)] -translate-x-1/2">
        <div className="glass-card flex items-center justify-between gap-2 rounded-full p-1.5">
          <a
            href="#catalog"
            className="flex-1 rounded-full px-4 py-3 text-center text-sm font-medium"
          >
            Ковдри
          </a>
          <a
            href="#pillows"
            className="flex-1 rounded-full px-4 py-3 text-center text-sm font-medium"
          >
            Подушки
          </a>
          <button
            onClick={() =>
              setRequest({ product: "Консультація менеджера", size: "уточнимо", price: "−55%" })
            }
            className="flex-1 rounded-full bg-ink px-4 py-3 text-center text-sm font-medium text-ink-foreground"
          >
            Замовити
          </button>
        </div>
      </nav>

      <OrderSheet request={request} onClose={() => setRequest(null)} />
    </div>
  );
}
