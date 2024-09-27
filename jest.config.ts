import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  collectCoverageFrom: [
    'src/app/**/*.{ts,tsx}',
    'src/app/**/*/*.{ts,tsx}',
    'src/app/*****/*.{ts,tsx}',
    'src/containers/**/*.{ts,tsx}',
  ],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/containers/(.*)$": "<rootDir>/src/containers/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/services/(.*)$":  "<rootDir>/src/services/$1",
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
