// Below is related to: https://github.com/Microsoft/TypeScript/issues/30471
// Related as well: https://stackoverflow.com/questions/53279182/vscode-imports-import-console-requireconsole-automatically
declare module 'console' {
  export = typeof import('console');
}
