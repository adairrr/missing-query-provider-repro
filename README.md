# Missing Query Provider Reproduction
This repo highlights the missing QueryProvider issue with react-query hooks in a separate repository using yarn v3.

### Works with QueryClientProvider
```shell
rm -rf .yarn
rm .yarnrc.yml
rm yarn.lock
yarn build && yarn preview
```

### Fails with QueryClientProvider
```
yarn set version stable
yarn build
yarn preview
```
