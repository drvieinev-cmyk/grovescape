/**
 * Tesla OAuth Callback Page (Public - No Auth Required)
 * Handles OAuth callback from Tesla and redirects to ELYTRA app via deep link
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function OAuthTeslaCallback() {
  const [, setLocation] = useLocation();
  const [showFallback, setShowFallback] = useState(false);

  // Parse URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const state = urlParams.get("state");
  const error = urlParams.get("error");

  useEffect(() => {
    if (code) {
      // Build deep link for ELYTRA app
      let deepLink = `elytra://auth/tesla?code=${encodeURIComponent(code)}`;
      if (state) {
        deepLink += `&state=${encodeURIComponent(state)}`;
      }

      // Redirect to deep link
      window.location.replace(deepLink);

      // Show fallback link after 2 seconds if redirect doesn't work
      const timer = setTimeout(() => setShowFallback(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [code, state]);

  // Error state
  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: 40, maxWidth: 400 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "2px solid #ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 28,
              color: "#ef4444",
            }}
          >
            ✕
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Authorization Failed
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
            Tesla returned an error: {error}. Please try again from the ELYTRA app.
          </p>
        </div>
      </div>
    );
  }

  // Missing code state
  if (!code) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: 40, maxWidth: 400 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Missing Authorization Code
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
            No authorization code received. Please try connecting again from the ELYTRA app.
          </p>
        </div>
      </div>
    );
  }

  // Success state - redirecting
  const deepLink = `elytra://auth/tesla?code=${encodeURIComponent(code)}${
    state ? `&state=${encodeURIComponent(state)}` : ""
  }`;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", padding: 40, maxWidth: 400 }}>
        {!showFallback ? (
          <>
            <div
              style={{
                width: 48,
                height: 48,
                border: "3px solid rgba(255,255,255,0.1)",
                borderTopColor: "#3b82f6",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 24px",
              }}
            />
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Connecting to Tesla…
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              Redirecting you back to ELYTRA.
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Almost Done
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              If you were not redirected automatically,{" "}
              <a
                href={deepLink}
                style={{ color: "#3b82f6", fontWeight: 600, textDecoration: "none" }}
              >
                tap here to return to ELYTRA
              </a>
              .
            </p>
          </>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
