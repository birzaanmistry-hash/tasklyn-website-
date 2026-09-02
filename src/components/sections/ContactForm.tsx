"use client";

import { useRef, useState } from "react";
import { CONTACT } from "@/lib/content";

type Errors = Partial<Record<"name" | "email" | "problem", string>>;

/**
 * The contact form.
 *
 * There is no backend. Submitting composes a mailto and hands off to the
 * visitor's own mail client, which is deliberate: a form that posts into a
 * server we have not wired up would silently swallow enquiries, and this way
 * the sender keeps a copy in their own sent items.
 *
 * The trade-off is that it needs a mail client configured, so the address is
 * also printed in full beside the form for anyone who would rather copy it.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const problem = String(data.get("problem") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Enter a valid email address.";
    if (problem.length < 10) next.problem = "A sentence is enough, but we need one.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    const subject = `Enquiry from ${name}${business ? ` at ${business}` : ""}`;
    const body = [
      `Name: ${name}`,
      business ? `Business: ${business}` : null,
      `Email: ${email}`,
      "",
      "Which function is costing the most:",
      problem,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  const field =
    "w-full rounded-[var(--radius-machined)] border bg-[color:var(--color-void)] px-4 py-3 text-[0.9375rem] text-[color:var(--color-ink)] transition-colors duration-200 focus:border-[color:var(--color-accent)]";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-[0.875rem] text-[color:var(--color-ink)]">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={field}
          style={{ borderColor: errors.name ? "#ff6b6b" : "var(--color-line)" }}
        />
        {errors.name && (
          <p id="name-error" className="text-[0.8125rem] text-[#ff9a9a]">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="business" className="text-[0.875rem] text-[color:var(--color-ink)]">
          Business
        </label>
        <input
          id="business"
          name="business"
          type="text"
          autoComplete="organization"
          className={field}
          style={{ borderColor: "var(--color-line)" }}
        />
        <p className="text-[0.8125rem] text-[color:var(--color-muted)]">Optional.</p>
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-[0.875rem] text-[color:var(--color-ink)]">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={field}
          style={{ borderColor: errors.email ? "#ff6b6b" : "var(--color-line)" }}
        />
        {errors.email && (
          <p id="email-error" className="text-[0.8125rem] text-[#ff9a9a]">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="problem" className="text-[0.875rem] text-[color:var(--color-ink)]">
          Which function is costing you the most?
        </label>
        <textarea
          id="problem"
          name="problem"
          rows={4}
          aria-invalid={!!errors.problem}
          aria-describedby={errors.problem ? "problem-error" : undefined}
          className={`${field} resize-y`}
          style={{ borderColor: errors.problem ? "#ff6b6b" : "var(--color-line)" }}
        />
        {errors.problem && (
          <p id="problem-error" className="text-[0.8125rem] text-[#ff9a9a]">
            {errors.problem}
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-[var(--radius-machined)] bg-[color:var(--color-accent)] px-6 py-3.5 text-[0.9375rem] font-medium text-[#001120] transition-colors duration-300 hover:bg-[color:var(--color-accent-hot)]"
        >
          Send message
        </button>

        <p role="status" aria-live="polite" className="text-[0.875rem]">
          {sent && (
            <span className="text-[color:var(--color-muted)]">
              Your mail app should have opened. If it did not, write to {CONTACT.email}.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
