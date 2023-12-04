# Deployment

## Requirements

### Postgresql

    helm install postgresql oci://registry-1.docker.io/bitnamicharts/postgresql \
    --version 13.2.22 \
    --namespace xfsc-ocm \
    --create-namespace \
    -f helm-bitnami-postgresql-values.yaml \
    --atomic \
    --wait

### OpenSearch

    helm install opensearch oci://registry-1.docker.io/bitnamicharts/opensearch \
    --version 0.5.1 \
    --namespace xfsc-ocm \
    --create-namespace \
    -f helm-bitnami-opensearch-values.yaml \
    --atomic \
    --wait

### nats.io

    helm upgrade --install nats nats \
    --repo https://nats-io.github.io/k8s/helm/charts \
    --version 1.1.5 \
    --namespace xfsc-ocm \
    --create-namespace \
    --atomic \
    --wait

## Apps

### SSI abstraction

Build image:

    cd apps/ssi-abstraction

    docker build \
      -t docker.stackable.tech/gaia-x/xfsc/ssi-abstraction:ff4c37c \
      -f deployment/ci/Dockerfile .

    docker push docker.stackable.tech/gaia-x/xfsc/ssi-abstraction:ff4c37c


Install:

    helm upgrade ocm-ssi-abstraction \
    --install \
    --namespace xfsc-ocm \
    --create-namespace \
    -f deploy/helm-ssi-abstraction-values.yaml \
    apps/ssi-abstraction/deployment/helm
