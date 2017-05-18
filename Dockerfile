
FROM node:7.9.0

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install && \
    npm install -g webpack

COPY . /app
RUN webpack

EXPOSE 8080

CMD ["npm", "start"]
