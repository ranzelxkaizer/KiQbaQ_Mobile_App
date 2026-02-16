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

interface Lead {
  id: number;
  schoolName: string;
  address: string;
  status: "Pending" | "Contacted" | "Converted" | "Lost";
}

const LeadsManagementScreen: React.FC = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [leads, setLeads] = useState<Lead[]>([
    // Mock data - will be replaced with backend data
    // Total: 20 leads | Active: 8 | Pending: 6 | Won: 4 | Lost: 3
    {
      id: "1",
      schoolName: "Ateneo de Manila University",
      address: "Katipunan Avenue, Loyola Heights, Quezon City",
      status: "Active",
    },
    {
      id: "2",
      schoolName: "University of the Philippines Diliman",
      address: "Diliman, Quezon City, Metro Manila",
      status: "Pending",
    },
    {
      id: "3",
      schoolName: "De La Salle University",
      address: "2401 Taft Avenue, Malate, Manila",
      status: "Won",
    },
    {
      id: "4",
      schoolName: "University of Santo Tomas",
      address: "España Boulevard, Sampaloc, Manila",
      status: "Active",
    },
    {
      id: "5",
      schoolName: "Far Eastern University",
      address: "Nicanor Reyes Street, Sampaloc, Manila",
      status: "Lost",
    },
    {
      id: "6",
      schoolName: "Adamson University",
      address: "900 San Marcelino Street, Ermita, Manila",
      status: "Pending",
    },
    {
      id: "7",
      schoolName: "Polytechnic University of the Philippines",
      address: "Anonas Street, Santa Mesa, Manila",
      status: "Active",
    },
    {
      id: "8",
      schoolName: "National University",
      address: "551 M.F. Jhocson Street, Sampaloc, Manila",
      status: "Won",
    },
    {
      id: "9",
      schoolName: "Mapúa University",
      address: "Muralla Street, Intramuros, Manila",
      status: "Active",
    },
    {
      id: "10",
      schoolName: "Philippine Normal University",
      address: "Taft Avenue, Malate, Manila",
      status: "Pending",
    },
    {
      id: "11",
      schoolName: "Technological University of the Philippines",
      address: "Ayala Boulevard, Ermita, Manila",
      status: "Active",
    },
    {
      id: "12",
      schoolName: "Centro Escolar University",
      address: "Mendiola Street, San Miguel, Manila",
      status: "Lost",
    },
    {
      id: "13",
      schoolName: "Saint Louis University",
      address: "A. Bonifacio Street, Baguio City",
      status: "Active",
    },
    {
      id: "14",
      schoolName: "University of San Carlos",
      address: "P. del Rosario Street, Cebu City",
      status: "Pending",
    },
    {
      id: "15",
      schoolName: "Silliman University",
      address: "Hibbard Avenue, Dumaguete City",
      status: "Won",
    },
    {
      id: "16",
      schoolName: "Xavier University",
      address: "Corrales Avenue, Cagayan de Oro City",
      status: "Active",
    },
    {
      id: "17",
      schoolName: "Ateneo de Davao University",
      address: "E. Jacinto Street, Davao City",
      status: "Pending",
    },
    {
      id: "18",
      schoolName: "University of San Agustin",
      address: "General Luna Street, Iloilo City",
      status: "Won",
    },
    {
      id: "19",
      schoolName: "Central Philippine University",
      address: "Lopez Jaena Street, Iloilo City",
      status: "Active",
    },
    {
      id: "20",
      schoolName: "West Visayas State University",
      address: "Luna Street, La Paz, Iloilo City",
      status: "Lost",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Form fields
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [estimatedStudents, setEstimatedStudents] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Colors
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
  };

  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤",
  };

  const handleAddLead = () => {
    setShowAddLeadModal(true);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!schoolName.trim()) {
      newErrors.schoolName = "School Name is required";
    }

    if (!schoolAddress.trim()) {
      newErrors.schoolAddress = "School Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAttempt = () => {
    if (validateForm()) {
      // Show confirmation dialog
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSave = () => {
    // TODO: Implement save lead to backend
    console.log("Saving new lead...", {
      schoolName,
      schoolAddress,
      estimatedStudents,
      contactPerson,
      contactNumber,
      schoolEmail,
    });

    // Close both modals
    setShowConfirmModal(false);
    setShowAddLeadModal(false);

    // Clear form
    clearForm();
  };

  const clearForm = () => {
    setSchoolName("");
    setSchoolAddress("");
    setEstimatedStudents("");
    setContactPerson("");
    setContactNumber("");
    setSchoolEmail("");
    setErrors({});
  };

  const handleCancelAdd = () => {
    clearForm();
    setShowAddLeadModal(false);
  };

  const handleLogout = () => {
    router.dismissAll();
    router.replace("/LandingPage");
  };

  const handleMyProfile = () => {
    router.push("/ProfileScreen");
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

  // Reset to page 1 when search query or entries per page changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, entriesPerPage]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* BurgerMenu - Render at top level for proper z-index */}
      <BurgerMenu currentPage="Leads Management" />

      {/* Profile Dropdown - Render at top level for proper z-index */}
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
        {/* Empty space for burger button alignment */}
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
        {/* Page Title */}
        <View style={styles.titleSection}>
          <Text style={[styles.pageIcon, { color: colors.text }]}>📁</Text>
          <View>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              Leads Management
            </Text>
            <Text
              style={[styles.pageSubtitle, { color: colors.textSecondary }]}
            >
              Manage and track all your leads in one place.
            </Text>
          </View>
        </View>

        {/* Leads Card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          {/* Card Header */}
          <View
            style={[styles.cardHeader, { backgroundColor: colors.gradient1 }]}
          >
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.cardHeaderIcon}>☰</Text>
              <Text style={styles.cardHeaderTitle}>All Leads</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddLead}>
              <Text style={styles.addButtonText}>⊕ Add New Lead</Text>
            </TouchableOpacity>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
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

                {/* Dropdown Menu */}
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

          {/* Leads Cards */}
          <View style={styles.cardsContainer}>
            {paginatedLeads.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>📂</Text>
                <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
                  No Leads Found
                </Text>
                <Text
                  style={[
                    styles.emptyStateText,
                    { color: colors.textSecondary },
                  ]}
                >
                  No leads available in the system yet.{"\n"}
                  Click "Add New Lead" to create your first lead.
                </Text>
              </View>
            ) : (
              paginatedLeads.map((lead, index) => (
                <View
                  key={lead.id}
                  style={[
                    styles.leadCard,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  {/* Card Header */}
                  <View style={styles.leadCardHeader}>
                    <View style={styles.leadNumberBadge}>
                      <Text style={styles.leadNumberText}>
                        #{startIndex + index + 1}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(lead.status) },
                      ]}
                    >
                      <Text style={styles.statusText}>{lead.status}</Text>
                    </View>
                  </View>

                  {/* School Name */}
                  <Text style={[styles.leadSchoolName, { color: colors.text }]}>
                    {lead.schoolName}
                  </Text>

                  {/* Address */}
                  <View style={styles.leadInfoRow}>
                    <Text style={styles.leadInfoIcon}>📍</Text>
                    <Text
                      style={[
                        styles.leadInfoText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {lead.address}
                    </Text>
                  </View>

                  {/* Actions */}
                  <View style={styles.leadCardActions}>
                    <TouchableOpacity
                      style={[
                        styles.leadActionButton,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <Text style={styles.leadActionButtonText}>
                        View Details
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.leadActionButton,
                        styles.leadActionButtonSecondary,
                        { borderColor: colors.border },
                      ]}
                    >
                      <Text
                        style={[
                          styles.leadActionButtonTextSecondary,
                          { color: colors.text },
                        ]}
                      >
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Footer */}
          <View style={styles.tableFooter}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Showing {filteredLeads.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(endIndex, filteredLeads.length)} of{" "}
              {filteredLeads.length} entries
            </Text>
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  {
                    backgroundColor:
                      currentPage === 1 ? colors.border : colors.primary,
                  },
                ]}
                onPress={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                <Text
                  style={[
                    styles.paginationButtonText,
                    {
                      color:
                        currentPage === 1 ? colors.textSecondary : "#ffffff",
                    },
                  ]}
                >
                  ‹
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  {
                    backgroundColor:
                      currentPage === totalPages
                        ? colors.border
                        : colors.primary,
                  },
                ]}
                onPress={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                <Text
                  style={[
                    styles.paginationButtonText,
                    {
                      color:
                        currentPage === totalPages
                          ? colors.textSecondary
                          : "#ffffff",
                    },
                  ]}
                >
                  ›
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Lead Modal */}
      <Modal
        visible={showAddLeadModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddLeadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowAddLeadModal(false)}
          />
          <View
            style={[
              styles.addLeadModal,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Add New Lead
              </Text>
              <TouchableOpacity onPress={() => setShowAddLeadModal(false)}>
                <Text
                  style={[styles.closeIcon, { color: colors.textSecondary }]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              {/* School Information Section */}
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                School Information
              </Text>

              <View style={styles.formGroup}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  School Name <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: errors.schoolName
                        ? "#dc3545"
                        : colors.border,
                    },
                  ]}
                  placeholder="Enter School Name"
                  placeholderTextColor={colors.textSecondary}
                  value={schoolName}
                  onChangeText={(text) => {
                    setSchoolName(text);
                    if (errors.schoolName) {
                      setErrors({ ...errors, schoolName: "" });
                    }
                  }}
                />
                {errors.schoolName && (
                  <Text style={styles.errorText}>{errors.schoolName}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  School Address <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: errors.schoolAddress
                        ? "#dc3545"
                        : colors.border,
                    },
                  ]}
                  placeholder="Enter Address"
                  placeholderTextColor={colors.textSecondary}
                  value={schoolAddress}
                  onChangeText={(text) => {
                    setSchoolAddress(text);
                    if (errors.schoolAddress) {
                      setErrors({ ...errors, schoolAddress: "" });
                    }
                  }}
                />
                {errors.schoolAddress && (
                  <Text style={styles.errorText}>{errors.schoolAddress}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Estimated Number of Students
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="e.g., 500"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  value={estimatedStudents}
                  onChangeText={setEstimatedStudents}
                />
                <Text
                  style={[styles.fieldHint, { color: colors.textSecondary }]}
                >
                  Approximate student population
                </Text>
              </View>

              {/* Contact Information Section */}
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text, marginTop: 20 },
                ]}
              >
                Contact Information
              </Text>

              <View style={styles.formGroup}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Contact Person
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="Enter Contact Person Name"
                  placeholderTextColor={colors.textSecondary}
                  value={contactPerson}
                  onChangeText={setContactPerson}
                />
              </View>

              <View style={styles.formGroup}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Contact Number
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="Enter Contact Number"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="phone-pad"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                />
              </View>

              <View style={styles.formGroup}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  School Email
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="example@school.edu"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={schoolEmail}
                  onChangeText={setSchoolEmail}
                />
                <Text
                  style={[styles.fieldHint, { color: colors.textSecondary }]}
                >
                  Email will be used for sending lead information
                </Text>
              </View>
            </ScrollView>

            {/* Modal Footer Buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: colors.border }]}
                onPress={handleCancelAdd}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.primary }]}
                onPress={handleSaveAttempt}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.confirmOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowConfirmModal(false)}
          />
          <View
            style={[
              styles.confirmModal,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={[styles.confirmTitle, { color: colors.text }]}>
              Confirm Add Lead
            </Text>
            <Text
              style={[styles.confirmMessage, { color: colors.textSecondary }]}
            >
              Are you sure you want to add this lead?
            </Text>

            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={[
                  styles.confirmCancelButton,
                  { borderColor: colors.border },
                ]}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text
                  style={[styles.confirmCancelText, { color: colors.text }]}
                >
                  No, Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmSaveButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleConfirmSave}
              >
                <Text style={styles.confirmSaveText}>Yes, Add Lead</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "#ffc107";
    case "Contacted":
      return "#17a2b8";
    case "Converted":
      return "#28a745";
    case "Lost":
      return "#dc3545";
    default:
      return "#6c757d";
  }
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
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 16,
    gap: 12,
  },
  pageIcon: {
    fontSize: 28,
    marginTop: 30,
  },
  pageTitle: {
    marginTop: 30,
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
    color: "#ffffff",
    fontSize: 18,
  },
  cardHeaderTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  controlsContainer: {
    padding: 16,
    gap: 12,
  },
  entriesControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  controlLabel: {
    fontSize: 14,
  },
  dropdownWrapper: {
    position: "relative",
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
    top: 40,
    left: 0,
    minWidth: 80,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  leadCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  leadCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  leadNumberBadge: {
    backgroundColor: "#48cae4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  leadNumberText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  leadSchoolName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  leadInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  leadInfoIcon: {
    fontSize: 14,
  },
  leadInfoText: {
    fontSize: 13,
    flex: 1,
  },
  leadCardActions: {
    flexDirection: "row",
    gap: 8,
  },
  leadActionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  leadActionButtonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  leadActionButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  leadActionButtonTextSecondary: {
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
    padding: 16,
  },
  footerText: {
    fontSize: 12,
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 40,
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
  addLeadModal: {
    width: "100%",
    maxWidth: 500,
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: "300",
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: 450,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  required: {
    color: "#dc3545",
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  fieldHint: {
    fontSize: 11,
    marginTop: 4,
    fontStyle: "italic",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
  },
  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  confirmModal: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  confirmMessage: {
    fontSize: 15,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 22,
  },
  confirmButtons: {
    flexDirection: "row",
    gap: 12,
  },
  confirmCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  confirmCancelText: {
    fontSize: 14,
    fontWeight: "600",
  },
  confirmSaveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmSaveText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default LeadsManagementScreen;
