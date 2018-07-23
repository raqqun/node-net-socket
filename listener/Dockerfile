FROM node:8

WORKDIR /listener

COPY package*.json ./

COPY listener.js ./listener.js

RUN npm install

CMD ["node", "listener.js"]
