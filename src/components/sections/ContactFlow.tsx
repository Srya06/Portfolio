"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ArrowLeft, ArrowUpRight, AlertCircle, Loader2 } from "lucide-react";
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
      setServerError(`Network error while submitting. Please email directly at ${site.email}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hire me modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-3xl border border-[#2A2626] bg-[#161414] p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto text-white select-none"
      >
        {/* Header Bar matching frame-01-55.0.png */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8A196]">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>• Hire me</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Subtitle matching frame-01-55.0.png */}
        <div className="space-y-1 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Tell me what you need built.
          </h2>
          <p className="text-xs text-[#A8A196] font-normal">
            Five quick questions. Projects start at ₹45,000.
          </p>
        </div>

        {/* Progress Bar line matching frame-01-55.0.png */}
        <div className="space-y-1.5 pb-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A8A196]">
            <span>{step} of 5</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Multi-step Content Panels */}
        <AnimatePresence mode={isReducedOrTest ? undefined : "wait"}>
          {/* STEP 1: Select Collaboration Need (Radio options) */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={isReducedOrTest ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={isReducedOrTest ? undefined : { opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <h3 className="text-sm font-semibold text-white font-sans">
                What kind of project or role are we discussing?
              </h3>

              <div className="space-y-2.5">
                {needOptions.slice(0, 5).map((opt) => {
                  const isSelected = selectedNeed === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectNeed(opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isSelected
                        ? "border-white bg-white/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-[#C4BFB6] hover:border-white/30 hover:bg-white/[0.06]"
                        }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-white" : "border-white/30"
                            }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-medium">{opt.label}</div>
                          <div className="text-[11px] text-[#8E8880]">{opt.blurb}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Modal Footer matching frame-01-55.0.png */}
              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <a
                  href={`mailto:${site.email}?subject=Project Collaboration with Surya`}
                  className="text-[11px] font-mono text-[#8E8880] hover:text-white transition-colors"
                >
                  Direct email: {site.email}
                </a>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs shadow-md hover:bg-white/90 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
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
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Project &amp; Contact Details</h3>
                  <p className="text-xs text-[#A8A196]">
                    Category: <strong className="text-accent uppercase font-mono">{selectedNeed}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#A8A196] hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Back</span>
                </button>
              </div>

              {serverError && (
                <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-mono text-rose-300 flex items-start gap-2">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A8A196]" htmlFor="name">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Maya Chen"
                      {...register("name")}
                      className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-white/30 focus:border-white focus:outline-none"
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-rose-400">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A8A196]" htmlFor="email">
                      Your Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. maya@company.com"
                      {...register("email")}
                      className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-white/30 focus:border-white focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-rose-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#A8A196]" htmlFor="message">
                    Project Requirements / Scope *
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Briefly describe what you're building..."
                    {...register("message")}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-white/30 focus:border-white focus:outline-none resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-rose-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Budget selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#A8A196]">Estimated Budget (Optional)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {budgetOptions.slice(0, 4).map((b) => (
                      <label
                        key={b}
                        className="flex items-center gap-2 p-2 rounded-lg border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/30 text-xs text-[#C4BFB6]"
                      >
                        <input
                          type="radio"
                          value={b}
                          {...register("budget")}
                          className="accent-white"
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-[#A8A196] hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs shadow-md hover:bg-white/90 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={isReducedOrTest ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-4"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-success/20 border border-success/40 text-success flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-[#C4BFB6] max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out! Your project specifications have been dispatched to Surya. Expect a response within one business day.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-white/90 transition-all"
              >
                Close Window
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
