import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../app/contexts/ThemeContext";
import BurgerMenu from "../components/BurgerMenu";

const DemoAnalyticsScreen: React.FC = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const [activeTimeFilter, setActiveTimeFilter] = useState<
    "7days" | "30days" | "alltime"
  >("7days");
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const colors = {
    background: isDarkMode ? "#1a1a1a" : "#f8f9fa",
    cardBackground: isDarkMode ? "#2d2d2d" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    textSecondary: isDarkMode ? "#b0b0b0" : "#6c757d",
    border: isDarkMode ? "#404040" : "#e9ecef",
    headerBg: isDarkMode ? "#2d2d2d" : "#ffffff",
    primary: "#6c5ce7",
    gradient1: "#6c5ce7",
    gradient2: "#a78bfa",
    success: "#00d4aa",
    warning: "#ffc107",
    danger: "#dc3545",
    info: "#17a2b8",
  };

  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤",
  };

  // Get current date
  const getCurrentDate = () => {
    const date = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`;
  };

  const handleLogout = () => {
    router.dismissAll();
    router.replace("/LandingPage");
  };

  const handleMyProfile = () => {
    router.push("/ProfileScreen");
  };

  // Analytics data
  const analyticsData = {
    qrScans: {
      total: 0,
      change: 0.0,
      label: "Total visitors",
    },
    videoViews: {
      total: 0,
      change: 0.0,
      label: "Total views",
    },
    feedback: {
      total: 0,
      change: 0.0,
      label: "Submissions",
    },
    conversion: {
      rate: 0.0,
      percentage: 0.0,
      label: "Submission rate",
      subtitle: "of visitors submit feedback",
    },
  };

  const handleMetricClick = (metric: string) => {
    switch (metric) {
      case "QR Scans":
        router.push("/QRScansDetailScreen");
        break;
      case "Video Views":
        router.push("/VideoPerformanceDetailScreen");
        break;
      case "Feedback":
        router.push("/FeedbackResponsesDetailScreen");
        break;
      case "Conversion":
        router.push("/ConversionTrackingDetailScreen");
        break;
      default:
        console.log(`Navigating to ${metric} details...`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* BurgerMenu */}
      <BurgerMenu currentPage="Demo Analytics" />

      {/* Profile Dropdown */}
      {profileDropdownVisible && (
        <>
          <TouchableOpacity
            style={styles.profileDropdownBackdrop}
            onPress={() => setProfileDropdownVisible(false)}
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
            <View style={styles.profileDropdownHeader}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>{userData.avatar}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: colors.text }]}>
                  {userData.name}
                </Text>
                <Text
                  style={[styles.profileRole, { color: colors.textSecondary }]}
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
              <Text style={[styles.profileMenuText, { color: colors.text }]}>
                My Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileMenuItem}
              onPress={handleLogout}
            >
              <Text style={styles.profileMenuIcon}>🚪</Text>
              <Text style={[styles.profileMenuText, { color: colors.text }]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <View style={styles.burgerButtonSpace} />

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.border }]}
            onPress={() => router.push("/NotificationsScreen")}
          >
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.border }]}
            onPress={() => setProfileDropdownVisible(!profileDropdownVisible)}
          >
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Page Header Card */}
        <View
          style={[
            styles.pageHeaderCard,
            {
              backgroundColor: colors.gradient1,
            },
          ]}
        >
          <View style={styles.pageHeaderContent}>
            <Text style={styles.pageHeaderIcon}>📊</Text>
            <View style={styles.pageHeaderText}>
              <Text style={styles.pageHeaderTitle}>
                Demo Analytics Dashboard
              </Text>
              <Text style={styles.pageHeaderSubtitle}>
                Track visitors, video views, and feedback from QR code scans
              </Text>
            </View>
          </View>

          <View style={styles.dateCard}>
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
        </View>

        {/* Time Filter Tabs */}
        <View style={styles.timeFilterTabs}>
          <TouchableOpacity
            style={[
              styles.timeFilterTab,
              activeTimeFilter === "7days" && styles.timeFilterTabActive,
              {
                backgroundColor:
                  activeTimeFilter === "7days"
                    ? colors.primary
                    : colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setActiveTimeFilter("7days")}
          >
            <Text
              style={[
                styles.timeFilterTabText,
                {
                  color: activeTimeFilter === "7days" ? "#ffffff" : colors.text,
                },
              ]}
            >
              Last 7 Days
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.timeFilterTab,
              activeTimeFilter === "30days" && styles.timeFilterTabActive,
              {
                backgroundColor:
                  activeTimeFilter === "30days"
                    ? colors.primary
                    : colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setActiveTimeFilter("30days")}
          >
            <Text
              style={[
                styles.timeFilterTabText,
                {
                  color:
                    activeTimeFilter === "30days" ? "#ffffff" : colors.text,
                },
              ]}
            >
              Last 30 Days
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.timeFilterTab,
              activeTimeFilter === "alltime" && styles.timeFilterTabActive,
              {
                backgroundColor:
                  activeTimeFilter === "alltime"
                    ? colors.primary
                    : colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setActiveTimeFilter("alltime")}
          >
            <Text
              style={[
                styles.timeFilterTabText,
                {
                  color:
                    activeTimeFilter === "alltime" ? "#ffffff" : colors.text,
                },
              ]}
            >
              All Time
            </Text>
          </TouchableOpacity>
        </View>

        {/* Metrics Cards */}
        <View style={styles.metricsGrid}>
          {/* QR Scans Card */}
          <TouchableOpacity
            style={[
              styles.metricCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#6c5ce7",
              },
            ]}
            onPress={() => handleMetricClick("QR Scans")}
          >
            <View style={styles.metricHeader}>
              <Text style={[styles.metricLabel, { color: "#6c5ce7" }]}>
                QR Scans
              </Text>
              <View
                style={[
                  styles.metricIconContainer,
                  { backgroundColor: "#ede9fe" },
                ]}
              >
                <Text style={styles.metricIcon}>📱</Text>
              </View>
            </View>

            <Text style={[styles.metricValue, { color: colors.text }]}>
              {analyticsData.qrScans.total}
            </Text>
            <Text
              style={[styles.metricSubtext, { color: colors.textSecondary }]}
            >
              {analyticsData.qrScans.label}
            </Text>

            <View style={styles.metricChange}>
              <View
                style={[styles.changeIndicator, { backgroundColor: "#d1fae5" }]}
              >
                <Text style={styles.changeIcon}>↑</Text>
                <Text style={[styles.changeText, { color: "#065f46" }]}>
                  {analyticsData.qrScans.change}%
                </Text>
              </View>
              <Text
                style={[styles.changeLabel, { color: colors.textSecondary }]}
              >
                vs last week
              </Text>
            </View>
          </TouchableOpacity>

          {/* Video Views Card */}
          <TouchableOpacity
            style={[
              styles.metricCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#06b6d4",
              },
            ]}
            onPress={() => handleMetricClick("Video Views")}
          >
            <View style={styles.metricHeader}>
              <Text style={[styles.metricLabel, { color: "#06b6d4" }]}>
                Video Views
              </Text>
              <View
                style={[
                  styles.metricIconContainer,
                  { backgroundColor: "#cffafe" },
                ]}
              >
                <Text style={styles.metricIcon}>▶️</Text>
              </View>
            </View>

            <Text style={[styles.metricValue, { color: colors.text }]}>
              {analyticsData.videoViews.total}
            </Text>
            <Text
              style={[styles.metricSubtext, { color: colors.textSecondary }]}
            >
              {analyticsData.videoViews.label}
            </Text>

            <View style={styles.metricChange}>
              <View
                style={[styles.changeIndicator, { backgroundColor: "#d1fae5" }]}
              >
                <Text style={styles.changeIcon}>↑</Text>
                <Text style={[styles.changeText, { color: "#065f46" }]}>
                  {analyticsData.videoViews.change}%
                </Text>
              </View>
              <Text
                style={[styles.changeLabel, { color: colors.textSecondary }]}
              >
                vs last week
              </Text>
            </View>
          </TouchableOpacity>

          {/* Feedback Card */}
          <TouchableOpacity
            style={[
              styles.metricCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#10b981",
              },
            ]}
            onPress={() => handleMetricClick("Feedback")}
          >
            <View style={styles.metricHeader}>
              <Text style={[styles.metricLabel, { color: "#10b981" }]}>
                Feedback
              </Text>
              <View
                style={[
                  styles.metricIconContainer,
                  { backgroundColor: "#d1fae5" },
                ]}
              >
                <Text style={styles.metricIcon}>✅</Text>
              </View>
            </View>

            <Text style={[styles.metricValue, { color: colors.text }]}>
              {analyticsData.feedback.total}
            </Text>
            <Text
              style={[styles.metricSubtext, { color: colors.textSecondary }]}
            >
              {analyticsData.feedback.label}
            </Text>

            <View style={styles.metricChange}>
              <View
                style={[styles.changeIndicator, { backgroundColor: "#d1fae5" }]}
              >
                <Text style={styles.changeIcon}>↑</Text>
                <Text style={[styles.changeText, { color: "#065f46" }]}>
                  {analyticsData.feedback.change}%
                </Text>
              </View>
              <Text
                style={[styles.changeLabel, { color: colors.textSecondary }]}
              >
                vs last week
              </Text>
            </View>
          </TouchableOpacity>

          {/* Conversion Card */}
          <TouchableOpacity
            style={[
              styles.metricCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#f59e0b",
              },
            ]}
            onPress={() => handleMetricClick("Conversion")}
          >
            <View style={styles.metricHeader}>
              <Text style={[styles.metricLabel, { color: "#f59e0b" }]}>
                Conversion
              </Text>
              <View
                style={[
                  styles.metricIconContainer,
                  { backgroundColor: "#fef3c7" },
                ]}
              >
                <Text style={styles.metricIcon}>📈</Text>
              </View>
            </View>

            <Text style={[styles.metricValue, { color: colors.text }]}>
              {analyticsData.conversion.rate}%
            </Text>
            <Text
              style={[styles.metricSubtext, { color: colors.textSecondary }]}
            >
              {analyticsData.conversion.label}
            </Text>

            <View style={styles.metricChange}>
              <Text
                style={[
                  styles.conversionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                {analyticsData.conversion.percentage}%{" "}
                {analyticsData.conversion.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Video Performance Section */}
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📹</Text>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Video Performance
            </Text>
          </View>

          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📹</Text>
            <Text
              style={[styles.emptyStateText, { color: colors.textSecondary }]}
            >
              No video views recorded yet
            </Text>
          </View>
        </View>

        {/* Recent Feedback Section */}
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💬</Text>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Feedback & Responses
            </Text>
          </View>

          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>💬</Text>
            <Text
              style={[styles.emptyStateText, { color: colors.textSecondary }]}
            >
              No feedback submissions yet
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  burgerButtonSpace: {
    width: 40,
    height: 40,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
  },
  profileDropdownBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1002,
  },
  profileDropdown: {
    position: "absolute",
    top: 95,
    right: 16,
    width: 220,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    zIndex: 1003,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  profileDropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6c5ce7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  profileAvatarText: {
    fontSize: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  profileRole: {
    fontSize: 12,
  },
  profileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  profileMenuIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  profileMenuText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  pageHeaderCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  pageHeaderContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  pageHeaderIcon: {
    fontSize: 28,
  },
  pageHeaderText: {
    flex: 1,
  },
  pageHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  pageHeaderSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 18,
  },
  dateCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 6,
  },
  dateIcon: {
    fontSize: 14,
  },
  dateText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  timeFilterTabs: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  timeFilterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  timeFilterTabActive: {
    // Active state handled by backgroundColor prop
  },
  timeFilterTabText: {
    fontSize: 12,
    fontWeight: "600",
  },
  metricsGrid: {
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  metricIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  metricIcon: {
    fontSize: 18,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  metricSubtext: {
    fontSize: 13,
    marginBottom: 12,
  },
  metricChange: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  changeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  changeIcon: {
    fontSize: 12,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  changeLabel: {
    fontSize: 11,
  },
  conversionSubtitle: {
    fontSize: 11,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 14,
  },
  notificationsModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationsBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  notificationsModal: {
    width: "90%",
    maxWidth: 400,
    maxHeight: "70%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  notificationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  notificationsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeNotificationsButton: {
    padding: 4,
  },
  closeNotificationsText: {
    fontSize: 24,
    fontWeight: "300",
  },
  emptyNotifications: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyNotificationsIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyNotificationsText: {
    fontSize: 14,
  },
});

export default DemoAnalyticsScreen;
