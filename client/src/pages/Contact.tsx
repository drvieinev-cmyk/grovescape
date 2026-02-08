/**
 * Contact Page
 * Contact form and Google Maps integration showing Toronto location
 */

import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { UIButton } from "@/components/ios/UIButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";

export default function Contact() {
  const notification = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      notification.error("Please fill in all required fields");
      return;
    }
    
    // Simulate form submission
    notification.success("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />

      <div className="container pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4">
            Let's{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 bg-card/80 backdrop-blur-md border-border/50 shadow-xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project..."
                  rows={6}
                  className="rounded-xl"
                />
              </div>

              <UIButton
                type="submit"
                variant="filled"
                size="lg"
                className="w-full rounded-xl"
              >
                Send Message
              </UIButton>
            </form>
          </Card>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <Card className="p-6 bg-card/80 backdrop-blur-md border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:info@grovescape.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@grovescape.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-md border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Location
                    </h3>
                    <p className="text-muted-foreground">
                      Toronto, Ontario
                      <br />
                      Canada
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-md border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Website
                    </h3>
                    <a
                      href="https://www.grovescape.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      www.grovescape.com
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Google Maps */}
            <Card className="overflow-hidden bg-card/80 backdrop-blur-md border-border/50 shadow-xl">
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184551.90977144104!2d-79.51814281640625!3d43.71837080000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1706400000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Grovescape Location - Toronto, Canada"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
