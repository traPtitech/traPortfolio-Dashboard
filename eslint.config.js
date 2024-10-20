import globals from 'globals'
import eslint from '@eslint/js'
import tsESLint from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'

const commonLint = {
  languageOptions: {
    globals: {
      ...globals.browser
    }
  }
}

const vueLint = {
  files: ['*.vue', '**/*.vue'],
  languageOptions: {
    parserOptions: {
      parser: '@typescript-eslint/parser'
    }
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',

    'no-restricted-imports': [
      'error',
      {
        name: '/@/lib/apis/generated',
        message: 'Please use /@/lib/apis instead.'
      }
    ],

    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off'
  }
}

export default tsESLint.config(
  eslint.configs.recommended,
  ...tsESLint.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  commonLint,
  vueLint
)
