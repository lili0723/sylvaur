"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
  productInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");

    try {
      const productLabels: Record<string, string> = {
        pillows: "抱枕 / Pillows",
        scarves: "围巾 / Scarves",
        both: "两者都要 / Both",
        other: "其他 / Other",
      };

      emailjs.init(EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone || "Not provided",
        productInterest: productLabels[data.productInterest || ""] || "未指定 / Not specified",
        message: data.message,
      });

      setStatus("success");
      reset();
    } catch (error: unknown) {
      const err = error as { status?: number; text?: string; message?: string };
      console.error("Form submission error:", {
        status: err?.status,
        text: err?.text,
        message: err?.message,
      });
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          {t("success")}
        </h3>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-brand-coral hover:underline"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {t("error")}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-brand-navy mb-1"
          >
            {t("name")} *
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name ? "border-red-300" : "border-zinc-300"
            } focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-brand-navy mb-1"
          >
            {t("email")} *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-300" : "border-zinc-300"
            } focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-brand-navy mb-1"
          >
            {t("company")} *
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.company ? "border-red-300" : "border-zinc-300"
            } focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors`}
          />
          {errors.company && (
            <p className="text-red-500 text-xs mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-brand-navy mb-1"
          >
            {t("phone")}
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors"
          />
        </div>
      </div>

      {/* Product Interest */}
      <div>
        <label
          htmlFor="productInterest"
          className="block text-sm font-medium text-brand-navy mb-1"
        >
          {t("productInterest")}
        </label>
        <select
          id="productInterest"
          {...register("productInterest")}
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors bg-white"
        >
          <option value="">{t("productInterestPlaceholder")}</option>
          <option value="pillows">{t("productInterestOption1")}</option>
          <option value="scarves">{t("productInterestOption2")}</option>
          <option value="both">{t("productInterestOption3")}</option>
          <option value="other">{t("productInterestOption4")}</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-brand-navy mb-1"
        >
          {t("message")} *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message ? "border-red-300" : "border-zinc-300"
          } focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors resize-y`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-brand-coral text-white font-semibold rounded-lg hover:bg-brand-coral/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
