FROM node:16

ENV TZ="Europe/Stockholm"
RUN date

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start"]