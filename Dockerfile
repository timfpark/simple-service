FROM node:carbon

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 80

CMD [ "devops/start-service" ]
