"use client";
import { useId, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
export function SiteSearch({ iconOnly = false }: { iconOnly?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const close = () => dialog.current?.close();
  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label="Site içinde ara"
        aria-haspopup="dialog"
        aria-controls={id}
        onClick={() => {
          dialog.current?.showModal();
          input.current?.focus();
        }}
        className={
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-brand-orange " +
          (iconOnly
            ? "size-10"
            : "h-10 px-2 text-xs font-medium uppercase tracking-wider")
        }
      >
        <Search size={iconOnly ? 20 : 17} />
        {!iconOnly && "Arama"}
      </button>
      <dialog
        ref={dialog}
        id={id}
        aria-labelledby={id + "-title"}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-2xl overflow-visible rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 id={id + "-title"} className="font-heading text-2xl font-bold">
              Site içinde ara
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Aramayı kapat"
              className="flex size-10 items-center justify-center rounded-lg hover:bg-muted"
            >
              <X size={22} />
            </button>
          </div>
          <form action="/arama" onSubmit={close}>
            <label
              htmlFor={id + "-query"}
              className="mb-2 block text-sm text-muted-foreground"
            >
              Ürün, yedek parça veya konu
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                ref={input}
                id={id + "-query"}
                name="q"
                type="search"
                required
                minLength={2}
                maxLength={80}
                placeholder="Örn: hidrolik, servis, menteşeli"
                className="field-control min-w-0"
                autoComplete="off"
              />
              <button
                type="submit"
                className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 font-semibold text-white"
              >
                Ara
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
