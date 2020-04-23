FROM node:11

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci --only=prod

COPY . .

EXPOSE 4390
CMD ["npm", "start"]
