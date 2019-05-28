module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
      'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
      'plugin:jsx-a11y/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/react',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
      'airbnb',
    ],
    parserOptions: {
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        jsx: true, // Allows for the parsing of JSX
      },
    },
    env: {
      browser: true,
    },
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'react/prop-types': 'off', // No need to have prop-types turned since TypeScript is being used
      'react/jsx-indent': ['error', 2],
      '@typescript-eslint/indent': ['error', 2],
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }], // All jsx should be used in tsx files
      'import/no-default-export': 'error', // Discourage use of default exports
      'import/prefer-default-export': 'off', // Discourage use of default exports
      'jsx-a11y/label-has-for': 'off', // Deprecated by jsx-a11y
      'jsx-a11y/label-has-associated-control': 'off', // Turned off as it seems to not work right
    },
    overrides: [
      {
        // Need default exports for tsx files in pages
        // this is required by Next.js
        files: ['src/cms/**', 'src/pages/**', 'src/templates/**'],
        // "excludedFiles": "*.test.js",
        rules: {
          'import/no-default-export': 'off',
          'import/prefer-default-export': 'on',
          'react/jsx-filename-extension': 'off',
        }
      }
    ],
    settings: {
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
  };
  