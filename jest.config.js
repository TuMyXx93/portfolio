const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  // Unit coverage focuses on business logic and reusable behavior. Presentational
  // sections are covered by Playwright and axe in the production E2E suite.
  collectCoverageFrom: [
    'src/app/api/contact/**/*.{ts,tsx}',
    'src/components/contact/**/*.{ts,tsx}',
    'src/components/common/Button.tsx',
    'src/components/common/LanguageSelector.tsx',
    'src/components/common/TypewriterEffect.tsx',
    'src/hooks/useAccessibility.ts',
    'src/hooks/useLoadingState.ts',
    'src/hooks/useScrollPosition.ts',
    'src/hooks/useSmoothTransition.ts',
    'src/hooks/useTheme.ts',
    'src/hooks/useThrottle.ts',
    'src/lib/contact/**/*.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
