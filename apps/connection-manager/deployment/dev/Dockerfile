FROM node:16-alpine3.15

WORKDIR /usr/src/app

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm -F connection-manager build

EXPOSE 3003

CMD ["pnpm", "-F", "connection-manager", "start:docker"]
