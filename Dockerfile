# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /home/ubuntu/work
COPY . .
RUN npm update
CMD ["node", "./src/index.js"]
