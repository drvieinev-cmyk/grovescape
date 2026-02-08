/**
 * Notification Context
 * Provides a custom notification system with multiple types and animations
 */

import React, { createContext, useContext, useState, useCallback } from "react";
import { nanoid } from "nanoid";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    type: NotificationType,
    title: string,
    message?: string,
    duration?: number
  ) => void;
  removeNotification: (id: string) => void;
  success: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
  warning: (title: string, message?: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (
      type: NotificationType,
      title: string,
      message?: string,
      duration: number = 5000
    ) => {
      const id = nanoid();
      const notification: Notification = {
        id,
        type,
        title,
        message,
        duration,
      };

      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
    },
    [removeNotification]
  );

  const success = useCallback(
    (title: string, message?: string, duration?: number) => {
      addNotification("success", title, message, duration);
    },
    [addNotification]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) => {
      addNotification("error", title, message, duration);
    },
    [addNotification]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) => {
      addNotification("info", title, message, duration);
    },
    [addNotification]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) => {
      addNotification("warning", title, message, duration);
    },
    [addNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        info,
        warning,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
