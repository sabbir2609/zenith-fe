"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      // Reset form after successful submission
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        message: "",
      });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto py-16 px-4 relative">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Contact us</h2>
          <p className="mt-4 text-muted-foreground">
            We&apos;d love to hear from you. Please fill out this form.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="first_name" className="text-sm font-medium">
                First name
              </label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="last_name" className="text-sm font-medium">
                Last name
              </label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here"
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
