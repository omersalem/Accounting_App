# 🏛️ Design & Architecture

## 1. Application Architecture

- **Pattern:** Component-Based Architecture.
- **Description:** The app will be built as a collection of reusable components. Data flow will be managed by React's Hooks. For complex state that needs to be shared across many screens (like the logged-in user's info), we will use a simple state management library like Zustand.

## 2. Project Structure (VS Code)

The project will be organized into a clear, feature-based folder structure.

/my-supermarket-app
└── /src
├── /components # SHARED, reusable components (e.g., Button, Card, Input)
│
├── /screens # Each screen of the app, organized by feature
│ ├── /POS # Point of Sale feature
│ │ └── POSScreen.tsx
│ ├── /Stock # Stock management feature
│ │ ├── StockListScreen.tsx
│ │ └── AddProductScreen.tsx
│ └── ... # New folder for each new feature screen
│
├── /hooks # Custom reusable hooks (e.g., useAuth)
├── /navigation # Navigation logic (stack navigators, tab navigators)
├── /services # Firebase configuration and API functions
│
└── /types # TypeScript type definitions (e.g., Product, Invoice)

## 3. UI Design & Styling

- **Framework:** **NativeWind**.
- **Source of Truth:** All styling **must** be done using Tailwind CSS utility classes directly in the components (e.g., `<View className="bg-blue-500 p-4">`). This is the core principle of NativeWind. Customizations to the theme (colors, fonts) should be done in the `tailwind.config.js` file.

## 4. Database Schema (Firebase Firestore Collections)

- This remains the same as it is on the backend.
- `products`: { `productId`, `name`, `barcode`, `qrCode`, `purchasePrice`, `salePrice`, `stockQuantity`, `supplierId`, `imageUrl` }
- `customers`: { `customerId`, `name`, `phone`, `totalDebt` }
- `suppliers`: { `supplierId`, `name`, `contactPerson`, `phone` }
- `invoices`: { `invoiceId`, `invoiceNumber`, `customerId`, `date`, `items`: [ { `productId`, `quantity`, `price` } ], `totalAmount`, `amountPaid`, `status` }
