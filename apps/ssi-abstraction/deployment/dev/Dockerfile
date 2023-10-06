FROM ubuntu:18.04 as base

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y && apt-get install -y \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    libsodium-dev \
    libzmq3-dev \
    git \
    openssl \
    libssl-dev \
    pkg-config \
    # Only needed to build indy-sdk
    build-essential

# nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

RUN git clone https://github.com/hyperledger/indy-sdk

RUN cd indy-sdk/libindy && ~/.cargo/bin/cargo build --release

RUN cd indy-sdk/libindy && mv target/release/libindy.so /usr/lib/libindy.so

## install depdencies
RUN apt-get install -y \
    nodejs
    
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

FROM base as final

ENV RUN_MODE="docker"

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .
RUN pnpm install --frozen-lockfile

EXPOSE 3009
EXPOSE 3010
EXPOSE 4000

CMD ["pnpm","-F", "ssi-absctracion", "start"]



