"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/content";
import { ArrowIcon } from "./Button";

type Errors = Partial<Record<"name" | "email" | "problem", string>>;

/**
 * ContactForm: no backend by design. Submitting validates, then composes a
 * mailto and hands off to the visitor's own mail client, so nothing is posted
 * to a server we do not run and the sender keeps a copy. The address is also
 * printed beside the form for anyone without a mail client configured.
 * Without JS the form still falls back to a plain mailto action.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const problem = String(data.get("problem") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Enter a valid email address, like name@company.com.";
    if (problem.length < 10) next.problem = "Add a sentence or two about what you want to build or improve.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSent(false);
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    const subject = `Enquiry from ${name}${company ? ` at ${company}` : ""}`;
    const body = [
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      `Email: ${email}`,
      "",
      "What we want to build or improve:",
      problem,
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = (bad?: string) =>
    `w-full rounded-control border bg-paper px-4 py-3 text-body text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-muted hover:border-ink/40 focus:border-blue-ink focus:outline-none focus:ring-2 focus:ring-blue-ink/25 ${
      bad ? "border-danger" : "border-line-strong"
    }`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      action={`mailto:${CONTACT.email}`}
      method="post"
      encType="text/plain"
      className="grid gap-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your Name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={field(errors.name)} />
        </Field>
        <Field id="company" label="Company" hint="Optional">
          <input id="company" name="company" type="text" autoComplete="organization" aria-describedby="company-hint" className={field()} />
        </Field>
      </div>

      <Field id="email" label="Work Email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={field(errors.email)} />
      </Field>

      <Field id="problem" label="What Would You Like To Build Or Improve?" error={errors.problem} hint="A few sentences is plenty: the process, the systems involved and what a good result looks like.">
        <textarea
          id="problem"
          name="problem"
          rows={5}
          required
          aria-invalid={!!errors.problem}
          aria-describedby={`problem-hint${errors.problem ? " problem-error" : ""}`}
          className={`${field(errors.problem)} resize-y`}
        />
      </Field>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          className="group inline-flex min-h-13 items-center justify-center gap-2 whitespace-nowrap rounded-control bg-ink px-6 text-base font-medium text-white transition-colors duration-200 hover:bg-ink-soft active:translate-y-px"
        >
          Send Message
          <ArrowIcon />
        </button>
        <p role="status" aria-live="polite" className="text-small text-muted">
          {sent ? `Your mail app should have opened with the message ready. If it did not, write to ${CONTACT.email}.` : "Opens your email app with the message ready to send."}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid content-start gap-2">
      <label htmlFor={id} className="text-small font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-[0.8125rem] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-[0.8125rem] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
