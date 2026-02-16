KiQbaQ - Agent Marketing Platform 📱

A comprehensive mobile application for marketing agents to manage leads, track budgets, schedule appointments, and analyze demo performance through QR code technology.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [Backend Integration](#backend-integration)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Authentication & Onboarding

- Animated landing page with KiQbaQ branding
- 4-step registration system with validation
- Secure login with username/email and password
- Profile management

### Core Modules

- **Dashboard** - Analytics cards, activity feed, notifications
- **Leads Management** - Card-based layout with search/filter
- **Budget Management** - Track budget requests & expenses with export functionality
- **Agent Schedules** - Interactive calendar and table views
- **Demo Analytics** - Track QR scans, video views, feedback, and conversions
- **Registration** - 4-step registration flow (handled in `register.tsx` route)

### Key Capabilities

- 📅 Interactive calendar with real date-time functionality
- 🌙 Dark mode support
- 📊 Export data (CSV, Excel, PDF, Print, Copy)
- ✅ Form validation with error handling
- 🔔 Notification system
- 📱 Mobile-first responsive design

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** (will be installed with dependencies)
- **Git** - [Download here](https://git-scm.com/)

### For Mobile Testing:

- **iOS**: Mac with Xcode, or use Expo Go app on iPhone
- **Android**: Android Studio with emulator, or use Expo Go app on Android device
- **Expo Go App**: Download from [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ranzelxkaizer/KiQbaQ_Mobile_App.git
cd KiQbaQ_Mobile_App
```

### 2. Install Dependencies

```bash
npm install
```

**Note:** This will install all required packages including:

- React Native
- Expo SDK
- Expo Router
- TypeScript
- expo-linear-gradient
- expo-clipboard
- And more...

### 3. Verify Installation

```bash
npx expo --version
```

You should see the Expo version number if installation was successful.

## 🚀 Running the App

### Start the Development Server

```bash
npx expo start
```

This will start the Metro bundler and show a QR code in your terminal.

### Choose Your Platform:

#### Option 1: Run on Physical Device (Recommended for Testing)

1. Install **Expo Go** app on your phone
2. **iOS**: Scan QR code with Camera app
3. **Android**: Scan QR code with Expo Go app
4. App will load on your device

#### Option 2: Run on iOS Simulator (Mac Only)

```bash
# Press 'i' in terminal after running expo start
# OR
npx expo start --ios
```

#### Option 3: Run on Android Emulator

1. Start Android emulator in Android Studio
2. Press 'a' in terminal after running expo start
   ```bash
   # OR
   npx expo start --android
   ```

#### Option 4: Run in Web Browser

```bash
# Press 'w' in terminal after running expo start
# OR
npx expo start --web
```

## 📁 Project Structure

```
KiQbaQ_Mobile_App/
├── .expo/                        # Expo configuration
├── .idea/                        # IDE settings
├── .vscode/                      # VS Code settings
│
├── app/                          # Main application directory (Expo Router)
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   ├── explore.tsx          # Explore tab
│   │   └── index.tsx            # Dashboard (Home tab)
│   ├── contexts/                 # React contexts
│   │   └── _layout.tsx          # Context layout
│   ├── _layout.tsx              # Root layout
│   ├── AgentSchedulesScreen.tsx
│   ├── BudgetManagementScreen.tsx
│   ├── ConversionTrackingDetailScreen.tsx
│   ├── DemoAnalyticsScreen.tsx
│   ├── FeedbackResponsesDetailScreen.tsx
│   ├── index.tsx                # Landing page route
│   ├── LeadsManagementScreen.tsx
│   ├── login.tsx                # Login route
│   ├── modal.tsx                # Modal component
│   ├── ProfileScreen.tsx
│   ├── QRScansDetailScreen.tsx
│   ├── register.tsx             # Registration route
│   └── VideoPerformanceDetailScreen.tsx
│
├── assets/                       # Images, fonts, GIFs
│   └── kiqbaq_logo.gif          # App logo (329x128)
│
├── components/                   # Reusable components
│   ├── ui/                      # UI components
│   │   ├── AnimatedLogo.tsx
│   │   ├── external-link.tsx
│   │   ├── haptic-tab.tsx
│   │   ├── hello-wave.tsx
│   │   ├── parallax-scroll-view.tsx
│   │   ├── themed-text.tsx
│   │   └── themed-view.tsx
│   └── BurgerMenu.tsx           # Navigation menu
│
├── constants/                    # App constants
│   └── (constant files)
│
├── hooks/                        # Custom React hooks
│   └── (custom hooks)
│
├── node_modules/                 # Dependencies (auto-generated)
│
├── screens/                      # Screen components
│   ├── AgentSchedulesScreen.tsx
│   ├── BudgetManagementScreen.tsx
│   ├── ConversionTrackingDetailScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── DemoAnalyticsScreen.tsx
│   ├── FeedbackResponsesDetailScreen.tsx
│   ├── LandingPage.tsx
│   ├── LeadsManagementScreen.tsx
│   ├── LoginScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── QRScansDetailScreen.tsx
│   ├── RegisterScreen.tsx
│   └── VideoPerformanceDetailScreen.tsx
│
├── scripts/                      # Build/deployment scripts
│
├── .gitignore                    # Git ignore rules
├── app.json                      # Expo app configuration
├── expo-env.d.ts                 # Expo TypeScript definitions
├── package.json                  # Project dependencies
├── package-lock.json             # Locked dependency versions
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

### 📂 Directory Explanations

**`app/`** - Core application using Expo Router

- File-based routing (filename = route)
- `(tabs)/` - Bottom tab navigation screens
- Screen route files (`.tsx`) map to app URLs

**`screens/`** - Actual screen component implementations

- Contains the UI logic and components
- Imported by route files in `app/`

**`components/`** - Reusable UI components

- `ui/` - Generic UI elements
- `BurgerMenu.tsx` - Side navigation menu

**`assets/`** - Static files (images, fonts, GIFs)

- Logo, icons, and media files

**`constants/`** - App-wide constants and configurations

**`hooks/`** - Custom React hooks for shared logic

**`contexts/`** - React Context providers (theme, auth, etc.)
