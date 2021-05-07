FROM node:12.18.1
WORKDIR /time-tracker-app-frontend

COPY package.json package-lock.json  ./
RUN npm install
