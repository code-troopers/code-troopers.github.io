FROM node:slim

# Install imagemagick
RUN apt-get update -y && apt-get install -y imagemagick && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN npm install -g gulp

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

VOLUME /usr/src/app/site
CMD ["npm", "run", "build"]

