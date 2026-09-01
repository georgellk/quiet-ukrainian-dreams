import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useReveal } from "./useReveal";
import type { OrderRequest } from "./OrderSheet";

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
  onOrder,
}: {
  product: Product;
  onOrder: (req: OrderRequest) => void;
}) {
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]!);
  const { ref, shown } = useReveal<HTMLElement>();
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

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
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-foreground backdrop-blur-sm">
          −{discount}%
        </span>
        {product.badge ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold/95 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ink">
            <Sparkles className="h-3 w-3" />
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="p-5 sm:p-6">
        <p className="eyebrow">{product.tagline}</p>
        <h3 className="mt-2 text-2xl leading-tight sm:text-[1.7rem]">{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <div className="mt-5 flex items-end gap-3">
          <span className="font-display text-3xl leading-none">{product.price} ₴</span>
          <span className="pb-0.5 text-base text-muted-foreground line-through decoration-terracotta/70">
            {product.oldPrice} ₴
          </span>
        </div>

        <p className="mt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">Розмір</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`h-12 rounded-2xl border text-sm transition-all active:scale-[0.97] ${
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
          onClick={() =>
            onOrder({ product: product.name, size, price: `${product.price} ₴` })
          }
          className="mt-4 h-14 w-full rounded-2xl bg-ink text-base font-medium tracking-wide text-ink-foreground transition-transform active:scale-[0.98]"
        >
          Замовити зі знижкою
        </button>
      </div>
    </article>
  );
}
