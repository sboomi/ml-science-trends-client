/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// lint-staged.config.js
module.exports = {
  // Type check TypeScript files
  'src/**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  'src/**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
}