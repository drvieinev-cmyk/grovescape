/**
 * Tesla OAuth Callback Page
 * Handles the OAuth callback from Tesla, exchanges code for tokens, and shows success/error
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function TeslaCallback() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  const exchangeCode = trpc.tesla.exchangeCode.useMutation({
    onSuccess: (data) => {
      setStatus("success");
      setMessage(data.message);
    },
    onError: (error) => {
      setStatus("error");
      setMessage(error.message);
    },
  });

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const error = urlParams.get("error");
    const errorDescription = urlParams.get("error_description");

    // Handle OAuth errors
    if (error) {
      setStatus("error");
      setMessage(errorDescription || `OAuth error: ${error}`);
      return;
    }

    // Validate code parameter
    if (!code) {
      setStatus("error");
      setMessage("Authorization code not found in callback URL");
      return;
    }

    // Retrieve code verifier from sessionStorage
    const codeVerifier = sessionStorage.getItem("tesla_code_verifier");
    if (!codeVerifier) {
      setStatus("error");
      setMessage("PKCE code verifier not found. Please restart the connection process.");
      return;
    }

    // Verify state parameter (CSRF protection)
    const storedState = sessionStorage.getItem("tesla_oauth_state");
    if (state && storedState && state !== storedState) {
      setStatus("error");
      setMessage("Invalid state parameter. Possible CSRF attack detected.");
      return;
    }

    // Clean up session storage
    sessionStorage.removeItem("tesla_code_verifier");
    sessionStorage.removeItem("tesla_oauth_state");

    // Exchange code for tokens
    exchangeCode.mutate({ code, codeVerifier, state: state || undefined });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Navigation />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 text-center">
            {/* Loading State */}
            {status === "loading" && (
              <>
                <div className="flex justify-center mb-6">
                  <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Connecting to Tesla
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Please wait while we securely connect your Tesla account...
                </p>
              </>
            )}

            {/* Success State */}
            {status === "success" && (
              <>
                <div className="flex justify-center mb-6">
                  <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Connected Successfully!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {message}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setLocation("/developer")}
                    className="rounded-full"
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/")}
                    className="rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
              </>
            )}

            {/* Error State */}
            {status === "error" && (
              <>
                <div className="flex justify-center mb-6">
                  <XCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Connection Failed
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {message}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setLocation("/developer")}
                    className="rounded-full"
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/")}
                    className="rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
              </>
            )}
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Your Tesla credentials are securely stored and encrypted. We only
              request the minimum permissions needed to provide our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
