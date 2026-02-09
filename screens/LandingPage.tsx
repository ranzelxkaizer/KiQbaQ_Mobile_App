import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Content - Higher up */}
      <View style={styles.contentContainer}>
        {/* Welcome To text */}
        <Text style={styles.welcomeText}>Welcome To</Text>

        {/* KiQbaQ Logo GIF */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/kiqbaq_logo.gif")}
            style={styles.logoGif}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.subtitle}>Agent Marketing Platform</Text>

        <Text style={styles.description}>
          We are excited to have you join our community. Manage leads, track
          performance, and grow your business through innovative QR code
          technology and real-time analytics. Let's work together to make this
          successful.
        </Text>
      </View>

      {/* Spacer to push button down */}
      <View style={styles.spacer} />

      {/* Get Started Button at Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
  },
  contentContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoGif: {
    width: 280,
    height: 120,
  },
  subtitle: {
    fontSize: 18,
    color: "#00b4d8",
    textAlign: "center",
    marginBottom: 32,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#5a6c7d",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 12,
  },
  spacer: {
    flex: 1,
    minHeight: 60,
  },
  buttonContainer: {
    width: "100%",
    paddingTop: 20,
  },
  getStartedButton: {
    backgroundColor: "#00b4d8",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  getStartedText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
