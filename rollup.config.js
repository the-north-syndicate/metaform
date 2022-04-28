import typescriptPlugin from 'rollup-plugin-typescript2';

const dist = 'dist';

export default {
  input: './src/index.ts',
  plugins: [
    typescriptPlugin(),
    {
      name: 'retain-import-expression',
      resolveDynamicImport(specifier) {
        if (specifier === 'node-fetch') return false;
        return null;
      },
      renderDynamicImport({ targetModuleId }) {
        if (targetModuleId === 'node-fetch') {
          return {
            left: 'import(',
            right: ')',
          };
        }

        return undefined;
      },
    },
  ],
  output: [
    {
      file: `${dist}/index.cjs.js`,
      format: 'cjs',
    },
    {
      file: `${dist}/index.esm.js`,
      format: 'esm',
    },
    {
      name: 'metaform',
      file: `${dist}/index.umd.js`,
      format: 'umd',
    },
  ],
};
