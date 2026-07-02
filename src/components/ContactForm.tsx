const inputClasses =
  "w-full rounded-xl border border-line bg-panel px-4 py-3.5 text-paper placeholder:text-muted/60 outline-none transition-colors focus:border-lime";

/**
 * Netlify form — native POST so Netlify handles submissions without JS.
 * Field names and the /thanks action must match the hidden static form
 * in index.html; Netlify takes the success redirect from the build-time
 * registered form, not this one.
 */
export default function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      action="/thanks"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden aria-hidden="true">
        <label>
          Don't fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="project-type" className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
          What do you need?
        </label>
        <select id="project-type" name="project-type" defaultValue="New website" className={inputClasses}>
          <option>New website</option>
          <option>Redesign an existing site</option>
          <option>Figma design only</option>
          <option>Development from my designs</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project — what it is, what you need, and any deadline."
          className={`${inputClasses} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-full bg-lime px-8 py-4 font-display text-base font-semibold text-ink transition-transform hover:-translate-y-0.5 sm:self-start"
      >
        Send message →
      </button>
    </form>
  );
}
