FROM node:18-alpine

ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]