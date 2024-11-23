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
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=dependencies /app/node_modules ./node_modules

EXPOSE 3000


CMD ["sh", "-c", "pnpm db:deploy && node dist/src/main.js"]

# Deploy with migrations phase
FROM deploy AS deploy_with_seed
RUN pnpm i
CMD ["sh", "-c", "pnpm db:deploy && node dist/prisma/seed.js && node dist/src/main.js"]