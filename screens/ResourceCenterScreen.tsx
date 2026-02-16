import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../app/contexts/ThemeContext";
import BurgerMenu from "../components/BurgerMenu";

const ResourceCenterScreen = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [filterType, setFilterType] = useState("All File Types");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const colors = {
    background: isDarkMode ? "#1a1a1a" : "#f5f5f5",
    cardBackground: isDarkMode ? "#2d2d2d" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    textSecondary: isDarkMode ? "#b0b0b0" : "#6c757d",
    border: isDarkMode ? "#404040" : "#e9ecef",
    headerBg: isDarkMode ? "#2d2d2d" : "#ffffff",
    iconBg: isDarkMode ? "#404040" : "#f0f0f0",
    primary: "#6c5ce7",
    gradient1: "#6c5ce7",
    gradient2: "#a29bfe",
    blue: "#6c8cff",
    green: "#00b894",
    lightBg: isDarkMode ? "#2a2a2a" : "#f8f9fa",
  };

  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤",
  };

  const fileTypeOptions = [
    "All File Types",
    "PDF",
    "Image",
    "Video",
    "Document",
    "Spreadsheet",
  ];

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

  // Mock data - empty for now
  const resources: any[] = [];

  return (
    <View style={styles.container}>
      <BurgerMenu currentPage="Resource Center" />

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
          <Text style={styles.pageIcon}>📁</Text>
          <View>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              Resource Center
            </Text>
            <Text
              style={[styles.pageSubtitle, { color: colors.textSecondary }]}
            >
              Access and manage all your important files and documents.
            </Text>
          </View>
        </View>

        {/* Main Card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          {/* Card Header with Gradient */}
          <View
            style={[styles.cardHeader, { backgroundColor: colors.primary }]}
          >
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.cardHeaderIcon}>📂</Text>
              <Text style={styles.cardHeaderTitle}>All Resources</Text>
            </View>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <Text style={styles.filterButtonText}>{filterType}</Text>
              <Text style={styles.filterButtonIcon}>▼</Text>
            </TouchableOpacity>

            {showFilterDropdown && (
              <>
                <TouchableOpacity
                  style={styles.dropdownBackdrop}
                  activeOpacity={1}
                  onPress={() => setShowFilterDropdown(false)}
                />
                <View
                  style={[
                    styles.dropdown,
                    styles.filterDropdown,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  {fileTypeOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.dropdownItem,
                        { borderBottomColor: colors.border },
                      ]}
                      onPress={() => {
                        setFilterType(option);
                        setShowFilterDropdown(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          { color: colors.text },
                        ]}
                      >
                        {option}
                      </Text>
                      {filterType === option && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Controls Section */}
          <View style={styles.controlsSection}>
            {/* Entries Dropdown */}
            <View style={styles.entriesControl}>
              <Text
                style={[styles.controlLabel, { color: colors.textSecondary }]}
              >
                Show
              </Text>
              <TouchableOpacity
                style={[
                  styles.entriesDropdown,
                  {
                    backgroundColor: colors.lightBg,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setShowEntriesDropdown(!showEntriesDropdown)}
              >
                <Text style={[styles.entriesText, { color: colors.text }]}>
                  {entriesPerPage}
                </Text>
                <Text
                  style={[
                    styles.dropdownArrow,
                    { color: colors.textSecondary },
                  ]}
                >
                  ▼
                </Text>
              </TouchableOpacity>
              <Text
                style={[styles.controlLabel, { color: colors.textSecondary }]}
              >
                entries
              </Text>

              {showEntriesDropdown && (
                <>
                  <TouchableOpacity
                    style={styles.dropdownBackdrop}
                    activeOpacity={1}
                    onPress={() => setShowEntriesDropdown(false)}
                  />
                  <View
                    style={[
                      styles.dropdown,
                      styles.entriesDropdownMenu,
                      {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    {[10, 25, 50, 100].map((num) => (
                      <TouchableOpacity
                        key={num}
                        style={[
                          styles.dropdownItem,
                          { borderBottomColor: colors.border },
                        ]}
                        onPress={() => {
                          setEntriesPerPage(num);
                          setShowEntriesDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            { color: colors.text },
                          ]}
                        >
                          {num}
                        </Text>
                        {entriesPerPage === num && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </View>

            {/* Search */}
            <View style={styles.searchControl}>
              <Text
                style={[styles.controlLabel, { color: colors.textSecondary }]}
              >
                Search:
              </Text>
              <TextInput
                style={[
                  styles.searchInput,
                  {
                    backgroundColor: colors.lightBg,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="Search Here..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Resources List */}
          <View style={styles.resourcesList}>
            {resources.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>📂</Text>
                <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
                  No Resources Available
                </Text>
                <Text
                  style={[
                    styles.emptyStateDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  No data available in table
                </Text>
              </View>
            ) : (
              resources.map((resource, index) => (
                <View
                  key={resource.id}
                  style={[
                    styles.resourceCard,
                    {
                      backgroundColor: colors.lightBg,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={styles.resourceHeader}>
                    <View
                      style={[
                        styles.resourceNumber,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <Text style={styles.resourceNumberText}>{index + 1}</Text>
                    </View>
                    <Text
                      style={[styles.resourceName, { color: colors.text }]}
                      numberOfLines={1}
                    >
                      {resource.name}
                    </Text>
                  </View>

                  <View style={styles.resourceDetails}>
                    <View style={styles.resourceDetailRow}>
                      <Text
                        style={[
                          styles.resourceDetailLabel,
                          { color: colors.textSecondary },
                        ]}
                      >
                        File Type
                      </Text>
                      <Text
                        style={[
                          styles.resourceDetailValue,
                          { color: colors.text },
                        ]}
                      >
                        {resource.fileType}
                      </Text>
                    </View>

                    <View style={styles.resourceDetailRow}>
                      <Text
                        style={[
                          styles.resourceDetailLabel,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Description
                      </Text>
                      <Text
                        style={[
                          styles.resourceDetailValue,
                          { color: colors.text },
                        ]}
                        numberOfLines={2}
                      >
                        {resource.description}
                      </Text>
                    </View>

                    <View style={styles.resourceDetailRow}>
                      <Text
                        style={[
                          styles.resourceDetailLabel,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Date Uploaded
                      </Text>
                      <Text
                        style={[
                          styles.resourceDetailValue,
                          { color: colors.text },
                        ]}
                      >
                        {resource.dateUploaded}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.resourceActions}>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        styles.viewButton,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <Text style={styles.actionButtonText}>👁️ View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        styles.downloadButton,
                        { backgroundColor: colors.green },
                      ]}
                    >
                      <Text style={styles.actionButtonText}>⬇️ Download</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Pagination */}
          <View style={styles.pagination}>
            <Text
              style={[styles.paginationText, { color: colors.textSecondary }]}
            >
              Showing 0 to 0 of 0 entries
            </Text>
            <View style={styles.paginationButtons}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  {
                    backgroundColor: colors.iconBg,
                    borderColor: colors.border,
                  },
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
                  {
                    backgroundColor: colors.iconBg,
                    borderColor: colors.border,
                  },
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
      </ScrollView>
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
    overflow: "visible",
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
    position: "relative",
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
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
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "500",
  },
  filterButtonIcon: {
    fontSize: 10,
    color: "#ffffff",
  },
  controlsSection: {
    padding: 16,
    gap: 16,
  },
  entriesControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    position: "relative",
  },
  controlLabel: {
    fontSize: 14,
  },
  entriesDropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    gap: 8,
    minWidth: 70,
  },
  entriesText: {
    fontSize: 14,
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 10,
  },
  searchControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 14,
  },
  dropdownBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  dropdown: {
    position: "absolute",
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  entriesDropdownMenu: {
    top: 35,
    left: 45,
    minWidth: 80,
  },
  filterDropdown: {
    top: 55,
    right: 16,
    minWidth: 150,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  checkmark: {
    fontSize: 16,
    color: "#6c5ce7",
    fontWeight: "bold",
  },
  resourcesList: {
    padding: 16,
    gap: 12,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
  },
  resourceCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  resourceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  resourceNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  resourceNumberText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  resourceName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  resourceDetails: {
    gap: 10,
    marginBottom: 16,
  },
  resourceDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  resourceDetailLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    width: 100,
  },
  resourceDetailValue: {
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  resourceActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  viewButton: {},
  downloadButton: {},
  actionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ffffff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 0,
  },
  paginationText: {
    fontSize: 13,
  },
  paginationButtons: {
    flexDirection: "row",
    gap: 8,
  },
  paginationButton: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ResourceCenterScreen;
