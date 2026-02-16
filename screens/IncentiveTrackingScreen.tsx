import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../app/contexts/ThemeContext";
import BurgerMenu from "../components/BurgerMenu";

const IncentiveTrackingScreen = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("Ranzel Jude Egos");
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);

  const colors = {
    background: isDarkMode ? "#1a1a1a" : "#f5f5f5",
    cardBackground: isDarkMode ? "#2d2d2d" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    textSecondary: isDarkMode ? "#b0b0b0" : "#6c757d",
    border: isDarkMode ? "#404040" : "#e9ecef",
    headerBg: isDarkMode ? "#2d2d2d" : "#ffffff",
    primary: "#6c5ce7",
    iconBg: isDarkMode ? "#404040" : "#f0f0f0",
    orange: "#ffa500",
    green: "#00b894",
    purple: "#7c6fe7",
  };

  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤",
  };

  const agents = [
    "Ranzel Jude Egos",
    "Maria Santos",
    "John Dela Cruz",
    "Anna Reyes",
  ];

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleLogout = () => {
    setProfileDropdownVisible(false);
    router.dismissAll();
    router.replace("/LandingPage");
  };

  const handleMyProfile = () => {
    setProfileDropdownVisible(false);
    router.push("/ProfileScreen");
  };

  return (
    <View style={styles.container}>
      {/* BurgerMenu Component */}
      <BurgerMenu currentPage="Incentive Tracking" />

      {/* Header - Icons Only - Fixed at top */}
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
        {/* Page Title */}
        <View style={styles.titleSection}>
          <Text style={styles.pageIcon}>💰</Text>
          <View>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              KiQbaQ Tracking
            </Text>
            <Text
              style={[styles.pageSubtitle, { color: colors.textSecondary }]}
            >
              Monitor agent performance and KiQbaQ payouts.
            </Text>
          </View>
        </View>

        {/* Main Card - Agent Incentive Tracking */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          {/* Card Header */}
          <View style={[styles.cardHeader, { backgroundColor: colors.purple }]}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.cardHeaderIcon}>📊</Text>
              <Text style={styles.cardHeaderTitle}>
                Agent Incentive Tracking
              </Text>
            </View>
            <TouchableOpacity
              style={styles.howItWorksButton}
              onPress={() => setShowHowItWorksModal(true)}
            >
              <Text style={styles.howItWorksIcon}>ℹ️</Text>
              <Text style={styles.howItWorksText}>How It Works</Text>
            </TouchableOpacity>
          </View>

          {/* Agent Selector */}
          <View style={styles.controlsContainer}>
            <Text
              style={[styles.controlLabel, { color: colors.textSecondary }]}
            >
              Agent
            </Text>
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity
                style={[
                  styles.agentDropdown,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setShowAgentDropdown(!showAgentDropdown)}
              >
                <Text
                  style={[styles.agentDropdownText, { color: colors.text }]}
                >
                  {selectedAgent}
                </Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>

              {showAgentDropdown && (
                <>
                  <TouchableOpacity
                    style={styles.dropdownBackdrop}
                    activeOpacity={1}
                    onPress={() => setShowAgentDropdown(false)}
                  />
                  <View
                    style={[
                      styles.dropdownMenu,
                      {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    {agents.map((agent) => (
                      <TouchableOpacity
                        key={agent}
                        style={[
                          styles.dropdownItem,
                          selectedAgent === agent && styles.dropdownItemActive,
                          { borderBottomColor: colors.border },
                        ]}
                        onPress={() => {
                          setSelectedAgent(agent);
                          setShowAgentDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            { color: colors.text },
                            selectedAgent === agent &&
                              styles.dropdownItemTextActive,
                          ]}
                        >
                          {agent}
                        </Text>
                        {selectedAgent === agent && (
                          <Text style={styles.dropdownItemCheck}>✓</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </View>
          </View>

          {/* KiQbaQ Summary Cards - Stacked */}
          <View style={styles.summaryContainer}>
            <View
              style={[styles.summaryCard, { backgroundColor: colors.orange }]}
            >
              <View style={styles.summaryCardContent}>
                <Text style={styles.summaryIcon}>⏳</Text>
                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryLabel}>PENDING KIQBAQ</Text>
                  <Text style={styles.summarySubtext}>0 KiQbaQ</Text>
                </View>
              </View>
              <Text style={styles.summaryAmount}>₱0.00</Text>
            </View>

            <View
              style={[styles.summaryCard, { backgroundColor: colors.green }]}
            >
              <View style={styles.summaryCardContent}>
                <Text style={styles.summaryIcon}>✅</Text>
                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryLabel}>PAID KIQBAQ</Text>
                  <Text style={styles.summarySubtext}>0 KiQbaQ</Text>
                </View>
              </View>
              <Text style={styles.summaryAmount}>₱0.00</Text>
            </View>

            <View
              style={[styles.summaryCard, { backgroundColor: colors.purple }]}
            >
              <View style={styles.summaryCardContent}>
                <Text style={styles.summaryIcon}>💵</Text>
                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryLabel}>TOTAL KIQBAQ</Text>
                  <Text style={styles.summarySubtext}>0 KiQbaQ</Text>
                </View>
              </View>
              <Text style={styles.summaryAmount}>₱0.00</Text>
            </View>
          </View>

          {/* KiQbaQ Breakdown Section */}
          <View style={styles.breakdownSection}>
            <Text style={[styles.breakdownTitle, { color: colors.text }]}>
              KiQbaQ Breakdown
            </Text>

            {/* Controls */}
            <View style={styles.tableControls}>
              <View style={styles.entriesControl}>
                <Text style={[styles.controlLabel, { color: colors.text }]}>
                  Show
                </Text>
                <View style={styles.dropdownWrapper}>
                  <TouchableOpacity
                    style={[
                      styles.entriesDropdown,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => setShowEntriesDropdown(!showEntriesDropdown)}
                  >
                    <Text style={[styles.entriesText, { color: colors.text }]}>
                      {entriesPerPage}
                    </Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>

                  {showEntriesDropdown && (
                    <>
                      <TouchableOpacity
                        style={styles.dropdownBackdrop}
                        activeOpacity={1}
                        onPress={() => setShowEntriesDropdown(false)}
                      />
                      <View
                        style={[
                          styles.dropdownMenu,
                          {
                            backgroundColor: colors.cardBackground,
                            borderColor: colors.border,
                          },
                        ]}
                      >
                        {[10, 25, 50, 100].map((value) => (
                          <TouchableOpacity
                            key={value}
                            style={[
                              styles.dropdownItem,
                              entriesPerPage === value &&
                                styles.dropdownItemActive,
                              { borderBottomColor: colors.border },
                            ]}
                            onPress={() => {
                              setEntriesPerPage(value);
                              setShowEntriesDropdown(false);
                            }}
                          >
                            <Text
                              style={[
                                styles.dropdownItemText,
                                { color: colors.text },
                                entriesPerPage === value &&
                                  styles.dropdownItemTextActive,
                              ]}
                            >
                              {value}
                            </Text>
                            {entriesPerPage === value && (
                              <Text style={styles.dropdownItemCheck}>✓</Text>
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}
                </View>
                <Text style={[styles.controlLabel, { color: colors.text }]}>
                  entries
                </Text>
              </View>

              <TextInput
                style={[
                  styles.searchInput,
                  {
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Search Here..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* KiQbaQ Cards */}
            <View style={styles.kiqbaqCardsContainer}>
              {/* Empty State */}
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>📂</Text>
                <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
                  No KiQbaQ Records
                </Text>
                <Text
                  style={[
                    styles.emptyStateText,
                    { color: colors.textSecondary },
                  ]}
                >
                  No commission records available yet.{"\n"}
                  Commission records will appear here once schools subscribe.
                </Text>
              </View>

              {/* Sample Card (for when there's data) - Hidden for now */}
              {/* 
              <View style={[styles.kiqbaqCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                <View style={styles.kiqbaqCardHeader}>
                  <View style={styles.kiqbaqNumberBadge}>
                    <Text style={styles.kiqbaqNumberText}>#1</Text>
                  </View>
                  <View style={[styles.kiqbaqStatusBadge, { backgroundColor: colors.green }]}>
                    <Text style={styles.kiqbaqStatusText}>PAID</Text>
                  </View>
                </View>

                <Text style={[styles.kiqbaqClientName, { color: colors.text }]}>
                  Ateneo de Manila University
                </Text>

                <View style={styles.kiqbaqInfoGrid}>
                  <View style={styles.kiqbaqInfoRow}>
                    <Text style={[styles.kiqbaqInfoLabel, { color: colors.textSecondary }]}>
                      💰 Commission:
                    </Text>
                    <Text style={[styles.kiqbaqInfoValue, { color: colors.text }]}>
                      ₱875.00
                    </Text>
                  </View>

                  <View style={styles.kiqbaqInfoRow}>
                    <Text style={[styles.kiqbaqInfoLabel, { color: colors.textSecondary }]}>
                      🏆 Date Won:
                    </Text>
                    <Text style={[styles.kiqbaqInfoValue, { color: colors.text }]}>
                      Jan 15, 2026
                    </Text>
                  </View>

                  <View style={styles.kiqbaqInfoRow}>
                    <Text style={[styles.kiqbaqInfoLabel, { color: colors.textSecondary }]}>
                      💳 Date Paid:
                    </Text>
                    <Text style={[styles.kiqbaqInfoValue, { color: colors.text }]}>
                      Jan 18, 2026
                    </Text>
                  </View>
                </View>
              </View>
              */}
            </View>

            {/* Footer */}
            <View style={styles.tableFooter}>
              <Text
                style={[styles.footerText, { color: colors.textSecondary }]}
              >
                Showing 0 to 0 of 0 entries
              </Text>
              <View style={styles.pagination}>
                <TouchableOpacity
                  style={[
                    styles.paginationButton,
                    { backgroundColor: colors.border },
                  ]}
                  disabled
                >
                  <Text
                    style={[
                      styles.paginationButtonText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    ‹
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.paginationButton,
                    { backgroundColor: colors.border },
                  ]}
                  disabled
                >
                  <Text
                    style={[
                      styles.paginationButtonText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    ›
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* How It Works Modal */}
      <Modal
        visible={showHowItWorksModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowHowItWorksModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowHowItWorksModal(false)}
          />
          <View
            style={[
              styles.howItWorksModal,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Modal Header */}
              <View
                style={[styles.modalHeader, { backgroundColor: colors.purple }]}
              >
                <View style={styles.modalHeaderContent}>
                  <Text style={styles.modalHeaderIcon}>ℹ️</Text>
                  <Text style={styles.modalTitle}>How Incentives Work</Text>
                </View>
                <TouchableOpacity onPress={() => setShowHowItWorksModal(false)}>
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Modal Content */}
              <View style={styles.modalContent}>
                {/* Eligibility */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>⭐</Text>
                    <Text
                      style={[styles.sectionTitle, { color: colors.primary }]}
                    >
                      Eligibility
                    </Text>
                  </View>
                  <Text style={[styles.sectionText, { color: colors.text }]}>
                    If a school subscribes to the{" "}
                    <Text style={styles.bold}>Premium Plan</Text>, the agent
                    becomes eligible for incentives.
                  </Text>
                </View>

                {/* Incentive Computation */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>🧮</Text>
                    <Text
                      style={[styles.sectionTitle, { color: colors.primary }]}
                    >
                      Incentive Computation
                    </Text>
                  </View>
                  <View
                    style={[styles.formulaBox, { backgroundColor: "#e3f2fd" }]}
                  >
                    <Text style={styles.formulaLabel}>Formula:</Text>
                    <Text style={styles.formulaText}>
                      Student Count × ₱3.50 per student per month
                    </Text>
                  </View>
                  <View style={styles.exampleSection}>
                    <Text
                      style={[
                        styles.exampleLabel,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Example:
                    </Text>
                    <Text style={[styles.exampleText, { color: colors.text }]}>
                      › 200 students × ₱3.50 ={" "}
                      <Text style={styles.bold}>₱700 per month</Text>
                    </Text>
                  </View>
                </View>

                {/* Annual Example */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>📅</Text>
                    <Text
                      style={[styles.sectionTitle, { color: colors.primary }]}
                    >
                      Annual Example
                    </Text>
                  </View>
                  <Text style={[styles.sectionText, { color: colors.text }]}>
                    10 schools with 250 students each:
                  </Text>
                  <View
                    style={[
                      styles.calculationBox,
                      { backgroundColor: colors.background },
                    ]}
                  >
                    <Text
                      style={[styles.calculationText, { color: colors.text }]}
                    >
                      Monthly per school: 250 students × ₱3.50 ={" "}
                      <Text style={styles.bold}>₱875</Text>
                    </Text>
                    <Text
                      style={[styles.calculationText, { color: colors.text }]}
                    >
                      Annual per school: ₱875 × 12 months ={" "}
                      <Text style={styles.bold}>₱10,500</Text>
                    </Text>
                    <Text style={[styles.totalText, { color: colors.green }]}>
                      Total Annual: ₱10,500 × 10 schools = ₱105,000
                    </Text>
                  </View>
                  <View
                    style={[styles.noteBox, { backgroundColor: "#fff3e0" }]}
                  >
                    <Text style={styles.noteIcon}>💡</Text>
                    <Text style={[styles.noteText, { color: colors.text }]}>
                      Incentives continue as long as the school remains
                      subscribed to Premium.
                    </Text>
                  </View>
                </View>

                {/* Quota Requirements */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>🎯</Text>
                    <Text
                      style={[styles.sectionTitle, { color: colors.primary }]}
                    >
                      Quota Requirements
                    </Text>
                  </View>
                  <View style={styles.requirementItem}>
                    <Text style={styles.checkIcon}>✅</Text>
                    <Text
                      style={[styles.requirementText, { color: colors.text }]}
                    >
                      175 students = 1 school equivalent
                    </Text>
                  </View>
                  <View style={styles.requirementItem}>
                    <Text style={styles.checkIcon}>✅</Text>
                    <Text
                      style={[styles.requirementText, { color: colors.text }]}
                    >
                      Annual quota: 5 schools
                    </Text>
                  </View>
                </View>

                {/* Payment Schedule */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>💳</Text>
                    <Text
                      style={[styles.sectionTitle, { color: colors.primary }]}
                    >
                      Payment Schedule
                    </Text>
                  </View>
                  <View
                    style={[styles.warningBox, { backgroundColor: "#fff3e0" }]}
                  >
                    <Text style={styles.warningIcon}>⚠️</Text>
                    <Text style={[styles.warningText, { color: "#e65100" }]}>
                      Incentives are released 2-3 days after the school's
                      subscription payment.
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Close Button */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => setShowHowItWorksModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
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
    padding: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  profileMenuItemLast: {
    borderBottomWidth: 0,
  },
  profileMenuIcon: {
    fontSize: 16,
  },
  profileMenuText: {
    fontSize: 14,
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
    marginBottom: 0,
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
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
  howItWorksButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  howItWorksIcon: {
    fontSize: 14,
  },
  howItWorksText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  controlsContainer: {
    padding: 16,
    gap: 8,
  },
  controlLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  dropdownWrapper: {
    position: "relative",
  },
  agentDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  agentDropdownText: {
    fontSize: 14,
  },
  dropdownArrow: {
    fontSize: 10,
    color: "#999",
  },
  dropdownBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    maxHeight: 200,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  dropdownItemActive: {
    backgroundColor: "rgba(108, 92, 231, 0.1)",
  },
  dropdownItemText: {
    fontSize: 14,
  },
  dropdownItemTextActive: {
    fontWeight: "600",
    color: "#6c5ce7",
  },
  dropdownItemCheck: {
    fontSize: 14,
    color: "#6c5ce7",
    fontWeight: "bold",
  },
  summaryContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  summaryIcon: {
    fontSize: 32,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryLabel: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  summaryAmount: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  summarySubtext: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
  },
  breakdownSection: {
    padding: 16,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  tableControls: {
    gap: 12,
    marginBottom: 16,
  },
  entriesControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  entriesDropdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 60,
  },
  entriesText: {
    fontSize: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  kiqbaqCardsContainer: {
    gap: 12,
    paddingBottom: 16,
  },
  kiqbaqCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  kiqbaqCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  kiqbaqNumberBadge: {
    backgroundColor: "#48cae4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  kiqbaqNumberText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  kiqbaqStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  kiqbaqStatusText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  kiqbaqClientName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  kiqbaqInfoGrid: {
    gap: 8,
  },
  kiqbaqInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kiqbaqInfoLabel: {
    fontSize: 13,
  },
  kiqbaqInfoValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  tableFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
  },
  footerText: {
    fontSize: 12,
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
  },
  paginationButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  howItWorksModal: {
    width: "100%",
    maxWidth: 600,
    maxHeight: "85%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
  },
  modalHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalHeaderIcon: {
    fontSize: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: "300",
    color: "#ffffff",
  },
  modalContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "700",
  },
  formulaBox: {
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  formulaLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1976d2",
    marginBottom: 4,
  },
  formulaText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  exampleSection: {
    marginTop: 8,
  },
  exampleLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    paddingLeft: 8,
  },
  calculationBox: {
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  calculationText: {
    fontSize: 14,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  noteBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  noteIcon: {
    fontSize: 20,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    fontStyle: "italic",
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  checkIcon: {
    fontSize: 16,
  },
  requirementText: {
    fontSize: 14,
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 8,
  },
  warningIcon: {
    fontSize: 20,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  modalFooter: {
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  closeButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default IncentiveTrackingScreen;
