module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier', 'react-hooks', 'simple-import-sort'],
  extends: [
    'airbnb',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      alias: {
        map: [
          ['@', './src']
        ]
      }
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-no-useless-fragment': ['error', {
      'allowExpressions': true
    }],
    'simple-import-sort/imports': 'error',
    camelcase: 'off',
    'no-shadow': 'off',
    'sort-imports': 'off',
    'consistent-return': 'off',
    'import/no-duplicates': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-case-declarations': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'max-len': [
      'warn',
      130,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx']
      }
    ],
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
    'react/button-has-type': 'warn',
    'react/require-default-props': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    '@typescript-eslint/ban-types': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error']
  }
};
