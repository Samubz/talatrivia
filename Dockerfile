# Usar Node.js v20 como base
FROM node:20

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app 
COPY . .
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "start:dev"]
