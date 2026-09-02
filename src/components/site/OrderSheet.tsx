import { useEffect, useState } from "react";
import { X, Check, ShoppingBag } from "lucide-react";

export type CartItem = {
  uid: string;
  product: string;
  size: string;
  price: number;
};

export function OrderSheet({
  open,
  items,
  onRemove,
  onClose,
}: {
  open: boolean;
  items: CartItem[];
  onRemove: (uid: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setSent(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Закрити"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-300"
      />
      <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[2rem] border border-hairline bg-card p-6 pb-8 shadow-lift animate-in slide-in-from-bottom-8 duration-400 sm:rounded-[2rem]">
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-hairline sm:hidden" />
        <button
          onClick={onClose}
          aria-label="Закрити"
          className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:bg-secondary"
        >
          <X className="h-5 w-5" />
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-display text-3xl">Дякуємо за заявку</h3>
            <p className="mt-3 text-lg leading-relaxed">
              Менеджер зателефонує протягом 15 хвилин, щоб підтвердити замовлення.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Оформлення заявки
            </p>
            <h3 className="mt-2 font-display text-3xl leading-snug">Ваше замовлення</h3>

            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше ім'я"
                className="h-16 w-full rounded-2xl border-2 border-hairline bg-background px-5 text-lg outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
              />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 __ ___ __ __"
                className="h-16 w-full rounded-2xl border-2 border-hairline bg-background px-5 text-lg outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
              />

              {/* Cart list */}
              <div className="pattern-dots rounded-2xl border-2 border-hairline bg-background/70 p-4">
                <p className="flex items-center gap-2 text-base font-medium uppercase tracking-[0.12em]">
                  <ShoppingBag className="h-5 w-5 text-gold" />
                  У кошику: {items.length}
                </p>

                {items.length === 0 ? (
                  <p className="mt-3 text-lg text-muted-foreground">
                    Кошик порожній — оберіть товар у каталозі.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {items.map((i) => (
                      <li
                        key={i.uid}
                        className="flex items-center gap-3 rounded-xl border border-hairline bg-card px-3 py-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-lg leading-snug">{i.product}</p>
                          <p className="text-base text-muted-foreground">
                            Розмір {i.size} ·{" "}
                            <span className="text-foreground">{i.price} ₴</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(i.uid)}
                          aria-label={`Видалити ${i.product}`}
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-hairline text-foreground transition-colors active:scale-95 hover:border-terracotta hover:text-terracotta"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {items.length > 0 ? (
                  <p className="mt-4 flex items-baseline justify-between border-t border-hairline pt-3">
                    <span className="text-lg">Разом</span>
                    <span className="font-display text-3xl">{total} ₴</span>
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="h-16 w-full rounded-2xl bg-ink text-lg font-medium tracking-wide text-ink-foreground transition-transform active:scale-[0.98]"
              >
                Підтвердити замовлення
              </button>
            </form>
            <p className="mt-3 text-center text-base leading-relaxed text-muted-foreground">
              Вибір розміру уточнимо під час дзвінка з менеджером
            </p>
          </>
        )}
      </div>
    </div>
  );
}
