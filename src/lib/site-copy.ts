import defaults from "./site-copy-defaults.json";
export type SiteCopy = typeof defaults;
export const defaultSiteCopy: SiteCopy = defaults;

// Missing/invalid fields fall back individually; intentional empty text is preserved.
export function resolveSiteCopy(input?: unknown): SiteCopy {
  const groups =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  return Object.fromEntries(
    Object.entries(defaults).map(([group, fields]) => {
      const candidate = groups[group];
      const values =
        candidate && typeof candidate === "object"
          ? (candidate as Record<string, unknown>)
          : {};
      return [
        group,
        Object.fromEntries(
          Object.entries(fields).map(([key, fallback]) => [
            key,
            typeof values[key] === "string" ? values[key] : fallback,
          ]),
        ),
      ];
    }),
  ) as SiteCopy;
}
