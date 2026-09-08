"use client";
import { useId, useState } from "react";
export function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  // Keep short descriptions in full; long copy is expandable without truncating stored content.
  const long = text.length > 180;
  return (
    <div className="mt-3">
      <p
        id={id}
        className={
          "whitespace-pre-line text-sm leading-relaxed text-muted-foreground" +
          (!expanded && long ? " line-clamp-3" : "")
        }
      >
        {text}
      </p>
      {long && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
          className="mt-2 min-h-10 text-sm font-semibold text-brand-orange underline-offset-4 hover:underline"
        >
          {expanded ? "Daha az göster" : "Devamını oku"}
        </button>
      )}
    </div>
  );
}
