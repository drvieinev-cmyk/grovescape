/**
 * Notification Demo Page
 * Demonstrates the custom notification system
 */

import Navigation from "@/components/Navigation";
import { UIButton } from "@/components/ios/UIButton";
import { useNotification } from "@/contexts/NotificationContext";
import { Card } from "@/components/ui/card";

export default function NotificationDemo() {
  const notification = useNotification();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />

      <div className="container py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Custom Notifications
            </h1>
            <p className="text-xl text-gray-600">
              Try out different notification types with custom messages
            </p>
          </div>

          {/* Notification Buttons */}
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Basic Notifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UIButton
                  variant="filled"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    notification.success(
                      "Success!",
                      "Your action was completed successfully."
                    )
                  }
                >
                  Show Success
                </UIButton>

                <UIButton
                  variant="filled"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() =>
                    notification.error(
                      "Error Occurred",
                      "Something went wrong. Please try again."
                    )
                  }
                >
                  Show Error
                </UIButton>

                <UIButton
                  variant="filled"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() =>
                    notification.info(
                      "Information",
                      "Here's some useful information for you."
                    )
                  }
                >
                  Show Info
                </UIButton>

                <UIButton
                  variant="filled"
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={() =>
                    notification.warning(
                      "Warning",
                      "Please be careful with this action."
                    )
                  }
                >
                  Show Warning
                </UIButton>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Custom Duration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UIButton
                  variant="tinted"
                  onClick={() =>
                    notification.success(
                      "Quick Notification",
                      "This will disappear in 2 seconds",
                      2000
                    )
                  }
                >
                  2 Second Duration
                </UIButton>

                <UIButton
                  variant="tinted"
                  onClick={() =>
                    notification.info(
                      "Long Notification",
                      "This will stay for 10 seconds",
                      10000
                    )
                  }
                >
                  10 Second Duration
                </UIButton>

                <UIButton
                  variant="tinted"
                  onClick={() =>
                    notification.warning(
                      "Persistent Notification",
                      "This won't auto-dismiss. Click X to close.",
                      0
                    )
                  }
                >
                  No Auto-Dismiss
                </UIButton>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Title Only
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UIButton
                  variant="gray"
                  onClick={() => notification.success("Project Created!")}
                >
                  Success (No Message)
                </UIButton>

                <UIButton
                  variant="gray"
                  onClick={() => notification.error("Failed to Save")}
                >
                  Error (No Message)
                </UIButton>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Multiple Notifications
              </h2>
              <UIButton
                variant="filled"
                onClick={() => {
                  notification.info("Processing...", "Step 1 of 3");
                  setTimeout(() => {
                    notification.info("Processing...", "Step 2 of 3");
                  }, 1000);
                  setTimeout(() => {
                    notification.info("Processing...", "Step 3 of 3");
                  }, 2000);
                  setTimeout(() => {
                    notification.success("Complete!", "All steps finished");
                  }, 3000);
                }}
              >
                Show Multiple Notifications
              </UIButton>
            </div>
          </Card>

          {/* Usage Example */}
          <Card className="p-8 bg-gray-900 text-white">
            <h2 className="text-2xl font-semibold mb-4">Usage Example</h2>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { useNotification } from "@/contexts/NotificationContext";

function MyComponent() {
  const notification = useNotification();

  const handleSubmit = () => {
    // Show success notification
    notification.success(
      "Form Submitted",
      "Your data has been saved successfully."
    );

    // Show error notification
    notification.error(
      "Validation Error",
      "Please fill in all required fields."
    );

    // Show info notification
    notification.info(
      "New Feature",
      "Check out our latest updates!"
    );

    // Show warning notification
    notification.warning(
      "Unsaved Changes",
      "You have unsaved changes. Save before leaving?"
    );

    // Custom duration (in milliseconds)
    notification.success("Quick Message", "", 2000);

    // Persistent notification (duration: 0)
    notification.warning("Important", "Click X to close", 0);
  };

  return <button onClick={handleSubmit}>Submit</button>;
}`}</code>
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
