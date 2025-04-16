const Configuration = {
  // Lint & Prettify TS and JS files
  '**/*.(ts)': (filenames) => [
    'pnpm tsc --noEmit',
    `pnpm eslint ${filenames.join(' ')}`,
    `pnpm prettier --write ${filenames.join(' ')} --plugin-search-dir=.`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json|css)': (filenames) =>
    `pnpm prettier --write ${filenames.join(' ')} --plugin-search-dir=.`,
};

export default Configuration;
