FROM node:slim as build
WORKDIR /app
COPY . ./
RUN npm install
FROM gcr.io/distroless/nodejs
COPY --from=build /app /
EXPOSE 3000
CMD ["index.js"]