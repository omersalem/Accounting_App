🐞 Error Log

Error ID: #001
Date: Sept 6, 2025
Error: Dependency conflict when installing Jest and React Native Testing Library (ERESOLVE unable to resolve dependency tree).
Component: Project Setup (Testing Tools)
Analysis: The latest React/React Native versions caused peer dependency conflicts with testing libraries.
Solution: Installed testing libraries using --legacy-peer-deps flag to resolve the conflict.
Status: ✅ Solved.


Error ID: #002
Date: Sept 6, 2025
Error: Jest runner fails with Babel errors when executing tests.
Command: npm test
Primary Stack:
- [BABEL] node_modules/react-native/jest/react-native-env.js: .plugins is not a valid Plugin property
- Caching has already been configured with .never or .forever() (after adjusting babel.config.js)

Component: Testing Setup (Jest + Babel + Expo)
Analysis:
- Likely version misalignment between jest, babel-jest, @babel/core, react-native, and jest-expo.
- Actions attempted:
  - Set Jest tooling to Expo-compatible versions: jest@^29.7.0, @types/jest@^29.5.12, babel-jest@29.7.0.
  - Pinned @babel/core to 7.24.9.
  - Installed with --legacy-peer-deps to resolve peer conflicts.
  - Tried excluding NativeWind babel plugin under test, but caused a cache API mismatch; reverted to default config.
- Root cause appears to be transform chain differences in the RN/Expo Jest environment. Further alignment to Expo’s recommended matrix is required.

Next Steps:
- Cross-check the Expo 53 version matrix for exact jest-expo, babel-jest, @babel/core compatibility.
- If needed, add an explicit Jest transformIgnorePatterns consistent with jest-expo docs.
- Keep NativeWind plugin enabled by default; if a transform conflict persists, conditionally disable it only for tests using a safe cache API pattern.

Status: ✅ Solved
