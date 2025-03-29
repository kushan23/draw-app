FROM node:lts-alpine AS pruner

WORKDIR /app
RUN npm install -g turbo
COPY . .

RUN turbo prune httpbackend --docker


COPY prisma ../packages/db/prisma

FROM node:lts-alpine AS installer

WORKDIR /app
COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM node:lts-alpine AS builder

WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .


COPY --from=pruner /app/prisma ./prisma

RUN npm install -g pnpm

RUN pnpm prisma generate  

RUN pnpm run build


FROM node:lts-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/ .


RUN ls -la node_modules/.prisma/client || echo "Prisma Client is missing!"

CMD ["node", "apps/httpbackend/dist/index"]
