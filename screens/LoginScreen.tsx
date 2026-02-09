import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});

  const markFieldAsTouched = (fieldName: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const isFieldEmpty = (value: string) => {
    return !value || value.trim() === "";
  };

  const shouldShowError = (fieldName: string, value: string) => {
    return touchedFields[fieldName] && isFieldEmpty(value);
  };

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert(
        "Please fill in all required fields:\n• Email or Username\n• Password",
      );
      return;
    }

    // TODO: Send credentials to backend for validation
    console.log("Login attempt:", { email, password });
    router.replace("/(tabs)"); // Navigate to dashboard tabs
  };

  const handleForgotPassword = () => {
    alert("Forgot password feature coming soon!");
    // TODO: Navigate to forgot password screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          {/* Login Card */}
          <View style={styles.card}>
            {/* Logo - Using GIF */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/kiqbaq_logo.gif")}
                style={styles.logoGif}
                resizeMode="contain"
              />
            </View>

            {/* Header */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to access your agent dashboard
            </Text>

            {/* Email/Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username or Email *</Text>
              <View
                style={[
                  styles.inputWrapper,
                  shouldShowError("email", email) && styles.inputWrapperError,
                ]}
              >
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username or email"
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() => markFieldAsTouched("email")}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password *</Text>
              <View
                style={[
                  styles.inputWrapper,
                  shouldShowError("password", password) &&
                    styles.inputWrapperError,
                ]}
              >
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  onBlur={() => markFieldAsTouched("password")}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.registerLink}>Register here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  backToHome: {
    position: "absolute",
    top: 50,
    left: 30,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  backToHomeText: {
    color: "#00b4d8",
    fontSize: 13,
    fontWeight: "600",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoGif: {
    width: 250,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00b4d8",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    paddingHorizontal: 12,
  },
  inputWrapperError: {
    borderColor: "#dc3545",
    borderWidth: 2,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8,
    color: "#6c757d",
    opacity: 0.8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: "#333",
  },
  signInButton: {
    backgroundColor: "#00b4d8",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  signInButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPassword: {
    color: "#00b4d8",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 3,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e9ecef",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6c757d",
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "#6c757d",
    fontSize: 14,
  },
  registerLink: {
    color: "#00b4d8",
    fontSize: 14,
    fontWeight: "600",
  },
  eyeButton: {
    padding: 8,
  },
  eyeIcon: {
    fontSize: 12,
    color: "#adb5bd",
    fontWeight: "600",
    opacity: 0.7,
  },
});
