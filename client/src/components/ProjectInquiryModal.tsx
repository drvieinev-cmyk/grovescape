/**
 * Project Inquiry Modal Component
 * Modal dialog for project inquiries with form
 */

import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UIButton } from "@/components/ios/UIButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProjectInquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectInquiryModal({
  open,
  onOpenChange,
}: ProjectInquiryModalProps) {
  const notification = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    platform: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      notification.error(
        "Missing Information",
        "Please fill in all required fields."
      );
      return;
    }

    // Show success notification
    notification.success(
      "Inquiry Received!",
      "Thank you for your interest. We'll contact you within 24 hours."
    );

    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      company: "",
      platform: "",
      message: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Start Your Project
          </DialogTitle>
          <DialogDescription>
            Tell us about your project and we'll get back to you within 24
            hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Target Platform</Label>
            <Input
              id="platform"
              placeholder="Mobile, Web, Desktop, Gaming, XR/VR, Vision Pro"
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Project Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project, goals, and timeline..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <UIButton
              type="button"
              variant="gray"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </UIButton>
            <UIButton type="submit" variant="filled" className="flex-1">
              Submit Inquiry
            </UIButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
