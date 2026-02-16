import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../app/contexts/ThemeContext";
import BurgerMenu from "../components/BurgerMenu";

const PerformanceBenchmarkingScreen = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [performanceDetailsVisible, setPerformanceDetailsVisible] =
    useState(false);

  const colors = {
    background: isDarkMode ? "#1a1a1a" : "#f5f5f5",
    cardBackground: isDarkMode ? "#2d2d2d" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    textSecondary: isDarkMode ? "#b0b0b0" : "#6c757d",
    border: isDarkMode ? "#404040" : "#e9ecef",
    headerBg: isDarkMode ? "#2d2d2d" : "#ffffff",
    iconBg: isDarkMode ? "#404040" : "#f0f0f0",
    primary: "#6c5ce7",
    blue: "#6c8cff",
    cyan: "#48cae4",
    green: "#00b894",
    lightBg: isDarkMode ? "#2a2a2a" : "#f8f9fa",
    progressBg: isDarkMode ? "#404040" : "#e9ecef",
    activeTabBg: isDarkMode
      ? "rgba(108, 92, 231, 0.2)"
      : "rgba(108, 92, 231, 0.1)",
  };

  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤",
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleMyProfile = () => {
    setProfileDropdownVisible(false);
    router.push("/ProfileScreen");
  };

  const handleLogout = () => {
    setProfileDropdownVisible(false);
    router.dismissAll();
    router.replace("/LandingPage");
  };

  return (
    <View style={styles.container}>
      <BurgerMenu currentPage="Performance Benchmarking" />

      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <View style={styles.headerLeft}>
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
                  <View style={styles.profileMenuItems}>
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
                </View>
              </>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        style={[styles.scrollContainer, { backgroundColor: colors.background }]}
      >
        <View style={styles.titleSection}>
          <Text style={styles.pageIcon}>📊</Text>
          <View>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              Performance Benchmarking
            </Text>
            <Text
              style={[styles.pageSubtitle, { color: colors.textSecondary }]}
            >
              Track and analyze agent performance metrics.
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View
            style={[styles.cardHeader, { backgroundColor: colors.primary }]}
          >
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.cardHeaderIcon}>📈</Text>
              <Text style={styles.cardHeaderTitle}>Your Performance</Text>
            </View>
          </View>

          <View style={styles.performanceSummary}>
            <View style={styles.summaryRow}>
              <Text
                style={[styles.summaryLabel, { color: colors.textSecondary }]}
              >
                Target Wins:
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                0
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text
                style={[styles.summaryLabel, { color: colors.textSecondary }]}
              >
                Current Wins:
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                0 / 0
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.progressBarSection}
            onPress={() => setPerformanceDetailsVisible(true)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.progressBarContainer,
                { backgroundColor: colors.progressBg },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  { width: "0%", backgroundColor: colors.green },
                ]}
              />
            </View>
            <Text
              style={[styles.progressBarHint, { color: colors.textSecondary }]}
            >
              Tap to view performance details
            </Text>
          </TouchableOpacity>

          <View style={styles.performanceCardsContainer}>
            <View
              style={[
                styles.performanceCard,
                { backgroundColor: colors.lightBg },
              ]}
            >
              <Text style={styles.performanceIcon}>📍</Text>
              <Text style={[styles.performanceLabel, { color: colors.blue }]}>
                Visits
              </Text>
              <Text style={[styles.performanceValue, { color: colors.blue }]}>
                0
              </Text>
            </View>

            <View
              style={[
                styles.performanceCard,
                { backgroundColor: colors.lightBg },
              ]}
            >
              <Text style={styles.performanceIcon}>🎯</Text>
              <Text style={[styles.performanceLabel, { color: colors.cyan }]}>
                Demos
              </Text>
              <Text style={[styles.performanceValue, { color: colors.cyan }]}>
                0
              </Text>
            </View>

            <View
              style={[
                styles.performanceCard,
                { backgroundColor: colors.lightBg },
              ]}
            >
              <Text style={styles.performanceIcon}>💰</Text>
              <Text style={[styles.performanceLabel, { color: colors.green }]}>
                Incentives
              </Text>
              <Text style={[styles.performanceValue, { color: colors.green }]}>
                0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={performanceDetailsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPerformanceDetailsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setPerformanceDetailsVisible(false)}
          />
          <View
            style={[
              styles.detailsModal,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            {/* Fixed Modal Header */}
            <View
              style={[styles.modalHeader, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Performance Details
              </Text>
              <TouchableOpacity
                onPress={() => setPerformanceDetailsVisible(false)}
              >
                <Text
                  style={[styles.closeIcon, { color: colors.textSecondary }]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView
              style={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Leads Section */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.primary }]}>
                  Leads (Wins / Lose / Pending)
                </Text>

                {/* Empty State */}
                <View style={styles.emptyStateCard}>
                  <Text style={styles.emptyStateIcon}>📋</Text>
                  <Text
                    style={[styles.emptyStateTitle, { color: colors.text }]}
                  >
                    No Leads Found
                  </Text>
                  <Text
                    style={[
                      styles.emptyStateDescription,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Your lead data will appear here
                  </Text>
                </View>

                {/* Example of what cards would look like with data:
                <View style={[styles.dataCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                  <View style={styles.cardRow}>
                    <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>School Name</Text>
                    <Text style={[styles.cardValue, { color: colors.text }]}>XYZ University</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>Status</Text>
                    <View style={[styles.statusBadge, { backgroundColor: '#00b894' }]}>
                      <Text style={styles.statusText}>Won</Text>
                    </View>
                  </View>
                </View>
                */}
              </View>

              {/* Schedules Section */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.primary }]}>
                  Schedules (Visits / Demos)
                </Text>

                {/* Empty State */}
                <View style={styles.emptyStateCard}>
                  <Text style={styles.emptyStateIcon}>📅</Text>
                  <Text
                    style={[styles.emptyStateTitle, { color: colors.text }]}
                  >
                    No Schedules Found
                  </Text>
                  <Text
                    style={[
                      styles.emptyStateDescription,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Your schedule data will appear here
                  </Text>
                </View>

                {/* Example of what cards would look like with data:
                <View style={[styles.dataCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                  <View style={styles.cardRow}>
                    <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>School Name</Text>
                    <Text style={[styles.cardValue, { color: colors.text }]}>ABC School</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>Schedule Type</Text>
                    <Text style={[styles.cardValue, { color: colors.text }]}>Visit</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>Date</Text>
                    <Text style={[styles.cardValue, { color: colors.text }]}>Jan 15, 2026</Text>
                  </View>
                </View>
                */}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 80,
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
  burgerButtonSpace: {
    width: 40,
    height: 40,
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
  profileContainer: {
    position: "relative",
  },
  profileDropdownBackdropInline: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  profileDropdown: {
    position: "absolute",
    top: 45,
    right: 0,
    width: 200,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  profileDropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
    borderBottomWidth: 1,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6c5ce7",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarText: {
    fontSize: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: "600",
  },
  profileRole: {
    fontSize: 12,
  },
  profileMenuItems: {},
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
  titleSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  pageIcon: {
    fontSize: 28,
    marginTop: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
  },
  card: {
    borderRadius: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardHeaderIcon: {
    fontSize: 18,
    color: "#ffffff",
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  performanceSummary: {
    padding: 16,
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBarSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressBarContainer: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressBarHint: {
    fontSize: 12,
    textAlign: "center",
    fontStyle: "italic",
  },
  performanceCardsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  performanceIcon: {
    fontSize: 32,
  },
  performanceLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  detailsModal: {
    width: "95%",
    maxWidth: 700,
    maxHeight: "85%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: "300",
  },
  modalContent: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  emptyStateCard: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 40,
    alignItems: "center",
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  emptyStateDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  dataCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default PerformanceBenchmarkingScreen;
