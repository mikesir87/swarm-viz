ARG node=node:8.7-alpine
ARG target=node:8.7-alpine

# Build frontend
FROM $node as frontend
WORKDIR /app
COPY client/package.json .
RUN npm install --quiet
COPY client/ .
RUN npm run build

# Build backend
FROM $node as backend
WORKDIR /app
COPY api/package.json .
RUN npm install --quiet
COPY api/ .
RUN npm run build

# Put them together
FROM $node as proddeps
WORKDIR /app
COPY api/package.json .
RUN npm install --production --quiet
COPY --from=backend /app/dist /app/dist
COPY --from=frontend /app/build /app/build

FROM $target
EXPOSE 3000
COPY --from=proddeps /app /app
CMD ["node", "/app/dist/index.js"]
