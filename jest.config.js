module.exports = {
  preset: 'ts-jest',
  rootDir: 'src',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
  coverageReporters: ['html'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
