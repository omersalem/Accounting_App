🧼 Code Quality Standards
This document defines the rules for maintaining a clean, readable, and maintainable codebase.

1. Adhere to the Project Structure
   Place Files Correctly: All new files must be placed in the appropriate folder as defined in DESIGN.md (e.g., screens, components, hooks).

Keep Components Small and Focused: Each component file should be responsible for one piece of the UI.

2. React & TypeScript Best Practices
   Use TypeScript: All files should be .tsx or .ts. Use types for props, state, and API responses.

Follow the Rules of Hooks: Never call hooks inside loops, conditions, or nested functions.

Functional Components: Use functional components with hooks. Avoid class components.

3. No Dead or Unused Code
   Remove Commented-Out Code: Use version control to view history.

Delete Unused Imports, Variables, and Functions.

4. Clean Up Debugging Code
   Remove console.log: All temporary debugging statements must be removed from the final code.
