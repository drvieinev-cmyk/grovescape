/**
 * Newsletter Sign-up Component
 * Email subscription form with custom notification feedback
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { UIButton } from "@/components/ios/UIButton";
import { useNotification } from "@/contexts/NotificationContext";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const notification = useNotification();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      notification.error("Please enter your email address");
      return;
    }
    
    if (!emailRegex.test(email)) {
      notification.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      notification.success("Successfully subscribed! Check your inbox for confirmation.");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 backdrop-blur-md border border-border/50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Stay{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Updated
          </span>
        </h3>
        
        <p className="text-lg text-muted-foreground mb-8">
          Subscribe to our newsletter for the latest updates on technology trends, 
          development insights, and company news.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-xl h-12 px-6 text-base"
            disabled={isSubmitting}
          />
          <UIButton
            type="submit"
            variant="filled"
            size="lg"
            className="rounded-xl px-8 whitespace-nowrap"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </UIButton>
        </form>

        <p className="text-sm text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
