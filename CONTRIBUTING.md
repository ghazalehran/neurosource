# Contributing to NeuroSource

Thank you for helping build the open catalogue of neural foundation models, datasets, and data repositories.

**Browse the current catalogue:** [NeuroSource](https://ivado-neuroai.github.io/neurosource/)

---

## What belongs in this repository

The focus of NeuroSource is the structured catalog itself:

- **Model** metadata entries (`models/`)
- **Dataset** metadata entries (`datasets/`)
- **Repository** (data hosting platform) entries (`repositories/repositories.yaml`)
- Schema, taxonomy, and validation improvements (`schema/`, `.github/scripts/`)
- Documentation that helps contributors add high-quality entries

If you are unsure whether a change fits the current scope, open an issue or mention it in your pull request.

---

## Quick start

1. **Fork** this repository and create a branch.
2. **Add or edit** YAML entries (see sections below).
3. **Validate** locally:
   ```bash
   pip install jsonschema pyyaml
   python .github/scripts/validate_catalog.py
   ```
4. **Open a pull request** against `main`. CI runs the same validation.

---

## Adding a model entry

### File location

Place the file under `models/<modality>/`, where `<modality>` is determined by the model's `modality` field and the mapping in `schema/directory_map.yaml`.

Current model subdirectories include `eeg/`, `meg/`, `func/`, `ieeg/`, `lfp/`, `spikes/`, `calcium/`, and `microscopy/`.

If a model spans multiple modalities, place it under any directory that matches one of its modalities.

### Filename

```
<ModelName>_<year>.yaml
```

- `<ModelName>` must be a slug of `model_name` (letters, digits, hyphens, underscores only).
- `<year>` must match the `year` field.

Example: `ShallowFBCSPNet_2017.yaml` for `model_name: ShallowFBCSPNet`, `year: 2017`.

### Required fields

See `schema/model.schema.json`. At minimum:

| Field | Notes |
|-------|-------|
| `model_name` | Full name of the model |
| `modality` | List of modalities; each value must be in `schema/taxonomies.yaml` → `modalities` |
| `architecture` | e.g. `CNN`, `Transformer` |
| `year` | Publication or release year |
| `paper_url` | URL to the paper |

### Linking datasets

Use `dataset_tags` to list `dataset_id` values from existing entries in `datasets/`. If the dataset does not exist yet, add it in the same pull request (or a prior one).

### Example

See `models/eeg/ShallowFBCSPNet_2017.yaml`.

---

## Adding a dataset entry

### File location

Placement depends on the dataset's `modalities`:

| Case | Directory |
|------|-----------|
| Single primary modality | `datasets/<mapped_dir>/` per `schema/directory_map.yaml` (e.g. `EEG` → `eeg/`, `fMRI` → `func/`) |
| Two or more modalities from the composite list | `datasets/multimodal/` |
| Unmapped modality | `datasets/other/` (if that directory exists) or the closest matching directory |

**Auxiliary modalities** (`metadata`, `behavior`, `phenotype`, `motion`, `EMG`, `EOG`, `biometrics`, `other`) do not count toward directory placement. A dataset must include at least one non-auxiliary modality.

Current dataset subdirectories include `eeg/`, `meg/`, `func/`, `anat/`, `ieeg/`, `microscopy/`, `nirs/`, and `multimodal/`.

### Filename

**Default: one dataset per file (recommended).**

```
<dataset_id>.yaml
```

The filename must exactly match `dataset_id`. Use this format unless you have a good reason to group entries together.

Example: `HBN_2025.yaml` with `dataset_id: HBN_2025`.

**Multi-entry file** (several datasets in one YAML list):

```
<Prefix>_<optional_suffix>.yaml
```

Only use a multi-entry file when the datasets **share something in common** — for example, multiple subsets or releases of the same collection, benchmark suite, or data portal. Good examples:

- `BNCI_Horizon_2020.yaml` — many BNCI benchmark subsets (`BNCI2014-001`, `BNCI2014-002`, …)
- `OASIS_2010.yaml` — multiple OASIS longitudinal releases

Do **not** combine unrelated datasets into one file just to reduce file count. Unrelated entries are easier to review, reference, and maintain as separate files.

**Validation rule for multi-entry files:** when the YAML is a list, the validator extracts the first token of the filename (before `_` or `-`) and requires that token to appear as a substring in **every** `dataset_id` in that file. For example, `BNCI_Horizon_2020.yaml` requires each `dataset_id` to contain `BNCI`. This is a naming consistency check — it does not verify that the datasets are semantically related, so choose filenames that reflect a genuine shared collection.

### Required fields

See `schema/dataset.schema.json`. At minimum:

| Field | Notes |
|-------|-------|
| `dataset_id` | Stable identifier referenced by model `dataset_tags` |
| `dataset_name` | Human-readable name |
| `modalities` | List; values must be in `taxonomies.yaml` → `modalities` |
| `access_type` | Must be in `taxonomies.yaml` → `access_types` |
| `url` | Link to the dataset page or download |

### Controlled vocabulary fields

When present, these fields must use values from `schema/taxonomies.yaml`:

| Field | Taxonomy key |
|-------|--------------|
| `species` | `species` |
| `access_type` | `access_types` |
| `license` | `licenses` |
| `modalities` | `modalities` |
| `recording_task` | `recording_tasks` |

### Linking repositories

If the dataset is hosted on a known platform, set `repository` to a `repository_name` that exists in `repositories/repositories.yaml`. Add the platform there first if it is missing.

### Example

See `datasets/eeg/BNCI_Horizon_2020.yaml` (multi-entry) or `datasets/eeg/HBN_2025.yaml` (single entry).

---

## Adding a repository entry

Repositories document data hosting platforms and archives (e.g. OpenNeuro, PhysioNet, DANDI).

### File location

All repository entries live in a single file:

```
repositories/repositories.yaml
```

This file is a **YAML list** of repository objects. Append a new list item rather than creating a separate file.

### Required fields

See `schema/repository.schema.json`. At minimum:

| Field | Notes |
|-------|-------|
| `repository_name` | Must be unique across the file |
| `url` | Primary URL of the platform |
| `modalities` | Modalities hosted; values from `taxonomies.yaml` → `modalities` |
| `access_type` | From `taxonomies.yaml` → `access_types` |

### Example

See `repositories/repositories.yaml`.

---

## Taxonomies

Controlled vocabularies in `schema/taxonomies.yaml` keep the catalogue consistent and make the website filters work correctly.

**Always check taxonomies before setting these fields.** If you need a value that is not listed, open an issue or include a note in your pull request explaining why the taxonomy should be extended. Do not invent new taxonomy values — validation will fail.

Available taxonomy groups:

| Key | Used by |
|-----|---------|
| `modalities` | models (`modality`), datasets (`modalities`), repositories (`modalities`) |
| `access_types` | datasets, repositories |
| `architectures` | models (informational; not enforced by validator yet) |
| `tasks` | models (informational) |
| `species` | datasets |
| `recording_tasks` | datasets |
| `licenses` | datasets |
| `objectives` | informational |
| `auxiliary_modalities` | directory-placement rules for datasets |

---

## Directory map

`schema/directory_map.yaml` defines how modalities map to subdirectories:

- `modality_directories` — single-modality mapping (e.g. `EEG` → `eeg`, `fMRI` → `func`)
- `composite_directories` — rules for multi-modality folders (e.g. `multimodal/` requires at least 2 modalities from a defined set)

Contributors do not need to edit this file for routine entries. It is maintained by maintainers when new modality directories are added.

---

## General conventions

- Keep metadata **factual and concise**.
- Use `notes` for brief context, not long summaries.
- Use `tags` on datasets for freeform search keywords (not validated against taxonomies).
- Prefer stable `dataset_id` values so model cross-references remain valid over time.
- Include `paper_url` or `paper_doi` when a publication exists.
- Set `open_weights: true/false` on models when weight availability is known.
- Verify that URLs are reachable before submitting.

---

## Local validation

```bash
pip install jsonschema pyyaml
python .github/scripts/validate_catalog.py
```

On success you will see a count of validated models, datasets, and repositories. On failure, each error is printed with the file path and reason.

The pull request workflow runs the same script in CI.

---

## Review checklist

Maintainers review submissions for:

- [ ] Schema compliance (all required fields present, correct types)
- [ ] Taxonomy compliance (controlled fields use allowed values)
- [ ] Correct directory placement and filename
- [ ] Valid, working links
- [ ] `dataset_tags` reference existing `dataset_id` values
- [ ] `repository` fields reference existing `repository_name` values
- [ ] Clear, accurate `notes` (when provided)
- [ ] No duplicate IDs within a category

Contributors can be listed in [CONTRIBUTORS.md](./CONTRIBUTORS.md).

---

## Previewing website changes

If your pull request changes catalog YAML, you can preview how entries will appear on the website:

```bash
pip install pyyaml
python website/scripts/build_catalog.py
cd website && npm ci && npm run start
```

See [website/README.md](./website/README.md) for prerequisites (Node.js 22).

The live site at [https://ivado-neuroai.github.io/neurosource/](https://ivado-neuroai.github.io/neurosource/) is rebuilt automatically when changes merge to `main`.
