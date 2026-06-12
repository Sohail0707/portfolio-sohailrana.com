import { motion } from "framer-motion";

const inputClasses =
  "w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10";

/**
 * Netlify Forms — default setup (docs.netlify.com/manage/forms/setup):
 * a plain HTML POST that the browser submits natively. Netlify intercepts
 * the POST, stores the submission, and redirects to the `action` page.
 * The matching hidden static form in index.html lets Netlify's build bots
 * register the form, and the hidden `form-name` input ties this
 * JS-rendered form back to it. Works on the deployed site only.
 */
export default function ContactForm() {
  return (
    <div className="rounded-3xl bg-white/70 p-6 shadow-xl shadow-ink/5 ring-1 ring-white/60 backdrop-blur-2xl sm:p-8">
      <form
        name="contact"
        method="POST"
        action="/thanks"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p hidden aria-hidden="true">
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>

        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-ink/70"
          >
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
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-ink/70"
          >
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
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-sm font-medium text-ink/70"
          >
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
          whileTap={{ scale: 0.97 }}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep sm:text-base"
        >
          Send message
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </motion.button>
      </form>
    </div>
  );
}
