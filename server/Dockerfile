FROM node:12.16.1-alpine3.11

WORKDIR /app

COPY package.json yarn.lock ./

# Install nodemon globally
# RUN yarn global add nodemon -g
RUN yarn --silent

COPY . .
CMD ["yarn", "server:watch"]