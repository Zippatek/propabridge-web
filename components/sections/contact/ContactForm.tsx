'use client';
import { useState } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Mock submission delay
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <section className="container-site px-4 md:px-8 py-16">
      <div className="max-w-xl mx-auto bg-white rounded-[16px] p-8 md:p-10 shadow-sm">
        {/* Heading */}
        <h2 className="text-display-md text-heading font-medium mb-8 max-w-[88%]">
          We&apos;re just a form away—send us your question, and we&apos;ll be happy to help!
        </h2>

        {status === "sent" ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#1a7a4a]/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#1a7a4a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[#001a40] font-semibold text-[18px]">Message Sent!</p>
            <p className="text-[#001a40]/70 text-[14px]">We&apos;ll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[#001a40] text-[11px] font-bold tracking-widest uppercase">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#f4f3ea] rounded-[8px] px-4 py-3 text-[#001a40] text-[14px] outline-none border border-transparent focus:border-[#001a40]/30 transition-colors placeholder-transparent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-[#001a40] text-[11px] font-bold tracking-widest uppercase">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#f4f3ea] rounded-[8px] px-4 py-3 text-[#001a40] text-[14px] outline-none border border-transparent focus:border-[#001a40]/30 transition-colors placeholder-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[#001a40] text-[11px] font-bold tracking-widest uppercase">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-[#f4f3ea] rounded-[8px] px-4 py-3 text-[#001a40] text-[14px] outline-none border border-transparent focus:border-[#001a40]/30 transition-colors placeholder-transparent"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[#001a40] text-[11px] font-bold tracking-widest uppercase">
                Messsage
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="bg-[#f4f3ea] rounded-[8px] px-4 py-3 text-[#001a40] text-[14px] outline-none border border-transparent focus:border-[#001a40]/30 transition-colors resize-none placeholder-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#001a40] text-white text-[13px] font-bold tracking-widest uppercase rounded-[8px] py-4 flex items-center justify-center gap-3 hover:bg-[#002a5e] transition-colors disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : (
                <>
                  Send Message
                  <span className="text-[16px]">&rsaquo;</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
