module.exports = {
  roots: ["<rootDir>/src/test/"],
  moduleFileExtensions: ["js", "ts"],
  coverageReporters: ["html"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: [
    "**/*.(test|spec).ts"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};