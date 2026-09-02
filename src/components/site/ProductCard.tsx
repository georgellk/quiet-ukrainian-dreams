import { useEffect, useState } from "react";
import { Sparkles, Plus, Check } from "lucide-react";
import { useReveal } from "./useReveal";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  oldPrice: number;
  price: number;
  sizes: string[];
  top?: boolean;
  badge?: string;
};

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (item: { product: string; size: string; price: number }) => void;
}) {
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]!);
  const [added, setAdded] = useState(false);
  const { ref, shown } = useReveal<HTMLElement>();
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <article
      ref={ref}
      className={`glass-card reveal ${shown ? "reveal-in" : ""} overflow-hidden rounded-3xl ${
        product.top ? "ring-1 ring-gold/60" : ""
      }`}
    >
      <div className="relative aspect-4/3 overflow-hidden sm:aspect-16/10">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3.5 py-1.5 text-sm font-medium uppercase tracking-[0.14em] text-ink-foreground backdrop-blur-sm">
          −{discount}%
        </span>
        {product.badge ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold/95 px-3.5 py-1.5 text-sm font-medium uppercase tracking-[0.12em] text-ink">
            <Sparkles className="h-3.5 w-3.5" />
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="pattern-weave p-5 sm:p-6">
        <p className="eyebrow">{product.tagline}</p>
        <h3 className="mt-2 text-[1.75rem] leading-tight sm:text-3xl">{product.name}</h3>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{product.description}</p>

        <div className="mt-5 flex items-end gap-3">
          <span className="font-display text-4xl leading-none">{product.price} ₴</span>
          <span className="pb-1 text-lg text-muted-foreground line-through decoration-terracotta/70">
            {product.oldPrice} ₴
          </span>
        </div>

        <p className="mt-5 text-sm uppercase tracking-[0.16em] text-muted-foreground">Розмір</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`h-14 rounded-2xl border-2 text-base transition-all active:scale-[0.97] ${
                size === s
                  ? "border-ink bg-ink text-ink-foreground"
                  : "border-hairline bg-background/60 text-foreground hover:border-gold"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            onAdd({ product: product.name, size, price: product.price });
            setAdded(true);
          }}
          className={`mt-4 flex h-16 w-full items-center justify-center gap-2 rounded-2xl text-lg font-medium tracking-wide transition-all active:scale-[0.98] ${
            added ? "bg-gold text-ink" : "bg-ink text-ink-foreground"
          }`}
        >
          {added ? (
            <>
              <Check className="h-5 w-5" /> Додано в кошик
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" /> Додати в кошик
            </>
          )}
        </button>
      </div>
    </article>
  );
}
