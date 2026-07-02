import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CatalogTable from '@site/src/components/CatalogTable';
import models from '@site/src/data/models.json';
import datasets from '@site/src/data/datasets.json';
import taxonomies from '@site/src/data/taxonomies.json';
import styles from './models.module.css';

const datasetIds = new Set(datasets.map((d) => d.dataset_id));

function LinkCell(url) {
  if (!url) return '—';
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      Link
    </a>
  );
}

function DatasetTagsCell(tags) {
  if (!tags?.length) return '—';
  return (
    <span className={styles.datasetTags}>
      {tags.map((tag) =>
        datasetIds.has(tag) ? (
          <Link key={tag} to={`/datasets#${tag}`} className={styles.datasetTag}>
            {tag}
          </Link>
        ) : (
          <span key={tag} className={`${styles.datasetTag} ${styles.datasetTagMissing}`}>
            {tag}
          </span>
        )
      )}
    </span>
  );
}

const columns = [
  {field: 'model_name', label: 'Model'},
  {field: 'modality', label: 'Modality'},
  {field: 'architecture', label: 'Architecture'},
  {field: 'task', label: 'Task'},
  {field: 'year', label: 'Year'},
  {field: 'dataset_tags', label: 'Datasets', render: DatasetTagsCell},
  {field: 'open_weights', label: 'Open Weights'},
  {field: 'paper_url', label: 'Paper', render: LinkCell},
  {field: 'code_url', label: 'Code', render: LinkCell},
];

const filters = [
  {field: 'modality', label: 'Modality', options: taxonomies.modalities},
  {field: 'architecture', label: 'Architecture', options: taxonomies.architectures},
  {field: 'task', label: 'Task', options: taxonomies.tasks},
];

const sortedModels = [...models].sort((a, b) =>
  (a.model_name ?? '').localeCompare(b.model_name ?? '', undefined, {sensitivity: 'base'})
);

export default function ModelsPage() {
  return (
    <Layout title="Models" description="Catalog of neural models">
      <div className="container margin-vert--lg">
        <Heading as="h1">Models</Heading>
        <p>Neural foundation models and baselines for brain data.</p>
        <CatalogTable data={sortedModels} columns={columns} filters={filters} />
      </div>
    </Layout>
  );
}
