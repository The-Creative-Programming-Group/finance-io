# Contributing to Finance-IO

Thank you for your interest in contributing to Finance-IO! We welcome contributions from everyone, whether you're fixing bugs, improving documentation, or adding new features.

## Code of Conduct

This project adheres to a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other community members
- Help create a positive environment

## How to Contribute

### Types of Contributions

- **Bug Reports**: Report bugs using our issue templates
- **Feature Requests**: Suggest new features via GitHub Discussions
- **Code Contributions**: Fix bugs or implement features
- **Documentation**: Improve docs, add examples, or fix typos
- **Testing**: Add or improve test coverage

### Getting Started

1. **Fork the Repository**

   ```bash
   git clone https://github.com/The-Creative-Programming-Group/finance-io.git
   cd finance-io
   ```

2. **Set Up Development Environment**

   ```bash
   # Install dependencies
   pnpm install

   # Set up environment variables
   cp .env.example .env.local

   # Start development server
   pnpm dev
   ```

3. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

### Development Workflow

1. **Make Changes**: Implement your feature or fix
2. **Test Locally**: Ensure your changes work as expected
3. **Run Tests**: Make sure all tests pass

   ```bash
   pnpm test
   ```

4. **Format Code**: Run the linter and formatter

   ```bash
   pnpm lint
   pnpm format
   ```

5. **Commit Changes**: Use clear, descriptive commit messages

   ```bash
   git add .
   git commit -m "feat: add user authentication flow"
   ```

6. **Push and Create PR**: Push your branch and open a pull request

## Development Setup

### Prerequisites

- Node.js 18+ and pnpm
- Git
- Android Studio (for mobile development)
- Xcode (for iOS development, macOS only)

### Environment Setup

1. **Clone and Install**

   ```bash
   git clone https://github.com/The-Creative-Programming-Group/finance-io.git
   cd finance-io
   pnpm install
   ```

2. **Database Setup**

   ```bash
   # Set up local database
   pnpm db:generate
   pnpm db:push
   ```

   > **Note:** The `drizzle/` directory is gitignored. Each team member should run `pnpm db:generate` to create their own database migration files locally.3. **Environment Variables**
   > Create `.env.local` with the following required variables:

   ```env
   # Backend API URL (defaults to localhost for development)
   EXPO_PUBLIC_API_URL="http://localhost:8081"

   # Clerk Authentication (get from https://dashboard.clerk.com)
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key_here"
   CLERK_SECRET_KEY="your_clerk_secret_key_here"

   # Database Connection (PostgreSQL)
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
   ```

   **Getting Clerk Keys:**

   - Visit [Clerk Dashboard](https://dashboard.clerk.com)
   - Create or select your application
   - Copy the publishable key for `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Copy the secret key for `CLERK_SECRET_KEY` (keep this secure!)

   **Database Setup:**

   - Use a PostgreSQL database (we recommend [Neon](https://neon.tech) for development)
   - Replace the connection string with your database credentials
   - Ensure SSL mode is set to `require` for production

   **Getting a Neon PostgreSQL Database:**

   - Visit [Neon Console](https://console.neon.tech)
   - Sign up or sign in to your account
   - Click "Create a project"
   - Choose your project name (e.g., "finance-io-dev")
   - Select your region (choose one close to you for better performance)
   - Click "Create project"
   - In your project dashboard, go to the "Connection Details" section
   - Copy the connection string and replace the placeholder in your `.env.local`
   - The connection string will look like: `postgresql://username:password@hostname/database?sslmode=require`### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking
- `pnpm db:generate` - Generate database types
- `pnpm db:push` - Push database schema

## Pull Request Process

### Before Submitting

1. **Update Documentation**: Ensure docs reflect your changes
2. **Add Tests**: Include tests for new features
3. **Update Changelog**: Add entry to CHANGELOG.md
4. **Self-Review**: Check your code meets our standards

### PR Template

Use our PR template and include:

- Clear description of changes
- Screenshots for UI changes
- Testing instructions
- Related issues

### Review Process

1. **Automated Checks**: CI runs tests and linting
2. **Code Review**: Team reviews code quality and functionality
3. **Testing**: Manual testing may be required
4. **Approval**: At least one maintainer approval required
5. **Merge**: Squash merge with descriptive commit message

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Prefer functional components in React
- Use meaningful variable and function names

### React Native/Expo

- Follow Expo SDK guidelines
- Use TypeScript for type safety
- Implement proper error boundaries
- Use React Query for data fetching
- Follow React Native accessibility guidelines

### Database

- Use Drizzle ORM for type-safe queries
- Follow database schema conventions
- Include proper indexes for performance
- Use transactions for complex operations

### Commit Messages

Follow conventional commit format:

```text
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Testing

### Test Types

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user flows

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test -- path/to/test

# Run tests in watch mode
pnpm test -- --watch

# Run tests with coverage
pnpm test -- --coverage
```

### Writing Tests

- Use Jest and React Native Testing Library
- Test user interactions and edge cases
- Mock external dependencies
- Include accessibility testing
- Test both light and dark themes

## Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document props for React components
- Include usage examples in comments
- Update README for new features

### User Documentation

- Update docs for new features
- Include screenshots for UI changes
- Provide clear setup instructions
- Document breaking changes

## Reporting Issues

### Bug Reports

Use the bug report template and include:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, device, app version)
- Screenshots or videos if applicable

### Feature Requests

Use GitHub Discussions for feature requests:

- Clear description of the feature
- Use case and benefits
- Mockups or examples if applicable
- Alternative solutions considered

## Community

### Getting Help

- **GitHub Discussions**: General questions and ideas
- **GitHub Issues**: Bug reports and feature requests
- **Discord**: Real-time chat and support

### Recognition

Contributors are recognized through:

- GitHub contributor statistics
- Changelog mentions
- Community shoutouts
- Contributor badges

## License

<!-- By contributing to Finance-IO, you agree that your contributions will be licensed under the same license as the project (MIT License). -->

---

Thank you for contributing to Finance-IO! Your efforts help make financial management more accessible and user-friendly for everyone.
