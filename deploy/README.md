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

### Nginx ingress

    helm upgrade --install \
      ingress-nginx ingress-nginx \
      --repo https://kubernetes.github.io/ingress-nginx \
      --namespace ingress-nginx \
      --create-namespace \
      --version v4.8.0

### Cert manager

    helm upgrade --install \
      cert-manager cert-manager \
      --repo https://charts.jetstack.io \
      --namespace cert-manager \
      --create-namespace \
      --set installCRDs=true \
      --version v1.13.1

## Ingress

  kubectl create ns xfsc-ocm
  kubectl apply -n xfsc-ocm -f deploy/ocm-ingress.yaml 

## Apps

### SSI abstraction

Build image:

    cd apps/ssi-abstraction

    docker build \
      -t docker.stackable.tech/gaia-x/xfsc/ssi-abstraction:ff4c37c \
      -f deployment/ci/Dockerfile .

    docker push docker.stackable.tech/gaia-x/xfsc/ssi-abstraction:ff4c37c


Install:

    helm upgrade --install \
    --namespace xfsc-ocm \
    --create-namespace \
    -f deploy/helm-ssi-abstraction-values.yaml \
    ssi-abstraction ./apps/ssi-abstraction/deployment/helm 

### Proof manager

Build image:

    cd apps/proof-manager

    docker build \
      -t docker.stackable.tech/gaia-x/xfsc/proof-manager:ff4c37c \
      -f deployment/ci/Dockerfile .

    docker push docker.stackable.tech/gaia-x/xfsc/proof-manager:ff4c37c

Error at build time:

    2.942 Found 1 error(s).
    2.942 
    2.942 src/utils/logger.ts:24:11 - error TS2349: This expression is not callable.
    2.942   Type 'typeof import("/app/node_modules/.pnpm/@elastic+ecs-winston-format@1.5.0/node_modules/@elastic/ecs-winston-format/index")' has no call signatures.
    2.942 
    2.942 24   format: ecsFormat({ convertReqRes: true }),
    2.942              ~~~~~~~~~
    2.942 
    2.956  ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  proof-manager@0.0.1 build: `nest build`
    2.956 Exit status 1

Install:

    helm upgrade --install \
    --namespace xfsc-ocm \
    --create-namespace \
    proof-manager ./apps/proof-manager/deployment/helm 


### Principal manager

    cd apps/principal-manager

    docker build \
      -t docker.stackable.tech/gaia-x/xfsc/principal-manager:ff4c37c \
      -f deployment/ci/Dockerfile .

    docker push docker.stackable.tech/gaia-x/xfsc/principal-manager:ff4c37c

    # The principal manager doesn't have a Helm Chart, so we can apply some manifests
    cd deployment/manifests

    kubectl apply --namespace xfsc-ocm -f ./apps/principal-manager/deployment/manifests/configmap.yaml
    kubectl apply --namespace xfsc-ocm -f ./apps/principal-manager/deployment/manifests/deployment.yaml
    kubectl apply --namespace xfsc-ocm -f ./apps/principal-manager/deployment/manifests/service.yaml

### Connection manager

    cd apps/connection-manager

    docker build \
      -t docker.stackable.tech/gaia-x/xfsc/connection-manager:ff4c37c \
      -f deployment/ci/Dockerfile .

    docker push docker.stackable.tech/gaia-x/xfsc/connection-manager:ff4c37c

Error at build time: same as proof-manager

    helm upgrade --install \
    --namespace xfsc-ocm \
    --create-namespace \
    --atomic \
    --wait \
    connection-manager ./apps/connection-manager/deployment/helm 

### Attestation manager

    cd apps/attestation-manager

    docker build \
      -t docker.stackable.tech/gaia-x/xfsc/attestation-manager:ff4c37c \
      -f deployment/ci/Dockerfile .

    docker push docker.stackable.tech/gaia-x/xfsc/attestation-manager:ff4c37c

    helm upgrade --install \
    --namespace xfsc-ocm \
    --create-namespace \
    --atomic \
    --wait \
    attestation-manager ./apps/attestation-manager/deployment/helm 

