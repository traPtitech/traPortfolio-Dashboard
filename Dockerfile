FROM --platform=$BUILDPLATFORM node:20.11.1-alpine as build
WORKDIR /app

RUN apk update

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY scripts/ ./scripts/
RUN npm ci
COPY . .
RUN npm run build

# 本番環境
FROM caddy:2.4.6-alpine
EXPOSE 80
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy
