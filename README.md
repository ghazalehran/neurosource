<p align="left">
  <img src="https://img.shields.io/badge/status-mvp-brightgreen.svg" alt="status">
  <img src="https://img.shields.io/badge/contributions-welcome-blueviolet.svg" alt="contributions welcome">
  <img src="https://img.shields.io/badge/license-BSD-lightgrey.svg" alt="license">
</p>

# NeuroSource
### *A living, open catalogue of neural foundation models, neural datasets, and data repositories.*

> **NeuroSource** is a community-curated catalogue of baseline and foundation models for neural data, the datasets they use, and the platforms that host those datasets.
> It provides a structured, open, and reviewable way to document models across modalities, tasks, and architectures.

**Browse the catalogue:** [NeuroSource](https://ivado-neuroai.github.io/neurosource/)

---

## Why this exists

Neural data research is expanding quickly, but it is still hard to answer basic questions such as:

- Which models exist for a given modality?
- What datasets do they use?
- Which architectures and tasks are most common?
- Which projects expose code or open weights?
- Which data hosting platforms and archives are commonly used?

NeuroSource makes that information structured, searchable, and reviewable in the open.

---

## What this repository contains

This repository contains:

- **Models** — YAML catalog records for neural foundation and baseline models, organized by modality
- **Datasets** — YAML catalog records for datasets referenced by models (and useful on their own), organized by modality or composite directories such as `multimodal/`
- **Repositories** — a consolidated YAML catalog of data hosting platforms and archives under `repositories/repositories.yaml`
- **Schemas** — JSON schemas that define the required structure for each entry type
- **Taxonomies** — controlled vocabularies in `schema/taxonomies.yaml` that keep metadata consistent across entries
- **Directory map** — rules in `schema/directory_map.yaml` that determine which subdirectory an entry belongs in
- **Validation** — CI checks that enforce schemas, taxonomies, filenames, and cross-references on every pull request
- **Website** — a [Docusaurus](https://docusaurus.io/) site under `website/` that renders the catalogue; deployed automatically to GitHub Pages on pushes to `main`
- **Contribution guidelines** — Basic contribution guidnce for community submissions
---

## Repository structure


Key directories:

| Directory | Purpose |
|-----------|---------|
| `models/` | One model per YAML file (or a list in a multi-entry file), placed in a per-modality subdirectory |
| `datasets/` | One or more datasets per YAML file, placed by modality or in `multimodal/` for multi-modality collections |
| `repositories/` | Hosting platforms and archives |
| `schema/` | JSON schemas, taxonomies, and directory-placement rules |


See the README in each catalog directory for placement and naming details:

- [models/README.md](./models/README.md)
- [datasets/README.md](./datasets/README.md)
- [repositories/README.md](./repositories/README.md)
- [schema/README.md](./schema/README.md)

---

## Browsing the catalogue

The catalogue is published as a static website via GitHub Pages. After every push to `main`, the deploy workflow builds the site from the YAML catalog and publishes it.

- **Live site:** [https://ivado-neuroai.github.io/neurosource/](https://ivado-neuroai.github.io/neurosource/)
- **Pages:** Models, Datasets, and Repositories — each with sortable, filterable tables

To preview changes locally, see [website/README.md](./website/README.md).

---

## Validation

Catalog entries are validated automatically in pull requests (and can be run locally).

The validator checks:

- JSON schema compliance for models, datasets, and repositories
- YAML structure (single entry or list of entries)
- Filename conventions (models and datasets)
- Folder-to-modality consistency (models and datasets)
- Controlled vocabulary values from `schema/taxonomies.yaml`
- Cross-references: `dataset_tags` in models must match existing `dataset_id` values
- Repository references: `repository` fields in datasets should match a `repository_name` in `repositories/repositories.yaml`

```bash
pip install jsonschema pyyaml
python .github/scripts/validate_catalog.py
```

Validation logic lives in `.github/scripts/validate_catalog.py`.

---

## Example entries

### Model

`models/eeg/ShallowFBCSPNet_2017.yaml`:

```yaml
model_name: ShallowFBCSPNet
modality: [EEG]
architecture: CNN
task: classification
year: 2017
paper_url: http://dx.doi.org/10.1002/hbm.23730
code_url: https://github.com/braindecode/braindecode/models/shallow_fbcsp.py
dataset_tags: [BNCI2014-001]
open_weights: false
notes: "Baseline CNN widely used for EEG decoding."
```

### Dataset

`datasets/eeg/BNCI_Horizon_2020.yaml` (multi-entry file; excerpt of one entry):

```yaml
- dataset_name: BNCI Four class motor imagery (001-2014)
  dataset_id: BNCI2014-001
  modalities: [EEG, EOG]
  species: human
  recording_task: [motor_imagery]
  access_type: open
  url: https://bnci-horizon-2020.eu/database/data-sets
  repository: BNCI Horizon 2020
  license: CC-BY-ND-4.0
```

### Repository

`repositories/repositories.yaml` (excerpt):

```yaml
- repository_name: OpenNeuro
  url: https://openneuro.org
  description: Free and open platform for sharing BIDS-compliant neuroimaging data.
  modalities:
    - EEG
    - MEG
    - iEEG
    - fMRI
    - MRI_T1
    - PET
    - NIRS
  access_type: open
  data_formats:
    - BIDS
```

---

## Contributing

We welcome contributions from the community. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow, naming conventions, taxonomy rules, and a review checklist.

In short:

1. Fork the repository.
2. Add or update YAML entries under `models/`, `datasets/`, or `repositories/`.
  - Add a model file under `models/<modality>/<model_name>_<year>.yaml`.
  - Add a dataset file under `datasets/<modality>/` (or `datasets/multimodal/` when needed).
  - Add or update an entry in `repositories/repositories.yaml` to introduce/correct a data hosting repository.
3. Use values from `schema/taxonomies.yaml` for controlled fields (modalities, access types, licenses, and so on).
4. Run `python .github/scripts/validate_catalog.py` locally before opening a pull request.
5. Open a pull request — CI will validate your changes automatically.

---

## Design principles

- Keep entries lightweight and easy to contribute
- Prefer structured metadata over long freeform summaries
- Use controlled taxonomies so the catalogue stays consistent and filterable
- Make additions easy to review automatically
- Keep the repository useful independently of the web interface
- Preserve consistency across linked catalog entries (models → datasets → repositories)

---

## Citation

If you use or reference **NeuroSource** in your work:

```bibtex
@misc{neurosource2025,
  title        = {NeuroSource: An Open Catalogue of Neural Foundation Models},
  author       = {Contributors to the NeuroSource Project},
  year         = {2025},
  url          = {https://ivado-neuroai.github.io/neurosource/},
  howpublished = {\url{https://github.com/IVADO-NeuroAI/neurosource}}
}
```
