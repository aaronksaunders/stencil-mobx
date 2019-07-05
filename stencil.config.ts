import {Config} from '@stencil/core';
import {sass} from '@stencil/sass';

export const config: Config = {
  namespace: 'stencil-mobx-demo',
  plugins: [
    sass()
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
