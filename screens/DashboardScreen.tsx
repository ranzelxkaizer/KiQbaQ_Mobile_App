import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../app/contexts/ThemeContext";
import BurgerMenu from "../components/BurgerMenu";

const { width, height } = Dimensions.get("window");

interface DashboardProps {}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

interface Schedule {
  id: string;
  agent: string;
  date: string;
  time: string;
  client: string;
  type: "demo" | "meeting" | "call" | "follow-up";
  status: "scheduled" | "completed" | "cancelled";
}

const Dashboard: React.FC<DashboardProps> = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Verify this Dashboard component is actually being used
  console.log(
    "✅ DASHBOARD COMPONENT LOADED - Updated version with logout fix",
  );

  const [activeTab, setActiveTab] = useState<"announcements" | "leads">(
    "announcements",
  );
  const [activeSubTab, setActiveSubTab] = useState<
    "announcements" | "schedules"
  >("announcements");
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  // User data - This will come from authentication/backend
  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤", // Can be replaced with actual image URL
  };

  // Mock notifications - This will be replaced with backend data
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock schedules - This will be replaced with backend data
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // Animation values for notifications only (menu animations now in BurgerMenu component)
  const notificationSlideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    if (notificationsVisible) {
      Animated.timing(notificationSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(notificationSlideAnim, {
        toValue: -300,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [notificationsVisible]);

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  const toggleProfileDropdown = () => {
    console.log(
      "🟡 Toggle dropdown called. Current state:",
      profileDropdownVisible,
    );
    setProfileDropdownVisible(!profileDropdownVisible);
    console.log("🟡 New state will be:", !profileDropdownVisible);
  };

  const handleLogout = () => {
    console.log("Logout button clicked!");
    setProfileDropdownVisible(false);

    try {
      console.log("Attempting to navigate to landing page...");

      // TODO: Clear auth tokens, user data, etc.

      // Try to navigate out of tabs and to root
      console.log('Trying router.dismissAll() then router.replace("/")');
      router.dismissAll();
      router.replace("/");

      console.log("Navigation command executed");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleMyProfile = () => {
    setProfileDropdownVisible(false);
    console.log("Navigating to My Profile...");
    // Navigate to Profile screen via app route
    router.push("/ProfileScreen");
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

  const getScheduleTypeIcon = (type: Schedule["type"]) => {
    switch (type) {
      case "demo":
        return "🎬";
      case "meeting":
        return "🤝";
      case "call":
        return "📞";
      case "follow-up":
        return "🔄";
      default:
        return "📅";
    }
  };

  const getScheduleTypeColor = (type: Schedule["type"]) => {
    switch (type) {
      case "demo":
        return colors.primary;
      case "meeting":
        return colors.blue;
      case "call":
        return colors.orange;
      case "follow-up":
        return colors.green;
      default:
        return colors.textSecondary;
    }
  };

  const getScheduleStatusBadge = (status: Schedule["status"]) => {
    switch (status) {
      case "scheduled":
        return {
          text: "Scheduled",
          color: colors.blue,
          bg: isDarkMode ? "#1a3a4a" : "#e3f2fd",
        };
      case "completed":
        return {
          text: "Completed",
          color: colors.green,
          bg: isDarkMode ? "#1a3a2a" : "#e8f5e9",
        };
      case "cancelled":
        return {
          text: "Cancelled",
          color: colors.red,
          bg: isDarkMode ? "#3a1a1a" : "#ffebee",
        };
      default:
        return {
          text: "Unknown",
          color: colors.textSecondary,
          bg: colors.iconBg,
        };
    }
  };

  // Dynamic color scheme based on dark mode
  const colors = {
    background: isDarkMode ? "#1a1a1a" : "#f8f9fa",
    cardBackground: isDarkMode ? "#2d2d2d" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    textSecondary: isDarkMode ? "#b0b0b0" : "#6c757d",
    border: isDarkMode ? "#404040" : "#e9ecef",
    headerBg: isDarkMode ? "#2d2d2d" : "#ffffff",
    iconBg: isDarkMode ? "#404040" : "#f8f9fa",
    // Keep brand colors consistent
    primary: "#6c5ce7",
    green: "#00b894",
    orange: "#fd9644",
    blue: "#17a2b8",
    red: "#d63031",
  };

  return (
    <View style={styles.container}>
      {/* BurgerMenu Component - Handles all navigation */}
      <BurgerMenu currentPage="Dashboard" />

      {/* Notifications Modal - Screen-centered, OUTSIDE ScrollView */}
      {notificationsVisible && (
        <View style={styles.notificationsModalOverlay}>
          <TouchableOpacity
            style={styles.notificationsBackdrop}
            activeOpacity={1}
            onPress={toggleNotifications}
          />
          <Animated.View
            style={[
              styles.notificationsModal,
              {
                backgroundColor: colors.cardBackground,
                opacity: notificationSlideAnim.interpolate({
                  inputRange: [-300, 0],
                  outputRange: [0, 1],
                }),
                transform: [
                  {
                    scale: notificationSlideAnim.interpolate({
                      inputRange: [-300, 0],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View
              style={[
                styles.notificationsHeader,
                { borderBottomColor: colors.border },
              ]}
            >
              <View>
                <Text
                  style={[styles.notificationsTitle, { color: colors.text }]}
                >
                  Notifications
                </Text>
                {unreadCount > 0 && (
                  <Text
                    style={[
                      styles.unreadCountText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {unreadCount} unread
                  </Text>
                )}
              </View>
              <View style={styles.notificationHeaderActions}>
                {unreadCount > 0 && (
                  <TouchableOpacity onPress={markAllAsRead}>
                    <Text
                      style={[
                        styles.markAllReadText,
                        { color: colors.primary },
                      ]}
                    >
                      Mark all read
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={toggleNotifications}
                  style={styles.closeNotificationsButton}
                >
                  <Text
                    style={[
                      styles.closeNotificationsText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              style={styles.notificationsList}
              showsVerticalScrollIndicator={false}
            >
              {notifications.length === 0 ? (
                <View style={styles.emptyNotifications}>
                  <Text style={styles.emptyNotificationsIcon}>🔔</Text>
                  <Text
                    style={[
                      styles.emptyNotificationsText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    No notifications yet
                  </Text>
                </View>
              ) : (
                notifications.map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={[
                      styles.notificationItem,
                      {
                        backgroundColor: notification.read
                          ? "transparent"
                          : isDarkMode
                            ? "#2a2a3e"
                            : "#f0f4ff",
                        borderBottomColor: colors.border,
                      },
                    ]}
                    onPress={() => markAsRead(notification.id)}
                  >
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTypeIcon}>
                        {getNotificationIcon(notification.type)}
                      </Text>
                      <View style={styles.notificationTextContainer}>
                        <View style={styles.notificationTitleRow}>
                          <Text
                            style={[
                              styles.notificationTitle,
                              { color: colors.text },
                            ]}
                          >
                            {notification.title}
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
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.clearNotificationButton}
                      onPress={() => clearNotification(notification.id)}
                    >
                      <Text
                        style={[
                          styles.clearNotificationText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        ✕
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>

            {notifications.length > 0 && (
              <TouchableOpacity
                style={[
                  styles.clearAllButton,
                  {
                    backgroundColor: colors.iconBg,
                    borderTopColor: colors.border,
                  },
                ]}
                onPress={clearAllNotifications}
              >
                <Text
                  style={[styles.clearAllButtonText, { color: colors.red }]}
                >
                  Clear All Notifications
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
      )}

      <ScrollView
        style={[styles.scrollContainer, { backgroundColor: colors.background }]}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
          <View style={styles.headerLeft}>
            {/* Empty space for burger button alignment */}
            <View style={styles.burgerButtonSpace} />
            <View>
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                📊 Dashboard
              </Text>
              <Text
                style={[styles.headerSubtitle, { color: colors.textSecondary }]}
              >
                Welcome back! Here's what's happening with your leads today.
              </Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: colors.iconBg }]}
              onPress={toggleNotifications}
            >
              <Text style={styles.icon}>🔔</Text>
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: colors.iconBg }]}
                onPress={() => {
                  console.log("🟢 PROFILE ICON CLICKED! 🟢");
                  toggleProfileDropdown();
                }}
              >
                <Text style={styles.icon}>👤</Text>
              </TouchableOpacity>

              {/* Profile Dropdown */}
              {profileDropdownVisible && (
                <>
                  {/* Backdrop for closing dropdown */}
                  <TouchableOpacity
                    style={styles.profileDropdownBackdropInline}
                    activeOpacity={1}
                    onPress={() => {
                      console.log("🔵 BACKDROP CLICKED 🔵");
                      toggleProfileDropdown();
                    }}
                  />

                  <View
                    style={[
                      styles.profileDropdown,
                      {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.profileDropdownHeader,
                        { borderBottomColor: colors.border },
                      ]}
                    >
                      <View style={styles.profileAvatar}>
                        <Text style={styles.profileAvatarText}>
                          {userData.avatar}
                        </Text>
                      </View>
                      <View style={styles.profileInfo}>
                        <Text
                          style={[styles.profileName, { color: colors.text }]}
                        >
                          {userData.name}
                        </Text>
                        <Text
                          style={[
                            styles.profileRole,
                            { color: colors.textSecondary },
                          ]}
                        >
                          {userData.role}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.profileMenuItem}
                      onPress={handleMyProfile}
                    >
                      <Text style={styles.profileMenuIcon}>👤</Text>
                      <Text
                        style={[styles.profileMenuText, { color: colors.text }]}
                      >
                        My Profile
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.profileMenuItem,
                        styles.profileMenuItemLast,
                      ]}
                      onPress={() => {
                        console.log("🔴 LOG OUT BUTTON PRESSED! 🔴");
                        handleLogout();
                      }}
                    >
                      <Text style={styles.profileMenuIcon}>🚪</Text>
                      <Text
                        style={[styles.profileMenuText, { color: colors.text }]}
                      >
                        Log Out
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Budget Cards */}
        <View style={styles.budgetContainer}>
          <View style={[styles.budgetCard, { backgroundColor: colors.green }]}>
            <Text style={styles.budgetIcon}>💼</Text>
            <Text style={styles.budgetLabel}>CURRENT BUDGET</Text>
            <Text style={styles.budgetAmount}>₱0.00</Text>
          </View>

          <View style={[styles.budgetCard, { backgroundColor: colors.orange }]}>
            <Text style={styles.budgetIcon}>📋</Text>
            <Text style={styles.budgetLabel}>EXPECTED EXPENSES</Text>
            <Text style={styles.budgetAmount}>₱0.00</Text>
          </View>
        </View>

        {/* Main Tabs */}
        <View
          style={[
            styles.mainTabsContainer,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.mainTab,
              activeTab === "announcements" && {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() => setActiveTab("announcements")}
          >
            <Text
              style={[
                styles.mainTabText,
                {
                  color:
                    activeTab === "announcements"
                      ? "#ffffff"
                      : colors.textSecondary,
                },
              ]}
            >
              📢 Announcements
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.mainTab,
              activeTab === "leads" && { backgroundColor: colors.primary },
            ]}
            onPress={() => setActiveTab("leads")}
          >
            <Text
              style={[
                styles.mainTabText,
                {
                  color:
                    activeTab === "leads" ? "#ffffff" : colors.textSecondary,
                },
              ]}
            >
              📊 Leads Overview
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "announcements" ? (
          <View style={styles.tabContent}>
            {/* Sub Tabs */}
            <View
              style={[
                styles.subTabsContainer,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.subTab,
                  activeSubTab === "announcements" && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setActiveSubTab("announcements")}
              >
                <Text
                  style={[
                    styles.subTabText,
                    {
                      color:
                        activeSubTab === "announcements"
                          ? "#ffffff"
                          : colors.textSecondary,
                    },
                  ]}
                >
                  📢 Announcements
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.subTab,
                  activeSubTab === "schedules" && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setActiveSubTab("schedules")}
              >
                <Text
                  style={[
                    styles.subTabText,
                    {
                      color:
                        activeSubTab === "schedules"
                          ? "#ffffff"
                          : colors.textSecondary,
                    },
                  ]}
                >
                  📅 Schedules
                </Text>
              </TouchableOpacity>
            </View>

            {/* Dynamic Content based on Sub Tab */}
            {activeSubTab === "announcements" ? (
              <View
                style={[
                  styles.announcementsContent,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <View style={styles.announcementsHeader}>
                  <Text
                    style={[styles.announcementsTitle, { color: colors.text }]}
                  >
                    Recent Announcements
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.viewAllButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text style={styles.viewAllText}>📋 View All</Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={[styles.emptyText, { color: colors.textSecondary }]}
                >
                  No announcements yet.
                </Text>
              </View>
            ) : (
              <View
                style={[
                  styles.schedulesContent,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <View style={styles.schedulesHeader}>
                  <Text style={[styles.schedulesTitle, { color: colors.text }]}>
                    Upcoming Schedules
                  </Text>
                </View>

                {schedules.length === 0 ? (
                  <Text
                    style={[styles.emptyText, { color: colors.textSecondary }]}
                  >
                    No schedules yet.
                  </Text>
                ) : (
                  <View style={styles.schedulesList}>
                    {schedules.map((schedule) => (
                      <View
                        key={schedule.id}
                        style={[
                          styles.scheduleCard,
                          {
                            backgroundColor: isDarkMode ? "#2a2a2a" : "#f8f9fa",
                            borderLeftColor: getScheduleTypeColor(
                              schedule.type,
                            ),
                          },
                        ]}
                      >
                        <View style={styles.scheduleCardHeader}>
                          <View style={styles.scheduleTypeContainer}>
                            <Text style={styles.scheduleTypeIcon}>
                              {getScheduleTypeIcon(schedule.type)}
                            </Text>
                            <Text
                              style={[
                                styles.scheduleType,
                                { color: getScheduleTypeColor(schedule.type) },
                              ]}
                            >
                              {schedule.type.charAt(0).toUpperCase() +
                                schedule.type.slice(1)}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.scheduleStatusBadge,
                              {
                                backgroundColor: getScheduleStatusBadge(
                                  schedule.status,
                                ).bg,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.scheduleStatusText,
                                {
                                  color: getScheduleStatusBadge(schedule.status)
                                    .color,
                                },
                              ]}
                            >
                              {getScheduleStatusBadge(schedule.status).text}
                            </Text>
                          </View>
                        </View>

                        <Text
                          style={[
                            styles.scheduleClient,
                            { color: colors.text },
                          ]}
                        >
                          {schedule.client}
                        </Text>

                        <View style={styles.scheduleDetails}>
                          <View style={styles.scheduleDetailItem}>
                            <Text style={styles.scheduleDetailIcon}>👤</Text>
                            <Text
                              style={[
                                styles.scheduleDetailText,
                                { color: colors.textSecondary },
                              ]}
                            >
                              {schedule.agent}
                            </Text>
                          </View>
                          <View style={styles.scheduleDetailItem}>
                            <Text style={styles.scheduleDetailIcon}>📅</Text>
                            <Text
                              style={[
                                styles.scheduleDetailText,
                                { color: colors.textSecondary },
                              ]}
                            >
                              {schedule.date}
                            </Text>
                          </View>
                          <View style={styles.scheduleDetailItem}>
                            <Text style={styles.scheduleDetailIcon}>🕐</Text>
                            <Text
                              style={[
                                styles.scheduleDetailText,
                                { color: colors.textSecondary },
                              ]}
                            >
                              {schedule.time}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.scheduleActions}>
                          <TouchableOpacity
                            style={[
                              styles.scheduleActionButton,
                              { backgroundColor: colors.primary },
                            ]}
                          >
                            <Text style={styles.scheduleActionButtonText}>
                              View Details
                            </Text>
                          </TouchableOpacity>
                          {schedule.status === "scheduled" && (
                            <TouchableOpacity
                              style={[
                                styles.scheduleActionButton,
                                { backgroundColor: colors.iconBg },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.scheduleActionButtonText,
                                  { color: colors.text },
                                ]}
                              >
                                Reschedule
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.tabContent}>
            {/* Total Leads and Status Distribution */}
            <View style={styles.leadsOverviewContainer}>
              <View
                style={[
                  styles.totalLeadsCard,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={styles.totalLeadsIcon}>👥</Text>
                <Text style={styles.totalLeadsLabel}>TOTAL LEADS</Text>
                <Text style={styles.totalLeadsNumber}>0</Text>
              </View>

              <View
                style={[
                  styles.statusDistributionCard,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text style={styles.statusIcon}>📊</Text>
                <Text style={[styles.statusLabel, { color: colors.text }]}>
                  STATUS DISTRIBUTION
                </Text>
                <View style={styles.statusLegend}>
                  <View style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendDot,
                        { backgroundColor: colors.primary },
                      ]}
                    />
                    <Text
                      style={[
                        styles.legendText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Active
                    </Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendDot,
                        { backgroundColor: colors.green },
                      ]}
                    />
                    <Text
                      style={[
                        styles.legendText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Win
                    </Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendDot,
                        { backgroundColor: colors.red },
                      ]}
                    />
                    <Text
                      style={[
                        styles.legendText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Lost
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Status Cards */}
            <View style={styles.statusCardsContainer}>
              <View style={[styles.statusCard, styles.activeCard]}>
                <Text style={styles.statusCardIcon}>⏳</Text>
                <Text style={styles.statusCardLabel}>ACTIVE</Text>
                <Text style={[styles.statusCardNumber, { color: colors.text }]}>
                  0
                </Text>
              </View>

              <View style={[styles.statusCard, styles.wonCard]}>
                <Text style={styles.statusCardIcon}>🏆</Text>
                <Text style={styles.statusCardLabel}>WON</Text>
                <Text style={[styles.statusCardNumber, { color: colors.text }]}>
                  0
                </Text>
              </View>

              <View style={[styles.statusCard, styles.lostCard]}>
                <Text style={styles.statusCardIcon}>❌</Text>
                <Text style={styles.statusCardLabel}>LOST</Text>
                <Text style={[styles.statusCardNumber, { color: colors.text }]}>
                  0
                </Text>
              </View>
            </View>

            {/* Leads Analytics */}
            <View
              style={[
                styles.analyticsContainer,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.analyticsTitle}>📈 Leads Analytics</Text>
              <View
                style={[
                  styles.chartPlaceholder,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[
                    styles.chartPlaceholderText,
                    { color: colors.textSecondary },
                  ]}
                >
                  Chart will display here when data is available
                </Text>
                <Text style={[styles.chartLegend, { color: colors.blue }]}>
                  ━ Leads
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flex: 1,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    width: width * 0.75,
    height: height,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#6c5ce7",
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6c5ce7",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "600",
  },
  navItemsContainer: {
    flex: 1,
    paddingVertical: 12,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
  },
  navItemActive: {
    backgroundColor: "#e8e5ff",
    borderLeftWidth: 4,
    borderLeftColor: "#6c5ce7",
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  navLabelActive: {
    color: "#6c5ce7",
    fontWeight: "600",
  },
  sidebarFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  darkModeToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  darkModeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  darkModeIcon: {
    fontSize: 20,
  },
  darkModeText: {
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "600",
  },
  toggleSwitch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#cbd5e0",
    padding: 2,
    justifyContent: "center",
  },
  toggleSwitchActive: {
    backgroundColor: "#6c5ce7",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  footerDivider: {
    height: 1,
    backgroundColor: "#e9ecef",
    marginVertical: 12,
  },
  footerText: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
  },
  burgerButtonSpace: {
    width: 40,
    height: 40,
    marginRight: 12,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    maxWidth: width * 0.6,
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
  budgetContainer: {
    padding: 16,
    gap: 12,
  },
  budgetCard: {
    padding: 20,
    borderRadius: 12,
    minHeight: 110,
  },
  budgetIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  budgetAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  mainTabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    padding: 4,
  },
  mainTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  mainTabActive: {
    backgroundColor: "#6c5ce7",
  },
  mainTabText: {
    fontSize: 13,
    fontWeight: "600",
  },
  tabContent: {
    padding: 16,
  },
  subTabsContainer: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  subTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  subTabText: {
    fontSize: 12,
    fontWeight: "600",
  },
  announcementsContent: {
    borderRadius: 8,
    padding: 16,
  },
  announcementsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  announcementsTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewAllText: {
    fontSize: 11,
    color: "#ffffff",
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 20,
  },
  leadsOverviewContainer: {
    gap: 12,
    marginBottom: 16,
  },
  totalLeadsCard: {
    padding: 20,
    borderRadius: 12,
    minHeight: 140,
  },
  totalLeadsIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  totalLeadsLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  totalLeadsNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
  },
  statusDistributionCard: {
    padding: 20,
    borderRadius: 12,
  },
  statusIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2c3e50",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  statusLegend: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
  },
  statusCardsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statusCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderTopWidth: 3,
  },
  activeCard: {
    backgroundColor: "#d1ecf1",
    borderTopColor: "#17a2b8",
  },
  wonCard: {
    backgroundColor: "#d4edda",
    borderTopColor: "#00b894",
  },
  lostCard: {
    backgroundColor: "#f8d7da",
    borderTopColor: "#d63031",
  },
  statusCardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statusCardLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6c757d",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statusCardNumber: {
    fontSize: 32,
    fontWeight: "bold",
  },
  analyticsContainer: {
    padding: 20,
    borderRadius: 12,
  },
  analyticsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
  },
  chartPlaceholder: {
    padding: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  chartPlaceholderText: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 16,
  },
  chartLegend: {
    fontSize: 12,
    fontWeight: "600",
  },
  // Notification Badge
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#d63031",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  // Notifications Modal Popup
  notificationsModalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationsBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  notificationsModal: {
    width: width * 0.9,
    maxWidth: 500,
    maxHeight: height * 0.7,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    overflow: "hidden",
  },
  notificationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  unreadCountText: {
    fontSize: 12,
    marginTop: 2,
  },
  notificationHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  markAllReadText: {
    fontSize: 13,
    fontWeight: "600",
  },
  closeNotificationsButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  closeNotificationsText: {
    fontSize: 20,
    fontWeight: "600",
  },
  notificationsList: {
    maxHeight: height * 0.5,
  },
  emptyNotifications: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyNotificationsIcon: {
    fontSize: 48,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyNotificationsText: {
    fontSize: 14,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    alignItems: "flex-start",
  },
  notificationContent: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  notificationTypeIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notificationMessage: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  notificationTimestamp: {
    fontSize: 11,
  },
  clearNotificationButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearNotificationText: {
    fontSize: 18,
  },
  clearAllButton: {
    padding: 14,
    alignItems: "center",
    borderTopWidth: 1,
  },
  clearAllButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  // Schedules Styles
  schedulesContent: {
    borderRadius: 8,
    padding: 16,
  },
  schedulesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  schedulesTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  addScheduleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addScheduleButtonText: {
    fontSize: 11,
    color: "#ffffff",
    fontWeight: "600",
  },
  schedulesList: {
    gap: 12,
  },
  scheduleCard: {
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  scheduleCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  scheduleTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  scheduleTypeIcon: {
    fontSize: 18,
  },
  scheduleType: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  scheduleStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scheduleStatusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  scheduleClient: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  scheduleDetails: {
    gap: 8,
    marginBottom: 12,
  },
  scheduleDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scheduleDetailIcon: {
    fontSize: 14,
  },
  scheduleDetailText: {
    fontSize: 13,
  },
  scheduleActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  scheduleActionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  scheduleActionButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
  // Profile Dropdown Styles
  profileContainer: {
    position: "relative",
  },
  profileDropdown: {
    position: "absolute",
    top: 45,
    right: 0,
    width: 220,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  profileDropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#6c5ce7",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarText: {
    fontSize: 24,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
  },
  profileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  profileMenuItemLast: {
    borderTopWidth: 0,
  },
  profileMenuIcon: {
    fontSize: 18,
  },
  profileMenuText: {
    fontSize: 14,
    fontWeight: "500",
  },
  profileDropdownBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  profileDropdownBackdropInline: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
});

export default Dashboard;
