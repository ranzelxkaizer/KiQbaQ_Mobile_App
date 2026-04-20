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

const VideoPerformanceDetailScreen: React.FC = () => {
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
    primary: "#5BB8F5",
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
        <Text style={styles.headerTitle}>Video Performance Detail</Text>
        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView style={styles.content}>
        {/* Page Header Card */}
        <View
          style={[styles.pageHeaderCard, { backgroundColor: colors.primary }]}
        >
          <View style={styles.pageHeaderContent}>
            <Text style={styles.pageHeaderIcon}>🎥</Text>
            <View style={styles.pageHeaderText}>
              <Text style={styles.pageHeaderTitle}>Video Performance</Text>
              <Text style={styles.pageHeaderSubtitle}>
                Analytics and engagement metrics for demonstration videos
              </Text>
            </View>
          </View>
        </View>

        {/* Time Filter Tabs */}
        <View style={styles.timeFilterTabs}>
          <TouchableOpacity
            style={[
              styles.timeFilterTab,
              activeTimeFilter === "7days" && styles.timeFilterTabActive,
              {
                backgroundColor:
                  activeTimeFilter === "7days"
                    ? colors.primary
                    : colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setActiveTimeFilter("7days")}
          >
            <Text
              style={[
                styles.timeFilterTabText,
                {
                  color: activeTimeFilter === "7days" ? "#ffffff" : colors.text,
                },
              ]}
            >
              Last 7 Days
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.timeFilterTab,
              activeTimeFilter === "30days" && styles.timeFilterTabActive,
              {
                backgroundColor:
                  activeTimeFilter === "30days"
                    ? colors.primary
                    : colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setActiveTimeFilter("30days")}
          >
            <Text
              style={[
                styles.timeFilterTabText,
                {
                  color:
                    activeTimeFilter === "30days" ? "#ffffff" : colors.text,
                },
              ]}
            >
              Last 30 Days
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.timeFilterTab,
              activeTimeFilter === "alltime" && styles.timeFilterTabActive,
              {
                backgroundColor:
                  activeTimeFilter === "alltime"
                    ? colors.primary
                    : colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setActiveTimeFilter("alltime")}
          >
            <Text
              style={[
                styles.timeFilterTabText,
                {
                  color:
                    activeTimeFilter === "alltime" ? "#ffffff" : colors.text,
                },
              ]}
            >
              All Time
            </Text>
          </TouchableOpacity>
        </View>

        {/* Empty State */}
        <View
          style={[
            styles.emptyStateCard,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🎥</Text>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              No Video Data Yet
            </Text>
            <Text
              style={[styles.emptyStateText, { color: colors.textSecondary }]}
            >
              No video performance data available in this period.
            </Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  pageHeaderCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  pageHeaderContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  pageHeaderIcon: {
    fontSize: 28,
  },
  pageHeaderText: {
    flex: 1,
  },
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
  timeFilterTabs: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  timeFilterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  timeFilterTabActive: {
    // Active state handled by backgroundColor prop
  },
  timeFilterTabText: {
    fontSize: 12,
    fontWeight: "600",
  },
  emptyStateCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default VideoPerformanceDetailScreen;
