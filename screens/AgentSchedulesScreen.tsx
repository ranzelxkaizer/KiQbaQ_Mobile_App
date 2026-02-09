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

interface Schedule {
  id: number;
  type: string;
  schoolName: string;
  address: string;
  schedule: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Pending";
}

const AgentSchedulesScreen: React.FC = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  // Current date state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date()); // Date being viewed in calendar
  const [pickerViewDate, setPickerViewDate] = useState(new Date()); // Separate state for date picker

  const [activeView, setActiveView] = useState<"table" | "calendar">("table");
  const [schedules, setSchedules] = useState<Schedule[]>([
    // Mock data - will be replaced with backend data
    {
      id: 1,
      type: "School Visit",
      schoolName: "San Pedro High School",
      address: "San Pedro, Laguna",
      schedule: "Feb 10, 2026 - 9:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      type: "Demo Presentation",
      schoolName: "Biñan Elementary School",
      address: "Biñan City, Laguna",
      schedule: "Feb 12, 2026 - 2:00 PM",
      status: "Scheduled",
    },
    {
      id: 3,
      type: "Follow-up Meeting",
      schoolName: "Cabuyao National High School",
      address: "Cabuyao, Laguna",
      schedule: "Feb 8, 2026 - 10:30 AM",
      status: "Completed",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterLead, setFilterLead] = useState("All Leads");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDayDetailsModal, setShowDayDetailsModal] = useState(false);

  // Add Schedule Form State
  const [scheduleType, setScheduleType] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [expenseCategories, setExpenseCategories] = useState<number[]>([]);
  const [expectedAmount, setExpectedAmount] = useState("");
  const [remarks, setRemarks] = useState("");

  // Validation state
  const [scheduleErrors, setScheduleErrors] = useState<{
    [key: string]: string;
  }>({});
  const [showScheduleConfirmation, setShowScheduleConfirmation] =
    useState(false);

  // Dropdown states
  const [showScheduleTypeDropdown, setShowScheduleTypeDropdown] =
    useState(false);
  const [showLeadsDropdown, setShowLeadsDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showExpenseCategoriesDropdown, setShowExpenseCategoriesDropdown] =
    useState(false);

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
    info: "#17a2b8",
  };

  const userData = {
    name: "Ranzel Jude",
    role: "Agent",
    avatar: "👤",
  };

  const handleLogout = () => {
    router.dismissAll();
    router.replace("/");
  };

  const handleMyProfile = () => {
    router.push("/ProfileScreen");
  };

  // Calendar utility functions
  const getMonthName = (date: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[date.getMonth()];
  };

  const getYear = (date: Date) => {
    return date.getFullYear();
  };

  const navigateToPreviousMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);

    // Limit to 5 years back from today
    const minDate = new Date(currentDate);
    minDate.setFullYear(minDate.getFullYear() - 5);

    if (newDate >= minDate) {
      setViewDate(newDate);
    }
  };

  const navigateToNextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);

    // Limit to 5 years forward from today
    const maxDate = new Date(currentDate);
    maxDate.setFullYear(maxDate.getFullYear() + 5);

    if (newDate <= maxDate) {
      setViewDate(newDate);
    }
  };

  const navigateToToday = () => {
    setViewDate(new Date(currentDate));
  };

  const isToday = (day: number, month: number, year: number) => {
    return (
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    );
  };

  const getCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Previous month
    const prevMonthLastDay = new Date(year, month, 0);
    const daysInPrevMonth = prevMonthLastDay.getDate();

    const calendarDays: Array<{
      day: number;
      month: "prev" | "current" | "next";
      date: Date;
    }> = [];

    // Add previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        month: "prev",
        date: new Date(year, month - 1, daysInPrevMonth - i),
      });
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        month: "current",
        date: new Date(year, month, i),
      });
    }

    // Add next month days to complete the grid (42 cells = 6 weeks)
    const remainingCells = 42 - calendarDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({
        day: i,
        month: "next",
        date: new Date(year, month + 1, i),
      });
    }

    return calendarDays;
  };

  const hasScheduleOnDate = (date: Date) => {
    // Check if any schedule falls on this date
    // This is a simple check - you'll need to parse your schedule dates properly
    return schedules.some((schedule) => {
      // For demo: Feb 10 and Feb 12, 2026
      const scheduleDate = schedule.schedule.split(" - ")[0];
      return scheduleDate.includes(
        `${getMonthName(date).slice(0, 3)} ${date.getDate()}`,
      );
    });
  };

  const getSchedulesForDate = (date: Date) => {
    // Get all schedules for a specific date
    return schedules.filter((schedule) => {
      const scheduleDate = schedule.schedule.split(" - ")[0];
      return scheduleDate.includes(
        `${getMonthName(date).slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`,
      );
    });
  };

  const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDate(date);
      setShowDayDetailsModal(true);
    }
  };

  const formatSelectedDate = (date: Date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    return `${dayName}, ${getMonthName(date)} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Schedule Types
  const scheduleTypes = [
    { id: "visit", label: "School Visit" },
    { id: "demo", label: "Demo Presentation" },
    { id: "followup", label: "Follow-up Meeting" },
    { id: "training", label: "Training Session" },
  ];

  // Mock Leads - This will come from API
  const availableLeads = [
    {
      id: 1,
      schoolName: "San Pedro High School",
      address: "San Pedro, Laguna",
    },
    {
      id: 2,
      schoolName: "Biñan Elementary School",
      address: "Biñan City, Laguna",
    },
    {
      id: 3,
      schoolName: "Cabuyao National High School",
      address: "Cabuyao, Laguna",
    },
    {
      id: 4,
      schoolName: "Santa Rosa Science High School",
      address: "Santa Rosa, Laguna",
    },
  ];

  // Time slots (30-minute increments)
  const timeSlots = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ];

  // Expense Categories - This will come from API
  const expenseCategoriesList = [
    { id: 1, name: "Transportation" },
    { id: 2, name: "Marketing Materials" },
    { id: 3, name: "Food & Beverages" },
    { id: 4, name: "Accommodation" },
    { id: 5, name: "Miscellaneous" },
  ];

  const handleScheduleTypeSelect = (type: string) => {
    setScheduleType(type);
    setShowScheduleTypeDropdown(false);
  };

  const handleLeadToggle = (leadId: number) => {
    if (selectedLeads.includes(leadId)) {
      setSelectedLeads(selectedLeads.filter((id) => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
    setScheduleDate(formattedDate);
    setShowDatePicker(false);
  };

  const navigatePickerToPreviousMonth = () => {
    const newDate = new Date(pickerViewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setPickerViewDate(newDate);
  };

  const navigatePickerToNextMonth = () => {
    const newDate = new Date(pickerViewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setPickerViewDate(newDate);
  };

  const navigatePickerToToday = () => {
    setPickerViewDate(new Date(currentDate));
  };

  const getPickerCalendarDays = () => {
    const year = pickerViewDate.getFullYear();
    const month = pickerViewDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Previous month
    const prevMonthLastDay = new Date(year, month, 0);
    const daysInPrevMonth = prevMonthLastDay.getDate();

    const calendarDays: Array<{
      day: number;
      month: "prev" | "current" | "next";
      date: Date;
    }> = [];

    // Add previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        month: "prev",
        date: new Date(year, month - 1, daysInPrevMonth - i),
      });
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        month: "current",
        date: new Date(year, month, i),
      });
    }

    // Add next month days to complete the grid (42 cells = 6 weeks)
    const remainingCells = 42 - calendarDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({
        day: i,
        month: "next",
        date: new Date(year, month + 1, i),
      });
    }

    return calendarDays;
  };

  const handleTimeSelect = (time: string) => {
    setScheduleTime(time);
    setShowTimePicker(false);
  };

  const handleExpenseCategoryToggle = (categoryId: number) => {
    if (expenseCategories.includes(categoryId)) {
      setExpenseCategories(expenseCategories.filter((id) => id !== categoryId));
    } else {
      setExpenseCategories([...expenseCategories, categoryId]);
    }
  };

  const getSelectedLeadsText = () => {
    if (selectedLeads.length === 0) return "Select one or more schools";
    if (selectedLeads.length === 1) {
      const lead = availableLeads.find((l) => l.id === selectedLeads[0]);
      return lead?.schoolName || "";
    }
    return `${selectedLeads.length} schools selected`;
  };

  const getSelectedExpenseCategoriesText = () => {
    if (expenseCategories.length === 0) return "Select expense categories";
    if (expenseCategories.length === 1) {
      const category = expenseCategoriesList.find(
        (c) => c.id === expenseCategories[0],
      );
      return category?.name || "";
    }
    return `${expenseCategories.length} categories selected`;
  };

  const validateScheduleForm = () => {
    const errors: { [key: string]: string } = {};

    if (!scheduleType.trim()) {
      errors.scheduleType = "Schedule type is required";
    }

    if (selectedLeads.length === 0) {
      errors.leads = "At least one school must be selected";
    }

    if (!scheduleDate.trim()) {
      errors.scheduleDate = "Date is required";
    }

    if (!scheduleTime.trim()) {
      errors.scheduleTime = "Time is required";
    }

    if (expenseCategories.length === 0) {
      errors.expenseCategories =
        "At least one expense category must be selected";
    }

    if (!expectedAmount.trim()) {
      errors.expectedAmount = "Expected amount is required";
    } else if (parseFloat(expectedAmount) <= 0) {
      errors.expectedAmount = "Expected amount must be greater than 0";
    }

    setScheduleErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleScheduleSave = () => {
    // Validate form
    if (validateScheduleForm()) {
      // Show confirmation dialog
      setShowScheduleConfirmation(true);
    }
  };

  const handleConfirmScheduleSave = () => {
    // TODO: Implement save schedule to backend
    /*
    const scheduleData = {
      scheduleType: scheduleType,
      leadIds: selectedLeads,
      scheduleDate: scheduleDate,
      scheduleTime: scheduleTime,
      expenseCategoryIds: expenseCategories,
      expectedAmount: parseFloat(expectedAmount),
      remarks: remarks || undefined,
    };
    
    // POST to API
    await fetch('YOUR_API_URL/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheduleData),
    });
    */

    console.log("Saving schedule with expense tracking...", {
      scheduleType,
      selectedLeads,
      scheduleDate,
      scheduleTime,
      expenseCategories,
      expectedAmount,
      remarks,
    });

    // Close modals and reset form
    setShowScheduleConfirmation(false);
    setShowAddScheduleModal(false);
    clearScheduleForm();

    alert("Schedule created successfully!");
  };

  const clearScheduleForm = () => {
    setScheduleType("");
    setSelectedLeads([]);
    setScheduleDate("");
    setScheduleTime("");
    setExpenseCategories([]);
    setExpectedAmount("");
    setRemarks("");
    setScheduleErrors({});
  };

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return colors.info;
      case "Completed":
        return colors.success;
      case "Cancelled":
        return colors.danger;
      case "Pending":
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* BurgerMenu - Render at top level for proper z-index */}
      <BurgerMenu currentPage="Agent Schedules" />

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
            onPress={() => setNotificationsVisible(true)}
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
          <Text style={[styles.pageIcon, { color: colors.text }]}>📅</Text>
          <View>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              Schedule Management
            </Text>
            <Text
              style={[styles.pageSubtitle, { color: colors.textSecondary }]}
            >
              Organize and track your appointments and meetings.
            </Text>
          </View>
        </View>

        {/* All Schedules Header Card */}
        <View
          style={[styles.headerCard, { backgroundColor: colors.gradient1 }]}
        >
          <View style={styles.headerCardContent}>
            <Text style={styles.headerCardIcon}>📋</Text>
            <Text style={styles.headerCardTitle}>All Schedules</Text>
          </View>
          <TouchableOpacity
            style={styles.addScheduleButton}
            onPress={() => setShowAddScheduleModal(true)}
          >
            <Text style={styles.addScheduleIcon}>⊕</Text>
            <Text style={styles.addScheduleText}>Add Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* View Toggle Tabs */}
        <View style={styles.viewTabs}>
          <TouchableOpacity
            style={[
              styles.viewTab,
              activeView === "table" && styles.viewTabActive,
              {
                backgroundColor:
                  activeView === "table"
                    ? colors.primary
                    : colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setActiveView("table")}
          >
            <Text
              style={[
                styles.viewTabIcon,
                { color: activeView === "table" ? "#ffffff" : colors.text },
              ]}
            >
              📊
            </Text>
            <Text
              style={[
                styles.viewTabText,
                { color: activeView === "table" ? "#ffffff" : colors.text },
              ]}
            >
              Table
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.viewTab,
              activeView === "calendar" && styles.viewTabActive,
              {
                backgroundColor:
                  activeView === "calendar"
                    ? colors.primary
                    : colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setActiveView("calendar")}
          >
            <Text
              style={[
                styles.viewTabIcon,
                { color: activeView === "calendar" ? "#ffffff" : colors.text },
              ]}
            >
              📆
            </Text>
            <Text
              style={[
                styles.viewTabText,
                { color: activeView === "calendar" ? "#ffffff" : colors.text },
              ]}
            >
              Calendar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Table View */}
        {activeView === "table" && (
          <View
            style={[
              styles.tableCard,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            {/* Filter by Lead */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: colors.text }]}>
                Filter by Lead
              </Text>
              <TouchableOpacity
                style={[
                  styles.filterDropdown,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <Text
                  style={[styles.filterDropdownText, { color: colors.text }]}
                >
                  {filterLead}
                </Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Controls */}
            <View style={styles.tableControls}>
              <View style={styles.entriesControl}>
                <Text style={[styles.controlLabel, { color: colors.text }]}>
                  Show
                </Text>
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

            {/* Schedule Cards */}
            {filteredSchedules.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>📅</Text>
                <Text
                  style={[
                    styles.emptyStateText,
                    { color: colors.textSecondary },
                  ]}
                >
                  No schedules found
                </Text>
              </View>
            ) : (
              <View style={styles.schedulesList}>
                {filteredSchedules.map((schedule) => (
                  <View
                    key={schedule.id}
                    style={[
                      styles.scheduleCard,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    {/* Card Header */}
                    <View style={styles.scheduleCardHeader}>
                      <View style={styles.scheduleCardTitleSection}>
                        <Text
                          style={[
                            styles.scheduleCardNumber,
                            { color: colors.textSecondary },
                          ]}
                        >
                          #{schedule.id}
                        </Text>
                        <Text
                          style={[
                            styles.scheduleCardType,
                            { color: colors.text },
                          ]}
                        >
                          {schedule.type}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.scheduleStatusBadge,
                          { backgroundColor: getStatusColor(schedule.status) },
                        ]}
                      >
                        <Text style={styles.scheduleStatusText}>
                          {schedule.status}
                        </Text>
                      </View>
                    </View>

                    {/* School Info */}
                    <View style={styles.scheduleCardBody}>
                      <View style={styles.scheduleCardField}>
                        <Text
                          style={[
                            styles.scheduleCardLabel,
                            { color: colors.textSecondary },
                          ]}
                        >
                          School Name
                        </Text>
                        <Text
                          style={[
                            styles.scheduleCardValue,
                            { color: colors.text },
                          ]}
                        >
                          {schedule.schoolName}
                        </Text>
                      </View>

                      <View style={styles.scheduleCardField}>
                        <Text
                          style={[
                            styles.scheduleCardLabel,
                            { color: colors.textSecondary },
                          ]}
                        >
                          Address
                        </Text>
                        <Text
                          style={[
                            styles.scheduleCardValue,
                            { color: colors.text },
                          ]}
                        >
                          {schedule.address}
                        </Text>
                      </View>

                      <View style={styles.scheduleCardField}>
                        <Text
                          style={[
                            styles.scheduleCardLabel,
                            { color: colors.textSecondary },
                          ]}
                        >
                          Schedule
                        </Text>
                        <Text
                          style={[
                            styles.scheduleCardValue,
                            { color: colors.text },
                          ]}
                        >
                          {schedule.schedule}
                        </Text>
                      </View>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity style={styles.scheduleCardAction}>
                      <Text style={styles.scheduleCardActionIcon}>⋮</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Footer */}
            <View style={styles.tableFooter}>
              <Text
                style={[styles.footerText, { color: colors.textSecondary }]}
              >
                Showing {filteredSchedules.length} of {schedules.length} entries
              </Text>
              <View style={styles.pagination}>
                <TouchableOpacity
                  style={[
                    styles.paginationButton,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.paginationButtonText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    ‹
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.paginationButton,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.paginationButtonText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    ›
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Calendar View */}
        {activeView === "calendar" && (
          <View
            style={[
              styles.calendarCard,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            {/* Calendar Header */}
            <View
              style={[
                styles.calendarHeader,
                { backgroundColor: colors.gradient1 },
              ]}
            >
              <View style={styles.calendarNav}>
                <TouchableOpacity
                  style={styles.calendarNavButton}
                  onPress={navigateToPreviousMonth}
                >
                  <Text style={styles.calendarNavIcon}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.todayButton}
                  onPress={navigateToToday}
                >
                  <Text style={styles.todayButtonText}>today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.calendarNavButton}
                  onPress={navigateToNextMonth}
                >
                  <Text style={styles.calendarNavIcon}>›</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.calendarMonth}>
                {getMonthName(viewDate)} {getYear(viewDate)}
              </Text>
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {/* Day Headers */}
              <View style={styles.calendarDayHeaders}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <View key={day} style={styles.calendarDayHeader}>
                      <Text
                        style={[
                          styles.calendarDayHeaderText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {day}
                      </Text>
                    </View>
                  ),
                )}
              </View>

              {/* Calendar Days - Dynamic */}
              <View style={styles.calendarDays}>
                {getCalendarDays().map((dayInfo, index) => {
                  const isTodayDate =
                    dayInfo.month === "current" &&
                    isToday(
                      dayInfo.day,
                      viewDate.getMonth(),
                      viewDate.getFullYear(),
                    );
                  const isCurrentMonth = dayInfo.month === "current";
                  const hasSchedule = hasScheduleOnDate(dayInfo.date);

                  return (
                    <TouchableOpacity
                      key={`day-${index}`}
                      style={[
                        styles.calendarDay,
                        isTodayDate && styles.calendarDayToday,
                        { borderColor: colors.border },
                      ]}
                      onPress={() =>
                        handleDayClick(dayInfo.date, isCurrentMonth)
                      }
                      disabled={!isCurrentMonth}
                    >
                      <Text
                        style={[
                          styles.calendarDayNumber,
                          {
                            color: isCurrentMonth
                              ? colors.text
                              : colors.textSecondary,
                            opacity: isCurrentMonth ? 1 : 0.4,
                          },
                          isTodayDate && styles.calendarDayNumberToday,
                        ]}
                      >
                        {dayInfo.day}
                      </Text>
                      {hasSchedule && isCurrentMonth && (
                        <View style={styles.calendarEventDots}>
                          <View
                            style={[
                              styles.calendarEventDot,
                              { backgroundColor: colors.info },
                            ]}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Scheduled Events List */}
            <View style={styles.calendarEventsList}>
              <Text
                style={[styles.calendarEventsTitle, { color: colors.text }]}
              >
                Upcoming Schedules
              </Text>

              {schedules
                .filter((s) => s.status === "Scheduled")
                .map((schedule) => (
                  <View
                    key={schedule.id}
                    style={[
                      styles.calendarEventCard,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.calendarEventIndicator,
                        { backgroundColor: colors.info },
                      ]}
                    />
                    <View style={styles.calendarEventContent}>
                      <Text
                        style={[
                          styles.calendarEventType,
                          { color: colors.text },
                        ]}
                      >
                        {schedule.type}
                      </Text>
                      <Text
                        style={[
                          styles.calendarEventSchool,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {schedule.schoolName}
                      </Text>
                      <Text
                        style={[
                          styles.calendarEventTime,
                          { color: colors.textSecondary },
                        ]}
                      >
                        📅 {schedule.schedule}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Notifications Modal */}
      <Modal
        visible={notificationsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setNotificationsVisible(false)}
      >
        <View style={styles.notificationsModalOverlay}>
          <TouchableOpacity
            style={styles.notificationsBackdrop}
            activeOpacity={1}
            onPress={() => setNotificationsVisible(false)}
          />
          <View
            style={[
              styles.notificationsModal,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <View
              style={[
                styles.notificationsHeader,
                { borderBottomColor: colors.border },
              ]}
            >
              <View>
                <Text
                  style={[styles.notificationsTitle, { color: colors.text }]}
                >
                  Notifications
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setNotificationsVisible(false)}
                style={styles.closeNotificationsButton}
              >
                <Text
                  style={[
                    styles.closeNotificationsText,
                    { color: colors.textSecondary },
                  ]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.emptyNotifications}>
              <Text style={styles.emptyNotificationsIcon}>🔔</Text>
              <Text
                style={[
                  styles.emptyNotificationsText,
                  { color: colors.textSecondary },
                ]}
              >
                No notifications yet
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Schedule Modal */}
      <Modal
        visible={showAddScheduleModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddScheduleModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.addScheduleModal,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Add New Schedule
                </Text>
                <TouchableOpacity
                  onPress={() => setShowAddScheduleModal(false)}
                >
                  <Text
                    style={[styles.closeIcon, { color: colors.textSecondary }]}
                  >
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form Content */}
              <View style={styles.addScheduleFormContent}>
                {/* Schedule Type */}
                <View style={styles.addScheduleFormGroup}>
                  <Text
                    style={[
                      styles.addScheduleFormLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Schedule Type <Text style={styles.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.addScheduleDropdown,
                      {
                        backgroundColor: colors.background,
                        borderColor: scheduleErrors.scheduleType
                          ? "#dc3545"
                          : colors.border,
                      },
                    ]}
                    onPress={() => {
                      setShowScheduleTypeDropdown(!showScheduleTypeDropdown);
                      // Clear error when user interacts
                      if (scheduleErrors.scheduleType) {
                        const newErrors = { ...scheduleErrors };
                        delete newErrors.scheduleType;
                        setScheduleErrors(newErrors);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.addScheduleDropdownText,
                        {
                          color: scheduleType
                            ? colors.text
                            : colors.textSecondary,
                        },
                      ]}
                    >
                      {scheduleType || "Select Type"}
                    </Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                  {scheduleErrors.scheduleType && (
                    <Text style={styles.errorText}>
                      {scheduleErrors.scheduleType}
                    </Text>
                  )}

                  {/* Schedule Type Dropdown Menu */}
                  {showScheduleTypeDropdown && (
                    <View
                      style={[
                        styles.dropdownMenu,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      {scheduleTypes.map((type) => (
                        <TouchableOpacity
                          key={type.id}
                          style={styles.dropdownMenuItem}
                          onPress={() => handleScheduleTypeSelect(type.label)}
                        >
                          <Text
                            style={[
                              styles.dropdownMenuItemText,
                              { color: colors.text },
                            ]}
                          >
                            {type.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Lead(s) */}
                <View style={styles.addScheduleFormGroup}>
                  <Text
                    style={[
                      styles.addScheduleFormLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Lead(s) <Text style={styles.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.addScheduleDropdown,
                      {
                        backgroundColor: colors.background,
                        borderColor: scheduleErrors.leads
                          ? "#dc3545"
                          : colors.border,
                      },
                    ]}
                    onPress={() => {
                      setShowLeadsDropdown(!showLeadsDropdown);
                      if (scheduleErrors.leads) {
                        const newErrors = { ...scheduleErrors };
                        delete newErrors.leads;
                        setScheduleErrors(newErrors);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.addScheduleDropdownText,
                        {
                          color:
                            selectedLeads.length > 0
                              ? colors.text
                              : colors.textSecondary,
                        },
                      ]}
                    >
                      {getSelectedLeadsText()}
                    </Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.addScheduleHint,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Select one or more schools for a single trip
                  </Text>
                  {scheduleErrors.leads && (
                    <Text style={styles.errorText}>{scheduleErrors.leads}</Text>
                  )}

                  {/* Leads Dropdown Menu (Multi-select) */}
                  {showLeadsDropdown && (
                    <View
                      style={[
                        styles.dropdownMenuMulti,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <ScrollView
                        style={styles.dropdownMenuScroll}
                        nestedScrollEnabled
                      >
                        {availableLeads.map((lead) => (
                          <TouchableOpacity
                            key={lead.id}
                            style={styles.dropdownMenuItemCheckbox}
                            onPress={() => handleLeadToggle(lead.id)}
                          >
                            <View
                              style={[
                                styles.checkbox,
                                { borderColor: colors.border },
                              ]}
                            >
                              {selectedLeads.includes(lead.id) && (
                                <View
                                  style={[
                                    styles.checkboxChecked,
                                    { backgroundColor: colors.primary },
                                  ]}
                                />
                              )}
                            </View>
                            <View style={styles.dropdownMenuItemContent}>
                              <Text
                                style={[
                                  styles.dropdownMenuItemText,
                                  { color: colors.text },
                                ]}
                              >
                                {lead.schoolName}
                              </Text>
                              <Text
                                style={[
                                  styles.dropdownMenuItemSubtext,
                                  { color: colors.textSecondary },
                                ]}
                              >
                                {lead.address}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                      <TouchableOpacity
                        style={[
                          styles.dropdownDoneButton,
                          { backgroundColor: colors.primary },
                        ]}
                        onPress={() => setShowLeadsDropdown(false)}
                      >
                        <Text style={styles.dropdownDoneButtonText}>Done</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Date */}
                <View style={styles.addScheduleFormGroup}>
                  <Text
                    style={[
                      styles.addScheduleFormLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Date <Text style={styles.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.addScheduleInput,
                      {
                        backgroundColor: colors.background,
                        borderColor: scheduleErrors.scheduleDate
                          ? "#dc3545"
                          : colors.border,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      },
                    ]}
                    onPress={() => {
                      setShowDatePicker(!showDatePicker);
                      if (scheduleErrors.scheduleDate) {
                        const newErrors = { ...scheduleErrors };
                        delete newErrors.scheduleDate;
                        setScheduleErrors(newErrors);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.addScheduleDropdownText,
                        {
                          color: scheduleDate
                            ? colors.text
                            : colors.textSecondary,
                        },
                      ]}
                    >
                      {scheduleDate || "dd/mm/yyyy"}
                    </Text>
                    <Text style={{ fontSize: 16 }}>📅</Text>
                  </TouchableOpacity>
                  {scheduleErrors.scheduleDate && (
                    <Text style={styles.errorText}>
                      {scheduleErrors.scheduleDate}
                    </Text>
                  )}

                  {/* Date Picker with Navigation */}
                  {showDatePicker && (
                    <View
                      style={[
                        styles.datePickerContainer,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.datePickerHeader,
                          { borderBottomColor: colors.border },
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() => setShowDatePicker(false)}
                        >
                          <Text
                            style={[
                              styles.datePickerClear,
                              { color: colors.primary },
                            ]}
                          >
                            Clear
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.datePickerMonthNav}>
                          <TouchableOpacity
                            style={styles.datePickerNavButton}
                            onPress={navigatePickerToPreviousMonth}
                          >
                            <Text
                              style={[
                                styles.datePickerNavIcon,
                                { color: colors.text },
                              ]}
                            >
                              ‹
                            </Text>
                          </TouchableOpacity>
                          <Text
                            style={[
                              styles.datePickerMonth,
                              { color: colors.text },
                            ]}
                          >
                            {getMonthName(pickerViewDate)}{" "}
                            {getYear(pickerViewDate)}
                          </Text>
                          <TouchableOpacity
                            style={styles.datePickerNavButton}
                            onPress={navigatePickerToNextMonth}
                          >
                            <Text
                              style={[
                                styles.datePickerNavIcon,
                                { color: colors.text },
                              ]}
                            >
                              ›
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={navigatePickerToToday}>
                          <Text
                            style={[
                              styles.datePickerToday,
                              { color: colors.primary },
                            ]}
                          >
                            Today
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* Mini Calendar */}
                      <View style={styles.datePickerCalendar}>
                        <View style={styles.datePickerDayHeaders}>
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                            (day) => (
                              <Text
                                key={day}
                                style={[
                                  styles.datePickerDayHeader,
                                  { color: colors.textSecondary },
                                ]}
                              >
                                {day}
                              </Text>
                            ),
                          )}
                        </View>
                        <View style={styles.datePickerDays}>
                          {getPickerCalendarDays().map((dayInfo, index) => {
                            const isCurrentMonth = dayInfo.month === "current";
                            const isTodayDate =
                              dayInfo.month === "current" &&
                              isToday(
                                dayInfo.day,
                                pickerViewDate.getMonth(),
                                pickerViewDate.getFullYear(),
                              );

                            return (
                              <TouchableOpacity
                                key={`picker-day-${index}`}
                                style={[
                                  styles.datePickerDay,
                                  isTodayDate && styles.datePickerDayToday,
                                ]}
                                onPress={() =>
                                  isCurrentMonth &&
                                  handleDateSelect(dayInfo.date)
                                }
                                disabled={!isCurrentMonth}
                              >
                                <Text
                                  style={[
                                    styles.datePickerDayText,
                                    {
                                      color: isCurrentMonth
                                        ? colors.text
                                        : colors.textSecondary,
                                    },
                                    { opacity: isCurrentMonth ? 1 : 0.3 },
                                    isTodayDate &&
                                      styles.datePickerDayTextToday,
                                  ]}
                                >
                                  {dayInfo.day}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  )}
                </View>

                {/* Time */}
                <View style={styles.addScheduleFormGroup}>
                  <Text
                    style={[
                      styles.addScheduleFormLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Time <Text style={styles.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.addScheduleDropdown,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => setShowTimePicker(!showTimePicker)}
                  >
                    <Text
                      style={[
                        styles.addScheduleDropdownText,
                        {
                          color: scheduleTime
                            ? colors.text
                            : colors.textSecondary,
                        },
                      ]}
                    >
                      {scheduleTime || "Select Time"}
                    </Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>

                  {/* Time Picker Dropdown */}
                  {showTimePicker && (
                    <View
                      style={[
                        styles.dropdownMenuTime,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <ScrollView
                        style={styles.dropdownMenuTimeScroll}
                        nestedScrollEnabled
                      >
                        {timeSlots.map((time) => (
                          <TouchableOpacity
                            key={time}
                            style={styles.dropdownMenuItem}
                            onPress={() => handleTimeSelect(time)}
                          >
                            <Text
                              style={[
                                styles.dropdownMenuItemText,
                                { color: colors.text },
                              ]}
                            >
                              {time}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* Expected Expenses Section */}
                <View style={styles.expectedExpensesSection}>
                  <Text
                    style={[
                      styles.expectedExpensesTitle,
                      { color: colors.text },
                    ]}
                  >
                    Expected Expenses <Text style={styles.required}>*</Text>
                  </Text>
                  <View
                    style={[
                      styles.expectedExpensesInfo,
                      {
                        backgroundColor: isDarkMode
                          ? "rgba(108, 92, 231, 0.1)"
                          : "#f0f4ff",
                      },
                    ]}
                  >
                    <Text style={styles.expectedExpensesInfoIcon}>ℹ️</Text>
                    <Text
                      style={[
                        styles.expectedExpensesInfoText,
                        {
                          color: isDarkMode ? colors.primary : "#5a4ba6",
                        },
                      ]}
                    >
                      These expected expenses will be tracked for all selected
                      schools above.
                    </Text>
                  </View>
                </View>

                {/* Expense Title */}
                <View style={styles.addScheduleFormGroup}>
                  <Text
                    style={[
                      styles.addScheduleFormLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Expense Title <Text style={styles.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.addScheduleDropdown,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() =>
                      setShowExpenseCategoriesDropdown(
                        !showExpenseCategoriesDropdown,
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.addScheduleDropdownText,
                        {
                          color:
                            expenseCategories.length > 0
                              ? colors.text
                              : colors.textSecondary,
                        },
                      ]}
                    >
                      {getSelectedExpenseCategoriesText()}
                    </Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.addScheduleHint,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Select one or more expense categories
                  </Text>

                  {/* Expense Categories Dropdown Menu (Multi-select) */}
                  {showExpenseCategoriesDropdown && (
                    <View
                      style={[
                        styles.dropdownMenuMulti,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <ScrollView
                        style={styles.dropdownMenuScroll}
                        nestedScrollEnabled
                      >
                        {expenseCategoriesList.map((category) => (
                          <TouchableOpacity
                            key={category.id}
                            style={styles.dropdownMenuItemCheckbox}
                            onPress={() =>
                              handleExpenseCategoryToggle(category.id)
                            }
                          >
                            <View
                              style={[
                                styles.checkbox,
                                { borderColor: colors.border },
                              ]}
                            >
                              {expenseCategories.includes(category.id) && (
                                <View
                                  style={[
                                    styles.checkboxChecked,
                                    { backgroundColor: colors.primary },
                                  ]}
                                />
                              )}
                            </View>
                            <Text
                              style={[
                                styles.dropdownMenuItemText,
                                { color: colors.text },
                              ]}
                            >
                              {category.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                      <TouchableOpacity
                        style={[
                          styles.dropdownDoneButton,
                          { backgroundColor: colors.primary },
                        ]}
                        onPress={() => setShowExpenseCategoriesDropdown(false)}
                      >
                        <Text style={styles.dropdownDoneButtonText}>Done</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Expected Amount */}
                <View style={styles.addScheduleFormGroup}>
                  <Text
                    style={[
                      styles.addScheduleFormLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Expected Amount <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={[
                      styles.addScheduleInput,
                      {
                        backgroundColor: colors.background,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    placeholder="0.00"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="decimal-pad"
                    value={expectedAmount}
                    onChangeText={setExpectedAmount}
                  />
                </View>

                {/* Remarks */}
                <View style={styles.addScheduleFormGroup}>
                  <Text
                    style={[
                      styles.addScheduleFormLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Remarks
                  </Text>
                  <TextInput
                    style={[
                      styles.addScheduleTextArea,
                      {
                        backgroundColor: colors.background,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    placeholder="Additional details about the expected expenses"
                    placeholderTextColor={colors.textSecondary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={remarks}
                    onChangeText={setRemarks}
                  />
                </View>
              </View>

              {/* Modal Footer */}
              <View style={styles.addScheduleModalFooter}>
                <TouchableOpacity
                  style={[
                    styles.addScheduleCancelButton,
                    {
                      backgroundColor: isDarkMode ? "#404040" : "#e9ecef",
                    },
                  ]}
                  onPress={() => setShowAddScheduleModal(false)}
                >
                  <Text
                    style={[
                      styles.addScheduleCancelButtonText,
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
                    styles.addScheduleSaveButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={handleScheduleSave}
                >
                  <Text style={styles.addScheduleSaveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Schedule Confirmation Modal */}
      <Modal
        visible={showScheduleConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowScheduleConfirmation(false)}
      >
        <View style={styles.confirmationOverlay}>
          <View
            style={[
              styles.confirmationModal,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={[styles.confirmationTitle, { color: colors.text }]}>
              Confirm Add Schedule
            </Text>
            <Text
              style={[
                styles.confirmationMessage,
                { color: colors.textSecondary },
              ]}
            >
              Are you sure you want to add this schedule? Please review the
              details:
            </Text>

            <View
              style={[
                styles.confirmationDetails,
                { backgroundColor: colors.background },
              ]}
            >
              <View style={styles.confirmationDetailRow}>
                <Text
                  style={[
                    styles.confirmationDetailLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Type:
                </Text>
                <Text
                  style={[
                    styles.confirmationDetailValue,
                    { color: colors.text },
                  ]}
                >
                  {scheduleType}
                </Text>
              </View>

              <View style={styles.confirmationDetailRow}>
                <Text
                  style={[
                    styles.confirmationDetailLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Schools:
                </Text>
                <Text
                  style={[
                    styles.confirmationDetailValue,
                    { color: colors.text },
                  ]}
                >
                  {selectedLeads.length} selected
                </Text>
              </View>

              <View style={styles.confirmationDetailRow}>
                <Text
                  style={[
                    styles.confirmationDetailLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Date & Time:
                </Text>
                <Text
                  style={[
                    styles.confirmationDetailValue,
                    { color: colors.text },
                  ]}
                >
                  {scheduleDate} at {scheduleTime}
                </Text>
              </View>

              <View style={styles.confirmationDetailRow}>
                <Text
                  style={[
                    styles.confirmationDetailLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Expected Amount:
                </Text>
                <Text
                  style={[
                    styles.confirmationDetailValue,
                    { color: colors.text },
                  ]}
                >
                  ₱{parseFloat(expectedAmount || "0").toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={[
                  styles.confirmationCancelButton,
                  {
                    backgroundColor: isDarkMode ? "#404040" : "#e9ecef",
                  },
                ]}
                onPress={() => setShowScheduleConfirmation(false)}
              >
                <Text
                  style={[
                    styles.confirmationCancelButtonText,
                    {
                      color: isDarkMode ? "#ffffff" : "#6c757d",
                    },
                  ]}
                >
                  No, Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmationConfirmButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleConfirmScheduleSave}
              >
                <Text style={styles.confirmationConfirmButtonText}>
                  Yes, Add Schedule
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Day Details Modal */}
      <Modal
        visible={showDayDetailsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDayDetailsModal(false)}
      >
        <View style={styles.dayDetailsOverlay}>
          <TouchableOpacity
            style={styles.dayDetailsBackdrop}
            activeOpacity={1}
            onPress={() => setShowDayDetailsModal(false)}
          />
          <View
            style={[
              styles.dayDetailsModal,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            {/* Modal Header */}
            <View
              style={[
                styles.dayDetailsHeader,
                { borderBottomColor: colors.border },
              ]}
            >
              <View>
                <Text style={[styles.dayDetailsTitle, { color: colors.text }]}>
                  {selectedDate && formatSelectedDate(selectedDate)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowDayDetailsModal(false)}
                style={styles.closeDayDetailsButton}
              >
                <Text
                  style={[
                    styles.closeDayDetailsText,
                    { color: colors.textSecondary },
                  ]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Schedules for selected date */}
            <ScrollView style={styles.dayDetailsContent}>
              {selectedDate &&
              getSchedulesForDate(selectedDate).length === 0 ? (
                <View style={styles.dayDetailsEmpty}>
                  <Text style={styles.dayDetailsEmptyIcon}>📅</Text>
                  <Text
                    style={[
                      styles.dayDetailsEmptyText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    No schedules for this date
                  </Text>
                </View>
              ) : (
                selectedDate &&
                getSchedulesForDate(selectedDate).map((schedule) => (
                  <View
                    key={schedule.id}
                    style={[
                      styles.dayDetailsScheduleCard,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    {/* Schedule Header */}
                    <View style={styles.dayDetailsScheduleHeader}>
                      <View style={styles.dayDetailsScheduleTitleSection}>
                        <Text
                          style={[
                            styles.dayDetailsScheduleType,
                            { color: colors.text },
                          ]}
                        >
                          {schedule.type}
                        </Text>
                        <View
                          style={[
                            styles.dayDetailsScheduleStatus,
                            {
                              backgroundColor: getStatusColor(schedule.status),
                            },
                          ]}
                        >
                          <Text style={styles.dayDetailsScheduleStatusText}>
                            {schedule.status}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Schedule Details */}
                    <View style={styles.dayDetailsScheduleBody}>
                      <View style={styles.dayDetailsScheduleRow}>
                        <Text
                          style={[
                            styles.dayDetailsScheduleLabel,
                            { color: colors.textSecondary },
                          ]}
                        >
                          School:
                        </Text>
                        <Text
                          style={[
                            styles.dayDetailsScheduleValue,
                            { color: colors.text },
                          ]}
                        >
                          {schedule.schoolName}
                        </Text>
                      </View>

                      <View style={styles.dayDetailsScheduleRow}>
                        <Text
                          style={[
                            styles.dayDetailsScheduleLabel,
                            { color: colors.textSecondary },
                          ]}
                        >
                          Address:
                        </Text>
                        <Text
                          style={[
                            styles.dayDetailsScheduleValue,
                            { color: colors.text },
                          ]}
                        >
                          {schedule.address}
                        </Text>
                      </View>

                      <View style={styles.dayDetailsScheduleRow}>
                        <Text
                          style={[
                            styles.dayDetailsScheduleLabel,
                            { color: colors.textSecondary },
                          ]}
                        >
                          Time:
                        </Text>
                        <Text
                          style={[
                            styles.dayDetailsScheduleValue,
                            { color: colors.text },
                          ]}
                        >
                          {schedule.schedule.split(" - ")[1]}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>

            {/* Footer Button */}
            <View style={styles.dayDetailsFooter}>
              <TouchableOpacity
                style={[
                  styles.dayDetailsCloseButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => setShowDayDetailsModal(false)}
              >
                <Text style={styles.dayDetailsCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
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
    padding: 16,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 12,
  },
  pageIcon: {
    fontSize: 28,
    marginTop: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
  },
  headerCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerCardIcon: {
    fontSize: 20,
    color: "#ffffff",
  },
  headerCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  addScheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addScheduleIcon: {
    fontSize: 18,
    color: "#ffffff",
  },
  addScheduleText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  viewTabs: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  viewTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  viewTabActive: {
    // Active state handled by backgroundColor prop
  },
  viewTabIcon: {
    fontSize: 16,
  },
  viewTabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tableCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  filterDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterDropdownText: {
    fontSize: 14,
  },
  dropdownArrow: {
    fontSize: 10,
    color: "#999",
  },
  tableControls: {
    marginBottom: 16,
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
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 14,
  },
  schedulesList: {
    gap: 12,
  },
  scheduleCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    position: "relative",
  },
  scheduleCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  scheduleCardTitleSection: {
    flex: 1,
  },
  scheduleCardNumber: {
    fontSize: 11,
    marginBottom: 4,
  },
  scheduleCardType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scheduleStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scheduleStatusText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  scheduleCardBody: {
    gap: 10,
  },
  scheduleCardField: {
    gap: 4,
  },
  scheduleCardLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  scheduleCardValue: {
    fontSize: 14,
  },
  scheduleCardAction: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 4,
  },
  scheduleCardActionIcon: {
    fontSize: 18,
    color: "#6c757d",
  },
  tableFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
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
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  calendarCard: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  calendarHeader: {
    padding: 16,
  },
  calendarNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 12,
  },
  calendarNavButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarNavIcon: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  todayButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  calendarMonth: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  calendarGrid: {
    backgroundColor: "#ffffff",
  },
  calendarDayHeaders: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  calendarDayHeader: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  calendarDayHeaderText: {
    fontSize: 12,
    fontWeight: "600",
  },
  calendarDays: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calendarDay: {
    width: "14.28%", // 100% / 7 days
    aspectRatio: 1,
    borderWidth: 0.5,
    padding: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  calendarDayToday: {
    backgroundColor: "#fff9e6",
  },
  calendarDayNumber: {
    fontSize: 14,
    fontWeight: "500",
  },
  calendarDayNumberToday: {
    color: "#6c5ce7",
    fontWeight: "bold",
  },
  calendarEventDots: {
    flexDirection: "row",
    gap: 2,
    marginTop: 2,
  },
  calendarEventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  calendarEventsList: {
    padding: 16,
  },
  calendarEventsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  calendarEventCard: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  calendarEventIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  calendarEventContent: {
    flex: 1,
    gap: 4,
  },
  calendarEventType: {
    fontSize: 14,
    fontWeight: "bold",
  },
  calendarEventSchool: {
    fontSize: 13,
  },
  calendarEventTime: {
    fontSize: 12,
  },
  calendarPlaceholder: {
    alignItems: "center",
  },
  calendarIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  calendarText: {
    fontSize: 16,
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
    justifyContent: "flex-end",
  },
  addScheduleModal: {
    width: "100%",
    maxHeight: "90%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  addScheduleFormContent: {
    padding: 20,
  },
  addScheduleFormGroup: {
    marginBottom: 20,
  },
  addScheduleFormLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  required: {
    color: "#dc3545",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
  },
  addScheduleInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  addScheduleDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  addScheduleDropdownText: {
    fontSize: 14,
  },
  addScheduleHint: {
    fontSize: 11,
    marginTop: 4,
    fontStyle: "italic",
  },
  addScheduleTextArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    minHeight: 100,
  },
  expectedExpensesSection: {
    marginBottom: 20,
  },
  expectedExpensesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  expectedExpensesInfo: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  expectedExpensesInfoIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  expectedExpensesInfoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  addScheduleModalFooter: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dropdownMenu: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    maxHeight: 200,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  dropdownMenuItemText: {
    fontSize: 14,
  },
  dropdownMenuMulti: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    maxHeight: 300,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownMenuScroll: {
    maxHeight: 240,
  },
  dropdownMenuItemCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  dropdownMenuItemContent: {
    flex: 1,
  },
  dropdownMenuItemSubtext: {
    fontSize: 11,
    marginTop: 2,
  },
  dropdownDoneButton: {
    paddingVertical: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  dropdownDoneButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  dropdownMenuTime: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    maxHeight: 250,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownMenuTimeScroll: {
    maxHeight: 250,
  },
  datePickerContainer: {
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
  },
  datePickerClear: {
    fontSize: 14,
    fontWeight: "600",
    minWidth: 45,
  },
  datePickerMonthNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  datePickerNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(108, 92, 231, 0.1)",
  },
  datePickerNavIcon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  datePickerMonth: {
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 120,
    textAlign: "center",
  },
  datePickerToday: {
    fontSize: 14,
    fontWeight: "600",
    minWidth: 45,
    textAlign: "right",
  },
  datePickerCalendar: {
    padding: 8,
  },
  datePickerDayHeaders: {
    flexDirection: "row",
    marginBottom: 8,
  },
  datePickerDayHeader: {
    flex: 1,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
  },
  datePickerDays: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  datePickerDay: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  datePickerDayToday: {
    backgroundColor: "#6c5ce7",
  },
  datePickerDayText: {
    fontSize: 13,
  },
  datePickerDayTextToday: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  addScheduleCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addScheduleCancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  addScheduleSaveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addScheduleSaveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
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
  dayDetailsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dayDetailsBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dayDetailsModal: {
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dayDetailsHeader: {
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dayDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  closeDayDetailsButton: {
    padding: 4,
  },
  closeDayDetailsText: {
    fontSize: 24,
    fontWeight: "300",
  },
  dayDetailsContent: {
    maxHeight: 400,
    padding: 16,
  },
  dayDetailsEmpty: {
    alignItems: "center",
    paddingVertical: 40,
  },
  dayDetailsEmptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  dayDetailsEmptyText: {
    fontSize: 14,
  },
  dayDetailsScheduleCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  dayDetailsScheduleHeader: {
    marginBottom: 12,
  },
  dayDetailsScheduleTitleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayDetailsScheduleType: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  dayDetailsScheduleStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dayDetailsScheduleStatusText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  dayDetailsScheduleBody: {
    gap: 8,
  },
  dayDetailsScheduleRow: {
    flexDirection: "row",
    gap: 8,
  },
  dayDetailsScheduleLabel: {
    fontSize: 13,
    fontWeight: "600",
    width: 60,
  },
  dayDetailsScheduleValue: {
    fontSize: 13,
    flex: 1,
  },
  dayDetailsFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  dayDetailsCloseButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  dayDetailsCloseButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  confirmationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  confirmationModal: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  confirmationMessage: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  confirmationDetails: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  confirmationDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  confirmationDetailLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  confirmationDetailValue: {
    fontSize: 13,
    flex: 1,
    textAlign: "right",
  },
  confirmationButtons: {
    flexDirection: "row",
    gap: 12,
  },
  confirmationCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmationCancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  confirmationConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmationConfirmButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default AgentSchedulesScreen;
