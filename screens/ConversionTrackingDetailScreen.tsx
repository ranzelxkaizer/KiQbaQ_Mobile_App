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

const ConversionTrackingDetailScreen: React.FC = () => {
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
  };

  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤",
  };

  const handleLogout = () => {
    router.dismissAll();
    router.replace("/");
  };

  const handleMyProfile = () => {
    router.push("/ProfileScreen");
  };

  const handleBackToAnalytics = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <BurgerMenu currentPage="Demo Analytics" />

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
        <View
          style={[styles.pageHeaderCard, { backgroundColor: colors.primary }]}
        >
          <View style={styles.pageHeaderContent}>
            <Text style={styles.pageHeaderIcon}>📈</Text>
            <View style={styles.pageHeaderText}>
              <Text style={styles.pageHeaderTitle}>Conversion Tracking</Text>
              <Text style={styles.pageHeaderSubtitle}>
                Track visitor engagement and submission rates
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToAnalytics}
          >
            <Text style={styles.backButtonIcon}>←</Text>
            <Text style={styles.backButtonText}>Back to Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#6c5ce7",
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: "#6c5ce7" }]}>
              All Visitors
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#ede9fe" }]}
            >
              <Text style={styles.statIcon}>👥</Text>
            </View>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#10b981",
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: "#10b981" }]}>
              Converted
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#d1fae5" }]}
            >
              <Text style={styles.statIcon}>✅</Text>
            </View>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#dc3545",
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: "#dc3545" }]}>
              Not Converted
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#ffe0e3" }]}
            >
              <Text style={styles.statIcon}>❌</Text>
            </View>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#f59e0b",
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: "#f59e0b" }]}>
              Conversion Rate
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>0.0%</Text>
            <View style={styles.statSubtext}>
              <Text
                style={[
                  styles.statSubtextSmall,
                  { color: colors.textSecondary },
                ]}
              >
                0 converted
              </Text>
              <Text
                style={[
                  styles.statSubtextSmall,
                  { color: colors.textSecondary },
                ]}
              >
                0 not converted
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.timeFilterTabs}>
          {(["7days", "30days", "alltime"] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.timeFilterTab,
                {
                  backgroundColor:
                    activeTimeFilter === filter
                      ? colors.primary
                      : colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setActiveTimeFilter(filter)}
            >
              <Text
                style={[
                  styles.timeFilterTabText,
                  {
                    color:
                      activeTimeFilter === filter ? "#ffffff" : colors.text,
                  },
                ]}
              >
                {filter === "7days"
                  ? "Last 7 Days"
                  : filter === "30days"
                    ? "Last 30 Days"
                    : "All Time"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[
            styles.emptyStateCard,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📈</Text>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              No Conversion Data Yet
            </Text>
            <Text
              style={[styles.emptyStateText, { color: colors.textSecondary }]}
            >
              No visitors have scanned QR codes in this period.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  burgerButtonSpace: { width: 40, height: 40 },
  headerRight: { flexDirection: "row", gap: 8 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 20 },
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
  profileAvatarText: { fontSize: 20 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 14, fontWeight: "bold" },
  profileRole: { fontSize: 12 },
  profileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  profileMenuIcon: { fontSize: 18, marginRight: 12, width: 24 },
  profileMenuText: { fontSize: 14 },
  content: { flex: 1, padding: 16 },
  pageHeaderCard: { borderRadius: 12, padding: 20, marginBottom: 20 },
  pageHeaderContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  pageHeaderIcon: { fontSize: 28 },
  pageHeaderText: { flex: 1 },
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 6,
  },
  backButtonIcon: { color: "#ffffff", fontSize: 18 },
  backButtonText: { color: "#ffffff", fontSize: 13, fontWeight: "600" },
  statsGrid: { gap: 12, marginBottom: 20 },
  statCard: {
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  statValue: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  statIconContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  statIcon: { fontSize: 18 },
  statSubtext: { gap: 4 },
  statSubtextSmall: { fontSize: 11 },
  timeFilterTabs: { flexDirection: "row", gap: 8, marginBottom: 20 },
  timeFilterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  timeFilterTabText: { fontSize: 12, fontWeight: "600" },
  emptyStateCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyState: { alignItems: "center", paddingVertical: 60 },
  emptyStateIcon: { fontSize: 64, marginBottom: 16 },
  emptyStateTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  emptyStateText: { fontSize: 14, textAlign: "center" },
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
  notificationsTitle: { fontSize: 20, fontWeight: "bold" },
  closeNotificationsText: { fontSize: 24, fontWeight: "300" },
  emptyNotifications: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyNotificationsIcon: { fontSize: 48, marginBottom: 12 },
  emptyNotificationsText: { fontSize: 14 },
});

export default ConversionTrackingDetailScreen;
