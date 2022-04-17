FROM node:14

WORKDIR /code

COPY package.json .
COPY package-lock.json .
RUN npm install

ENV HOST=0.0.0.0
ENV PORT=80

COPY . .
RUN npm run build

CMD [ "npm", "run", "preview" ]
