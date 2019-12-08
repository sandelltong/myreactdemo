FROM node:alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY *.js ./
COPY .env ./

COPY bin/* ./bin/
COPY config/* ./config/
COPY controllers/* ./controllers/
COPY models/* ./models/
COPY routes/* ./routes/
COPY test/* ./test/

EXPOSE 5000

CMD ["npm", "start"]