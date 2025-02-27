FROM node:22.14-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
