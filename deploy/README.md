# Deployment

## Requirements

    kubectl create ns xfsc-ocm

### Postgresql

    helm install postgresql \
    --version 13.2.8 \
    --namespace xfsc-ocm \
    -f helm-bitnami-postgresql-values.yaml \
    --repo https://charts.bitnami.com/bitnami postgresql \
    --atomic \
    --wait

### OpenSearch

    helm install opensearch oci://registry-1.docker.io/bitnamicharts/opensearch \
    --version 0.5.1 \
    --namespace xfsc-ocm \
    -f helm-bitnami-opensearch-values.yaml \
    --atomic \
    --wait


