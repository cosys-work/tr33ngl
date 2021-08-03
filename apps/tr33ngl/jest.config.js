module.exports = {
  displayName: 'tr33ngl',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../coverage/apps/tr33ngl',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  moduleNameMapper: {
    "base.element.css": "@clr/core/common/base/base.element.css.js"
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@clr/core/common|lit-html|lit-element|ramda)/)',
    'node_modules/(?!(@cds/core/common|lit-html|lit-element|ramda)/)'
  ],
};
