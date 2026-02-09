import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../app/contexts/ThemeContext";

const { width } = Dimensions.get("window");

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
}

interface BurgerMenuProps {
  currentPage?: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  currentPage = "Dashboard",
}) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedNav, setSelectedNav] = useState(currentPage);

  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const toggleAnim = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;

  // Update selectedNav when currentPage changes
  useEffect(() => {
    setSelectedNav(currentPage);
  }, [currentPage]);

  // Sync toggle animation with isDarkMode
  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isDarkMode ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isDarkMode]);

  const colors = {
    menuBg: isDarkMode ? "#2d2d2d" : "#ffffff",
    menuText: isDarkMode ? "#ffffff" : "#495057",
    menuItemActive: isDarkMode ? "#3d3d3d" : "#f0f0f5",
    overlay: "rgba(0, 0, 0, 0.5)",
    headerBg: "#6c5ce7",
    border: isDarkMode ? "#404040" : "#e9ecef",
  };

  const navigationItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "leads", label: "Leads Management", icon: "📂" },
    { id: "budget", label: "Budget Management", icon: "💰" },
    { id: "schedules", label: "Agent Schedules", icon: "📅" },
    { id: "analytics", label: "Demo Analytics", icon: "📊" },
    { id: "incentive", label: "Incentive Tracking", icon: "🎯" },
    { id: "performance", label: "Performance Benchmarking", icon: "📈" },
    { id: "resource", label: "Resource Center", icon: "☁️" },
  ];

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width * 0.75,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMenuVisible(false);
    });
  };

  const handleNavigation = (item: NavigationItem) => {
    // Don't navigate if already on the page
    if (item.label === currentPage) {
      closeMenu();
      return;
    }

    // Close menu first
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width * 0.75,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMenuVisible(false);

      // Navigate based on item - only update selectedNav after successful navigation
      switch (item.id) {
        case "dashboard":
          router.push("/(tabs)/");
          break;
        case "leads":
          router.push("/LeadsManagementScreen");
          break;
        case "budget":
          router.push("/BudgetManagementScreen");
          break;
        case "schedules":
          router.push("/AgentSchedulesScreen");
          break;
        case "analytics":
          router.push("/DemoAnalyticsScreen");
          break;
        // Add more routes as you create pages
        default:
          console.log(`Navigating to ${item.label} - page not yet created`);
      }
    });
  };

  const handleToggleDarkMode = () => {
    const toValue = isDarkMode ? 0 : 1;
    Animated.timing(toggleAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
    toggleDarkMode();
  };

  const toggleTranslateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <>
      {/* Burger Menu Button - Only show when menu is closed */}
      {!menuVisible && (
        <TouchableOpacity
          style={[
            styles.burgerButton,
            { backgroundColor: isDarkMode ? "#3a3a3a" : "#f8f9fa" },
          ]}
          onPress={openMenu}
        >
          <Text
            style={[
              styles.burgerIcon,
              { color: isDarkMode ? "#ffffff" : "#333" },
            ]}
          >
            ☰
          </Text>
        </TouchableOpacity>
      )}

      {/* Sidebar Menu */}
      {menuVisible && (
        <>
          {/* Overlay */}
          <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
            <TouchableOpacity
              style={styles.overlayTouchable}
              activeOpacity={1}
              onPress={closeMenu}
            />
          </Animated.View>

          {/* Menu */}
          <Animated.View
            style={[
              styles.menu,
              {
                backgroundColor: colors.menuBg,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {/* Menu Header */}
            <View
              style={[styles.menuHeader, { backgroundColor: colors.headerBg }]}
            >
              <View style={styles.logoContainer}>
                <View style={styles.logoBox}>
                  <Text style={styles.logoText}>Q</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Navigation Items */}
            <View style={styles.menuItems}>
              {navigationItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    currentPage === item.label && {
                      backgroundColor: colors.menuItemActive,
                    },
                  ]}
                  onPress={() => handleNavigation(item)}
                >
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={[styles.menuText, { color: colors.menuText }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Dark Mode Toggle */}
            <View
              style={[
                styles.darkModeContainer,
                { borderTopColor: colors.border },
              ]}
            >
              <Text style={styles.darkModeIcon}>
                {isDarkMode ? "🌙" : "☀️"}
              </Text>
              <Text style={[styles.darkModeLabel, { color: colors.menuText }]}>
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Text>
              <TouchableOpacity
                style={[
                  styles.toggleContainer,
                  isDarkMode && styles.toggleContainerActive,
                ]}
                onPress={handleToggleDarkMode}
              >
                <Animated.View
                  style={[
                    styles.toggleCircle,
                    { transform: [{ translateX: toggleTranslateX }] },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  burgerButton: {
    position: "absolute",
    top: 55,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1001,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  burgerIcon: {
    fontSize: 24,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  overlayTouchable: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.75,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBox: {
    width: 50,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoText: {
    color: "#6c5ce7",
    fontSize: 28,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "300",
  },
  menuItems: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  menuIcon: {
    fontSize: 20,
    width: 28,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "500",
  },
  darkModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    gap: 12,
  },
  darkModeIcon: {
    fontSize: 20,
  },
  darkModeLabel: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  toggleContainer: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#cbd5e0",
    justifyContent: "center",
    padding: 2,
  },
  toggleContainerActive: {
    backgroundColor: "#6c5ce7",
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default BurgerMenu;
