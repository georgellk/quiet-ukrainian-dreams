import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";

export type OrderRequest = { product: string; size: string; price: string };

export function OrderSheet({
  request,
  onClose,
}: {
  request: OrderRequest | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const open = request !== null;

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

  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Закрити"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-300"
      />
      <div className="relative w-full max-w-md rounded-t-[2rem] border border-hairline bg-card p-6 pb-8 shadow-lift animate-in slide-in-from-bottom-8 duration-400 sm:rounded-[2rem]">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-hairline sm:hidden" />
        <button
          onClick={onClose}
          aria-label="Закрити"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-2xl">Дякуємо за заявку</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Менеджер зателефонує протягом 15 хвилин, щоб підтвердити замовлення.
            </p>
          </div>
        ) : (
          <>
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              Швидке замовлення
            </p>
            <h3 className="mt-2 font-display text-2xl leading-snug">{request.product}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Розмір {request.size} · <span className="text-foreground">{request.price}</span>
            </p>

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
                className="h-14 w-full rounded-2xl border border-hairline bg-background px-5 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
              />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 __ ___ __ __"
                className="h-14 w-full rounded-2xl border border-hairline bg-background px-5 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
              />
              <button
                type="submit"
                className="h-14 w-full rounded-2xl bg-ink text-base font-medium tracking-wide text-ink-foreground transition-transform active:scale-[0.98]"
              >
                Підтвердити замовлення
              </button>
            </form>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              Вибір розміру уточнимо під час дзвінка з менеджером
            </p>
          </>
        )}
      </div>
    </div>
  );
}
