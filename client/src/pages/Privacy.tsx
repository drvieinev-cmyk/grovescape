/**
 * Privacy Policy Page
 * Comprehensive privacy information for Grovescape INC
 */

import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />

      <div className="container pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 27, 2026
            </p>
          </div>

          {/* Content */}
          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-md border-border/50 shadow-xl">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Grovescape INC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Personal Data
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Derivative Data
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Financial Data
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Use of Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Create and manage your account</li>
                  <li>Process your transactions and send you related information</li>
                  <li>Email you regarding your account or order</li>
                  <li>Fulfill and manage purchases, orders, payments, and other transactions</li>
                  <li>Generate a personal profile about you to make future visits more personalized</li>
                  <li>Increase the efficiency and operation of the Site</li>
                  <li>Monitor and analyze usage and trends to improve your experience</li>
                  <li>Notify you of updates to the Site</li>
                  <li>Offer new products, services, and/or recommendations</li>
                  <li>Perform other business activities as needed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Disclosure of Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                </p>
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      By Law or to Protect Rights
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Third-Party Service Providers
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Security of Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground">Grovescape INC</p>
                  <p className="text-muted-foreground">Toronto, Ontario, Canada</p>
                  <p className="text-muted-foreground">Email: info@grovescape.com</p>
                  <p className="text-muted-foreground">Website: www.grovescape.com</p>
                </div>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
