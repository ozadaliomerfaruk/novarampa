import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type Item = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Item[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="container-wide pt-28 md:pt-32 pb-2 text-sm"
    >
      <ol className="flex items-center gap-1.5 flex-wrap text-muted-foreground">
        <li>
          <Link
            href="/"
            className="inline-flex items-center hover:text-foreground transition-colors"
            aria-label="Ana sayfa"
          >
            <Home size={14} />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            <ChevronRight size={14} className="text-muted-foreground/50" />
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
