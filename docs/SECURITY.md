🛡️ Security Checklist
Authentication & Authorization
[x] Use Firebase Authentication to manage user accounts.

[ ] Implement Role-Based Access Control using Firebase Custom Claims (to distinguish between "Admin" and "Staff").

Data Protection
[x] Use Firestore Security Rules to protect data. Rules must ensure that authenticated users can only read/write data they are permitted to access. This is the most critical security step for the database.

Application Security
[x] Store Firebase API keys and other sensitive credentials in environment variables (using a library like react-native-dotenv). Do not hardcode keys in the code.

[x] All network traffic to Firebase is automatically encrypted (HTTPS).
