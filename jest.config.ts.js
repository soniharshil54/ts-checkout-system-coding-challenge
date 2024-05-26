module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src', 'tests'],
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.ts'],
}