FROM node:18

WORKDIR /ngo-transparency-client

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]