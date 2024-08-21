FROM --platform=linux/amd64 node:16.17.0-bullseye-slim

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

# THIS IS TO ENABLE PRISMA DO DETECT REQUIRED FILES
RUN apt-get update && apt-get install -y openssl libssl-dev

RUN npx prisma generate && npm run build

CMD ["npm","run","start:dev"]