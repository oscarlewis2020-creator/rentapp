// 1. Redux acts as your reactive state manager for lightweight variables (UI views, login credentials, token lifecycle transitions).
// 2. PowerSync acts as your offline-first local state container. It coordinates with Redux so that the moment a user logs in anywhere (Web, iOS, or Android), the SQLite stream kicks off and syncs data to their device automatically.

//APP ARCH.

// app/
// ├── (auth)/             # Auth screens (sign-in, sign-up)
// │   ├── sign-in.tsx
// │   └── _layout.tsx
// ├── (public)/       # First-time user tutorial screens
// │   ├── welcome.tsx
// │   └── _layout.tsx
// ├── (tabs)/             # Main app experience
// │   └── _layout.tsx
// ├── _layout.tsx         # The absolute root (Providers only)
// └── index.tsx           # The entry point / controller

//STORE ARCH.

// rentapp/
// └── store/
//     ├── index.ts        (Core entry & store setup)
//     ├── hooks.ts        (Typed useAppDispatch and useAppSelector)
//     ├── storage.ts      (Universal platform-agnostic storage driver)
//     └── authSlice.ts    (Auth slice with bootstrapAuthSession thunk)
