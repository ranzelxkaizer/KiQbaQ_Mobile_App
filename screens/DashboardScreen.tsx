import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

  const [activeTab, setActiveTab] = useState<"announcements" | "leads">(
    "announcements",
  );
  const [activeSubTab, setActiveSubTab] = useState<
    "announcements" | "schedules"
  >("announcements");
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  // User data
  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤",
  };

  // Mock schedules
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleLogout = () => {
    setProfileDropdownVisible(false);
    // Navigate to root app/index.tsx
    router.navigate("/LandingPage");
  };

  const handleMyProfile = () => {
    setProfileDropdownVisible(false);
    router.push("/ProfileScreen");
  };

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
    secondary: "#48cae4", // Lighter teal for sub-tabs
    green: "#00b894",
    orange: "#fd9644",
    blue: "#17a2b8",
    red: "#d63031",
  };

  return (
    <View style={styles.container}>
      {/* BurgerMenu Component */}
      <BurgerMenu currentPage="Dashboard" />

      {/* Header - Icons Only - Fixed at top */}
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <View style={styles.headerLeft}>
          {/* Empty space for burger button alignment */}
          <View style={styles.burgerButtonSpace} />
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.iconBg }]}
            onPress={() => router.push("/NotificationsScreen")}
          >
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: colors.iconBg }]}
              onPress={toggleProfileDropdown}
            >
              <Text style={styles.icon}>👤</Text>
            </TouchableOpacity>

            {/* Profile Dropdown */}
            {profileDropdownVisible && (
              <>
                <TouchableOpacity
                  style={styles.profileDropdownBackdropInline}
                  activeOpacity={1}
                  onPress={toggleProfileDropdown}
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
                    style={[styles.profileMenuItem, styles.profileMenuItemLast]}
                    onPress={handleLogout}
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

      <ScrollView
        style={[styles.scrollContainer, { backgroundColor: colors.background }]}
      >
        {/* Page Title - In content area */}
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitleIcon}>📊</Text>
          <View style={styles.pageTitleTextContainer}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              Dashboard
            </Text>
            <Text
              style={[styles.pageSubtitle, { color: colors.textSecondary }]}
            >
              Welcome back! Here's what's happening with your leads today.
            </Text>
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
                    backgroundColor: colors.secondary,
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
                    backgroundColor: colors.secondary,
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
    paddingBottom: 80, // Space for navigation buttons
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
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
  // Page Title Section in content area
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
  pageSubtitle: {
    fontSize: 13,
    lineHeight: 18,
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
  profileDropdownBackdropInline: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
});

export default Dashboard;
