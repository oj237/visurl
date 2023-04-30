FROM node:18-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

RUN npm run build

COPY --chown=node:node . .

USER node
