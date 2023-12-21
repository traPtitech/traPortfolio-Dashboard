FROM --platform=$BUILDPLATFORM node:20.8.0-alpine as build
WORKDIR /app

RUN apk update \
    && apk --no-cache add openjdk11 \
    && rm -rf /var/cache/apk/*

COPY package.json package-lock.json ./
COPY scripts/ ./scripts/
RUN npm ci
COPY . .
RUN NODE_ENV=production npm run build

# 本番環境
FROM caddy:2.4.6-alpine
EXPOSE 80
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy
