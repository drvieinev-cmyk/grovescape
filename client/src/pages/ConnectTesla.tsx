/**
 * Tesla OAuth Initiation Page
 * Generates PKCE challenge and redirects to Tesla OAuth
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/_core/hooks/useAuth";

// PKCE helper functions
function generateRandomString(length: number): string {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values)
    .map((x) => possible[x % possible.length])
    .join("");
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = "";
  bytes.forEach((byte) => {
    str += String.fromCharCode(byte);
  });
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generatePKCE() {
  const codeVerifier = generateRandomString(128);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64urlencode(hashed);
  return { codeVerifier, codeChallenge };
}

export default function ConnectTesla() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<"loading" | "redirecting" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      setLocation("/login?redirect=/connect/tesla");
      return;
    }

    // Generate PKCE and redirect to Tesla
    initiateTeslaOAuth();
  }, [isAuthenticated, authLoading]);

  async function initiateTeslaOAuth() {
    try {
      setStatus("redirecting");

      // Generate PKCE challenge
      const { codeVerifier, codeChallenge } = await generatePKCE();

      // Store code verifier in sessionStorage for callback
      sessionStorage.setItem("tesla_code_verifier", codeVerifier);

      // Generate state parameter for CSRF protection
      const state = generateRandomString(32);
      sessionStorage.setItem("tesla_oauth_state", state);

      // Tesla OAuth configuration
      const TESLA_AUTH_URL = "https://auth.tesla.com/oauth2/v3/authorize";
      const CLIENT_ID = import.meta.env.VITE_TESLA_CLIENT_ID || "YOUR_TESLA_CLIENT_ID";
      const REDIRECT_URI = `${window.location.origin}/oauth/tesla/callback`;
      const SCOPE = "openid offline_access vehicle_device_data vehicle_cmds vehicle_charging_cmds";

      // Build authorization URL
      const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        scope: SCOPE,
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      });

      const authUrl = `${TESLA_AUTH_URL}?${params.toString()}`;

      // Redirect to Tesla OAuth
      window.location.href = authUrl;
    } catch (error: any) {
      console.error("Failed to initiate Tesla OAuth:", error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to connect to Tesla. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Navigation />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 text-center">
            {/* Loading/Redirecting State */}
            {(status === "loading" || status === "redirecting") && (
              <>
                <div className="flex justify-center mb-6">
                  <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {status === "loading" ? "Preparing Connection" : "Redirecting to Tesla"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {status === "loading"
                    ? "Setting up secure connection..."
                    : "You will be redirected to Tesla's login page in a moment..."}
                </p>
              </>
            )}

            {/* Error State */}
            {status === "error" && (
              <>
                <div className="flex justify-center mb-6">
                  <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Connection Failed
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">{errorMessage}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => window.location.reload()} className="rounded-full">
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

          {/* Security Info */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              This connection uses industry-standard OAuth 2.0 with PKCE for maximum security.
              Your Tesla credentials are never shared with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
