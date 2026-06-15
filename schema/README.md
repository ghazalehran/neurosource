# Schema

The `schema/` directory defines the required structure, controlled vocabularies, and directory-placement rules for catalog entries.

---

## JSON schemas

| Category | Directory | Schema file | Required fields |
|--------|----------|-------------|-----------------|
| Models | `models/<modality>/` | `model.schema.json` | `model_name`<br>`modality`<br>`architecture`<br>`year`<br>`paper_url` |
| Datasets | `datasets/<modality>/` | `dataset.schema.json` | `dataset_id`<br>`dataset_name`<br>`modalities`<br>`access_type`<br>`url` |
| Repositories | `repositories/repositories.yaml` | `repository.schema.json` | `repository_name`<br>`url`<br>`modalities`<br>`access_type` |

See each `.schema.json` file for the full list of optional fields.

---

## Taxonomies (`taxonomies.yaml`)

Controlled vocabularies that keep metadata consistent across the catalogue. The validator rejects values that are not in the relevant taxonomy list.

| Taxonomy key | Example values | Validated on |
|--------------|----------------|--------------|
| `modalities` | `EEG`, `MEG`, `fMRI`, `spikes`, `calcium`, … | models, datasets, repositories |
| `access_types` | `open`, `registration_required`, `controlled`, … | datasets, repositories |
| `species` | `human`, `mouse`, `rat`, … | datasets |
| `recording_tasks` | `resting_state`, `motor_imagery`, `sleep`, … | datasets |
| `licenses` | `CC-BY-4.0`, `MIT`, `custom`, … | datasets |
| `architectures` | `CNN`, `Transformer`, `RNN`, … | informational (models) |
| `tasks` | `classification`, `decoding`, `foundation_model`, … | informational (models) |
| `objectives` | `classification`, `regression`, … | informational |
| `auxiliary_modalities` | `metadata`, `behavior`, `EOG`, … | directory-placement rules |

**Contributors must use existing taxonomy values.** To propose a new value, open an issue or note it in your pull request.

---

## Directory map (`directory_map.yaml`)

Determines which subdirectory an entry belongs in.

### `modality_directories`

Maps a single modality to a folder name:

```yaml
EEG: eeg
MEG: meg
fMRI: func
iEEG: ieeg
ECoG: ieeg
MRI_T1: anat
```

Modalities not listed here default to `other/`.

### `composite_directories`

Rules for multi-modality folders. Currently `multimodal/` requires at least 2 modalities from a defined set (MEG, EEG, fMRI, MRI_T1, and others).

### `auxiliary_modalities`

Modalities that complement a primary modality (`metadata`, `behavior`, `EOG`, etc.). A dataset must have at least one non-auxiliary modality, and auxiliary modalities do not determine directory placement.

---

## Cross-references

- `dataset_tags` in model entries must match `dataset_id` values in `datasets/`.
- `repository` in dataset entries should match `repository_name` in `repositories/repositories.yaml`.

---

## Validation

```bash
pip install jsonschema pyyaml
python .github/scripts/validate_catalog.py
```

The script loads schemas, taxonomies, and the directory map, then checks every YAML file under `models/`, `datasets/`, and `repositories/`.
