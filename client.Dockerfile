FROM node

WORKDIR /usr/app/client/

COPY client/package*.json ./

RUN npm install

COPY client/ ./

EXPOSE 3000

CMD ["npm", "start"]