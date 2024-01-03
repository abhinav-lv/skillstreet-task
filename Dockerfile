FROM node:21-alpine3.18
RUN mkdir home/app
WORKDIR /home/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]