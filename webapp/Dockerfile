FROM node:12.16.1-alpine3.11

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --silent

COPY . .
CMD ["yarn", "start"]