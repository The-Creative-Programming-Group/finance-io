<!-- Banner Image -->

# Finance.io

Finance-IO is a modern personal finance management app designed to help you track, analyze, and optimize your finances across Android, iOS, and web. With a simple interface and powerful features, Finance-IO makes budgeting, expense tracking, and financial planning accessible to everyone.

All UI development follows our official Figma design: [Finance-IO Figma UI](https://www.figma.com/design/JQFXBsYUqEdSLD3OQUwp1H/Native-Finance-App---Finance.io?node-id=0-1&p=f&t=SOgQXPopZ1yAeuZK-0)

## Key Features

- **Multi-platform support:** Use Finance-IO on Android, IOS, and web.
- **Internationalization:** Available in 16 languages for global users.
- **Secure authentication:** Powered by Clerk for safe sign-in and sign-up.
- **Dashboard overview:** Visualize your accounts, transactions, and spending trends.
- **Expense tracking:** Easily add, categorize, and review your expenses.
- **Budget planning:** Set budgets and monitor your progress.
- **Data privacy:** Your financial data is securely stored and never shared.
- **Customizable themes:** Personalize your experience with light/dark modes.
- **Fast and responsive:** Built with Expo, React Native, and TailwindCSS for a smooth experience.

## 🚀 Quick Start

### 1. Install Expo Go

Download Expo Go from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [Apple App Store](https://apps.apple.com/app/expo-go/id982107779).

### 2. Clone the Repository

```bash
git clone https://github.com/The-Creative-Programming-Group/finance-io.git
cd finance-io
```

#### Install dependencies

With **pnpm**:

```bash
pnpm install
```

With **npm**:

```bash
npm install
```

With **yarn**:

```bash
yarn install
```

### 3. Set Up Environment Variables

- Copy `.env.example` to `.env.local`.
- Fill in the required values (see comments in `.env.example` for details).

### 4. Start the Development Server

With **pnpm**:

```bash
pnpm start
```

With **npm**:

```bash
npm start
```

With **yarn**:

```bash
yarn start
```

- Scan the QR code with Expo Go to launch the app on your device.

## 📱 Native Build Setup (Optional)

If you want to build a native app (APK/IPA):

- Edit `app.json` as needed, especially the `eas.projectId` and `owner` fields:

  ```json
  "eas": {
     "projectId": "YOUR_PROJECT_ID"
  },
  "owner": "YOUR_EXPO_OWNER"
  ```

- For more details, see the [Expo EAS documentation](https://docs.expo.dev/eas/).

## 🗂 Project Structure

```
src/
   app/
   components/
   contexts/
   data/
   db/
   server/
   services/
   trpc/
   types/
   utils/
localization/
assets/
drizzle/
```

- **app/**: Screens and layouts using Expo Router.
- **components/**: Reusable UI elements.
- **contexts/**: Theme and other React context providers.
- **db/**: Database schema and ORM config.
- **server/**: API routes and backend logic.
- **services/**: Business logic modules.
- **trpc/**: tRPC client setup.
- **types/**: TypeScript types.
- **utils/**: Utility functions.
- **localization/**: Language files for internationalization.
- **assets/**: Fonts, icons, images.
- **drizzle/**: Database migrations.

## 🛠 Technology Stack & Resources

- **Expo (React Native):** [Expo Documentation](https://docs.expo.dev/)
- **Expo Router:** [Expo Router Docs](https://expo.github.io/router/docs/)
- **TailwindCSS:** [TailwindCSS Docs](https://tailwindcss.com/docs)
- **NativeWind:** [NativeWind Docs](https://www.nativewind.dev/)
- **tRPC:** [tRPC Documentation](https://trpc.io/docs)
- **React Query:** [React Query Docs](https://tanstack.com/query/latest)
- **Drizzle ORM:** [Drizzle ORM Docs](https://orm.drizzle.team/docs)
- **Clerk (Authentication):** [Clerk Docs](https://clerk.com/docs)
- **react-i18next:** [react-i18next Docs](https://react.i18next.com/)

## 🛠 Troubleshooting & FAQ

### Metro bundler not connecting / Unable to load script

- Ensure `pnpm start`, `npm start`, or `yarn start` is running.
- Make sure your device and computer are on the same Wi-Fi, or use USB with `adb reverse tcp:8081 tcp:8081` for Android.
- Check firewall settings and allow port 8081.

### App stuck on splash screen

- Check Metro terminal and device logs for errors.
- Verify environment variables in `.env.local` are set correctly.
- Free up device storage if nearly full.

### Environment variable issues

- Copy `.env.example` to `.env.local` and fill in all required values.
- Missing Clerk keys will cause authentication errors.

### More help

- See official docs in the Technology Stack & Resources section above.
- For Expo-specific issues: [Expo Troubleshooting Guide](https://docs.expo.dev/troubleshooting/common-issues/)
- If your issue isn’t listed here, check the [open issues](https://github.com/The-Creative-Programming-Group/finance-io/issues) on GitHub for possible solutions or updates.

## 🎨 Design & UI Resources

All UI development should follow the official Figma design for Finance.io.  
Access the design here: [Finance-IO Figma UI](https://www.figma.com/design/JQFXBsYUqEdSLD3OQUwp1H/Native-Finance-App---Finance.io?node-id=0-1&p=f&t=SOgQXPopZ1yAeuZK-0)

## 👏 Contributing

We welcome contributions! To get started:

1. Fork the repository and create your branch from `main`.
2. Make your changes, following our code style and best practices.
3. Ensure your code is formatted and linted.
4. Submit a pull request with a clear description of your changes.

Please read our [CONTRIBUTING.md](https://github.com/The-Creative-Programming-Group/finance-io/wiki/Contributing-to-Finance.io) for more details.

<!-- ## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. -->

## 📬 Contact / Support

For questions, issues, or feature requests, please open an issue on GitHub

<!-- ## 🏅 Badges / Visuals

<!-- Example badges: -->

![Build Status](https://img.shields.io/github/workflow/status/The-Creative-Programming-Group/finance-io/CI)
![License](https://img.shields.io/github/license/The-Creative-Programming-Group/finance-io) -->

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history and updates.
