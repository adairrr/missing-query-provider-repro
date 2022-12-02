# Abstract Frontend Monorepo
This monorepo contains the frontend for Abstract-OS, based in React.

## Commands

- `yarn start`: Run the app in development mode at https://localhost:3000. Any edits will automatically reload.


## Setup

### Yarn Plugins

```bash
echo 'enableGlobalCache: true\n\nnodeLinker: node-modules' > .yarnrc.yml && \
yarn set version stable && \
yarn plugin import typescript && \
yarn plugin import interactive-tools && \
yarn plugin import https://raw.githubusercontent.com/lyleunderwood/yarn-plugin-yaml-manifest/master/bundles/%40yarnpkg/plugin-yaml-manifest.js
```
