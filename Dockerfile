FROM node:alpine

WORKDIR /usr/yourapplication-name

COPY package.json .

RUN npm install\
    && npm install typescript -g

COPY . .

RUN tsc

EXPOSE 3000

CMD ["node", "./dist/server.js"]