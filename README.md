# Playwright + TypeScript E2E (OrangeHRM)

Modular E2E framework with cross-browser projects, UI/API test cases, CI configs, and a k6 performance case.

## Features
- **Cross-browser**: Chromium, Firefox, WebKit (configured in `playwright.config.ts`)
- **Modular**: Page Object Model under `src/pages`
- **CI-ready**: GitHub Actions included
- **Configurable**: `.env` controls base URL, creds, and search terms
- **Reporting**: List + HTML + JUnit (XML) reports in `reports/`
- **Test types**: UI (smoke/regression), API sample, Performance (k6)

## Quick Start
```bash
# 1) Install deps
npm i

# 2) Run all tests
npm test

# 3) Open HTML report
npm run report
```

## Useful Commands
```bash
npm run test:ui           # UI only
npm run test:api          # API only
npm run test:headed       # debug in headed mode
npm run test:regression   # run @regression-tagged tests
```

## CI/CD
- **GitHub Actions**: `.github/workflows/ci.yml` installs, caches, runs tests, and uploads HTML report.

## Notes
- For **performance testing**, this is a **lightweight performance testing** using k6, separate from Playwright.
- **Run locally**
```bash
# 1) Install k6: https://k6.io/docs/get-started/installation/
# MacOS:
brew install k6

# Windows:
winget install k6 --source winget

# 2) Execute:
k6 run k6/performance.js
```
