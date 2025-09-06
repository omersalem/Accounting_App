🎓 Learning Log
This file is a step-by-step explanation of the code written for this project. Its purpose is to be a clear and simple guide for a beginner to understand how the React Native application is built.

Feature: [Name of the Feature, e.g., "Reusable Primary Button Component"]

1. What was the goal?
   (AI explains the goal. e.g., "The goal was to create a shared button component that we can reuse across the entire app, ensuring all our buttons look consistent.")

2. What files were created/modified?
   (AI lists the files.)

src/components/PrimaryButton.tsx

3. Code Explanation (File by File)
   File: src/components/PrimaryButton.tsx
   What this code does: This file defines a reusable React Native component called PrimaryButton. It accepts properties (props) like a title for the text and an onPress function to handle taps. It uses NativeWind classes for styling.

Why it's important: By creating this component once, we can use it everywhere. If we want to change the style of all primary buttons in the future, we only have to edit this one file.

Key Concepts:

Component: A reusable piece of UI.

Props (Properties): How parent components pass data and functions down to child components.

TouchableOpacity: A basic React Native component that makes any view respond properly to touches.

NativeWind (className): How we apply styles using Tailwind CSS classes.

(The AI will continue this pattern for every file and every new feature.)

---
Feature: Initial Navigation (POS, Stock) and Reusable PrimaryButton

1. What was the goal?
   Build the minimum app scaffold so the app can show multiple screens and navigate between them, and create a reusable PrimaryButton component styled with NativeWind so buttons look consistent everywhere.

2. What files were created/modified?
   Created:
   - src/navigation/AppNavigator.tsx
   - src/types/navigation.ts
   - src/components/PrimaryButton.tsx
   - src/screens/POS/POSScreen.tsx
   - src/screens/Stock/StockListScreen.tsx
   - src/screens/Stock/AddProductScreen.tsx
   - __tests__/components/PrimaryButton.test.tsx

   Modified:
   - App.tsx (use AppNavigator instead of inline StyleSheet)
   - index.ts (added react-native-gesture-handler import)
   - babel.config.js (added nativewind/babel plugin)
   - tailwind.config.js (at project root)
   - tsconfig.json (added nativewind types and jest types)
   - package.json (added jest preset and scripts)

3. Code Explanation (File by File)

   File: src/navigation/AppNavigator.tsx
   What this code does: Sets up the navigation using React Navigation’s native-stack. It declares three screens: POS, StockList, and AddProduct. This file also sets the initial screen to POS.
   Why it’s important: Navigation is how users move around the app. This centralizes the app routes in one place, making it easy to add new screens later.

   File: src/types/navigation.ts
   What this code does: Defines the TypeScript type for the stack parameters (RootStackParamList). Each screen name is listed with the parameters it expects (currently none).
   Why it’s important: Strong typing makes navigation safer and catches mistakes at compile time.

   File: src/components/PrimaryButton.tsx
   What this code does: A reusable button component styled with NativeWind classes. It accepts a title, onPress handler, and optional className overrides.
   Why it’s important: Ensures consistent button appearance and behavior across the app.

   File: src/screens/POS/POSScreen.tsx
   What this code does: A simple POS landing screen with two actions: navigate to Stock List and to Add Product, using the PrimaryButton.
   Why it’s important: It’s the starting point for cashiers to perform quick actions.

   File: src/screens/Stock/StockListScreen.tsx
   What this code does: A basic stock list using a FlatList to render a few mock items; includes a button to navigate to Add Product.
   Why it’s important: Demonstrates how we’ll show inventory data in the future and provides a path to add new items.

   File: src/screens/Stock/AddProductScreen.tsx
   What this code does: A form to add a product (name, prices, quantity). It validates input and shows an alert on “Save” for now (persistence to be added later with Firebase).
   Why it’s important: Establishes the structure for data entry workflows used by warehouse staff.

   File: App.tsx
   What this code does: Replaced the template content and now renders the AppNavigator.
   Why it’s important: Makes navigation the entry point of the app.

   File: index.ts
   What this code does: Registers the app and imports react-native-gesture-handler (required by React Navigation).
   Why it’s important: Ensures proper gesture support and clean app bootstrapping.

   File: babel.config.js
   What this code does: Uses expo’s preset and adds nativewind/babel plugin to enable the className prop on React Native components.
   Why it’s important: Required for NativeWind to work.

   File: tailwind.config.js (project root)
   What this code does: Configures Tailwind/NaitveWind scanning for className usage in App and src.
   Why it’s important: Ensures all Tailwind classes used in components are recognized.

   File: tsconfig.json
   What this code does: Enables strict typing, adds nativewind typings, and includes jest types for tests.
   Why it’s important: Improves DX and prevents TypeScript errors in tests.

   File: __tests__/components/PrimaryButton.test.tsx
   What this code does: A simple test that renders the button and verifies onPress is called.
   Why it’s important: Establishes our testing pattern with React Native Testing Library.

4. Key Concepts
   - Navigation (Stack): A way to move between screens while maintaining a history.
   - Reusable Components: Build once and use everywhere to keep UI consistent.
   - NativeWind: Tailwind-style utility classes directly on RN components via className.
   - Testing: Use react-native-testing-library to render and interact with components in tests.

5. Current Status of Tests
   - All tests passing (2/2). The Jest/Babel transform issue was resolved by pinning compatible versions and disabling the NativeWind Babel plugin only in test via [babel.config.js](my-supermarket-app/babel.config.js:1).
