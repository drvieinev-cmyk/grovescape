/**
 * Notification Container Component
 * Displays notifications with animations and styling
 */

import { useNotification } from "@/contexts/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

const notificationConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    messageColor: "text-green-700",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-900",
    messageColor: "text-red-700",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    messageColor: "text-blue-700",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-900",
    messageColor: "text-yellow-700",
  },
};

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-20 right-4 z-[100] space-y-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => {
          const config = notificationConfig[notification.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="pointer-events-auto"
            >
              <div
                className={`${config.bgColor} ${config.borderColor} border rounded-2xl shadow-lg backdrop-blur-xl p-4 min-w-[320px] max-w-md`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${config.iconColor} flex-shrink-0 mt-0.5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`${config.titleColor} font-semibold text-sm mb-1`}
                    >
                      {notification.title}
                    </h4>
                    {notification.message && (
                      <p
                        className={`${config.messageColor} text-sm leading-relaxed`}
                      >
                        {notification.message}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className={`${config.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
