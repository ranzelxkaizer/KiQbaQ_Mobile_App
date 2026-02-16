import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BurgerMenu from "../components/BurgerMenu";
import { useTheme } from "./contexts/ThemeContext";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

const NotificationsScreen: React.FC = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  // Mock notifications - This will be replaced with backend data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Lead Assignment",
      message: "You have been assigned a new lead: ABC Corporation",
      timestamp: "2 hours ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Meeting Reminder",
      message: "You have a meeting with John Doe at 3:00 PM today",
      timestamp: "4 hours ago",
      read: false,
      type: "warning",
    },
    {
      id: "3",
      title: "Lead Converted",
      message:
        "Congratulations! Your lead XYZ Company has been converted to a client",
      timestamp: "1 day ago",
      read: true,
      type: "success",
    },
    {
      id: "4",
      title: "Document Required",
      message: "Please upload the signed contract for ABC Corporation",
      timestamp: "2 days ago",
      read: true,
      type: "warning",
    },
    {
      id: "5",
      title: "Payment Received",
      message: "Your commission payment of ₱15,000 has been processed",
      timestamp: "3 days ago",
      read: true,
      type: "success",
    },
  ]);

  // Dynamic colors
  const colors = {
    background: isDarkMode ? "#1a1a1a" : "#f8f9fa",
    cardBackground: isDarkMode ? "#2d2d2d" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    textSecondary: isDarkMode ? "#b0b0b0" : "#6c757d",
    border: isDarkMode ? "#404040" : "#e9ecef",
    headerBg: isDarkMode ? "#2d2d2d" : "#ffffff",
    iconBg: isDarkMode ? "#404040" : "#f8f9fa",
    primary: "#6c5ce7",
    secondary: "#48cae4",
    green: "#00b894",
    red: "#d63031",
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const clearNotification = (notificationId: string) => {
    setNotifications(
      notifications.filter((notif) => notif.id !== notificationId),
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* BurgerMenu Component */}
      <BurgerMenu currentPage="Notifications" />

      {/* Header - Icons Only */}
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <View style={styles.headerLeft}>
          <View style={styles.burgerButtonSpace} />
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.iconBg }]}
            onPress={() => router.back()}
          >
            <Text style={styles.icon}>←</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Page Title */}
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitleIcon}>🔔</Text>
        <View style={styles.pageTitleTextContainer}>
          <Text style={[styles.pageTitle, { color: colors.text }]}>
            Notifications
          </Text>
          {unreadCount > 0 && (
            <Text
              style={[styles.unreadCountText, { color: colors.textSecondary }]}
            >
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </Text>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Action Buttons */}
        {notifications.length > 0 && (
          <View style={styles.actionButtonsContainer}>
            {unreadCount > 0 && (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={markAllAsRead}
              >
                <Text style={styles.actionButtonText}>✓ Mark All Read</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.actionButtonDanger,
                { backgroundColor: colors.red },
              ]}
              onPress={clearAllNotifications}
            >
              <Text style={styles.actionButtonText}>🗑️ Clear All</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Notifications
            </Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              You're all caught up! We'll notify you when something new happens.
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {notifications.map((notification, index) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  {
                    backgroundColor: notification.read
                      ? colors.cardBackground
                      : isDarkMode
                        ? "#2a2a3e"
                        : "#f0f4ff",
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => markAsRead(notification.id)}
                activeOpacity={0.7}
              >
                <View style={styles.notificationHeader}>
                  <View style={styles.notificationTypeContainer}>
                    <Text style={styles.notificationTypeIcon}>
                      {getNotificationIcon(notification.type)}
                    </Text>
                    {!notification.read && (
                      <View
                        style={[
                          styles.unreadDot,
                          { backgroundColor: colors.primary },
                        ]}
                      />
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => clearNotification(notification.id)}
                  >
                    <Text
                      style={[
                        styles.clearButtonText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      ✕
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={[styles.notificationTitle, { color: colors.text }]}
                >
                  {notification.title}
                </Text>
                <Text
                  style={[
                    styles.notificationMessage,
                    { color: colors.textSecondary },
                  ]}
                >
                  {notification.message}
                </Text>
                <Text
                  style={[
                    styles.notificationTimestamp,
                    { color: colors.textSecondary },
                  ]}
                >
                  {notification.timestamp}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  burgerButtonSpace: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 18,
  },
  pageTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 12,
  },
  pageTitleIcon: {
    fontSize: 32,
  },
  pageTitleTextContainer: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  unreadCountText: {
    fontSize: 13,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonDanger: {
    // Additional styles if needed
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  notificationsList: {
    padding: 16,
    gap: 12,
  },
  notificationCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  notificationTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationTypeIcon: {
    fontSize: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTimestamp: {
    fontSize: 12,
  },
});

export default NotificationsScreen;
