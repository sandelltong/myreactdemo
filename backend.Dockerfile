FROM node

WORKDIR /src/app

COPY package*.json ./
COPY *.js ./
COPY .env ./

COPY controllers/* ./controllers/
COPY public/* ./public/
COPY routes/* ./routes/
COPY models/* ./models/
COPY views/* ./views/
COPY bin/* ./bin/

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]