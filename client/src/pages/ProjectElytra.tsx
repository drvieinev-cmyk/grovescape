/**
 * ELYTRA Project Detail Page
 * Smart Vehicle Intelligence & Drive Logs
 */

import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UIButton } from "@/components/ios/UIButton";
import { Link } from "wouter";
import {
  ArrowLeft,
  Car,
  Smartphone,
  Globe,
  MapPin,
  BarChart3,
  Clock,
  Zap,
  Shield,
  Cloud,
  Bell,
  TrendingUp,
  Battery,
} from "lucide-react";

export default function ProjectElytra() {
  const features = [
    {
      icon: MapPin,
      title: "Real-Time GPS Tracking",
      description: "Live vehicle location tracking with high-precision GPS and route visualization",
    },
    {
      icon: BarChart3,
      title: "Drive Analytics",
      description: "Comprehensive insights into driving patterns, fuel efficiency, and vehicle performance",
    },
    {
      icon: Clock,
      title: "Automated Drive Logs",
      description: "Automatic trip detection and logging with start/end times, distance, and duration",
    },
    {
      icon: Zap,
      title: "Performance Monitoring",
      description: "Track acceleration, braking, cornering, and overall driving behavior metrics",
    },
    {
      icon: Shield,
      title: "Safety Alerts",
      description: "Instant notifications for harsh braking, rapid acceleration, and potential safety issues",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Seamless data synchronization across all devices with secure cloud backup",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Customizable alerts for maintenance reminders, trip summaries, and anomaly detection",
    },
    {
      icon: TrendingUp,
      title: "Fleet Management",
      description: "Multi-vehicle tracking and management for businesses and fleet operators",
    },
    {
      icon: Battery,
      title: "Battery Optimization",
      description: "Intelligent power management to minimize battery drain during tracking",
    },
  ];

  const techStack = [
    { category: "Mobile", technologies: ["React Native", "iOS (Swift)", "Android (Kotlin)"] },
    { category: "Backend", technologies: ["Node.js", "Express", "PostgreSQL", "Redis"] },
    { category: "IoT", technologies: ["MQTT", "WebSocket", "GPS Protocols"] },
    { category: "Cloud", technologies: ["AWS", "S3", "Lambda", "CloudWatch"] },
    { category: "Analytics", technologies: ["TensorFlow", "Python", "Data Pipelines"] },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        
        <div className="container relative z-10">
          <Link href="/projects">
            <UIButton variant="tinted" size="sm" className="mb-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </UIButton>
          </Link>

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">
              <Car className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Mobile & IoT</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
              ELYTRA
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 font-medium drop-shadow-lg">
              Smart Vehicle Intelligence & Drive Logs
            </p>

            <p className="text-xl text-white/80 leading-relaxed max-w-3xl drop-shadow-md">
              A comprehensive vehicle tracking and analytics platform that transforms raw driving data into actionable insights. ELYTRA combines real-time GPS tracking, intelligent drive logging, and advanced analytics to help drivers and fleet managers optimize performance, improve safety, and reduce costs.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {["iOS", "Android", "Web Dashboard", "IoT Integration"].map((platform) => (
                <span
                  key={platform}
                  className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Smartphone className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Cross-Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Native iOS and Android apps with a unified web dashboard for comprehensive vehicle management
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Real-Time Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Instant data synchronization across all devices with sub-second latency for live tracking
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Machine learning algorithms analyze driving patterns to provide personalized recommendations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Comprehensive Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to track, analyze, and optimize your vehicle's performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Built with cutting-edge technologies for performance, scalability, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {techStack.map((stack, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">{stack.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <li key={techIndex} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl">Project Impact</CardTitle>
                <CardDescription className="text-lg">
                  Measurable results and user satisfaction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-bold text-primary mb-2">10K+</div>
                    <p className="text-muted-foreground">Active Users</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-primary mb-2">50M+</div>
                    <p className="text-muted-foreground">Miles Tracked</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-primary mb-2">4.8★</div>
                    <p className="text-muted-foreground">App Store Rating</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    ELYTRA has helped thousands of drivers and fleet managers gain unprecedented visibility into their vehicle operations. Users report an average of <strong className="text-foreground">15% improvement in fuel efficiency</strong> and <strong className="text-foreground">30% reduction in maintenance costs</strong> through proactive monitoring and data-driven decision making.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-bold text-foreground">
              Ready to build your next project?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's create something amazing together. Contact us to discuss your vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <UIButton variant="filled" size="lg" className="rounded-full px-8">
                  Start a Project
                </UIButton>
              </Link>
              <Link href="/projects">
                <UIButton variant="tinted" size="lg" className="rounded-full px-8">
                  View More Projects
                </UIButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
