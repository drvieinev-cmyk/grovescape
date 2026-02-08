/**
 * Navigation Component
 * Design: iOS 26-style with liquid glass blur and colorful accents
 * Features: Weather widget, date/time, smooth animations, mobile responsive
 */

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { UIButton } from "@/components/ios/UIButton";
import { UIToolbar } from "@/components/ios/UIToolbar";
import { WeatherWidget } from "@/components/WeatherWidget";
import ThemeToggle from "@/components/ThemeToggle";
import ProjectInquiryModal from "@/components/ProjectInquiryModal";
import { Link } from "wouter";

export default function Navigation() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <ProjectInquiryModal
        open={projectModalOpen}
        onOpenChange={setProjectModalOpen}
      />
      <UIToolbar>
        <div className="flex items-center justify-between py-2 md:py-3 gap-2 md:gap-4">
          {/* Logo & Merged Weather/Time - Integrated Branding Area */}
          <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:opacity-80 transition-opacity">
              Grovescape
            </Link>
            <div className="hidden md:block">
              <WeatherWidget />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Privacy
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button - Hidden on mobile */}
            <UIButton
              variant="filled"
              size="sm"
              className="hidden md:inline-flex rounded-full font-semibold text-sm px-4 md:px-6"
              onClick={() => setProjectModalOpen(true)}
            >
              Start Project
            </UIButton>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-900 dark:text-gray-100" />
              ) : (
                <Menu className="w-5 h-5 text-gray-900 dark:text-gray-100" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 mt-2 pt-4 pb-4 space-y-3">
            <Link href="/" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/projects" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </Link>
            <Link href="/contact" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/privacy" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Privacy
            </Link>
            <UIButton
              variant="filled"
              size="md"
              className="w-full rounded-full font-semibold mt-4"
              onClick={() => {
                setProjectModalOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              Start Project
            </UIButton>
          </div>
        )}
      </UIToolbar>
    </>
  );
}
