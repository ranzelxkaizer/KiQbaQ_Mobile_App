import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Personal Information
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('None');
  const [gender, setGender] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');

  // Step 2: Contact Info
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [permanentCity, setPermanentCity] = useState('');
  const [permanentProvince, setPermanentProvince] = useState('');
  const [permanentZipCode, setPermanentZipCode] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [currentProvince, setCurrentProvince] = useState('');
  const [currentZipCode, setCurrentZipCode] = useState('');
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [referenceName, setReferenceName] = useState('');
  const [referenceContact, setReferenceContact] = useState('');

  // Step 3: Bank Details
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  // Step 4: Documents
  const [validId, setValidId] = useState('');
  const [proofOfAddress, setProofOfAddress] = useState('');

  // Touched state tracking
  const [touchedFields, setTouchedFields] = useState<{[key: string]: boolean}>({});

  const markFieldAsTouched = (fieldName: string) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
  };

  // Helper functions for validation
  const isFieldEmpty = (value: string) => {
    return !value || value.trim() === '';
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
      setCurrentAddress('');
      setCurrentCity('');
      setCurrentProvince('');
      setCurrentZipCode('');
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!firstName.trim() || !lastName.trim() || !gender || !birthMonth || !birthDay || !birthYear) {
        alert('Please fill in all required fields:\n• First Name\n• Last Name\n• Gender\n• Birthdate');
        return;
      }
      // Validate birthdate
      const month = parseInt(birthMonth);
      const day = parseInt(birthDay);
      const year = parseInt(birthYear);
      
      if (month < 1 || month > 12) {
        alert('Please enter a valid month (1-12)');
        return;
      }
      if (day < 1 || day > 31) {
        alert('Please enter a valid day (1-31)');
        return;
      }
      if (year < 1900 || year > 2024) {
        alert('Please enter a valid year');
        return;
      }
    }
    
    if (currentStep === 2) {
      // Check permanent address fields
      if (!email.trim() || !phone.trim() || !permanentAddress.trim() || !permanentCity.trim() || !permanentProvince.trim() || !permanentZipCode.trim() || !referenceName.trim() || !referenceContact.trim()) {
        alert('Please fill in all required fields:\n• Email Address\n• Phone Number\n• Permanent Address\n• Reference Person Name\n• Reference Contact Number');
        return;
      }
      
      // Check current address fields (only if not same as permanent)
      if (!sameAsPermanent && (!currentAddress.trim() || !currentCity.trim() || !currentProvince.trim() || !currentZipCode.trim())) {
        alert('Please fill in all current address fields or select "Same as Permanent Address"');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
    }
    
    if (currentStep === 3) {
      if (!bankName.trim() || !accountNumber.trim() || !accountName.trim()) {
        alert('Please fill in all required fields:\n• Bank Name\n• Account Number\n• Account Name');
        return;
      }
    }
    
    if (currentStep === 4) {
      if (!validId || !proofOfAddress) {
        alert('Please upload all required documents:\n• Valid ID\n• Proof of Address');
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
    console.log('Registration complete!');
    alert('Registration submitted successfully!');
    // TODO: Send data to backend
  };

  const steps = [
    { number: 1, label: 'Personal Details' },
    { number: 2, label: 'Contact Info' },
    { number: 3, label: 'Bank Details' },
    { number: 4, label: 'Documents' },
  ];

  const suffixes = ['None', 'Jr.', 'Sr.', 'II', 'III'];
  const genders = ['Male', 'Female', 'Other'];

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Back to Home */}
      <TouchableOpacity 
        style={styles.backToHome}
        onPress={() => router.back()}
      >
        <Text style={styles.backToHomeText}>← Back to Home</Text>
      </TouchableOpacity>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
        
        {/* Registration Card */}
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Agent Registration</Text>
            <Text style={styles.subtitle}>Join KiQbaQ and start your journey to success</Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            {steps.map((step, index) => (
              <View key={step.number} style={styles.stepWrapper}>
                {/* Circle */}
                <View style={[
                  styles.stepCircle,
                  currentStep >= step.number && styles.stepCircleActive
                ]}>
                  <Text style={[
                    styles.stepNumber,
                    currentStep >= step.number && styles.stepNumberActive
                  ]}>
                    {step.number}
                  </Text>
                </View>
                
                {/* Line connector (except last step) */}
                {index < steps.length - 1 && (
                  <View style={[
                    styles.stepLine,
                    currentStep > step.number && styles.stepLineActive
                  ]} />
                )}
                
                {/* Label below */}
                <Text style={[
                  styles.stepLabel,
                  currentStep >= step.number && styles.stepLabelActive
                ]}>
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
                  <Text style={styles.sectionTitle}>Personal Information</Text>
                </View>
                
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Why we need this: </Text>
                  <Text style={styles.infoText}>
                    We require your personal details to verify your identity and create your agent profile in our system.
                  </Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>First Name *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      shouldShowError('firstName', firstName) && styles.inputError
                    ]}
                    value={firstName}
                    onChangeText={setFirstName}
                    onBlur={() => markFieldAsTouched('firstName')}
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
                      shouldShowError('lastName', lastName) && styles.inputError
                    ]}
                    value={lastName}
                    onChangeText={setLastName}
                    onBlur={() => markFieldAsTouched('lastName')}
                    placeholder="Last Name"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Suffix</Text>
                  <View style={styles.selectContainer}>
                    {suffixes.map((s) => (
                      <TouchableOpacity
                        key={s}
                        style={[styles.selectButton, suffix === s && styles.selectButtonActive]}
                        onPress={() => setSuffix(s)}
                      >
                        <Text style={[styles.selectButtonText, suffix === s && styles.selectButtonTextActive]}>
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
                          touchedFields['gender'] && !gender && styles.selectButtonError
                        ]}
                        onPress={() => {
                          setGender(g);
                          markFieldAsTouched('gender');
                        }}
                      >
                        <Text style={[styles.selectButtonText, gender === g && styles.selectButtonTextActive]}>
                          {g}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Birthdate *</Text>
                  <View style={styles.row}>
                    <TextInput
                      style={[
                        styles.input, 
                        styles.flex1,
                        shouldShowError('birthMonth', birthMonth) && styles.inputError
                      ]}
                      value={birthMonth}
                      onChangeText={setBirthMonth}
                      onBlur={() => markFieldAsTouched('birthMonth')}
                      placeholder="Month (MM)"
                      keyboardType="number-pad"
                      maxLength={2}
                    />
                    <View style={styles.spacer} />
                    <TextInput
                      style={[
                        styles.input, 
                        styles.flex1,
                        shouldShowError('birthDay', birthDay) && styles.inputError
                      ]}
                      value={birthDay}
                      onChangeText={setBirthDay}
                      onBlur={() => markFieldAsTouched('birthDay')}
                      placeholder="Day (DD)"
                      keyboardType="number-pad"
                      maxLength={2}
                    />
                    <View style={styles.spacer} />
                    <TextInput
                      style={[
                        styles.input, 
                        styles.flex2,
                        shouldShowError('birthYear', birthYear) && styles.inputError
                      ]}
                      value={birthYear}
                      onChangeText={setBirthYear}
                      onBlur={() => markFieldAsTouched('birthYear')}
                      placeholder="Year (YYYY)"
                      keyboardType="number-pad"
                      maxLength={4}
                    />
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
                      shouldShowError('email', email) && styles.inputError
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    onBlur={() => markFieldAsTouched('email')}
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
                      shouldShowError('phone', phone) && styles.inputError
                    ]}
                    value={phone}
                    onChangeText={setPhone}
                    onBlur={() => markFieldAsTouched('phone')}
                    placeholder="+63 XXX XXX XXXX"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Reference Person Name *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      shouldShowError('referenceName', referenceName) && styles.inputError
                    ]}
                    value={referenceName}
                    onChangeText={setReferenceName}
                    onBlur={() => markFieldAsTouched('referenceName')}
                    placeholder="Full name of reference person"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Reference Contact Number *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      shouldShowError('referenceContact', referenceContact) && styles.inputError
                    ]}
                    value={referenceContact}
                    onChangeText={setReferenceContact}
                    onBlur={() => markFieldAsTouched('referenceContact')}
                    placeholder="+63 XXX XXX XXXX"
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Permanent Address Section */}
                <View style={styles.addressSection}>
                  <Text style={styles.addressSectionTitle}>Permanent Address</Text>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Street Address *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError('permanentAddress', permanentAddress) && styles.inputError
                      ]}
                      value={permanentAddress}
                      onChangeText={setPermanentAddress}
                      onBlur={() => markFieldAsTouched('permanentAddress')}
                      placeholder="House No., Street Name"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>City *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError('permanentCity', permanentCity) && styles.inputError
                      ]}
                      value={permanentCity}
                      onChangeText={setPermanentCity}
                      onBlur={() => markFieldAsTouched('permanentCity')}
                      placeholder="City"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Province *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError('permanentProvince', permanentProvince) && styles.inputError
                      ]}
                      value={permanentProvince}
                      onChangeText={setPermanentProvince}
                      onBlur={() => markFieldAsTouched('permanentProvince')}
                      placeholder="Province"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Zip Code *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError('permanentZipCode', permanentZipCode) && styles.inputError
                      ]}
                      value={permanentZipCode}
                      onChangeText={setPermanentZipCode}
                      onBlur={() => markFieldAsTouched('permanentZipCode')}
                      placeholder="XXXX"
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                {/* Current Address Section */}
                <View style={styles.addressSection}>
                  <Text style={styles.addressSectionTitle}>Current Address</Text>
                  
                  {/* Checkbox for Same as Permanent */}
                  <TouchableOpacity 
                    style={styles.checkboxContainer}
                    onPress={() => handleSameAsPermanent(!sameAsPermanent)}
                  >
                    <View style={[styles.checkbox, sameAsPermanent && styles.checkboxChecked]}>
                      {sameAsPermanent && <Text style={styles.checkboxTick}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>Same as Permanent Address</Text>
                  </TouchableOpacity>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Street Address *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError('currentAddress', currentAddress) && !sameAsPermanent && styles.inputError,
                        sameAsPermanent && styles.inputDisabled
                      ]}
                      value={currentAddress}
                      onChangeText={setCurrentAddress}
                      onBlur={() => markFieldAsTouched('currentAddress')}
                      placeholder="House No., Street Name"
                      editable={!sameAsPermanent}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>City *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError('currentCity', currentCity) && !sameAsPermanent && styles.inputError,
                        sameAsPermanent && styles.inputDisabled
                      ]}
                      value={currentCity}
                      onChangeText={setCurrentCity}
                      onBlur={() => markFieldAsTouched('currentCity')}
                      placeholder="City"
                      editable={!sameAsPermanent}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Province *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError('currentProvince', currentProvince) && !sameAsPermanent && styles.inputError,
                        sameAsPermanent && styles.inputDisabled
                      ]}
                      value={currentProvince}
                      onChangeText={setCurrentProvince}
                      onBlur={() => markFieldAsTouched('currentProvince')}
                      placeholder="Province"
                      editable={!sameAsPermanent}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Zip Code *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        shouldShowError('currentZipCode', currentZipCode) && !sameAsPermanent && styles.inputError,
                        sameAsPermanent && styles.inputDisabled
                      ]}
                      value={currentZipCode}
                      onChangeText={setCurrentZipCode}
                      onBlur={() => markFieldAsTouched('currentZipCode')}
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
                  <Text style={styles.sectionTitle}>Bank Details</Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Bank Name *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      shouldShowError('bankName', bankName) && styles.inputError
                    ]}
                    value={bankName}
                    onChangeText={setBankName}
                    onBlur={() => markFieldAsTouched('bankName')}
                    placeholder="e.g., BDO, BPI, Metrobank"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Account Number *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      shouldShowError('accountNumber', accountNumber) && styles.inputError
                    ]}
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    onBlur={() => markFieldAsTouched('accountNumber')}
                    placeholder="XXXX-XXXX-XXXX"
                    keyboardType="number-pad"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Account Name *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      shouldShowError('accountName', accountName) && styles.inputError
                    ]}
                    value={accountName}
                    onChangeText={setAccountName}
                    onBlur={() => markFieldAsTouched('accountName')}
                    placeholder="Name as it appears on account"
                  />
                </View>
              </View>
            )}

            {/* Step 4: Documents */}
            {currentStep === 4 && (
              <View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionIcon}>📄</Text>
                  <Text style={styles.sectionTitle}>Documents</Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Valid ID *</Text>
                  <TouchableOpacity 
                    style={[
                      styles.uploadButton,
                      touchedFields['validId'] && !validId && styles.uploadButtonError
                    ]}
                    onPress={() => {
                      markFieldAsTouched('validId');
                      // TODO: Implement actual file upload
                      setValidId('valid-id-file.jpg');
                      alert('Valid ID uploaded successfully!');
                    }}
                  >
                    <Text style={styles.uploadButtonText}>📎 Upload Valid ID</Text>
                  </TouchableOpacity>
                  {validId && <Text style={styles.uploadedText}>✓ {validId}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Proof of Address *</Text>
                  <TouchableOpacity 
                    style={[
                      styles.uploadButton,
                      touchedFields['proofOfAddress'] && !proofOfAddress && styles.uploadButtonError
                    ]}
                    onPress={() => {
                      markFieldAsTouched('proofOfAddress');
                      // TODO: Implement actual file upload
                      setProofOfAddress('proof-of-address.pdf');
                      alert('Proof of Address uploaded successfully!');
                    }}
                  >
                    <Text style={styles.uploadButtonText}>📎 Upload Proof of Address</Text>
                  </TouchableOpacity>
                  {proofOfAddress && <Text style={styles.uploadedText}>✓ {proofOfAddress}</Text>}
                </View>

                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    Accepted documents: Government-issued ID, Utility bill, Bank statement (not older than 3 months)
                  </Text>
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
              style={[styles.nextButton, currentStep === 1 && styles.nextButtonFull]} 
              onPress={nextStep}
            >
              <Text style={styles.nextButtonText}>
                {currentStep === 4 ? 'Submit →' : 'Next →'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecef',
  },
  backToHome: {
  position: 'absolute',
  top: 50,
  left: 16,
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 4,
},
  backToHomeText: {
    color: '#00b4d8',
    fontSize: 13,
    fontWeight: '600',
},
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
  backgroundColor: '#00b4d8',
  padding: 32,
  alignItems: 'center',
},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#e8f4f8',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  stepCircleActive: {
    backgroundColor: '#00b4d8',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c757d',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepLine: {
    position: 'absolute',
    top: 20,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: '#e9ecef',
    zIndex: 1,
  },
  stepLineActive: {
    backgroundColor: '#00b4d8',
  },
  stepLabel: {
    marginTop: 8,
    fontSize: 11,
    color: '#6c757d',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#00b4d8',
    fontWeight: '600',
  },
  formContainer: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#00b4d8',
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#e8f4f8',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#00b4d8',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  infoText: {
    fontSize: 12,
    color: '#495057',
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
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
inputContainer: {
marginBottom: 16,
},
label: {
fontSize: 14,
fontWeight: '600',
color: '#333',
marginBottom: 8,
},
input: {
backgroundColor: '#f8f9fa',
borderWidth: 1,
borderColor: '#e9ecef',
borderRadius: 8,
padding: 12,
fontSize: 14,
color: '#333',
},
inputError: {
borderColor: '#dc3545',
borderWidth: 2,
},
inputDisabled: {
backgroundColor: '#e9ecef',
color: '#6c757d',
},
addressSection: {
marginTop: 20,
marginBottom: 20,
paddingTop: 16,
borderTopWidth: 1,
borderTopColor: '#e9ecef',
},
addressSectionTitle: {
fontSize: 16,
fontWeight: 'bold',
color: '#00b4d8',
marginBottom: 16,
},
checkboxContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 16,
},
checkbox: {
width: 24,
height: 24,
borderRadius: 4,
borderWidth: 2,
borderColor: '#00b4d8',
marginRight: 8,
justifyContent: 'center',
alignItems: 'center',
},
checkboxChecked: {
backgroundColor: '#00b4d8',
},
checkboxTick: {
color: '#ffffff',
fontSize: 16,
fontWeight: 'bold',
},
checkboxLabel: {
fontSize: 14,
color: '#333',
},
selectContainer: {
flexDirection: 'row',
flexWrap: 'wrap',
gap: 8,
},
selectButton: {
paddingHorizontal: 16,
paddingVertical: 10,
borderRadius: 8,
borderWidth: 1,
borderColor: '#e9ecef',
backgroundColor: '#f8f9fa',
},
selectButtonActive: {
backgroundColor: '#00b4d8',
borderColor: '#00b4d8',
},
selectButtonError: {
borderColor: '#dc3545',
},
selectButtonText: {
fontSize: 14,
color: '#495057',
},
selectButtonTextActive: {
color: '#ffffff',
fontWeight: '600',
},
uploadButton: {
backgroundColor: '#f8f9fa',
borderWidth: 2,
borderColor: '#00b4d8',
borderStyle: 'dashed',
borderRadius: 8,
padding: 24,
alignItems: 'center',
},
uploadButtonError: {
borderColor: '#dc3545',
},
uploadButtonText: {
color: '#00b4d8',
fontSize: 14,
fontWeight: '600',
},
uploadedText: {
color: '#28a745',
fontSize: 12,
marginTop: 8,
},
buttonContainer: {
flexDirection: 'row',
padding: 24,
gap: 12,
},
backButton: {
flex: 1,
backgroundColor: '#e9ecef',
borderRadius: 8,
padding: 14,
alignItems: 'center',
},
backButtonText: {
color: '#495057',
fontSize: 16,
fontWeight: '600',
},
nextButton: {
flex: 1,
backgroundColor: '#00b4d8',
borderRadius: 8,
padding: 14,
alignItems: 'center',
},
nextButtonFull: {
flex: 2,
},
nextButtonText: {
color: '#ffffff',
fontSize: 16,
fontWeight: '600',
},
signInContainer: {
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
marginTop: 100,
},
signInText: {
color: '#6c757d',
fontSize: 14,
},
signInLink: {
color: '#00b4d8',
fontSize: 14,
fontWeight: '600',
},
});