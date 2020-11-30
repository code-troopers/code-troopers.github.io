module.exports = {
  '**/*.{json,css,scss,md}': (filenames) => `yarn format ${filenames.join(' ')}`,
  // Run type-check on changes to TypeScript files
  '**/*.ts?(x)': () => 'yarn type-check',
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': (filenames) => `yarn lint ${filenames.join(' ')}`,
}
