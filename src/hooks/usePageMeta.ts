import { useEffect } from "react";
import { site } from "../data/site";

/** Sets document title + meta description, restoring defaults on unmount. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.defaultTitle;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description ?? site.defaultDescription;
    return () => {
      document.title = site.defaultTitle;
      if (meta) meta.content = site.defaultDescription;
    };
  }, [title, description]);
}
