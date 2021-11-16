# First stage
FROM node:14.18.1-alpine3.14 as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i npm@latest -g

RUN npm install

COPY . .

RUN npm run build

#dist folder that have all javascript

# Second stage
FROM nginx:1.19.1-alpine

COPY --from=node /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/copy-nginx.conf