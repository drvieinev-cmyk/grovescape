/**
 * Home Page - Grovescape INC
 * Design: CORSA-inspired with glassmorphic cards, gradient overlays, natural backgrounds
 * Features: 3D platform mockups, floating elements, weather widget integration
 */

import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { UIButton } from "@/components/ios/UIButton";
import { useNotification } from "@/contexts/NotificationContext";
import { Card } from "@/components/ui/card";
import {
  Code2,
  Layers,
  Zap,
  Shield,
  Cpu,
  Workflow,
  Smartphone,
  Globe,
  Monitor,
  Gamepad2,
  Glasses,
} from "lucide-react";
import { useState } from "react";
import ProjectInquiryModal from "@/components/ProjectInquiryModal";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import { VisionProIcon } from "@/components/icons/VisionProIcon";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const notification = useNotification();
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const platforms = [
    {
      name: "Mobile",
      description: "iOS, Android, and cross-platform solutions",
      icon: "Smartphone",
      gradient: "from-blue-400 to-purple-500",
    },
    {
      name: "Web",
      description: "Progressive web apps and responsive sites",
      icon: "Globe",
      gradient: "from-pink-400 to-purple-500",
    },
    {
      name: "Desktop",
      description: "macOS, Windows, and Linux applications",
      icon: "Monitor",
      gradient: "from-green-400 to-teal-500",
    },
    {
      name: "Gaming",
      description: "Console, PC, and mobile game development",
      icon: "Gamepad2",
      gradient: "from-orange-400 to-red-500",
    },
    {
      name: "XR/VR",
      description: "Immersive virtual and augmented reality",
      icon: "Glasses",
      gradient: "from-purple-400 to-indigo-500",
    },
    {
      name: "Vision Pro",
      description: "Spatial computing for Apple Vision Pro",
      icon: "VisionPro",
      gradient: "from-pink-400 to-rose-500",
    },
  ];

  const capabilities = [
    {
      icon: Code2,
      title: "Native Development",
      description: "Platform-specific code for optimal performance",
    },
    {
      icon: Layers,
      title: "Cross-Platform",
      description: "Unified codebase across multiple platforms",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized for speed and efficiency",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Enterprise-grade security and compliance",
    },
    {
      icon: Cpu,
      title: "Scalability",
      description: "Built to grow with your business",
    },
    {
      icon: Workflow,
      title: "Integration",
      description: "Seamless connection with existing systems",
    },
  ];

  return (
    <div className="min-h-screen">
      <ProjectInquiryModal
        open={projectModalOpen}
        onOpenChange={setProjectModalOpen}
      />
      <Navigation />

      {/* Hero Section with Clean Gradient Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Clean Gradient Background - Banko Style */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-300 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950" />
        
        {/* Subtle Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20 dark:via-black/20 dark:to-black/30" />

        {/* Hero Content */}
        <div className="container relative z-10 text-center space-y-8 px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card">
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Building the future of software
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-gray-900 dark:text-gray-100 drop-shadow-lg">
            Software that lives
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              everywhere
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-sm">
            Grovescape builds high-quality applications across all platforms — from mobile and web to desktop, gaming, XR/VR, and spatial computing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <UIButton
              variant="filled"
              size="lg"
              className="rounded-full px-10 text-base font-semibold w-full sm:w-auto shadow-2xl bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setProjectModalOpen(true)}
            >
              Start a Project
            </UIButton>
            <UIButton
              variant="tinted"
              size="lg"
              className="rounded-full px-10 text-base font-semibold w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900/20 shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700"
              onClick={() => {
                const capabilitiesSection = document.getElementById('capabilities');
                capabilitiesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Capabilities
            </UIButton>
          </div>

          <div className="pt-8 text-gray-700 dark:text-gray-400 text-sm font-medium">
            <p>Toronto, Ontario, Canada</p>
            <p className="mt-1">info@grovescape.com • www.grovescape.com</p>
          </div>
        </div>
      </section>

      {/* Platform Cards Section - Banko Style */}
      <section className="relative py-24 overflow-hidden">
        {/* Clean Light Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950" />
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              One partner.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We build native experiences across all major platforms and device categories.
            </p>
          </div>

          {/* Platform Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Glassmorphic Card */}
                <motion.div 
                  className="glass-card rounded-3xl p-8 h-full flex flex-col items-center text-center space-y-6 hover:shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Platform Icon */}
                  <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-20 rounded-2xl blur-xl`} />
                    {platform.icon === "Smartphone" && <Smartphone className="relative w-24 h-24 text-gray-900 dark:text-gray-100 stroke-[1.5]" />}
                    {platform.icon === "Globe" && <Globe className="relative w-24 h-24 text-gray-900 dark:text-gray-100 stroke-[1.5]" />}
                    {platform.icon === "Monitor" && <Monitor className="relative w-24 h-24 text-gray-900 dark:text-gray-100 stroke-[1.5]" />}
                    {platform.icon === "Gamepad2" && <Gamepad2 className="relative w-24 h-24 text-gray-900 dark:text-gray-100 stroke-[1.5]" />}
                    {platform.icon === "Glasses" && <Glasses className="relative w-24 h-24 text-gray-900 dark:text-gray-100 stroke-[1.5]" />}
                    {platform.icon === "VisionPro" && <VisionProIcon className="relative w-24 h-24 text-gray-900 dark:text-gray-100 stroke-[1.5]" />}
                  </div>

                  {/* Platform Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {platform.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Excellence Section */}
      <section id="capabilities" className="relative py-24 overflow-hidden">
        {/* Natural Background */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-nature-bg.png"
            alt="Natural forest background with vibrant greenery"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-blue-900/40 to-purple-900/60" />

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Engineering Excellence
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our comprehensive approach ensures your software is built to last
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={capability.title}
                  className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-white/70">
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        
        <div className="container relative z-10">
          <div className="glass-card rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and bring your vision to life across all platforms
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <UIButton
                variant="filled"
                size="lg"
                className="rounded-full px-10 font-semibold w-full sm:w-auto"
                onClick={() => setProjectModalOpen(true)}
              >
                Start Your Project
              </UIButton>
              <UIButton
                variant="tinted"
                size="lg"
                className="rounded-full px-10 font-semibold w-full sm:w-auto"
                onClick={() => {
                  const portfolioSection = document.getElementById('capabilities');
                  portfolioSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Our Work
              </UIButton>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
