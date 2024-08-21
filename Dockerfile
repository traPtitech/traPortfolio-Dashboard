FROM --platform=$BUILDPLATFORM node:20.11.1-alpine AS build
WORKDIR /app

RUN apk update

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN NODE_ENV=production npm run build

# 本番環境
FROM caddy:2.4.6-alpine
EXPOSE 80
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy
