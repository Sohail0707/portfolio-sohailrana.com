import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../data/site";

type Status = "idle" | "sending" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-black/10 bg-mist/60 px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10";

/**
 * Netlify Forms (default setup): posts url-encoded data to "/" with a
 * form-name field. The matching hidden static form lives in index.html so
 * Netlify's build bots register it. Submissions arrive in the Netlify
 * dashboard (Forms → contact) — works only on the deployed site.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error(`Form post failed: ${response.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative rounded-3xl bg-white p-6 shadow-xl shadow-ink/5 ring-1 ring-black/5 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.21, 0.65, 0.36, 1] }}
            className="flex min-h-80 flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 18 }}
              className="grid h-14 w-14 place-items-center rounded-full bg-upwork/10 text-2xl text-upwork"
            >
              ✓
            </motion.span>
            <h3 className="mt-5 text-xl font-semibold">Message sent.</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/55">
              Thanks for reaching out — I usually reply within 4–8 hours.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm font-medium text-accent transition-colors hover:text-ink"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden aria-hidden="true">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink/70">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink/70">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink/70">
                Project details
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="A Figma file, a dated site, or just an idea — tell me where your project stands."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-60 sm:text-base"
            >
              {status === "sending" ? "Sending…" : "Send message"}
              {status !== "sending" && (
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              )}
            </motion.button>

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-red-500"
              >
                Something went wrong (the form only works on the live Netlify
                site). You can email me directly at{" "}
                <a href={`mailto:${site.email}`} className="font-medium underline">
                  {site.email}
                </a>
                .
              </motion.p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
