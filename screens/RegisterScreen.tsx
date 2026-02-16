import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import SignatureCanvas from "react-native-signature-canvas";

export default function RegisterScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Personal Information
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("None");
  const [gender, setGender] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");

  // Step 2: Contact Info
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentProvince, setPermanentProvince] = useState("");
  const [permanentZipCode, setPermanentZipCode] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentProvince, setCurrentProvince] = useState("");
  const [currentZipCode, setCurrentZipCode] = useState("");
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [referenceName, setReferenceName] = useState("");
  const [referenceContact, setReferenceContact] = useState("");

  // Step 3: Bank Details
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [gcashName, setGcashName] = useState("");
  const [gcashNumber, setGcashNumber] = useState("");

  // Step 4: Documents
  const [validId, setValidId] = useState("");
  const [proofOfAddress, setProofOfAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [signature, setSignature] = useState("");
  const [termsScrolled, setTermsScrolled] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Signature ref and mode
  const signatureRef = useRef<any>(null);
  const [isSigningMode, setIsSigningMode] = useState(false);
  const [tempSignature, setTempSignature] = useState("");

  // Touched state tracking
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});

  // Picker modal state
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState<
    "month" | "day" | "year" | "bank"
  >("month");
  const [pickerOptions, setPickerOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const markFieldAsTouched = (fieldName: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  // Helper functions for validation
  const isFieldEmpty = (value: string) => {
    return !value || value.trim() === "";
  };

  const shouldShowError = (fieldName: string, value: string) => {
    return touchedFields[fieldName] && isFieldEmpty(value);
  };

  const handleSameAsPermanent = (value: boolean) => {
    setSameAsPermanent(value);
    if (value) {
      // Copy permanent address to current address
      setCurrentAddress(permanentAddress);
      setCurrentCity(permanentCity);
      setCurrentProvince(permanentProvince);
      setCurrentZipCode(permanentZipCode);
    } else {
      // Clear current address fields
      setCurrentAddress("");
      setCurrentCity("");
      setCurrentProvince("");
      setCurrentZipCode("");
    }
  };

  // Date picker helpers
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getDaysInMonth = (month: string, year: string) => {
    if (!month) return 31;
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (monthNum === 2 && year && isLeapYear(yearNum)) {
      return 29;
    }

    return daysPerMonth[monthNum - 1] || 31;
  };

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const getDays = () => {
    const maxDays = getDaysInMonth(birthMonth, birthYear);
    const days = [];
    for (let i = 1; i <= maxDays; i++) {
      days.push({ value: String(i), label: String(i) });
    }
    return days;
  };

  const getYears = () => {
    const currentYear = 2010;
    const startYear = 1930;
    const years = [];
    for (let i = currentYear; i >= startYear; i--) {
      years.push({ value: String(i), label: String(i) });
    }
    return years;
  };

  const banks = [
    { value: "BDO Unibank", label: "BDO Unibank" },
    {
      value: "Bank of the Philippine Islands (BPI)",
      label: "Bank of the Philippine Islands (BPI)",
    },
    { value: "Metrobank", label: "Metrobank" },
    { value: "Landbank", label: "Landbank" },
    {
      value: "Philippine National Bank (PNB)",
      label: "Philippine National Bank (PNB)",
    },
    { value: "UnionBank", label: "UnionBank" },
    { value: "Security Bank", label: "Security Bank" },
    { value: "RCBC", label: "RCBC" },
    { value: "Chinabank", label: "Chinabank" },
    { value: "EastWest Bank", label: "EastWest Bank" },
    { value: "Others", label: "Others" },
  ];

  const handleMonthChange = (month: string) => {
    setBirthMonth(month);
    // Reset day if it exceeds the new month's max days
    const maxDays = getDaysInMonth(month, birthYear);
    if (birthDay && parseInt(birthDay) > maxDays) {
      setBirthDay("");
    }
  };

  const handleYearChange = (year: string) => {
    setBirthYear(year);
    // Reset day if it's Feb 29 and not a leap year
    if (
      birthMonth === "2" &&
      birthDay === "29" &&
      !isLeapYear(parseInt(year))
    ) {
      setBirthDay("");
    }
  };

  const showMonthPicker = () => {
    setPickerType("month");
    setPickerOptions(months);
    setPickerVisible(true);
  };

  const showDayPicker = () => {
    if (!birthMonth) {
      alert("Please select a month first");
      return;
    }
    setPickerType("day");
    setPickerOptions(getDays());
    setPickerVisible(true);
  };

  const showYearPicker = () => {
    setPickerType("year");
    setPickerOptions(getYears());
    setPickerVisible(true);
  };

  const showBankPicker = () => {
    setPickerType("bank");
    setPickerOptions(banks);
    setPickerVisible(true);
  };

  // Image picker functions
  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaStatus !== "granted") {
      Alert.alert(
        "Permissions Required",
        "Please grant camera and photo library permissions to upload documents.",
      );
      return false;
    }
    return true;
  };

  const pickImageFromCamera = async (
    type: "profile" | "validId" | "proofOfAddress",
  ) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === "profile" ? [1, 1] : [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      if (type === "profile") setProfilePhoto(uri);
      else if (type === "validId") setValidId(uri);
      else if (type === "proofOfAddress") setProofOfAddress(uri);
    }
  };

  const pickImageFromGallery = async (
    type: "profile" | "validId" | "proofOfAddress",
  ) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === "profile" ? [1, 1] : [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      if (type === "profile") setProfilePhoto(uri);
      else if (type === "validId") setValidId(uri);
      else if (type === "proofOfAddress") setProofOfAddress(uri);
    }
  };

  const showImagePickerOptions = (
    type: "profile" | "validId" | "proofOfAddress",
  ) => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Take Photo", "Choose from Library"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            pickImageFromCamera(type);
          } else if (buttonIndex === 2) {
            pickImageFromGallery(type);
          }
        },
      );
    } else {
      Alert.alert("Upload Photo", "Choose an option", [
        { text: "Cancel", style: "cancel" },
        { text: "Take Photo", onPress: () => pickImageFromCamera(type) },
        {
          text: "Choose from Library",
          onPress: () => pickImageFromGallery(type),
        },
      ]);
    }
  };

  // Signature functions
  const handleSignature = (sig: string) => {
    setTempSignature(sig);
  };

  const handleSignatureEnd = () => {
    signatureRef.current?.readSignature();
  };

  const startSigning = () => {
    setIsSigningMode(true);
  };

  const confirmSignature = () => {
    if (tempSignature) {
      setSignature(tempSignature);
      setIsSigningMode(false);
      Alert.alert(
        "Signature Saved ✓",
        "Your signature has been captured successfully.",
        [{ text: "OK" }],
      );
    } else {
      Alert.alert(
        "No Signature",
        "Please draw your signature before confirming.",
        [{ text: "OK" }],
      );
    }
  };

  const cancelSigning = () => {
    Alert.alert(
      "Cancel Signature?",
      "Are you sure you want to cancel? Your signature will not be saved.",
      [
        { text: "Continue Signing", style: "cancel" },
        {
          text: "Cancel",
          style: "destructive",
          onPress: () => {
            clearSignature();
            setIsSigningMode(false);
          },
        },
      ],
    );
  };

  const clearSignature = () => {
    signatureRef.current?.clearSignature();
    setTempSignature("");
    setSignature("");
  };

  const editSignature = () => {
    setIsSigningMode(true);
    setTempSignature("");
  };

  // Terms scroll handler
  const handleTermsScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isScrolledToBottom && !termsScrolled) {
      setTermsScrolled(true);
      Alert.alert(
        "Terms Read ✓",
        "You can now check the agreement box to proceed.",
        [{ text: "OK" }],
      );
    }
  };

  const handlePickerSelect = (value: string) => {
    if (pickerType === "month") {
      markFieldAsTouched("birthMonth");
      handleMonthChange(value);
    } else if (pickerType === "day") {
      markFieldAsTouched("birthDay");
      setBirthDay(value);
    } else if (pickerType === "year") {
      markFieldAsTouched("birthYear");
      handleYearChange(value);
    } else if (pickerType === "bank") {
      markFieldAsTouched("bankName");
      setBankName(value);
    }
    setPickerVisible(false);
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !gender ||
        !birthMonth ||
        !birthDay ||
        !birthYear
      ) {
        alert(
          "Please fill in all required fields:\n• First Name\n• Last Name\n• Gender\n• Birthdate",
        );
        return;
      }
      // Validate birthdate
      const month = parseInt(birthMonth);
      const day = parseInt(birthDay);
      const year = parseInt(birthYear);

      if (month < 1 || month > 12) {
        alert("Please enter a valid month (1-12)");
        return;
      }
      if (day < 1 || day > 31) {
        alert("Please enter a valid day (1-31)");
        return;
      }
      if (year < 1900 || year > 2024) {
        alert("Please enter a valid year");
        return;
      }
    }

    if (currentStep === 2) {
      // Check permanent address fields
      if (
        !email.trim() ||
        !phone.trim() ||
        !permanentAddress.trim() ||
        !permanentCity.trim() ||
        !permanentProvince.trim() ||
        !permanentZipCode.trim() ||
        !referenceName.trim() ||
        !referenceContact.trim()
      ) {
        alert(
          "Please fill in all required fields:\n• Email Address\n• Phone Number\n• Permanent Address\n• Reference Person Name\n• Reference Contact Number",
        );
        return;
      }

      // Check current address fields (only if not same as permanent)
      if (
        !sameAsPermanent &&
        (!currentAddress.trim() ||
          !currentCity.trim() ||
          !currentProvince.trim() ||
          !currentZipCode.trim())
      ) {
        alert(
          'Please fill in all current address fields or select "Same as Permanent Address"',
        );
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }
    }

    if (currentStep === 3) {
      if (
        !bankName.trim() ||
        !accountNumber.trim() ||
        !accountName.trim() ||
        !gcashName.trim() ||
        !gcashNumber.trim()
      ) {
        alert(
          "Please fill in all required fields:\n• Bank Name\n• Account Number\n• Account Name\n• GCash Name\n• GCash Number",
        );
        return;
      }

      // Validate GCash number (11 digits)
      if (gcashNumber.length !== 11 || !/^\d+$/.test(gcashNumber)) {
        alert("Please enter a valid 11-digit GCash mobile number");
        return;
      }
    }

    if (currentStep === 4) {
      if (!profilePhoto || !validId || !proofOfAddress) {
        alert(
          "Please upload all required documents:\n• Profile Photo\n• Valid ID\n• Proof of Billing",
        );
        return;
      }

      if (!signature) {
        alert("Please provide your digital signature");
        return;
      }

      if (!termsAgreed) {
        alert("Please read and agree to the Terms and Conditions to proceed");
        return;
      }
    }

    // All validations passed, proceed to next step or submit
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleRegister();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = () => {
    console.log("Registration complete!");
    alert("Registration submitted successfully!");
    // TODO: Send data to backend
  };

  const handleBackPress = () => {
    if (currentStep === 1) {
      // First step: go back to login page
      router.push("/login");
    } else {
      // Other steps: go back to previous step
      prevStep();
    }
  };

  const steps = [
    { number: 1, label: "Personal Details" },
    { number: 2, label: "Contact Info" },
    { number: 3, label: "Bank Details" },
    { number: 4, label: "Documents" },
  ];

  const suffixes = ["None", "Jr.", "Sr.", "II", "III"];
  const genders = ["Male", "Female", "Other"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isSigningMode}
        >
          {/* Registration Card */}
          <View style={styles.card}>
            {/* Header with Back Button */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.headerBackButton}
                onPress={handleBackPress}
              >
                <Text style={styles.headerBackArrow}>←</Text>
                <Text style={styles.headerBackText}>Back</Text>
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                <Text style={styles.title}>Agent Registration</Text>
                <Text style={styles.subtitle}>
                  Join KiQbaQ and start your journey to success
                </Text>
              </View>
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              {steps.map((step, index) => (
                <View key={step.number} style={styles.stepWrapper}>
                  {/* Circle */}
                  <View
                    style={[
                      styles.stepCircle,
                      currentStep >= step.number && styles.stepCircleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepNumber,
                        currentStep >= step.number && styles.stepNumberActive,
                      ]}
                    >
                      {step.number}
                    </Text>
                  </View>

                  {/* Line connector (except last step) */}
                  {index < steps.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        currentStep > step.number && styles.stepLineActive,
                      ]}
                    />
                  )}

                  {/* Label below */}
                  <Text
                    style={[
                      styles.stepLabel,
                      currentStep >= step.number && styles.stepLabelActive,
                    ]}
                  >
                    {step.label}
                  </Text>
                </View>
              ))}
            </View>

            {/* Form Content */}
            <View style={styles.formContainer}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>👤</Text>
                    <Text style={styles.sectionTitle}>
                      Personal Information
                    </Text>
                  </View>

                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Why we need this: </Text>
                    <Text style={styles.infoText}>
                      We require your personal details to verify your identity
                      and create your agent profile in our system.
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>First Name *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError("firstName", firstName) &&
                          styles.inputError,
                      ]}
                      value={firstName}
                      onChangeText={setFirstName}
                      onBlur={() => markFieldAsTouched("firstName")}
                      placeholder="First Name"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Middle Name</Text>
                    <TextInput
                      style={styles.input}
                      value={middleName}
                      onChangeText={setMiddleName}
                      placeholder="Middle Name"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Last Name *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError("lastName", lastName) &&
                          styles.inputError,
                      ]}
                      value={lastName}
                      onChangeText={setLastName}
                      onBlur={() => markFieldAsTouched("lastName")}
                      placeholder="Last Name"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Suffix</Text>
                    <View style={styles.selectContainer}>
                      {suffixes.map((s) => (
                        <TouchableOpacity
                          key={s}
                          style={[
                            styles.selectButton,
                            suffix === s && styles.selectButtonActive,
                          ]}
                          onPress={() => setSuffix(s)}
                        >
                          <Text
                            style={[
                              styles.selectButtonText,
                              suffix === s && styles.selectButtonTextActive,
                            ]}
                          >
                            {s}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Gender *</Text>
                    <View style={styles.selectContainer}>
                      {genders.map((g) => (
                        <TouchableOpacity
                          key={g}
                          style={[
                            styles.selectButton,
                            gender === g && styles.selectButtonActive,
                            touchedFields["gender"] &&
                              !gender &&
                              styles.selectButtonError,
                          ]}
                          onPress={() => {
                            setGender(g);
                            markFieldAsTouched("gender");
                          }}
                        >
                          <Text
                            style={[
                              styles.selectButtonText,
                              gender === g && styles.selectButtonTextActive,
                            ]}
                          >
                            {g}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Birthdate *</Text>
                    <View style={styles.row}>
                      {/* Month Dropdown */}
                      <View style={[styles.flex2, styles.dropdownWrapper]}>
                        <Text style={styles.dropdownLabel}>Month</Text>
                        <View style={styles.dropdownContainer}>
                          <TouchableOpacity
                            style={[
                              styles.dropdown,
                              shouldShowError("birthMonth", birthMonth) &&
                                styles.inputError,
                            ]}
                            onPress={showMonthPicker}
                          >
                            <Text style={styles.dropdownText}>
                              {birthMonth
                                ? months.find((m) => m.value === birthMonth)
                                    ?.label
                                : "Select Month"}
                            </Text>
                            <Text style={styles.dropdownArrow}>▼</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.spacer} />

                      {/* Day Dropdown */}
                      <View style={[styles.flex1, styles.dropdownWrapper]}>
                        <Text style={styles.dropdownLabel}>Day</Text>
                        <View style={styles.dropdownContainer}>
                          <TouchableOpacity
                            style={[
                              styles.dropdown,
                              shouldShowError("birthDay", birthDay) &&
                                styles.inputError,
                              !birthMonth && styles.dropdownDisabled,
                            ]}
                            onPress={showDayPicker}
                          >
                            <Text
                              style={[
                                styles.dropdownText,
                                !birthMonth && styles.dropdownTextDisabled,
                              ]}
                            >
                              {birthDay || "Day"}
                            </Text>
                            <Text style={styles.dropdownArrow}>▼</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.spacer} />

                      {/* Year Dropdown */}
                      <View style={[styles.flex1, styles.dropdownWrapper]}>
                        <Text style={styles.dropdownLabel}>Year</Text>
                        <View style={styles.dropdownContainer}>
                          <TouchableOpacity
                            style={[
                              styles.dropdown,
                              shouldShowError("birthYear", birthYear) &&
                                styles.inputError,
                            ]}
                            onPress={showYearPicker}
                          >
                            <Text style={styles.dropdownText}>
                              {birthYear || "Year"}
                            </Text>
                            <Text style={styles.dropdownArrow}>▼</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {/* Step 2: Contact Info */}
              {currentStep === 2 && (
                <View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>📧</Text>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email Address *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError("email", email) && styles.inputError,
                      ]}
                      value={email}
                      onChangeText={setEmail}
                      onBlur={() => markFieldAsTouched("email")}
                      placeholder="your.email@example.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError("phone", phone) && styles.inputError,
                      ]}
                      value={phone}
                      onChangeText={setPhone}
                      onBlur={() => markFieldAsTouched("phone")}
                      placeholder="+63 XXX XXX XXXX"
                      keyboardType="phone-pad"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Reference Person Name *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError("referenceName", referenceName) &&
                          styles.inputError,
                      ]}
                      value={referenceName}
                      onChangeText={setReferenceName}
                      onBlur={() => markFieldAsTouched("referenceName")}
                      placeholder="Full name of reference person"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Reference Contact Number *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError("referenceContact", referenceContact) &&
                          styles.inputError,
                      ]}
                      value={referenceContact}
                      onChangeText={setReferenceContact}
                      onBlur={() => markFieldAsTouched("referenceContact")}
                      placeholder="+63 XXX XXX XXXX"
                      keyboardType="phone-pad"
                    />
                  </View>

                  {/* Permanent Address Section */}
                  <View style={styles.addressSection}>
                    <Text style={styles.addressSectionTitle}>
                      Permanent Address
                    </Text>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Street Address *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError(
                            "permanentAddress",
                            permanentAddress,
                          ) && styles.inputError,
                        ]}
                        value={permanentAddress}
                        onChangeText={setPermanentAddress}
                        onBlur={() => markFieldAsTouched("permanentAddress")}
                        placeholder="House No., Street Name"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>City *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError("permanentCity", permanentCity) &&
                            styles.inputError,
                        ]}
                        value={permanentCity}
                        onChangeText={setPermanentCity}
                        onBlur={() => markFieldAsTouched("permanentCity")}
                        placeholder="City"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Province *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError(
                            "permanentProvince",
                            permanentProvince,
                          ) && styles.inputError,
                        ]}
                        value={permanentProvince}
                        onChangeText={setPermanentProvince}
                        onBlur={() => markFieldAsTouched("permanentProvince")}
                        placeholder="Province"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Zip Code *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError(
                            "permanentZipCode",
                            permanentZipCode,
                          ) && styles.inputError,
                        ]}
                        value={permanentZipCode}
                        onChangeText={setPermanentZipCode}
                        onBlur={() => markFieldAsTouched("permanentZipCode")}
                        placeholder="XXXX"
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>

                  {/* Current Address Section */}
                  <View style={styles.addressSection}>
                    <Text style={styles.addressSectionTitle}>
                      Current Address
                    </Text>

                    {/* Checkbox for Same as Permanent */}
                    <TouchableOpacity
                      style={styles.checkboxContainer}
                      onPress={() => handleSameAsPermanent(!sameAsPermanent)}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          sameAsPermanent && styles.checkboxChecked,
                        ]}
                      >
                        {sameAsPermanent && (
                          <Text style={styles.checkboxTick}>✓</Text>
                        )}
                      </View>
                      <Text style={styles.checkboxLabel}>
                        Same as Permanent Address
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Street Address *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError("currentAddress", currentAddress) &&
                            !sameAsPermanent &&
                            styles.inputError,
                          sameAsPermanent && styles.inputDisabled,
                        ]}
                        value={currentAddress}
                        onChangeText={setCurrentAddress}
                        onBlur={() => markFieldAsTouched("currentAddress")}
                        placeholder="House No., Street Name"
                        editable={!sameAsPermanent}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>City *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError("currentCity", currentCity) &&
                            !sameAsPermanent &&
                            styles.inputError,
                          sameAsPermanent && styles.inputDisabled,
                        ]}
                        value={currentCity}
                        onChangeText={setCurrentCity}
                        onBlur={() => markFieldAsTouched("currentCity")}
                        placeholder="City"
                        editable={!sameAsPermanent}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Province *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError("currentProvince", currentProvince) &&
                            !sameAsPermanent &&
                            styles.inputError,
                          sameAsPermanent && styles.inputDisabled,
                        ]}
                        value={currentProvince}
                        onChangeText={setCurrentProvince}
                        onBlur={() => markFieldAsTouched("currentProvince")}
                        placeholder="Province"
                        editable={!sameAsPermanent}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Zip Code *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError("currentZipCode", currentZipCode) &&
                            !sameAsPermanent &&
                            styles.inputError,
                          sameAsPermanent && styles.inputDisabled,
                        ]}
                        value={currentZipCode}
                        onChangeText={setCurrentZipCode}
                        onBlur={() => markFieldAsTouched("currentZipCode")}
                        placeholder="XXXX"
                        keyboardType="number-pad"
                        editable={!sameAsPermanent}
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* Step 3: Bank Details */}
              {currentStep === 3 && (
                <View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>🏦</Text>
                    <Text style={styles.sectionTitle}>Payment Information</Text>
                  </View>

                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Why we need this: </Text>
                    <Text style={styles.infoText}>
                      Your payment details are required to process your
                      commission payments, incentives, and other earnings. This
                      ensures you receive your payments directly and securely.
                    </Text>
                  </View>

                  {/* Bank Account Section */}
                  <View style={styles.paymentSection}>
                    <Text style={styles.paymentSectionTitle}>
                      🏦 Bank Account
                    </Text>

                    {/* Bank Name Dropdown */}
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Bank Name *</Text>
                      <TouchableOpacity
                        style={[
                          styles.dropdown,
                          shouldShowError("bankName", bankName) &&
                            styles.inputError,
                        ]}
                        onPress={showBankPicker}
                      >
                        <Text
                          style={[
                            styles.dropdownText,
                            !bankName && styles.dropdownPlaceholder,
                          ]}
                        >
                          {bankName || "Select Bank"}
                        </Text>
                        <Text style={styles.dropdownArrow}>▼</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Account Name *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError("accountName", accountName) &&
                            styles.inputError,
                        ]}
                        value={accountName}
                        onChangeText={setAccountName}
                        onBlur={() => markFieldAsTouched("accountName")}
                        placeholder="Name as it appears on account"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Account Number *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError("accountNumber", accountNumber) &&
                            styles.inputError,
                        ]}
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                        onBlur={() => markFieldAsTouched("accountNumber")}
                        placeholder="XXXX-XXXX-XXXX"
                        keyboardType="number-pad"
                      />
                      <Text style={styles.inputHint}>
                        Double-check your account number to avoid payment delays
                      </Text>
                    </View>
                  </View>

                  {/* GCash Account Section */}
                  <View style={styles.paymentSection}>
                    <Text style={styles.paymentSectionTitle}>
                      📱 GCash Account
                    </Text>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>GCash Name *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError("gcashName", gcashName) &&
                            styles.inputError,
                        ]}
                        value={gcashName}
                        onChangeText={setGcashName}
                        onBlur={() => markFieldAsTouched("gcashName")}
                        placeholder="Full name on GCash account"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>GCash Number *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          shouldShowError("gcashNumber", gcashNumber) &&
                            styles.inputError,
                        ]}
                        value={gcashNumber}
                        onChangeText={setGcashNumber}
                        onBlur={() => markFieldAsTouched("gcashNumber")}
                        placeholder="09XXXXXXXXX"
                        keyboardType="phone-pad"
                        maxLength={11}
                      />
                      <Text style={styles.inputHint}>
                        11-digit mobile number
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Step 4: Documents */}
              {currentStep === 4 && (
                <View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>📄</Text>
                    <Text style={styles.sectionTitle}>Document Uploads</Text>
                  </View>

                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Why we need this: </Text>
                    <Text style={styles.infoText}>
                      These documents are required for account verification and
                      compliance purposes. Your valid ID confirms your identity,
                      the signature file will be used for digital contracts, and
                      proof of billing verifies your current address. All
                      documents are stored securely and handled in accordance
                      with data privacy regulations.
                    </Text>
                  </View>

                  {/* Profile Picture */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Profile Picture / Selfie *</Text>
                    <TouchableOpacity
                      style={styles.uploadBox}
                      onPress={() => showImagePickerOptions("profile")}
                    >
                      {profilePhoto ? (
                        <View style={styles.uploadBoxContent}>
                          <Text style={styles.uploadBoxIcon}>✓</Text>
                          <Text style={styles.uploadBoxTextSuccess}>
                            Photo uploaded
                          </Text>
                          <Text style={styles.uploadBoxSubtext}>
                            Tap to change
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.uploadBoxContent}>
                          <Text style={styles.uploadBoxIcon}>👤</Text>
                          <Text style={styles.uploadBoxText}>
                            Upload Your Photo
                          </Text>
                          <Text style={styles.uploadBoxSubtext}>
                            Click to browse or drag and drop
                          </Text>
                          <Text style={styles.uploadBoxHint}>
                            Clear photo of your face for profile identification
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Valid ID */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Valid ID *</Text>
                    <TouchableOpacity
                      style={styles.uploadBox}
                      onPress={() => showImagePickerOptions("validId")}
                    >
                      {validId ? (
                        <View style={styles.uploadBoxContent}>
                          <Text style={styles.uploadBoxIcon}>✓</Text>
                          <Text style={styles.uploadBoxTextSuccess}>
                            ID uploaded
                          </Text>
                          <Text style={styles.uploadBoxSubtext}>
                            Tap to change
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.uploadBoxContent}>
                          <Text style={styles.uploadBoxIcon}>☁️</Text>
                          <Text style={styles.uploadBoxText}>
                            Upload Valid ID
                          </Text>
                          <Text style={styles.uploadBoxSubtext}>
                            Click to browse or drag and drop
                          </Text>
                          <Text style={styles.uploadBoxHint}>
                            Accepted: Driver's License, Passport, National ID,
                            etc.
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Digital Signature */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Digital Signature *</Text>

                    {!signature && !isSigningMode ? (
                      // Not signed yet - Show button to start signing
                      <TouchableOpacity
                        style={styles.signatureStartButton}
                        onPress={startSigning}
                      >
                        <Text style={styles.signatureStartIcon}>✍️</Text>
                        <Text style={styles.signatureStartText}>
                          Tap to Sign
                        </Text>
                        <Text style={styles.signatureStartHint}>
                          Draw your signature above using mouse or touch
                        </Text>
                      </TouchableOpacity>
                    ) : signature && !isSigningMode ? (
                      // Signed - Show preview and edit option
                      <View style={styles.signaturePreview}>
                        <Text style={styles.signaturePreviewIcon}>✓</Text>
                        <Text style={styles.signaturePreviewText}>
                          Signature Captured
                        </Text>
                        <TouchableOpacity
                          style={styles.signatureEditButton}
                          onPress={editSignature}
                        >
                          <Text style={styles.signatureEditText}>
                            ✏️ Edit Signature
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      // Signing mode - Show canvas and action buttons
                      <View style={styles.signatureModeContainer}>
                        <View style={styles.signatureModeHeader}>
                          <Text style={styles.signatureModeTitle}>
                            📝 Sign Below
                          </Text>
                          <Text style={styles.signatureModeSubtitle}>
                            Draw your signature in the box
                          </Text>
                        </View>

                        <View style={styles.signatureCanvasWrapper}>
                          <SignatureCanvas
                            ref={signatureRef}
                            onOK={handleSignature}
                            onEnd={handleSignatureEnd}
                            descriptionText=""
                            clearText="Clear"
                            confirmText="Save"
                            webStyle={`.m-signature-pad {box-shadow: none; border: none;} 
                                       .m-signature-pad--body {border: none;}
                                       .m-signature-pad--footer {display: none; margin: 0px;}`}
                            style={styles.signatureCanvas}
                          />
                        </View>

                        <View style={styles.signatureActions}>
                          <TouchableOpacity
                            style={styles.signatureClearButton}
                            onPress={clearSignature}
                          >
                            <Text style={styles.signatureClearText}>
                              🗑️ Clear
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.signatureCancelButton}
                            onPress={cancelSigning}
                          >
                            <Text style={styles.signatureCancelText}>
                              ✕ Cancel
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.signatureConfirmButton}
                            onPress={confirmSignature}
                          >
                            <Text style={styles.signatureConfirmText}>
                              ✓ Confirm
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.scrollDisabledNotice}>
                          <Text style={styles.scrollDisabledText}>
                            🔒 Page scrolling is disabled while signing
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>

                  {/* Proof of Billing */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Proof of Billing *</Text>
                    <TouchableOpacity
                      style={styles.uploadBox}
                      onPress={() => showImagePickerOptions("proofOfAddress")}
                    >
                      {proofOfAddress ? (
                        <View style={styles.uploadBoxContent}>
                          <Text style={styles.uploadBoxIcon}>✓</Text>
                          <Text style={styles.uploadBoxTextSuccess}>
                            Document uploaded
                          </Text>
                          <Text style={styles.uploadBoxSubtext}>
                            Tap to change
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.uploadBoxContent}>
                          <Text style={styles.uploadBoxIcon}>📋</Text>
                          <Text style={styles.uploadBoxText}>
                            Upload Proof of Billing
                          </Text>
                          <Text style={styles.uploadBoxSubtext}>
                            Click to browse or drag and drop
                          </Text>
                          <Text style={styles.uploadBoxHint}>
                            Recent utility bill, bank statement, or
                            government-issued document
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Terms and Conditions */}
                  <View style={styles.termsContainer}>
                    <View style={styles.termsHeader}>
                      <Text style={styles.termsHeaderIcon}>🛡️</Text>
                      <Text style={styles.termsHeaderText}>
                        Terms and Conditions
                      </Text>
                    </View>

                    <ScrollView
                      style={styles.termsScroll}
                      onScroll={handleTermsScroll}
                      scrollEventThrottle={16}
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={true}
                    >
                      <Text style={styles.termsSection}>
                        <Text style={styles.termsSectionTitle}>
                          Data Privacy Notice:{" "}
                        </Text>
                        By submitting this registration form, you acknowledge
                        that you have read and understood how we collect, use,
                        and protect your personal information in accordance with
                        the Data Privacy Act of 2012.
                      </Text>

                      <Text style={styles.termsSection}>
                        <Text style={styles.termsSectionTitle}>
                          Agent Agreement:{" "}
                        </Text>
                        You agree to represent KiQbaQ professionally and
                        ethically in all interactions with clients and
                        prospects. You will comply with all company policies,
                        procedures, and code of conduct.
                      </Text>

                      <Text style={styles.termsSection}>
                        <Text style={styles.termsSectionTitle}>
                          Commission Structure:{" "}
                        </Text>
                        You understand that commission payments are subject to
                        verification of completed sales and will be processed
                        according to the company's payment schedule.
                      </Text>

                      <Text style={styles.termsSection}>
                        <Text style={styles.termsSectionTitle}>
                          Account Security:{" "}
                        </Text>
                        You are responsible for maintaining the confidentiality
                        of your account credentials and all activities under
                        your account.
                      </Text>

                      <Text style={styles.termsSection}>
                        <Text style={styles.termsSectionTitle}>
                          Document Verification:{" "}
                        </Text>
                        All submitted documents will be verified for
                        authenticity. False information may result in account
                        suspension or termination.
                      </Text>

                      <Text style={styles.termsSection}>
                        <Text style={styles.termsSectionTitle}>
                          Code of Conduct:{" "}
                        </Text>
                        As a KiQbaQ agent, you agree to maintain professional
                        standards, provide accurate information to clients, and
                        uphold the company's reputation in all business
                        dealings.
                      </Text>

                      <Text style={styles.termsSection}>
                        <Text style={styles.termsSectionTitle}>
                          Termination Policy:{" "}
                        </Text>
                        Either party may terminate this agreement with 30 days
                        written notice. Upon termination, all company property
                        must be returned and pending commissions will be settled
                        according to policy.
                      </Text>

                      <Text style={styles.termsSection}>
                        <Text style={styles.termsSectionTitle}>
                          Amendment Rights:{" "}
                        </Text>
                        KiQbaQ reserves the right to modify these terms with
                        prior notice. Continued use of services constitutes
                        acceptance of updated terms.
                      </Text>
                    </ScrollView>

                    {!termsScrolled && (
                      <View style={styles.scrollPrompt}>
                        <Text style={styles.scrollPromptIcon}>⬇️</Text>
                        <Text style={styles.scrollPromptText}>
                          Please scroll down to read all terms and conditions
                        </Text>
                      </View>
                    )}

                    <TouchableOpacity
                      style={[
                        styles.termsCheckbox,
                        !termsScrolled && styles.termsCheckboxDisabled,
                      ]}
                      onPress={() => {
                        if (termsScrolled) {
                          setTermsAgreed(!termsAgreed);
                        } else {
                          Alert.alert(
                            "Please Read Terms",
                            "You must scroll through and read all the terms and conditions before agreeing.",
                          );
                        }
                      }}
                      disabled={!termsScrolled}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          termsAgreed && styles.checkboxChecked,
                          !termsScrolled && styles.checkboxDisabled,
                        ]}
                      >
                        {termsAgreed && (
                          <Text style={styles.checkboxCheck}>✓</Text>
                        )}
                      </View>
                      <Text
                        style={[
                          styles.termsCheckboxText,
                          !termsScrolled && styles.termsCheckboxTextDisabled,
                        ]}
                      >
                        I have read and agree to the Terms and Conditions, Data
                        Privacy Policy, and Agent Agreement. I confirm that all
                        information provided is true and accurate to the best of
                        my knowledge.
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
              {currentStep > 1 && (
                <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                  <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.nextButton,
                  currentStep === 1 && styles.nextButtonFull,
                ]}
                onPress={nextStep}
              >
                <Text style={styles.nextButtonText}>
                  {currentStep === 4 ? "Submit →" : "Next →"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Link - Inside Card */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.signInLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Picker Modal - Centered Popup */}
        <Modal
          visible={pickerVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setPickerVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setPickerVisible(false)}
            />
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Select{" "}
                  {pickerType === "month"
                    ? "Month"
                    : pickerType === "day"
                      ? "Day"
                      : pickerType === "year"
                        ? "Year"
                        : "Bank"}
                </Text>
                <TouchableOpacity onPress={() => setPickerVisible(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScroll}>
                {pickerOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.modalOption}
                    onPress={() => handlePickerSelect(option.value)}
                  >
                    <Text style={styles.modalOptionText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e8ecef",
  },
  container: {
    flex: 1,
    backgroundColor: "#e8ecef",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 0,
    flex: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    backgroundColor: "#00b4d8",
    padding: 32,
    paddingLeft: 20,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headerBackButton: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 4,
  },
  headerBackArrow: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 28,
  },
  headerBackText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#e8f4f8",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#ffffff",
  },
  stepWrapper: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  stepCircleActive: {
    backgroundColor: "#00b4d8",
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6c757d",
  },
  stepNumberActive: {
    color: "#ffffff",
  },
  stepLine: {
    position: "absolute",
    top: 20,
    left: "50%",
    right: "-50%",
    height: 2,
    backgroundColor: "#e9ecef",
    zIndex: 1,
  },
  stepLineActive: {
    backgroundColor: "#00b4d8",
  },
  stepLabel: {
    marginTop: 8,
    fontSize: 11,
    color: "#6c757d",
    textAlign: "center",
  },
  stepLabelActive: {
    color: "#00b4d8",
    fontWeight: "600",
  },
  formContainer: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#00b4d8",
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoBox: {
    backgroundColor: "#e8f4f8",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#00b4d8",
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  infoText: {
    fontSize: 12,
    color: "#495057",
    lineHeight: 18,
  },
  row: {
    flexDirection: "row",
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  spacer: {
    width: 12,
  },
  dropdownWrapper: {
    marginBottom: 0,
  },
  dropdownLabel: {
    fontSize: 11,
    color: "#6c757d",
    marginBottom: 4,
    fontWeight: "500",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdown: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 48,
  },
  dropdownDisabled: {
    backgroundColor: "#e9ecef",
    opacity: 0.6,
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  dropdownTextDisabled: {
    color: "#6c757d",
  },
  dropdownArrow: {
    fontSize: 10,
    color: "#6c757d",
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#333",
  },
  inputError: {
    borderColor: "#dc3545",
    borderWidth: 2,
  },
  inputDisabled: {
    backgroundColor: "#e9ecef",
    color: "#6c757d",
  },
  inputHint: {
    fontSize: 11,
    color: "#6c757d",
    marginTop: 4,
    fontStyle: "italic",
  },
  paymentSection: {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#00b4d8",
  },
  paymentSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00b4d8",
    marginBottom: 16,
  },
  dropdownPlaceholder: {
    color: "#6c757d",
  },
  addressSection: {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  addressSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00b4d8",
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#00b4d8",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#00b4d8",
  },
  checkboxTick: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  selectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    backgroundColor: "#f8f9fa",
  },
  selectButtonActive: {
    backgroundColor: "#00b4d8",
    borderColor: "#00b4d8",
  },
  selectButtonError: {
    borderColor: "#dc3545",
  },
  selectButtonText: {
    fontSize: 14,
    color: "#495057",
  },
  selectButtonTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
  uploadButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#00b4d8",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
  uploadButtonError: {
    borderColor: "#dc3545",
  },
  uploadButtonText: {
    color: "#00b4d8",
    fontSize: 14,
    fontWeight: "600",
  },
  uploadedText: {
    color: "#28a745",
    fontSize: 12,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 24,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  backButtonText: {
    color: "#495057",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#00b4d8",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  nextButtonFull: {
    flex: 2,
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  signInText: {
    color: "#6c757d",
    fontSize: 14,
  },
  signInLink: {
    color: "#00b4d8",
    fontSize: 14,
    fontWeight: "600",
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
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    width: "90%",
    maxHeight: "70%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalClose: {
    fontSize: 28,
    color: "#6c757d",
    fontWeight: "300",
    lineHeight: 28,
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalScrollContent: {
    paddingBottom: 40,
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
  },
  uploadBox: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#00b4d8",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
  },
  uploadBoxContent: {
    alignItems: "center",
  },
  uploadBoxIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  uploadBoxText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  uploadBoxTextSuccess: {
    fontSize: 16,
    fontWeight: "600",
    color: "#28a745",
    marginBottom: 8,
  },
  uploadBoxSubtext: {
    fontSize: 13,
    color: "#6c757d",
    marginBottom: 8,
  },
  uploadBoxHint: {
    fontSize: 11,
    color: "#6c757d",
    textAlign: "center",
    fontStyle: "italic",
  },
  signatureContainer: {
    borderWidth: 2,
    borderColor: "#00b4d8",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  signatureStartButton: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#00b4d8",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  signatureStartIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  signatureStartText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00b4d8",
    marginBottom: 8,
  },
  signatureStartHint: {
    fontSize: 13,
    color: "#6c757d",
    textAlign: "center",
  },
  signaturePreview: {
    backgroundColor: "#d4edda",
    borderWidth: 2,
    borderColor: "#28a745",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  signaturePreviewIcon: {
    fontSize: 48,
    color: "#28a745",
    marginBottom: 8,
  },
  signaturePreviewText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#28a745",
    marginBottom: 16,
  },
  signatureEditButton: {
    backgroundColor: "#00b4d8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  signatureEditText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  signatureModeContainer: {
    backgroundColor: "#f8f9fa",
    borderWidth: 3,
    borderColor: "#00b4d8",
    borderRadius: 12,
    padding: 16,
  },
  signatureModeHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  signatureModeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00b4d8",
    marginBottom: 4,
  },
  signatureModeSubtitle: {
    fontSize: 13,
    color: "#6c757d",
  },
  signatureCanvasWrapper: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#00b4d8",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  signatureCanvas: {
    width: "100%",
    height: 200,
  },
  signatureActions: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  signatureClearButton: {
    flex: 1,
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signatureClearText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  signatureCancelButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signatureCancelText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  signatureConfirmButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signatureConfirmText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollDisabledNotice: {
    backgroundColor: "#fff3cd",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  scrollDisabledText: {
    fontSize: 12,
    color: "#856404",
    textAlign: "center",
    fontWeight: "600",
  },
  signaturePlaceholder: {
    color: "#6c757d",
    fontSize: 14,
    textAlign: "center",
  },
  clearSignatureButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#dc3545",
    borderRadius: 8,
    alignSelf: "center",
  },
  clearSignatureText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  signatureSuccess: {
    marginTop: 8,
    fontSize: 14,
    color: "#28a745",
    fontWeight: "600",
    textAlign: "center",
  },
  termsContainer: {
    marginTop: 24,
    borderWidth: 2,
    borderColor: "#00b4d8",
    borderRadius: 12,
    overflow: "hidden",
  },
  termsHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b4d8",
    padding: 16,
  },
  termsHeaderIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  termsHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  termsScroll: {
    maxHeight: 300,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  termsSection: {
    marginBottom: 16,
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
  },
  termsSectionTitle: {
    fontWeight: "bold",
    color: "#00b4d8",
  },
  scrollPrompt: {
    backgroundColor: "#fff3cd",
    padding: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ffc107",
  },
  scrollPromptIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  scrollPromptText: {
    fontSize: 12,
    color: "#856404",
    textAlign: "center",
    fontWeight: "600",
  },
  termsCheckbox: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fffbea",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    alignItems: "flex-start",
  },
  termsCheckboxDisabled: {
    backgroundColor: "#e9ecef",
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#00b4d8",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  checkboxChecked: {
    backgroundColor: "#00b4d8",
  },
  checkboxDisabled: {
    borderColor: "#6c757d",
    backgroundColor: "#e9ecef",
  },
  checkboxCheck: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsCheckboxText: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
  },
  termsCheckboxTextDisabled: {
    color: "#6c757d",
  },
});
