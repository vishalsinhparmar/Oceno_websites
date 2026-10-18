# OCENO

Marketing website for OCENO, a manufacturer and exporter of premium sanitaryware, built from the OCENO Figma design.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion for animation

## Getting started

```bash
pnpm install
pnpm dev
pnpm build
```

## Project structure

```
src/
  components/
    brand/        Logo
    layout/       Header (utility bar, main bar, mobile menu)
    ui/           Button, IconButton
  config/         Site config and navigation
  lib/            Asset paths, className helper
  index.css       Tailwind import and design tokens
public/assets/    Icons and images exported from Figma
```

## Design tokens

- Navy `#050b1f`, Blue `#0b4df5`, Red `#ee1c25`
- Typeface: Manrope (Medium, SemiBold)
