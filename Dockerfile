FROM node:22.14-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run lint && npm run test && npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
