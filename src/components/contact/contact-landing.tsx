"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ContactLightingScene } from "@/components/lighting/contact-lighting-scene";
import { useFoliageWind } from "@/hooks/use-foliage-wind";
import { useLightingControls } from "@/hooks/use-lighting-controls";
import { LightingControlPanel } from "@/components/lighting/lighting-control-panel";
import { SiteNav } from "@/components/brand/site-nav";
import { SkipIntro } from "@/components/brand/skip-intro";
import { DEV_SHADOW_MENU_UNLOCK } from "@/lib/lighting-controls";
import { SITE_CONFIG } from "@/lib/constants";

const DEV_PANEL_UNLOCK = DEV_SHADOW_MENU_UNLOCK;

type FormState = {
  name: string;
  company: string;
  email: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  message: "",
};

export function ContactLanding() {
  const prefersReducedMotion = useReducedMotion();
  const { controls, update, reset } = useLightingControls();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [windActive, setWindActive] = useState(false);

  useEffect(() => {
    setWindActive(true);
  }, []);

  const windRootRef = useFoliageWind(
    !prefersReducedMotion && controls.motionEnabled,
    windActive,
    controls
  );

  const showLightingPanel =
    form.email.trim() === DEV_PANEL_UNLOCK ||
    form.message.trim() === DEV_PANEL_UNLOCK;

  const handleChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      form.email.trim() === DEV_PANEL_UNLOCK ||
      form.message.trim() === DEV_PANEL_UNLOCK
    ) {
      return;
    }
    try {
      const list = JSON.parse(
        localStorage.getItem("vulcira-inquiries") ?? "[]"
      ) as FormState[];
      list.push({ ...form, company: form.company.trim() });
      localStorage.setItem("vulcira-inquiries", JSON.stringify(list));
    } catch {
      /* ignore */
    }
    setSubmitted(true);
    setForm(EMPTY);
  };

  return (
    <>
      <SkipIntro />
      <div
        ref={windRootRef}
        data-foliage-wind
        data-invert-mask={controls.invertMask ? "1" : "0"}
        data-dev-mode={controls.devMode ? "1" : "0"}
        data-mask-flip="1"
        className="contact-root relative flex min-h-[100dvh] flex-col bg-[#ded8d1] text-[#1a1a1a]"
        style={
          {
            "--foliage-texture":
              "url(/lighting/vulcira_layers/foliage-shadow-flip.webp)",
            "--sun-reveal-mask":
              "url(/lighting/vulcira_layers/foliage-sun-reveal-flip.webp)",
          } as CSSProperties
        }
      >
        <section className="landing-section-lit relative flex min-h-[52vh] flex-1 flex-col overflow-hidden bg-[#0a0a0a] md:min-h-[58vh]">
          <ContactLightingScene />

          <header className="relative z-20 px-6 pt-6 md:px-10 md:pt-8 lg:px-14">
            <Link
              href="/"
              className="font-landing inline-block py-2 text-sm tracking-[0.55em] text-white md:text-base"
            >
              V U L C I R A
            </Link>
          </header>

          <SiteNav tone="light" />

          <div className="relative z-20 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
            <div className="max-w-xl">
              <h1 className="font-landing text-3xl font-normal tracking-[0.42em] text-white md:text-4xl lg:text-[2.75rem]">
                CONTACT
              </h1>
              <p className="mt-4 max-w-sm text-[10px] tracking-[0.28em] text-white/90 md:tracking-[0.32em]">
                BUSINESS INQUIRIES, PARTNERSHIPS AND WHOLESALE.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 border-t border-[#1a1a1a]/10 bg-[#ded8d1] px-6 py-14 md:px-10 md:py-20 lg:px-14">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
            <div>
              <h2 className="font-editorial text-3xl font-normal leading-tight tracking-tight text-[#1a1a1a] md:text-[2.35rem]">
                Let&apos;s work together.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#1a1a1a]/75">
                We partner with select suppliers and buyers for long-term
                relationships rooted in Japanese craft and global access.
              </p>

              <dl className="mt-10 space-y-4 text-[10px] tracking-[0.18em] text-[#1a1a1a]">
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <dt className="font-medium">INQUIRIES</dt>
                  <dd className="text-[#1a1a1a]/70">
                    — WHOLESALE / SOURCING / PARTNERSHIPS
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <dt className="font-medium">EMAIL</dt>
                  <dd>
                    <a
                      href={`mailto:${SITE_CONFIG.contactEmail}`}
                      className="text-[#1a1a1a]/70 transition-opacity hover:opacity-70"
                    >
                      — {SITE_CONFIG.contactEmail}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <dt className="font-medium">COMPANY</dt>
                  <dd className="text-[#1a1a1a]/70">— {SITE_CONFIG.company}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <dt className="font-medium">LOCATION</dt>
                  <dd className="text-[#1a1a1a]/70">
                    — Honolulu, Hawaii, USA
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              {submitted ? (
                <p
                  className="font-landing text-sm tracking-[0.2em] text-[#1a1a1a]"
                  role="status"
                >
                  Thank you — we&apos;ll be in touch.
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                  noValidate={false}
                >
                  <Field
                    id="contact-name"
                    label="NAME"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                    autoComplete="name"
                  />
                  <Field
                    id="contact-company"
                    label="COMPANY (OPTIONAL)"
                    value={form.company}
                    onChange={handleChange("company")}
                    autoComplete="organization"
                  />
                  <Field
                    id="contact-email"
                    label="EMAIL"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                    autoComplete="email"
                  />
                  <label className="relative block border border-[#1a1a1a]">
                    <span className="pointer-events-none absolute left-3 top-3 text-[9px] tracking-[0.22em] text-[#1a1a1a]/45">
                      MESSAGE
                    </span>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange("message")}
                      className="min-h-[9.5rem] w-full resize-y bg-transparent px-3 pb-3 pt-8 text-sm text-[#1a1a1a] outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-1 h-12 min-h-12 w-full cursor-pointer bg-[#1a1a1a] text-[10px] tracking-[0.32em] text-white transition-opacity hover:opacity-90 active:opacity-80"
                  >
                    SEND INQUIRY
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {showLightingPanel && (
          <LightingControlPanel
            controls={controls}
            onChange={update}
            onReset={reset}
          />
        )}
      </div>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="relative block border border-[#1a1a1a]">
      <span className="pointer-events-none absolute left-3 top-2.5 text-[9px] tracking-[0.22em] text-[#1a1a1a]/45">
        {label}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="h-14 min-h-14 w-full bg-transparent px-3 pb-2 pt-6 text-sm text-[#1a1a1a] outline-none"
        aria-label={label}
      />
    </label>
  );
}
