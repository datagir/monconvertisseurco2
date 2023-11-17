import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/src/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testMatch: [
    '**/testa/**/*.test.js',
    '**/testa/**/*.test.ts',
    '**/testc/**/*.test.js',
    '**/testc/**/*.test.ts',
    '**/testu/**/*.test.js',
    '**/testu/**/*.test.ts',
  ],
  moduleNameMapper: {
    '@incubateur-ademe/publicodes-impact-livraison': 'test-mock/livraison.json',
  },
}
module.exports = createJestConfig(customJestConfig)
