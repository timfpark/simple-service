FROM node:boron

WORKDIR /app

COPY app/. .
RUN npm install
COPY ./start-service .

EXPOSE 3032

CMD [ "./start-service" ]
