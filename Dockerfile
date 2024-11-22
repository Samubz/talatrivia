FROM node:20-alpine AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json ./
COPY prisma prisma

RUN pnpm i

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm build

RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist/ ./dist/
COPY --from=dependencies /app/node_modules ./node_modules

EXPOSE 3000


CMD [ "node", "dist/src/main.js" ]