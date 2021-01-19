module.exports = {
  moduleFileExtensions: ["js", "ts"],
  coverageReporters: ["text"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: [
    "**/*.(test|spec).ts"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};