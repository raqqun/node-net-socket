FROM node:8

WORKDIR /server

COPY package*.json ./

COPY server.js ./server.js

RUN npm install

CMD ["node", "server.js"]
