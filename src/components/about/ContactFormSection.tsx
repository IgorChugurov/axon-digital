"use client";

import React, { useState } from "react";
import { sendMessage } from "@/utils/sendMessage";
import { toast } from "react-hot-toast";

interface ContactFormContent {
  title: string;
  subtitle: string;
  fields: {
    name: string;
    email: string;
    message: string;
  };
  buttonText: string;
}

interface ContactFormSectionProps {
  content: ContactFormContent;
}

export default function ContactFormSection({
  content,
}: ContactFormSectionProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validateContactForm(form: {
    name: string;
    email: string;
    message: string;
  }): string | null {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim() || !form.email.includes("@"))
      return "Please enter a valid email address.";
    if (form.message.trim().length < 5)
      return "Message should be more meaningful.";
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const error = validateContactForm(form);
    if (error) {
      toast.error(error);
      return;
    }

    setIsLoading(true);
    sendMessage("showLoaderOverlay");

    try {
      await sendContactForm(form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to send. Please try again.");
    } finally {
      setIsLoading(false);
      sendMessage("hideLoaderOverlay");
    }
  };

  async function sendContactForm(form: {
    name: string;
    email: string;
    message: string;
  }) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Sending error:", data);
      throw new Error(data.message || "Failed to send the message.");
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {content.title}
        </h2>
        <p className="text-gray-600 mb-12">{content.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {content.fields.name}
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {content.fields.email}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {content.fields.message}
            </label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-primary focus:ring-primary"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : content.buttonText}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
