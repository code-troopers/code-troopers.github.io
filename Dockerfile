FROM node:slim

# Install imagemagick
RUN apt-get update -y && apt-get install -y imagemagick git && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN git config --system user.name jenkins && git config --system user.email jenkins@code-troopers.com
RUN npm install -g gulp

RUN mkdir -p /usr/src/app
RUN mkdir /home/ct && useradd ct -d /home/ct && chown -R ct:ct /home/ct
RUN chown -R ct:ct /usr/src/app
USER ct
WORKDIR /usr/src/app


COPY package.json /usr/src/app
RUN npm install


VOLUME /usr/src/app/site
CMD ["npm", "run", "build"]

