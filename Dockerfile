FROM node:16-alpine AS build-stage

ENV TZ="Europe/Stockholm"
RUN date

WORKDIR /app
COPY . .

# install dependencies
RUN npm install

# build project
RUN npm run build

FROM node:16-alpine AS prod-stage

WORKDIR /app

# copy only neccessary files to prod stage
COPY --from=build-stage /app/dist/src ./dist/src
COPY --from=build-stage /app/node_modules ./node_modules

EXPOSE 4000
# start app
CMD ["node", "./dist/src/app.js"]