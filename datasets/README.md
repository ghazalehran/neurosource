# Datasets

This directory stores structured dataset metadata for the NeuroSource catalogue. Dataset entries are lightweight, factual references that model entries link to via `dataset_tags`, and that can also be browsed directly on the [catalogue website](https://ivado-neuroai.github.io/neurosource/).

---

## Layout

```text
datasets/
|-- eeg/
|-- meg/
|-- func/
|-- anat/
|-- ieeg/
|-- microscopy/
|-- nirs/
|-- multimodal/
`-- ...
    `-- <dataset_id>.yaml   # or a multi-entry file
```

Subdirectories correspond to data modalities. The mapping from modality to folder is defined in `schema/directory_map.yaml`.

| Modality examples | Directory |
|-------------------|-----------|
| `EEG` | `eeg/` |
| `MEG` | `meg/` |
| `fMRI` | `func/` |
| `MRI_T1`, `MRI_T2` | `anat/` |
| `iEEG`, `ECoG` | `ieeg/` |
| 2+ modalities from the composite list | `multimodal/` |

---

## File formats

### Single-entry file (default)

One dataset per file. The filename must match `dataset_id`:

```text
HBN_2025.yaml  →  dataset_id: HBN_2025
```

Use this format for standalone datasets. It is the simplest to review and reference from model `dataset_tags`.

### Multi-entry file

Several datasets in one YAML list — **only when they share a common collection or source**, such as benchmark subsets, releases of the same study, or sub-datasets from one portal:

```text
BNCI_Horizon_2020.yaml  →  BNCI2014-001, BNCI2014-002, …
OASIS_2010.yaml         →  multiple OASIS longitudinal releases
```

Do not group unrelated datasets into one file.

**Validation:** for list-format files, the first token of the filename (before `_` or `-`) must appear as a substring in every `dataset_id`. For example, each ID in `BNCI_Horizon_2020.yaml` must contain `BNCI`. This enforces naming consistency but not semantic relatedness — pick a filename that reflects a real shared collection.

---

## Required metadata

See `schema/dataset.schema.json`. Minimum fields:

- `dataset_id` — stable identifier used by model `dataset_tags`
- `dataset_name` — human-readable name
- `modalities` — from `schema/taxonomies.yaml` → `modalities`
- `access_type` — from `taxonomies.yaml` → `access_types`
- `url` — link to the dataset

Commonly filled optional fields: `species`, `recording_task`, `license`, `repository`, `year`, `num_subjects`, `tags`, `notes`.

---

## Linking to repositories

If the dataset is hosted on a known platform, set `repository` to match a `repository_name` in `repositories/repositories.yaml`:

```yaml
repository: OpenNeuro
```

Add the platform to `repositories/repositories.yaml` first if it is not listed yet.

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full workflow, taxonomy rules, and validation steps.
