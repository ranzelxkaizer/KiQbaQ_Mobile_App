import * as Clipboard from "expo-clipboard";
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

interface BudgetRequest {
  id: number;
  agent: string;
  requestTitle: string;
  amount: number;
  status: "Approved" | "Pending" | "Rejected";
  date: string;
}

interface Expense {
  id: number;
  agent: string;
  date: string;
  expected: number;
  actual: number;
  status: "Pending" | "Settled" | "Reimbursed";
}

const BudgetManagementScreen: React.FC = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const [activeTab, setActiveTab] = useState<"myBudget" | "expenses">(
    "myBudget",
  );
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([
    // Mock data - will be replaced with backend data
    {
      id: 1,
      agent: "Ranzel Jude",
      requestTitle: "Marketing Materials for School Visit",
      amount: 5000.0,
      status: "Approved",
      date: "Jan 15, 2026",
    },
    {
      id: 2,
      agent: "Ranzel Jude",
      requestTitle: "Transportation Budget for Campus Tours",
      amount: 3500.0,
      status: "Pending",
      date: "Jan 20, 2026",
    },
    {
      id: 3,
      agent: "Ranzel Jude",
      requestTitle: "Promotional Giveaways",
      amount: 2000.0,
      status: "Approved",
      date: "Jan 10, 2026",
    },
    {
      id: 4,
      agent: "Ranzel Jude",
      requestTitle: "Training Materials Purchase",
      amount: 1500.0,
      status: "Rejected",
      date: "Jan 5, 2026",
    },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    // Mock data - will be replaced with backend data
    {
      id: 1,
      agent: "Ranzel Jude",
      date: "Jan 28, 2026",
      expected: 5000.0,
      actual: 4850.0,
      status: "Settled",
    },
    {
      id: 2,
      agent: "Ranzel Jude",
      date: "Jan 25, 2026",
      expected: 3500.0,
      actual: 3500.0,
      status: "Pending",
    },
    {
      id: 3,
      agent: "Ranzel Jude",
      date: "Jan 20, 2026",
      expected: 2000.0,
      actual: 2150.0,
      status: "Reimbursed",
    },
    {
      id: 4,
      agent: "Ranzel Jude",
      date: "Jan 15, 2026",
      expected: 1200.0,
      actual: 1180.0,
      status: "Settled",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showExpensesExportDropdown, setShowExpensesExportDropdown] =
    useState(false);

  // Mock data
  const availableBudget = 12000.0;
  const totalExpenses = 11680.0;
  const currentBudget = 7000.0; // Approved requests (5000 + 2000)
  const pendingRequests = 1; // One pending request

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
    success: "#00d4aa",
    warning: "#ffc107",
    danger: "#dc3545",
  };

  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤",
  };

  const handleLogout = () => {
    router.dismissAll();
    router.replace("/LandingPage");
  };

  const handleMyProfile = () => {
    router.push("/ProfileScreen");
  };

  const handleExport = (format: string) => {
    const dataToExport = activeTab === "myBudget" ? filteredRequests : expenses;

    switch (format) {
      case "CSV":
        exportToCSV(dataToExport);
        break;
      case "Excel":
        exportToExcel(dataToExport);
        break;
      case "PDF":
        exportToPDF(dataToExport);
        break;
      case "Print":
        handlePrint(dataToExport);
        break;
      case "Copy":
        copyToClipboard(dataToExport);
        break;
    }

    setShowExportDropdown(false);
    setShowExpensesExportDropdown(false);
  };

  const exportToCSV = (data: any[]) => {
    try {
      let csvContent = "";

      if (activeTab === "myBudget") {
        // Budget Requests CSV
        csvContent = "Agent,Request Title,Amount,Status,Date\n";
        data.forEach((item: BudgetRequest) => {
          csvContent += `"${item.agent}","${item.requestTitle}",${item.amount},"${item.status}","${item.date}"\n`;
        });
      } else {
        // Expenses CSV
        csvContent = "Agent,Date,Expected,Actual,Status\n";
        data.forEach((item: Expense) => {
          csvContent += `"${item.agent}","${item.date}",${item.expected},${item.actual},"${item.status}"\n`;
        });
      }

      // In React Native, you would use a library like react-native-fs or expo-file-system
      // For now, just log success
      console.log("CSV Export:", csvContent);
      alert("CSV exported successfully!");

      // TODO: Implement actual file download using:
      // - expo-file-system for Expo
      // - react-native-fs for bare React Native
      // - Or share via react-native-share
    } catch (error) {
      console.error("CSV Export Error:", error);
      alert("Failed to export CSV");
    }
  };

  const exportToExcel = (data: any[]) => {
    try {
      // For Excel export, you would use a library like:
      // - xlsx (SheetJS) for web/Expo
      // Example implementation would be:
      /*
      import * as XLSX from 'xlsx';
      
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, activeTab === 'myBudget' ? 'Budget Requests' : 'Expenses');
      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
      
      // Then save using expo-file-system or react-native-fs
      */

      console.log("Excel Export:", data);
      alert("Excel exported successfully!");

      // TODO: Install and implement xlsx library:
      // npm install xlsx
    } catch (error) {
      console.error("Excel Export Error:", error);
      alert("Failed to export Excel");
    }
  };

  const exportToPDF = (data: any[]) => {
    try {
      // For PDF export, you would use:
      // - react-native-html-to-pdf for React Native
      // - expo-print for Expo
      // Example for Expo:
      /*
      import * as Print from 'expo-print';
      
      const html = `
        <html>
          <head>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #6c5ce7; color: white; }
            </style>
          </head>
          <body>
            <h1>${activeTab === 'myBudget' ? 'Budget Requests' : 'Expenses'}</h1>
            <table>
              ${generateTableHTML(data)}
            </table>
          </body>
        </html>
      `;
      
      await Print.printToFileAsync({ html });
      */

      console.log("PDF Export:", data);
      alert("PDF exported successfully!");

      // TODO: Install and implement expo-print:
      // expo install expo-print
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Failed to export PDF");
    }
  };

  const handlePrint = (data: any[]) => {
    try {
      // For printing, you would use:
      // - expo-print for Expo
      // Example:
      /*
      import * as Print from 'expo-print';
      
      const html = generatePrintHTML(data);
      await Print.printAsync({ html });
      */

      console.log("Print:", data);
      alert("Print dialog opened!");

      // TODO: Install expo-print for actual printing:
      // expo install expo-print
    } catch (error) {
      console.error("Print Error:", error);
      alert("Failed to print");
    }
  };

  const copyToClipboard = async (data: any[]) => {
    try {
      let textContent = "";

      if (activeTab === "myBudget") {
        // Budget Requests
        textContent = "Budget Requests\n\n";
        textContent += "Agent\tRequest Title\tAmount\tStatus\tDate\n";
        data.forEach((item: BudgetRequest) => {
          textContent += `${item.agent}\t${item.requestTitle}\t₱${item.amount.toFixed(2)}\t${item.status}\t${item.date}\n`;
        });
      } else {
        // Expenses
        textContent = "Expenses\n\n";
        textContent += "Agent\tDate\tExpected\tActual\tStatus\n";
        data.forEach((item: Expense) => {
          textContent += `${item.agent}\t${item.date}\t₱${item.expected.toFixed(2)}\t₱${item.actual.toFixed(2)}\t${item.status}\n`;
        });
      }

      // Copy to clipboard using Expo
      await Clipboard.setStringAsync(textContent);

      console.log("Copied to clipboard:", textContent);
      alert("Data copied to clipboard!");
    } catch (error) {
      console.error("Copy Error:", error);
      alert("Failed to copy to clipboard");
    }
  };

  const filteredRequests = budgetRequests.filter(
    (request) =>
      request.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return colors.success;
      case "Pending":
        return colors.warning;
      case "Rejected":
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  const getExpenseStatusColor = (status: string) => {
    switch (status) {
      case "Settled":
        return colors.success;
      case "Pending":
        return colors.warning;
      case "Reimbursed":
        return "#00d4aa";
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* BurgerMenu - Render at top level for proper z-index */}
      <BurgerMenu currentPage="Budget Management" />

      {/* Export Dropdown Backdrop */}
      {(showExportDropdown || showExpensesExportDropdown) && (
        <TouchableOpacity
          style={styles.exportDropdownBackdrop}
          activeOpacity={1}
          onPress={() => {
            setShowExportDropdown(false);
            setShowExpensesExportDropdown(false);
          }}
        />
      )}

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
          <Text style={[styles.pageIcon, { color: colors.text }]}>💰</Text>
          <View>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              Budget Management
            </Text>
            <Text
              style={[styles.pageSubtitle, { color: colors.textSecondary }]}
            >
              Manage your budget requests and track expenses.
            </Text>
          </View>
        </View>

        {/* Budget vs Expenses Overview Card */}
        <View
          style={[styles.overviewCard, { backgroundColor: colors.gradient1 }]}
        >
          <View style={styles.overviewHeader}>
            <Text style={styles.overviewIcon}>📊</Text>
            <Text style={styles.overviewTitle}>
              Budget vs Expenses Overview
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: "rgba(255, 255, 255, 0.3)" },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((totalExpenses / availableBudget) * 100, 100)}%`,
                    backgroundColor: colors.success,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.budgetStats}>
            <View style={styles.budgetStat}>
              <Text style={styles.budgetStatLabel}>● Available Budget:</Text>
              <Text style={styles.budgetStatValue}>
                ₱{availableBudget.toFixed(2)}
              </Text>
            </View>
            <View style={styles.budgetStat}>
              <Text style={styles.budgetStatLabel}>● Total Expenses:</Text>
              <Text style={styles.budgetStatValue}>
                ₱{totalExpenses.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "myBudget" && styles.tabActive,
              {
                borderBottomColor:
                  activeTab === "myBudget" ? colors.primary : "transparent",
              },
            ]}
            onPress={() => setActiveTab("myBudget")}
          >
            <Text
              style={[
                styles.tabIcon,
                activeTab === "myBudget" && { color: colors.primary },
              ]}
            >
              📋
            </Text>
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "myBudget"
                      ? colors.primary
                      : colors.textSecondary,
                },
              ]}
            >
              My Budget
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "expenses" && styles.tabActive,
              {
                borderBottomColor:
                  activeTab === "expenses" ? colors.primary : "transparent",
              },
            ]}
            onPress={() => setActiveTab("expenses")}
          >
            <Text
              style={[
                styles.tabIcon,
                activeTab === "expenses" && { color: colors.primary },
              ]}
            >
              💸
            </Text>
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "expenses"
                      ? colors.primary
                      : colors.textSecondary,
                },
              ]}
            >
              Expenses
            </Text>
          </TouchableOpacity>
        </View>

        {/* My Budget Tab Content */}
        {activeTab === "myBudget" && (
          <>
            {/* Budget Summary Cards */}
            <View style={styles.summaryCards}>
              <View
                style={[
                  styles.summaryCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderLeftColor: colors.primary,
                  },
                ]}
              >
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  CURRENT BUDGET (APPROVED)
                </Text>
                <Text style={[styles.summaryValue, { color: colors.primary }]}>
                  ₱{currentBudget.toFixed(2)}
                </Text>
              </View>

              <View
                style={[
                  styles.summaryCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderLeftColor: colors.warning,
                  },
                ]}
              >
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  PENDING BUDGET REQUESTS
                </Text>
                <Text style={[styles.summaryValue, { color: colors.warning }]}>
                  {pendingRequests}
                </Text>
              </View>
            </View>

            {/* Budget Requests Section */}
            <View
              style={[
                styles.requestsCard,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <View style={styles.requestsHeader}>
                <Text style={[styles.requestsTitle, { color: colors.text }]}>
                  Budget Requests
                </Text>
                <View style={styles.requestsActions}>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.exportButtonSmall,
                        { borderColor: colors.border },
                      ]}
                      onPress={() => setShowExportDropdown(!showExportDropdown)}
                    >
                      <Text
                        style={[
                          styles.exportButtonTextSmall,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Export
                      </Text>
                      <Text
                        style={[
                          styles.exportDropdownArrow,
                          { color: colors.textSecondary },
                        ]}
                      >
                        ▼
                      </Text>
                    </TouchableOpacity>

                    {/* Export Dropdown Menu */}
                    {showExportDropdown && (
                      <View
                        style={[
                          styles.exportDropdownMenu,
                          {
                            backgroundColor: colors.cardBackground,
                            borderColor: colors.border,
                          },
                        ]}
                      >
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("Print")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            Print
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("CSV")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            CSV
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("Excel")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            Excel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("PDF")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            PDF
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("Copy")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            Copy
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.addButtonSmall,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setShowAddRequestModal(true)}
                  >
                    <Text style={styles.addButtonTextSmall}>+ Add</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Search and Filter */}
              <View style={styles.requestsControls}>
                <TextInput
                  style={[
                    styles.searchInputFull,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="Search requests..."
                  placeholderTextColor={colors.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              {/* Request Cards List */}
              {filteredRequests.length === 0 ? (
                <View style={styles.emptyRequestsState}>
                  <Text style={styles.emptyRequestsIcon}>📋</Text>
                  <Text
                    style={[
                      styles.emptyRequestsText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    No budget requests yet
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.emptyAddButton,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setShowAddRequestModal(true)}
                  >
                    <Text style={styles.emptyAddButtonText}>
                      + Add Your First Request
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.requestsList}>
                  {filteredRequests.map((request) => (
                    <View
                      key={request.id}
                      style={[
                        styles.requestCard,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      {/* Request Header */}
                      <View style={styles.requestCardHeader}>
                        <View style={styles.requestCardTitleSection}>
                          <Text
                            style={[
                              styles.requestCardTitle,
                              { color: colors.text },
                            ]}
                          >
                            {request.requestTitle}
                          </Text>
                          <Text
                            style={[
                              styles.requestCardAgent,
                              { color: colors.textSecondary },
                            ]}
                          >
                            by {request.agent}
                          </Text>
                        </View>
                        <TouchableOpacity style={styles.requestCardMenu}>
                          <Text style={styles.requestCardMenuIcon}>⋮</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Request Details */}
                      <View style={styles.requestCardBody}>
                        <View style={styles.requestCardRow}>
                          <View style={styles.requestCardField}>
                            <Text
                              style={[
                                styles.requestCardLabel,
                                { color: colors.textSecondary },
                              ]}
                            >
                              Amount
                            </Text>
                            <Text
                              style={[
                                styles.requestCardValue,
                                { color: colors.text },
                              ]}
                            >
                              ₱{request.amount.toFixed(2)}
                            </Text>
                          </View>
                          <View style={styles.requestCardField}>
                            <Text
                              style={[
                                styles.requestCardLabel,
                                { color: colors.textSecondary },
                              ]}
                            >
                              Date
                            </Text>
                            <Text
                              style={[
                                styles.requestCardValue,
                                { color: colors.text },
                              ]}
                            >
                              {request.date}
                            </Text>
                          </View>
                        </View>

                        {/* Status Badge */}
                        <View style={styles.requestCardFooter}>
                          <View
                            style={[
                              styles.requestStatusBadge,
                              {
                                backgroundColor: getStatusColor(request.status),
                              },
                            ]}
                          >
                            <Text style={styles.requestStatusText}>
                              {request.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Show Entries Info */}
              {filteredRequests.length > 0 && (
                <View style={styles.requestsFooter}>
                  <Text
                    style={[
                      styles.requestsFooterText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Showing {filteredRequests.length} request
                    {filteredRequests.length !== 1 ? "s" : ""}
                  </Text>
                </View>
              )}
            </View>
          </>
        )}

        {/* Expenses Tab Content */}
        {activeTab === "expenses" && (
          <>
            {/* Expenses Summary Cards */}
            <View style={styles.summaryCards}>
              <View
                style={[
                  styles.summaryCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderLeftColor: colors.warning,
                  },
                ]}
              >
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  PENDING EXPENSES
                </Text>
                <Text style={[styles.summaryValue, { color: colors.warning }]}>
                  {expenses.filter((e) => e.status === "Pending").length}
                </Text>
              </View>

              <View
                style={[
                  styles.summaryCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderLeftColor: "#00d4aa",
                  },
                ]}
              >
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  SETTLED EXPENSES
                </Text>
                <Text style={[styles.summaryValue, { color: "#00d4aa" }]}>
                  {expenses.filter((e) => e.status === "Settled").length}
                </Text>
              </View>

              <View
                style={[
                  styles.summaryCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderLeftColor: colors.danger,
                  },
                ]}
              >
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  PENDING REIMBURSEMENTS
                </Text>
                <Text style={[styles.summaryValue, { color: colors.danger }]}>
                  {expenses.filter((e) => e.status === "Reimbursed").length}
                </Text>
              </View>
            </View>

            {/* Status Filter Dropdown */}
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={[
                  styles.statusFilterDropdown,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.filterText, { color: colors.text }]}>
                  All Status
                </Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Expenses Section */}
            <View
              style={[
                styles.requestsCard,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <View style={styles.requestsHeader}>
                <Text style={[styles.requestsTitle, { color: colors.text }]}>
                  Expenses
                </Text>
                <View style={styles.requestsActions}>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.exportButtonSmall,
                        { borderColor: colors.border },
                      ]}
                      onPress={() =>
                        setShowExpensesExportDropdown(
                          !showExpensesExportDropdown,
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.exportButtonTextSmall,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Export
                      </Text>
                      <Text
                        style={[
                          styles.exportDropdownArrow,
                          { color: colors.textSecondary },
                        ]}
                      >
                        ▼
                      </Text>
                    </TouchableOpacity>

                    {/* Export Dropdown Menu */}
                    {showExpensesExportDropdown && (
                      <View
                        style={[
                          styles.exportDropdownMenu,
                          {
                            backgroundColor: colors.cardBackground,
                            borderColor: colors.border,
                          },
                        ]}
                      >
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("Print")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            Print
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("CSV")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            CSV
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("Excel")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            Excel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("PDF")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            PDF
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.exportMenuItem}
                          onPress={() => handleExport("Copy")}
                        >
                          <Text
                            style={[
                              styles.exportMenuText,
                              { color: colors.text },
                            ]}
                          >
                            Copy
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Search */}
              <View style={styles.requestsControls}>
                <TextInput
                  style={[
                    styles.searchInputFull,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="Search expenses..."
                  placeholderTextColor={colors.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              {/* Expenses Cards List */}
              {expenses.length === 0 ? (
                <View style={styles.emptyRequestsState}>
                  <Text style={styles.emptyRequestsIcon}>💸</Text>
                  <Text
                    style={[
                      styles.emptyRequestsText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    No expenses recorded yet
                  </Text>
                  <Text
                    style={[
                      styles.emptyRequestsSubtext,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Your expenses will appear here once logged
                  </Text>
                </View>
              ) : (
                <View style={styles.requestsList}>
                  {expenses.map((expense) => (
                    <View
                      key={expense.id}
                      style={[
                        styles.requestCard,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      {/* Expense Header */}
                      <View style={styles.requestCardHeader}>
                        <View style={styles.requestCardTitleSection}>
                          <Text
                            style={[
                              styles.requestCardTitle,
                              { color: colors.text },
                            ]}
                          >
                            {expense.agent}
                          </Text>
                          <Text
                            style={[
                              styles.requestCardAgent,
                              { color: colors.textSecondary },
                            ]}
                          >
                            {expense.date}
                          </Text>
                        </View>
                        <TouchableOpacity style={styles.requestCardMenu}>
                          <Text style={styles.requestCardMenuIcon}>⋮</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Expense Details */}
                      <View style={styles.requestCardBody}>
                        <View style={styles.requestCardRow}>
                          <View style={styles.requestCardField}>
                            <Text
                              style={[
                                styles.requestCardLabel,
                                { color: colors.textSecondary },
                              ]}
                            >
                              Expected
                            </Text>
                            <Text
                              style={[
                                styles.requestCardValue,
                                { color: colors.text },
                              ]}
                            >
                              ₱{expense.expected.toFixed(2)}
                            </Text>
                          </View>
                          <View style={styles.requestCardField}>
                            <Text
                              style={[
                                styles.requestCardLabel,
                                { color: colors.textSecondary },
                              ]}
                            >
                              Actual
                            </Text>
                            <Text
                              style={[
                                styles.requestCardValue,
                                { color: colors.text },
                              ]}
                            >
                              ₱{expense.actual.toFixed(2)}
                            </Text>
                          </View>
                        </View>

                        {/* Status Badge */}
                        <View style={styles.requestCardFooter}>
                          <View
                            style={[
                              styles.requestStatusBadge,
                              {
                                backgroundColor: getExpenseStatusColor(
                                  expense.status,
                                ),
                              },
                            ]}
                          >
                            <Text style={styles.requestStatusText}>
                              {expense.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Footer */}
              <View style={styles.requestsFooter}>
                <Text
                  style={[
                    styles.requestsFooterText,
                    { color: colors.textSecondary },
                  ]}
                >
                  Showing {expenses.length} expense
                  {expenses.length !== 1 ? "s" : ""}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Add Budget Request Modal */}
      <Modal
        visible={showAddRequestModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddRequestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowAddRequestModal(false)}
          />
          <View
            style={[
              styles.addRequestModal,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Add Budget Request
                </Text>
                <TouchableOpacity onPress={() => setShowAddRequestModal(false)}>
                  <Text
                    style={[styles.closeIcon, { color: colors.textSecondary }]}
                  >
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form Content */}
              <View style={styles.modalFormContent}>
                {/* Request Title */}
                <View style={styles.formGroup}>
                  <Text
                    style={[styles.formLabel, { color: colors.textSecondary }]}
                  >
                    Request Title <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={[
                      styles.formInput,
                      {
                        backgroundColor: colors.background,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    placeholder="Enter request title"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                {/* Amount */}
                <View style={styles.formGroup}>
                  <Text
                    style={[styles.formLabel, { color: colors.textSecondary }]}
                  >
                    Amount <Text style={styles.required}>*</Text>
                  </Text>
                  <View
                    style={[
                      styles.amountInputContainer,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.currencySymbol, { color: colors.text }]}
                    >
                      ₱
                    </Text>
                    <TextInput
                      style={[styles.amountInput, { color: colors.text }]}
                      placeholder="0.00"
                      placeholderTextColor={colors.textSecondary}
                      keyboardType="decimal-pad"
                    />
                    <View style={styles.amountSpinners}>
                      <TouchableOpacity style={styles.spinnerButton}>
                        <Text style={styles.spinnerIcon}>▲</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.spinnerButton}>
                        <Text style={styles.spinnerIcon}>▼</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Notes */}
                <View style={styles.formGroup}>
                  <Text
                    style={[styles.formLabel, { color: colors.textSecondary }]}
                  >
                    Notes
                  </Text>
                  <TextInput
                    style={[
                      styles.notesInput,
                      {
                        backgroundColor: colors.background,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    placeholder="Additional notes..."
                    placeholderTextColor={colors.textSecondary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                {/* Info Box */}
                <View
                  style={[
                    styles.infoBox,
                    {
                      backgroundColor: isDarkMode
                        ? "rgba(0, 212, 170, 0.1)"
                        : "#e8f9f6",
                      borderColor: "#00d4aa",
                    },
                  ]}
                >
                  <Text style={styles.infoIcon}>ℹ️</Text>
                  <Text
                    style={[
                      styles.infoText,
                      { color: isDarkMode ? "#00d4aa" : "#00a88f" },
                    ]}
                  >
                    Budget requests typically require 2-3 business days for
                    review and approval.
                  </Text>
                </View>
              </View>

              {/* Modal Footer */}
              <View style={styles.modalFooterButtons}>
                <TouchableOpacity
                  style={[
                    styles.modalCancelButton,
                    {
                      backgroundColor: isDarkMode ? "#404040" : "#e9ecef",
                    },
                  ]}
                  onPress={() => setShowAddRequestModal(false)}
                >
                  <Text
                    style={[
                      styles.modalCancelButtonText,
                      {
                        color: isDarkMode ? "#ffffff" : "#6c757d",
                      },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalSubmitButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => {
                    // TODO: Implement submit budget request
                    console.log("Submitting budget request...");
                    setShowAddRequestModal(false);
                  }}
                >
                  <Text style={styles.modalSubmitButtonText}>
                    Submit Request
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
  },
  overviewCard: {
    borderRadius: 0,
    padding: 16,
    marginBottom: 20,
  },
  overviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  overviewIcon: {
    fontSize: 18,
    color: "#ffffff",
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  budgetStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  budgetStat: {
    flex: 1,
  },
  budgetStatLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 4,
  },
  budgetStatValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 6,
    borderBottomWidth: 2,
  },
  tabActive: {
    // Active state handled by borderBottomColor prop
  },
  tabIcon: {
    fontSize: 16,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  summaryCards: {
    gap: 16,
    marginBottom: 20,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  requestsCard: {
    borderRadius: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 0,
  },
  requestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  requestsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  requestsActions: {
    flexDirection: "row",
    gap: 8,
  },
  exportButtonSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  exportButtonTextSmall: {
    fontSize: 12,
    fontWeight: "600",
  },
  exportDropdownArrow: {
    fontSize: 10,
  },
  exportDropdownMenu: {
    position: "absolute",
    top: 40,
    right: 0,
    minWidth: 120,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  exportMenuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  exportMenuText: {
    fontSize: 14,
  },
  exportDropdownBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  addButtonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonTextSmall: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  requestsControls: {
    padding: 16,
    paddingBottom: 12,
  },
  searchInputFull: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  emptyRequestsState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyRequestsIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyRequestsText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyRequestsSubtext: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  emptyAddButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyAddButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  requestsList: {
    padding: 16,
    gap: 12,
  },
  requestCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  requestCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  requestCardTitleSection: {
    flex: 1,
  },
  requestCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  requestCardAgent: {
    fontSize: 12,
  },
  requestCardMenu: {
    padding: 4,
  },
  requestCardMenuIcon: {
    fontSize: 20,
    color: "#6c757d",
  },
  requestCardBody: {
    gap: 12,
  },
  requestCardRow: {
    flexDirection: "row",
    gap: 16,
  },
  requestCardField: {
    flex: 1,
  },
  requestCardLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    marginBottom: 4,
    fontWeight: "600",
  },
  requestCardValue: {
    fontSize: 15,
    fontWeight: "500",
  },
  requestCardFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  requestStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  requestStatusText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  requestsFooter: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  requestsFooterText: {
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 40,
  },
  tableCard: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  tableHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tableActions: {
    flexDirection: "row",
    gap: 8,
  },
  exportButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
  },
  exportButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
  addButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  tableControls: {
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
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  table: {
    minWidth: 800,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableHeaderRow: {
    paddingVertical: 12,
  },
  tableHeaderCell: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  tableCell: {
    fontSize: 13,
    paddingHorizontal: 8,
  },
  colAgent: {
    width: 120,
  },
  colRequest: {
    width: 180,
  },
  colAmount: {
    width: 100,
  },
  colStatus: {
    width: 100,
  },
  colDate: {
    width: 100,
  },
  colAction: {
    width: 80,
    alignItems: "center",
  },
  colExpenseAgent: {
    width: 150,
  },
  colExpenseDate: {
    width: 120,
  },
  colExpected: {
    width: 120,
  },
  colActual: {
    width: 120,
  },
  colExpenseStatus: {
    width: 100,
  },
  colExpenseAction: {
    width: 80,
    alignItems: "center",
  },
  filterContainer: {
    marginBottom: 20,
  },
  statusFilterDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  actionButton: {
    padding: 4,
  },
  actionButtonText: {
    fontSize: 18,
    color: "#6c757d",
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
  },
  tableFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  footerText: {
    fontSize: 12,
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
  },
  paginationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  paginationButtonText: {
    fontSize: 12,
    fontWeight: "600",
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
  addRequestModal: {
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
  modalFormContent: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  required: {
    color: "#dc3545",
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
  },
  amountSpinners: {
    marginLeft: 8,
  },
  spinnerButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  spinnerIcon: {
    fontSize: 10,
    color: "#6c757d",
  },
  notesInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    minHeight: 100,
  },
  infoBox: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderLeftWidth: 4,
    marginTop: 10,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  modalFooterButtons: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  modalSubmitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalSubmitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  modalContent: {
    padding: 40,
    alignItems: "center",
  },
  modalPlaceholder: {
    fontSize: 14,
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cancelButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default BudgetManagementScreen;
