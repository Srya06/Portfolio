"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ArrowRight, ArrowLeft, Mail, AlertCircle, Loader2 } from "lucide-react";
import { contactFormSchema, ContactFormData, ProjectNeed } from "@/lib/validators";
import { needOptions, budgetOptions } from "@/content/contact";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ContactFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialNeed?: ProjectNeed;
  initialStep?: 1 | 2 | 3;
}

export function ContactFlow({
  isOpen,
  onClose,
  initialNeed = "ai-ml",
  initialStep = 1,
}: ContactFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(initialStep);
  const [selectedNeed, setSelectedNeed] = useState<ProjectNeed>(initialNeed);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReduced = useReducedMotion();
  const isReducedOrTest = prefersReduced || process.env.NODE_ENV === "test";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      need: initialNeed,
      name: "",
      email: "",
      message: "",
      budget: "",
      consent: true,
      company: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setStep(initialStep);
      setServerError(null);
      reset();
    }
  }, [isOpen, initialStep, reset]);

  // Esc key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectNeed = (need: ProjectNeed) => {
    setSelectedNeed(need);
    setValue("need", need);
    setStep(2);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setStep(3);
      } else {
        setServerError(
          result?.error?.message || "Failed to submit inquiry. Please use direct email instead."
        );
      }
    } catch {
      setServerError("Network error while submitting. Please email directly at sryaraj06@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact and project collaboration flow"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-3xl border border-line bg-bg p-6 sm:p-10 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              {step === 1 && "Step 1 of 3 // Pick Discipline"}
              {step === 2 && "Step 2 of 3 // Project Details"}
              {step === 3 && "Step 3 of 3 // Confirmed"}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg hover:text-accent hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-step Content Panels */}
        <AnimatePresence mode={isReducedOrTest ? undefined : "wait"}>
          {/* STEP 1: Select Collaboration Need */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={isReducedOrTest ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={isReducedOrTest ? undefined : { opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg">
                  What kind of project or role are we discussing?
                </h3>
                <p className="text-xs sm:text-sm text-fg-muted">
                  Select a category to tailor the requirements and technical scope.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {needOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectNeed(opt.id)}
                    className="p-4 rounded-xl border border-line bg-bg-elev/60 hover:border-accent hover:bg-bg-elev text-left transition-all group flex flex-col justify-between space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span className="text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                      {opt.label}
                    </span>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {opt.blurb}
                    </p>
                    <span className="text-[10px] font-mono text-accent flex items-center gap-1 pt-1">
                      <span>Select</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Fill Details Form */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={isReducedOrTest ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={isReducedOrTest ? undefined : { opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-fg">Project &amp; Contact Details</h3>
                  <p className="text-xs text-fg-muted">
                    Category: <strong className="text-accent uppercase font-mono">{selectedNeed}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-fg-muted hover:text-accent transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Change</span>
                </button>
              </div>

              {serverError && (
                <div className="p-4 rounded-xl border border-danger/30 bg-danger/10 text-xs font-mono text-danger flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  {...register("company")}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-fg-muted" htmlFor="name">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Maya Chen"
                      {...register("name")}
                      className="w-full px-4 py-2.5 rounded-xl border border-line bg-bg-elev text-sm text-fg placeholder:text-fg-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-danger">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-fg-muted" htmlFor="email">
                      Your Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. maya@company.com"
                      {...register("email")}
                      className="w-full px-4 py-2.5 rounded-xl border border-line bg-bg-elev text-sm text-fg placeholder:text-fg-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-danger">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Budget selection (optional) */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-fg-muted" htmlFor="budget">
                    Opportunity / Budget Tier (Optional)
                  </label>
                  <select
                    id="budget"
                    {...register("budget")}
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-bg-elev text-sm text-fg focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select scope tier...</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message field */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-fg-muted" htmlFor="message">
                    Project Requirements or Role Description *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe the problem, timeline, stack requirements, or team context..."
                    {...register("message")}
                    className="w-full px-4 py-2.5 rounded-xl border border-line bg-bg-elev text-sm text-fg placeholder:text-fg-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-danger">{errors.message.message}</p>
                  )}
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="consent"
                    type="checkbox"
                    {...register("consent")}
                    className="mt-1 rounded border-line text-accent focus:ring-accent"
                  />
                  <label htmlFor="consent" className="text-xs text-fg-muted leading-relaxed">
                    I consent to having Surya store this information to respond to my recruitment or project inquiry.
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-[11px] font-mono text-danger">{errors.consent.message}</p>
                )}

                {/* Submit button */}
                <div className="flex items-center justify-between pt-4 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-mono text-fg-muted hover:text-fg transition-colors"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-fg font-semibold text-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3: Confirmed Success State */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={isReducedOrTest ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center text-success mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold tracking-tight text-fg">
                  Inquiry Dispatched
                </h3>
                <p className="text-sm text-fg-muted max-w-md mx-auto leading-relaxed">
                  Thank you! Your requirements have been recorded. I typically review technical briefs and reply within <strong>24 to 48 hours</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-line bg-bg-elev/40 max-w-sm mx-auto text-xs font-mono text-fg-muted space-y-1">
                <p>Candidate: {site.name}</p>
                <p>Direct Email: {site.email}</p>
                <p>Timezone: Asia/Kolkata (IST)</p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-2.5 rounded-full bg-accent text-accent-fg font-semibold text-sm transition-transform hover:scale-105"
                >
                  Return to Portfolio
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Direct Mail Option */}
        {step !== 3 && (
          <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-mono text-fg-muted">
            <span className="hidden sm:inline">Prefer standard email?</span>
            <a
              href={`mailto:${site.email}?subject=Project Collaboration with Surya`}
              className="inline-flex items-center gap-1.5 text-accent hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email directly at {site.email}</span>
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
