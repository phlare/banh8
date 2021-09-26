FROM node:14
WORKDIR /usr/src/app
COPY package*.json *.js ./
RUN npm install
EXPOSE 3000
CMD node -r ./index.js