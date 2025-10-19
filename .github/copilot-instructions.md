# Finance.io Mobile App

Finance.io is an Expo React Native mobile application built with TypeScript that provides personal finance management features.
The app supports Android, iOS, and web platforms with internationalisation support for 18 languages.

Always reference these instructions first and fall back to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Initial Setup

- Install pnpm package manager:
  - `curl -fsSL https://get.pnpm.io/install.sh | sh -`
  - `export PNPM_HOME="/home/runner/.local/share/pnpm" && export PATH="$PNPM_HOME:$PATH"`
- Install dependencies: `pnpm install` -- takes 2-3 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
- Create environment file: Copy `.env.example` to `.env.local` and populate with real values

### Required Environment Variables

Create `.env.local` with these REQUIRED variables:

- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` - Get from Clerk dashboard at https://dashboard.clerk.com/last-active?path=api-keys
- `DATABASE_URL` - PostgreSQL connection string
- `EXPO_PUBLIC_API_URL` - Backend API URL (defaults to http://localhost:8081 for local dev)

**CRITICAL**: The app WILL NOT run without a valid Clerk publishable key. You will see authentication errors in the console.

### Development Workflows

- Start development server: `pnpm start` -- takes 30-60 seconds to bundle
- Start web development: `pnpm web` -- takes 30-60 seconds to bundle. Use this for testing changes.
- Start Android: `pnpm android` -- requires Android emulator or device
- Start iOS: `pnpm ios` -- requires macOS with Xcode

### Build Validation

- Run linting: `pnpm lint` -- takes 5 seconds. Currently has warnings/errors that should be addressed.
- Check formatting: `pnpm format:check` -- takes 2-3 seconds
- Fix formatting: `pnpm format:write` -- takes 2-3 seconds
- ALWAYS run `pnpm format:write` before committing changes

### Database Operations

- Generate migrations: `pnpm drizzle-kit generate` -- takes <1 second
- Open database studio: `pnpm drizzle-kit studio` -- requires valid DATABASE_URL
- Database schema is in `src/db/schema.ts`

## Validation

### Manual Testing Requirements

**ALWAYS test changes using the web interface after making modifications:**

1. Start the web development server: `pnpm web`
2. Navigate to http://localhost:8081 in your browser
3. Verify the app loads (you may see Clerk authentication errors without valid keys - this is expected)
4. Test the specific functionality you modified
5. Check browser console for any new errors

### Authentication Testing

- Without valid Clerk keys: App will show authentication errors but should render the initial screens
- With valid Clerk keys: Full authentication flow should work including sign-in/sign-up

### Language Testing

- App supports 18 languages (en, fr, es, it, fa, zh, tr, ru, de, ar, ja, ko, ur, ps, hi, pt, th, id)
- Language files are in `localization/` directory
- Test language switching functionality when making i18n changes

### No Automated Tests

- This project has Jest configured, but NO test files exist
- All validations must be done manually via the development server
- Focus on manual testing via the web interface for any changes

## Common Tasks

### Code Quality

- **ALWAYS** run `pnpm format:write` before committing
- Run `pnpm lint` to check for code issues (currently has warnings that should be fixed)
- Use TypeScript strictly - the project has strict mode enabled

### Key Project Structure

```
src/
├── app/                 # Expo Router file-based routing
│   ├── (auth)/         # Authentication screens
│   ├── dashboard/      # Dashboard screens
│   ├── home/          # Home screens
│   └── _layout.tsx    # Root layout with providers
├── components/         # Reusable UI components
├── contexts/          # React contexts (Theme, etc.)
├── db/               # Database schema and config
├── server/           # tRPC API routes
├── services/         # Business logic services
└── utils/           # Utility functions
```

### Technology Stack

- **Framework**: Expo ~53.0.7 with React Native 0.79.2
- **Routing**: Expo Router with file-based routing
- **Styling**: TailwindCSS with NativeWind
- **API**: tRPC with React Query
- **Database**: Drizzle ORM with PostgreSQL
- **Auth**: Clerk authentication
- **Internationalization**: react-i18next with 18 language support

### Platform Support

- **Web**: Full support via `pnpm web` - use this for development and testing
- **Android**: Requires Android emulator or physical device
- **iOS**: Requires macOS with Xcode

### Common Issues

- **Missing Clerk key**: Will show authentication errors - this is expected without valid keys
- **Database connection**: Drizzle commands require valid DATABASE_URL
- **Environment variables**: Must be in `.env.local` file, not just `.env`
- **Build errors**: Usually resolved by running `pnpm format:write` first

### Performance Notes

- Initial dependency install: 2-3 minutes
- Development server start: 30-60 seconds
- Lint check: ~5 seconds
- Format operations: ~2-3 seconds
- Database schema generation: <1 second

### Debugging

- Use web development mode for the fastest iteration: `pnpm web`
- Check the browser console for runtime errors
- Expo development tools available at http://localhost:8081
- Metro bundler logs show build progress and errors

## Project-Specific Rules

- Use `<AppText>` instead of `<Text>` from react-native (ESLint enforced)
- Follow TypeScript strict mode requirements
- All styling should use TailwindCSS classes via NativeWind
- API calls should use tRPC procedures defined in `src/server/routers/`
- Database operations should use Drizzle ORM queries

### Validation Checklist

Before completing any changes:

- [ ] Run `pnpm format:write` to fix formatting
- [ ] Run `pnpm lint` and address any new errors
- [ ] Test via `pnpm web` and verify functionality in browser
- [ ] Check browser console for new errors or warnings
- [ ] Verify internationalization works if touching language-related code
- [ ] Test authentication flow if modifying auth-related features
