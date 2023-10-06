FROM node:16-alpine3.15

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

COPY . .

RUN yarn

RUN yarn prisma:generate

EXPOSE 3007

CMD ["yarn", "start:docker"]
