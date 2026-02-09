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

type TabType = "account" | "user" | "bank";

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("account");

  // Picker visibility states
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showSuffixPicker, setShowSuffixPicker] = useState(false);

  // Form states
  const [username, setUsername] = useState("ranzel jude egos6");
  const [password, setPassword] = useState("");

  // User Details states
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [gender, setGender] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Bank Details states
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  // Dynamic colors
  const colors = {
    background: isDarkMode ? "#1a1a1a" : "#f8f9fa",
    cardBackground: isDarkMode ? "#2d2d2d" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    textSecondary: isDarkMode ? "#b0b0b0" : "#6c757d",
    border: isDarkMode ? "#404040" : "#e9ecef",
    inputBg: isDarkMode ? "#3a3a3a" : "#f8f9fa",
    primary: "#6c5ce7",
  };

  const handleSaveUsername = () => {
    console.log("Saving username:", username);
    // TODO: Connect to backend
  };

  const handleUpdatePassword = () => {
    console.log("Updating password");
    // TODO: Show password update modal or navigate to password screen
  };

  const handleSaveUserDetails = () => {
    console.log("Saving user details");
    // TODO: Connect to backend
  };

  const handleSaveBankDetails = () => {
    console.log("Saving bank details");
    // TODO: Connect to backend
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* BurgerMenu - Render at top level for proper z-index */}
      <BurgerMenu currentPage="My Profile" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        {/* Empty space for burger button alignment */}
        <View style={styles.burgerButtonSpace} />

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          My Profile
        </Text>
      </View>

      {/* Tabs */}
      <View
        style={[
          styles.tabsContainer,
          { backgroundColor: colors.cardBackground },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "account" && { borderBottomColor: colors.primary },
          ]}
          onPress={() => setActiveTab("account")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "account"
                    ? colors.primary
                    : colors.textSecondary,
              },
            ]}
          >
            Account Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "user" && { borderBottomColor: colors.primary },
          ]}
          onPress={() => setActiveTab("user")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "user" ? colors.primary : colors.textSecondary,
              },
            ]}
          >
            User Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "bank" && { borderBottomColor: colors.primary },
          ]}
          onPress={() => setActiveTab("bank")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "bank" ? colors.primary : colors.textSecondary,
              },
            ]}
          >
            Bank Details
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Account Settings */}
        {activeTab === "account" && (
          <View style={styles.tabContent}>
            <View
              style={[styles.card, { backgroundColor: colors.cardBackground }]}
            >
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleUpdatePassword}
              >
                <Text style={styles.primaryButtonText}>Update Username</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: colors.border }]}
                onPress={handleUpdatePassword}
              >
                <Text
                  style={[styles.secondaryButtonText, { color: colors.text }]}
                >
                  Update Password
                </Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <View style={styles.fullWidth}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Username
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="ranzel jude egos6"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.updateButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleSaveUsername}
              >
                <Text style={styles.updateButtonText}>Save Username</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* User Details */}
        {activeTab === "user" && (
          <View style={styles.tabContent}>
            <View
              style={[styles.card, { backgroundColor: colors.cardBackground }]}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Update Your Profile
              </Text>

              {/* Name Fields Row */}
              <View style={styles.rowDouble}>
                <View style={styles.column}>
                  <Text
                    style={[styles.fieldLabel, { color: colors.textSecondary }]}
                  >
                    First Name
                  </Text>
                  <TextInput
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.inputBg,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Ranzel Jude"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                <View style={styles.column}>
                  <Text
                    style={[styles.fieldLabel, { color: colors.textSecondary }]}
                  >
                    Middle Name
                  </Text>
                  <TextInput
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.inputBg,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    value={middleName}
                    onChangeText={setMiddleName}
                    placeholder="Laggui"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.rowDouble}>
                <View style={styles.column}>
                  <Text
                    style={[styles.fieldLabel, { color: colors.textSecondary }]}
                  >
                    Last Name
                  </Text>
                  <TextInput
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.inputBg,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Egos"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                <View style={styles.column}>
                  <Text
                    style={[styles.fieldLabel, { color: colors.textSecondary }]}
                  >
                    Suffix
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.inputField,
                      styles.dropdownField,
                      {
                        backgroundColor: colors.inputBg,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => setShowSuffixPicker(!showSuffixPicker)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        { color: suffix ? colors.text : colors.textSecondary },
                      ]}
                    >
                      {suffix || "Select Suffix"}
                    </Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>

                  {showSuffixPicker && (
                    <View
                      style={[
                        styles.pickerDropdown,
                        styles.scrollablePicker,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <ScrollView
                        style={styles.pickerScroll}
                        nestedScrollEnabled
                      >
                        {[
                          "Sr.",
                          "Jr.",
                          "I",
                          "II",
                          "III",
                          "IV",
                          "V",
                          "VI",
                          "VII",
                          "VIII",
                          "IX",
                          "X",
                        ].map((option) => (
                          <TouchableOpacity
                            key={option}
                            style={[
                              styles.pickerOption,
                              suffix === option && {
                                backgroundColor: colors.primary,
                              },
                            ]}
                            onPress={() => {
                              setSuffix(option);
                              setShowSuffixPicker(false);
                            }}
                          >
                            <Text
                              style={[
                                styles.pickerOptionText,
                                {
                                  color:
                                    suffix === option ? "#ffffff" : colors.text,
                                },
                              ]}
                            >
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>

              {/* Gender Field */}
              <View style={styles.fullWidth}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Gender
                </Text>
                <TouchableOpacity
                  style={[
                    styles.inputField,
                    styles.dropdownField,
                    {
                      backgroundColor: colors.inputBg,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => setShowGenderPicker(!showGenderPicker)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      { color: gender ? colors.text : colors.textSecondary },
                    ]}
                  >
                    {gender || "Select Gender"}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>

                {showGenderPicker && (
                  <View
                    style={[
                      styles.pickerDropdown,
                      {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.pickerOption,
                        gender === "Male" && {
                          backgroundColor: colors.primary,
                        },
                      ]}
                      onPress={() => {
                        setGender("Male");
                        setShowGenderPicker(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.pickerOptionText,
                          {
                            color: gender === "Male" ? "#ffffff" : colors.text,
                          },
                        ]}
                      >
                        Male
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.pickerOption,
                        gender === "Female" && {
                          backgroundColor: colors.primary,
                        },
                      ]}
                      onPress={() => {
                        setGender("Female");
                        setShowGenderPicker(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.pickerOptionText,
                          {
                            color:
                              gender === "Female" ? "#ffffff" : colors.text,
                          },
                        ]}
                      >
                        Female
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Address Information Section */}
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text, marginTop: 24 },
                ]}
              >
                Address Information
              </Text>

              <View style={styles.fullWidth}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Current Address
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={currentAddress}
                  onChangeText={setCurrentAddress}
                  placeholder="Purok 5, Pulo, San Isidro, Nueva Ecija 3106"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.fullWidth}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Permanent Address
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={permanentAddress}
                  onChangeText={setPermanentAddress}
                  placeholder="Purok 5, Pulo, San Isidro, Nueva Ecija 3106"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              {/* Contact Information Section */}
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text, marginTop: 24 },
                ]}
              >
                Contact Information
              </Text>

              <View style={styles.rowDouble}>
                <View style={styles.column}>
                  <Text
                    style={[styles.fieldLabel, { color: colors.textSecondary }]}
                  >
                    Email
                  </Text>
                  <TextInput
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.inputBg,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="ranzeljude13@gmail.com"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.column}>
                  <Text
                    style={[styles.fieldLabel, { color: colors.textSecondary }]}
                  >
                    Phone
                  </Text>
                  <TextInput
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.inputBg,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+639164011037"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Upload Documents Section */}
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text, marginTop: 24 },
                ]}
              >
                Upload Documents
              </Text>

              <View style={styles.documentsContainer}>
                <View style={styles.documentField}>
                  <Text
                    style={[styles.fieldLabel, { color: colors.textSecondary }]}
                  >
                    Proof of Billing
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.fileButton,
                      {
                        borderColor: colors.border,
                        backgroundColor: colors.inputBg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.fileButtonText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Choose File
                    </Text>
                    <Text
                      style={[
                        styles.fileStatusText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      No file chosen
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewFileLink}>
                    <Text
                      style={[
                        styles.viewFileLinkText,
                        { color: colors.primary },
                      ]}
                    >
                      View Uploaded File
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.documentField}>
                  <Text
                    style={[styles.fieldLabel, { color: colors.textSecondary }]}
                  >
                    Valid ID
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.fileButton,
                      {
                        borderColor: colors.border,
                        backgroundColor: colors.inputBg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.fileButtonText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Choose File
                    </Text>
                    <Text
                      style={[
                        styles.fileStatusText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      No file chosen
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewFileLink}>
                    <Text
                      style={[
                        styles.viewFileLinkText,
                        { color: colors.primary },
                      ]}
                    >
                      View Uploaded File
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.documentField}>
                  <Text
                    style={[styles.fieldLabel, { color: colors.textSecondary }]}
                  >
                    Signature
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.fileButton,
                      {
                        borderColor: colors.border,
                        backgroundColor: colors.inputBg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.fileButtonText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Choose File
                    </Text>
                    <Text
                      style={[
                        styles.fileStatusText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      No file chosen
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.signatureBox,
                      { borderColor: colors.border },
                    ]}
                  >
                    <Text
                      style={[
                        styles.signaturePlaceholder,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Signature
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.updateButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleSaveUserDetails}
              >
                <Text style={styles.updateButtonText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Bank Details */}
        {activeTab === "bank" && (
          <View style={styles.tabContent}>
            <View
              style={[styles.card, { backgroundColor: colors.cardBackground }]}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Bank Details
              </Text>

              <View style={styles.fullWidth}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Bank Name
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={bankName}
                  onChangeText={setBankName}
                  placeholder="EastWest Bank"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.fullWidth}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Account Name
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={accountName}
                  onChangeText={setAccountName}
                  placeholder="ranzelranzel"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.fullWidth}>
                <Text
                  style={[styles.fieldLabel, { color: colors.textSecondary }]}
                >
                  Account Number
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  placeholder="2147483647"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="number-pad"
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.updateButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleSaveBankDetails}
              >
                <Text style={styles.updateButtonText}>Update Bank Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            © 2026, made with ❤️ by Affirm Technology
          </Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
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
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  fullWidth: {
    marginBottom: 16,
  },
  rowDouble: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  column: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputField: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 14,
    borderWidth: 1,
  },
  dropdownField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 14,
  },
  dropdownArrow: {
    fontSize: 10,
    color: "#999",
  },
  pickerDropdown: {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: 150,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollablePicker: {
    maxHeight: 200,
  },
  pickerScroll: {
    maxHeight: 200,
  },
  pickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  pickerOptionText: {
    fontSize: 14,
  },
  documentsContainer: {
    gap: 16,
  },
  documentField: {
    marginBottom: 8,
  },
  fileButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  fileButtonText: {
    fontSize: 13,
  },
  fileStatusText: {
    fontSize: 11,
  },
  viewFileLink: {
    marginTop: 6,
  },
  viewFileLinkText: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  signatureBox: {
    marginTop: 8,
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  signaturePlaceholder: {
    fontSize: 13,
    fontStyle: "italic",
  },
  updateButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  updateButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  divider: {
    height: 16,
  },
  footer: {
    padding: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 11,
  },
});

export default ProfileScreen;
