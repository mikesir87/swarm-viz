ARG node=node:8.7-alpine

# Build frontend
FROM $node as frontend
WORKDIR /app
COPY client/package.json .
RUN npm install
COPY client/ .
RUN npm run build

# Build backend
FROM $node as backend
WORKDIR /app
COPY api/package.json .
RUN npm install
COPY api/ .
RUN npm run build

# Put them together
FROM $node
EXPOSE 3000
WORKDIR /app
COPY api/package.json .
RUN npm install --production
COPY --from=backend /app/dist /app/dist
COPY --from=frontend /app/build /app/build
CMD node /app/dist/index.js
