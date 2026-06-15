# Website

This site is a [Docusaurus](https://docusaurus.io/) app that renders the NeuroSource catalogue as browsable, filterable tables.

**Live site:** [https://ivado-neuroai.github.io/neurosource/](https://ivado-neuroai.github.io/neurosource/)


---

## Prerequisites

| Tool | Version |
|------|---------|
| **Node.js** | **22.x** |
| **npm** | Bundled with Node (npm 10.x ships with Node 22; required for `lockfileVersion` 3) |

### Install Node.js 22 (pick one method)

**Option A — [nvm](https://github.com/nvm-sh/nvm) (Linux / macOS / WSL)**

```bash
# Install nvm if needed, then from the website/ directory:
nvm install
nvm use
```

(`website/.nvmrc` pins Node 22.) Or explicitly: `nvm install 22 && nvm use 22`.

**Option B — installer**

Download the **22.x** installer from [nodejs.org](https://nodejs.org/).

### Verify

```bash
node -v   # expect v22.x.x
npm -v    # expect 10.x (bundled with Node 22)
```

---

## Build the website locally

From the **repository root**:

### 1. Install dependencies

```bash
cd website
npm ci
```

### 2. Generate catalog JSON

The catalog JSON under `website/src/data/` is a **build artifact and is not committed** (it is gitignored). Generate it from the YAML catalog before starting the dev server, and re-run it whenever you change YAML under `models/`, `datasets/`, or `repositories/`:

```bash
pip install pyyaml
python website/scripts/build_catalog.py
```

The deploy workflow runs this same step in CI, so production builds never depend on locally generated files.

### 3. Development server (live reload)

```bash
cd website
npm run start
```

Open the URL printed in the terminal (usually [http://localhost:3000](http://localhost:3000)). Stop with `Ctrl+C`.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run start` | Dev server with hot reload |
| `npm run build` | Optimized static build → `build/` |
| `npm run serve` | Serve `build/` after `npm run build` |
| `npm run clear` | Clear Docusaurus cache if the dev server acts stale |

---

## Contributing catalog changes

When you add or edit YAML entries under `models/`, `datasets/`, or `repositories/`, regenerate the catalog JSON and preview locally before opening a pull request. After your PR merges to `main`, the deploy workflow rebuilds and publishes the site automatically.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for entry conventions and validation.
