FROM node:16-alpine3.11 AS build

WORKDIR /app

COPY package*.json .
RUN npm ci --only=dev

COPY . .

RUN npm run build

FROM node:16-alpine3.11 as prod

WORKDIR /app

COPY package*.json .
RUN npm ci --only=production

COPY --from=build  /app/dist .

EXPOSE 9022

USER node

ENTRYPOINT [ "node", "." ]