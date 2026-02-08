/**
 * About Us Page
 * Company story, mission, values, and team information
 */

import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { UIButton } from "@/components/ios/UIButton";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[60vh] flex items-center">
        {/* Natural Background */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-nature-bg.png"
            alt="Natural forest background with vibrant greenery"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-purple-900/40 to-blue-900/50" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
              Building the future,
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                one platform at a time
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-lg">
              Grovescape INC is a software development company dedicated to creating exceptional digital experiences across every platform and device.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-12 rounded-3xl">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                At Grovescape, we believe that great software should be accessible everywhere. Our mission is to build high-quality applications that work seamlessly across all platforms — from the smartphone in your pocket to the VR headset on your desk, from desktop computers to spatial computing devices like Apple Vision Pro. We combine technical excellence with creative innovation to deliver software that not only works flawlessly but feels native to each platform it runs on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Quality First",
                description: "We never compromise on quality. Every line of code, every design decision, and every user interaction is crafted with meticulous attention to detail.",
                gradient: "from-primary to-primary/50",
              },
              {
                title: "Platform Native",
                description: "We respect the unique characteristics of each platform. Our applications feel at home whether they're running on iOS, Android, Windows, or in virtual reality.",
                gradient: "from-secondary to-secondary/50",
              },
              {
                title: "Innovation Driven",
                description: "We stay at the forefront of technology, constantly exploring new platforms, frameworks, and techniques to deliver cutting-edge solutions.",
                gradient: "from-accent to-accent/50",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="p-8 bg-card/80 backdrop-blur-md border-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} mb-6 flex items-center justify-center text-3xl font-bold text-white`}>
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-foreground mb-4">
                Our Expertise
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive capabilities across the entire technology stack
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: "Mobile Development",
                  skills: ["iOS (Swift, SwiftUI)", "Android (Kotlin, Jetpack Compose)", "React Native", "Flutter"],
                },
                {
                  category: "Web Development",
                  skills: ["React, Vue, Angular", "Node.js, Python, Ruby", "Progressive Web Apps", "Responsive Design"],
                },
                {
                  category: "Desktop Applications",
                  skills: ["Electron", "macOS (AppKit, SwiftUI)", "Windows (WPF, WinUI)", "Cross-platform (Qt)"],
                },
                {
                  category: "Gaming & XR",
                  skills: ["Unity3D", "Unreal Engine", "VR/AR Development", "Spatial Computing"],
                },
                {
                  category: "Cloud & Backend",
                  skills: ["AWS, Azure, Google Cloud", "Microservices Architecture", "API Design", "Database Design"],
                },
                {
                  category: "Design & UX",
                  skills: ["UI/UX Design", "Motion Design", "Accessibility", "Design Systems"],
                },
              ].map((expertise, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {expertise.category}
                  </h3>
                  <ul className="space-y-2">
                    {expertise.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-bold text-foreground">
              Ready to work together?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss your project and explore how we can help bring your vision to life.
            </p>
            <UIButton variant="filled" size="lg" className="rounded-full px-8">
              Get in Touch
            </UIButton>
          </div>
        </div>
      </section>
    </div>
  );
}
