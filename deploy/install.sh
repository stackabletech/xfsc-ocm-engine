#!/bin/bash

create() {

	kubectl create ns xfsc-ocm
	kubectl apply -n xfsc-ocm -f deploy/ocm-ingress.yaml

	kubectl apply --namespace xfsc-ocm -f ./apps/principal-manager/deployment/manifests/configmap.yaml
	kubectl apply --namespace xfsc-ocm -f ./apps/principal-manager/deployment/manifests/deployment.yaml
	kubectl apply --namespace xfsc-ocm -f ./apps/principal-manager/deployment/manifests/service.yaml

	helm upgrade --install \
		--namespace xfsc-ocm \
		--create-namespace \
		-f deploy/helm-ssi-abstraction-values.yaml \
		--atomic \
		--wait \
		ssi-abstraction ./apps/ssi-abstraction/deployment/helm

	helm upgrade --install \
		--namespace xfsc-ocm \
		--create-namespace \
		--atomic \
		--wait \
		proof-manager ./apps/proof-manager/deployment/helm

	helm upgrade --install \
		--namespace xfsc-ocm \
		--create-namespace \
		--atomic \
		--wait \
		connection-manager ./apps/connection-manager/deployment/helm

	helm upgrade --install \
		--namespace xfsc-ocm \
		--create-namespace \
		--atomic \
		--wait \
		attestation-manager ./apps/attestation-manager/deployment/helm

}

destroy() {
	helm uninstall -n xfsc-ocm attestation-manager
	helm uninstall -n xfsc-ocm connection-manager
	helm uninstall -n xfsc-ocm proof-manager
	helm uninstall -n xfsc-ocm ssi-abstraction

	kubectl delete --namespace xfsc-ocm cm/principal-manager-env
	kubectl delete --namespace xfsc-ocm svc/principal-manager
	kubectl delete --namespace xfsc-ocm deployment/principal-manager

	kubectl delete --namespace xfsc-ocm ingress/ocm
}

create
#destroy
