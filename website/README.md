# Website

This site is a [Docusaurus](https://docusaurus.io/) app. Catalog pages read JSON from `src/data/` (generated from YAML in the repo root).

Use **npm** with the committed `package-lock.json` (do not use Yarn here — it would create a second lockfile).

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

## Build the website locally

From the **repository root**:

### 1. Install dependencies

```bash
cd website
npm ci
```

### 2. (Optional) Regenerate catalog JSON

Skip this if the catalog entries are already included in JSON files under `website/src/data/`. Run it when you changed YAML under `models/`, `datasets/`, or `repositories/` and want fresh JSON:

```bash
pip install pyyaml
python scripts/build_catalog.py
```

### 3. Development server (live reload)

```bash
cd website
npm run start
```

Open the URL printed in the terminal (usually [http://localhost:3000](http://localhost:3000)). Stop with `Ctrl+C`.


## Scripts

| Command | Purpose |
|---------|---------|
| `npm run start` | Dev server with hot reload |
| `npm run build` | Optimized static build → `build/` |
| `npm run serve` | Serve `build/` after `npm run build` |
| `npm run clear` | Clear Docusaurus cache if the dev server acts stale |

