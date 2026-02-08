/**
 * Projects Showcase Page
 * Portfolio of completed and featured projects
 */

import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UIButton } from "@/components/ios/UIButton";
import { Link } from "wouter";
import { ArrowRight, Smartphone, Car } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: "elytra",
      title: "ELYTRA",
      subtitle: "Smart Vehicle Intelligence & Drive Logs",
      description: "Advanced vehicle tracking and analytics platform with real-time drive logging, intelligent insights, and comprehensive fleet management capabilities.",
      category: "Mobile & IoT",
      platforms: ["iOS", "Android", "Web Dashboard"],
      gradient: "from-blue-500 to-purple-600",
      icon: Car,
      featured: true,
    },
    // Add more projects here as needed
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-300 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20 dark:via-black/20 dark:to-black/30" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 drop-shadow-lg">
              Our
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-gray-800 dark:text-gray-300 leading-relaxed drop-shadow-sm">
              Explore our portfolio of innovative software solutions built for clients across industries
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Showcasing our most impactful and innovative work
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {projects
              .filter((project) => project.featured)
              .map((project) => {
                const Icon = project.icon;
                return (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                      <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-24 h-24 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl">{project.title}</CardTitle>
                        <CardDescription className="text-base">{project.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.platforms.map((platform) => (
                            <span
                              key={platform}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                          View Project
                          <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">All Projects</h2>
            <p className="text-lg text-muted-foreground">
              Browse our complete portfolio of software solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 h-full">
                    <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-bold text-foreground">
              Have a project in mind?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how we can help bring your vision to life with our expertise
            </p>
            <Link href="/contact">
              <UIButton variant="filled" size="lg" className="rounded-full px-8">
                Start a Project
              </UIButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
