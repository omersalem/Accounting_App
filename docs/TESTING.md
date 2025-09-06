🧪 Testing Strategy
This document outlines the testing requirements for the project. All new features must be accompanied by tests.

1. Tools
   Framework: Jest

Library: React Native Testing Library

2. Strategy
   Component Tests: The main focus will be on testing individual components. We will render components in a virtual test environment and verify their behavior.

User Interaction Simulation: We will simulate user actions like tapping buttons and typing in text fields to ensure the app responds correctly.

3. What to Test
   Component Rendering: Does the component display correctly with different props?

State Changes: Does the UI update correctly when the component's state changes?

User Events: When a user taps a button, is the correct function called?

Custom Hooks: Test the logic of any custom hooks in isolation.
