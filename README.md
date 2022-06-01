# Reproduction of Vanilla-Extract issue

1. Install dependencies
```bash
pnpm i
```

2. Build ui kit
```bash
pnpm build:ui
```

2. Run application in development mode
```bash
pnpm dev
```

### Workaround #1

- Override SolidJS node export map with browser package
```bash
pnpm run patch-solid-exports
```
- Remove patch
```bash
pnpm run unpatch-solid-exports
```