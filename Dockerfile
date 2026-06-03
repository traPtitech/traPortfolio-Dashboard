FROM --platform=$BUILDPLATFORM node:22.12.0-alpine@sha256:51eff88af6dff26f59316b6e356188ffa2c422bd3c3b76f2556a2e7e89d080bd AS build
WORKDIR /app

RUN apk update

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN NODE_ENV=production npm run build

# 本番環境
FROM caddy:2.4.6-alpine@sha256:15e576e7d00b1f41a648c5295a03677c24da5fede09131edcb1e6d809c7dc8aa
EXPOSE 80
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy
