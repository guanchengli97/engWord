FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY scripts/build-assets.mjs ./scripts/build-assets.mjs
COPY index.html app.js sync.js map-layout.js style.css ./
COPY data/vocabulary.js data/SOURCES.md data/ECDICT-LICENSE.txt ./data/
RUN npm run build

FROM node:22-bookworm-slim
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
COPY server ./server
USER node
EXPOSE 3000
CMD ["node","server/index.js"]
