FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock* ./

RUN npm install || yarn install

COPY . .

RUN npm run build || yarn build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]