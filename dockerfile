FROM node:23-alpine3.20

WORKDIR "/usr/src/app"

COPY package*.json .

RUN npm install
# uninstall the current bcrypt modules
RUN npm uninstall bcrypt --force

# install the bcrypt modules for the machine
RUN npm install bcrypt

COPY . .

EXPOSE 3000