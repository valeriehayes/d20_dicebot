# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /home/ubuntu/work
COPY . .
#RUN pip install --no-cache-dir -r requirements.txt
RUN npm update
# if we want to open port 5000
#EXPOSE 5000
CMD ["node", "./index.js"]
