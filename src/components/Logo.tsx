import { Link } from "react-router-dom";
import { site } from "../data/site";

/** "Sr" wordmark — solid black on light surfaces, white on dark. */
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={`text-2xl font-extrabold tracking-tighter transition-opacity hover:opacity-70 ${
        tone === "dark" ? "text-ink" : "text-white"
      }`}
    >
      {site.logo}
    </Link>
  );
}
