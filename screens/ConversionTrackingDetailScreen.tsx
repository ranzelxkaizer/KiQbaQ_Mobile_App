import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../app/contexts/ThemeContext";

const ConversionTrackingDetailScreen: React.FC = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const [activeTimeFilter, setActiveTimeFilter] = useState<
    "7days" | "30days" | "alltime"
  >("7days");

  const colors = {
    background: isDarkMode ? "#1a1a1a" : "#f8f9fa",
    cardBackground: isDarkMode ? "#2d2d2d" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#2c3e50",
    textSecondary: isDarkMode ? "#b0b0b0" : "#6c757d",
    border: isDarkMode ? "#404040" : "#e9ecef",
    headerBg: isDarkMode ? "#2d2d2d" : "#ffffff",
    primary: "#5BB8F5",
  };

  const handleBackToAnalytics = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header - Blue with Back Button */}
      <View style={[styles.header, { backgroundColor: "#4A90D9" }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conversion Tracking Detail</Text>
        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView style={styles.content}>
        <View
          style={[styles.pageHeaderCard, { backgroundColor: colors.primary }]}
        >
          <View style={styles.pageHeaderContent}>
            <Text style={styles.pageHeaderIcon}>📈</Text>
            <View style={styles.pageHeaderText}>
              <Text style={styles.pageHeaderTitle}>Conversion Tracking</Text>
              <Text style={styles.pageHeaderSubtitle}>
                Track visitor engagement and submission rates
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#5BB8F5",
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: "#5BB8F5" }]}>
              All Visitors
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#e0f2fe" }]}
            >
              <Text style={styles.statIcon}>👥</Text>
            </View>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#10b981",
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: "#10b981" }]}>
              Converted
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#d1fae5" }]}
            >
              <Text style={styles.statIcon}>✅</Text>
            </View>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#dc3545",
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: "#dc3545" }]}>
              Not Converted
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#ffe0e3" }]}
            >
              <Text style={styles.statIcon}>❌</Text>
            </View>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: "#f59e0b",
              },
            ]}
          >
            <Text style={[styles.statLabel, { color: "#f59e0b" }]}>
              Conversion Rate
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>0.0%</Text>
            <View style={styles.statSubtext}>
              <Text
                style={[
                  styles.statSubtextSmall,
                  { color: colors.textSecondary },
                ]}
              >
                0 converted
              </Text>
              <Text
                style={[
                  styles.statSubtextSmall,
                  { color: colors.textSecondary },
                ]}
              >
                0 not converted
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.timeFilterTabs}>
          {(["7days", "30days", "alltime"] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.timeFilterTab,
                {
                  backgroundColor:
                    activeTimeFilter === filter
                      ? colors.primary
                      : colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setActiveTimeFilter(filter)}
            >
              <Text
                style={[
                  styles.timeFilterTabText,
                  {
                    color:
                      activeTimeFilter === filter ? "#ffffff" : colors.text,
                  },
                ]}
              >
                {filter === "7days"
                  ? "Last 7 Days"
                  : filter === "30days"
                    ? "Last 30 Days"
                    : "All Time"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[
            styles.emptyStateCard,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📈</Text>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              No Conversion Data Yet
            </Text>
            <Text
              style={[styles.emptyStateText, { color: colors.textSecondary }]}
            >
              No visitors have scanned QR codes in this period.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  backIcon: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    flex: 1,
    textAlign: "center",
  },
  headerRightSpace: {
    width: 36,
  },
  content: { flex: 1, padding: 16 },
  pageHeaderCard: { borderRadius: 12, padding: 20, marginBottom: 20 },
  pageHeaderContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  pageHeaderIcon: { fontSize: 28 },
  pageHeaderText: { flex: 1 },
  pageHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  pageHeaderSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 18,
  },
  backToAnalyticsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 6,
  },
  backToAnalyticsButtonIcon: { color: "#ffffff", fontSize: 18 },
  backToAnalyticsButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  statsGrid: { gap: 12, marginBottom: 20 },
  statCard: {
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  statValue: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  statIconContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  statIcon: { fontSize: 18 },
  statSubtext: { gap: 4 },
  statSubtextSmall: { fontSize: 11 },
  timeFilterTabs: { flexDirection: "row", gap: 8, marginBottom: 20 },
  timeFilterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  timeFilterTabText: { fontSize: 12, fontWeight: "600" },
  emptyStateCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyState: { alignItems: "center", paddingVertical: 60 },
  emptyStateIcon: { fontSize: 64, marginBottom: 16 },
  emptyStateTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  emptyStateText: { fontSize: 14, textAlign: "center" },
});

export default ConversionTrackingDetailScreen;
