FROM debian:buster

# Install node sources
RUN apt-get -qq update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash

# Install node and pygments (for syntax highlighting)
RUN apt-get -qq update \
  && DEBIAN_FRONTEND=noninteractive apt-get -qq install -y --no-install-recommends build-essential python-pygments git ca-certificates nodejs rubygems\
  && rm -rf /var/lib/apt/lists/*

RUN gem install --no-ri --no-rdoc asciidoctor pygments.rb

# Download and install hugo
ENV HUGO_VERSION 0.79.1
ENV HUGO_BINARY hugo_${HUGO_VERSION}_Linux-64bit.deb
ARG HUGO_URL
ENV HUGO_URL https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}

RUN curl -sLo /tmp/hugo.deb ${HUGO_URL} \
  && dpkg -i /tmp/hugo.deb \
  && rm /tmp/hugo.deb

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install

COPY . /usr/src/app
EXPOSE 3000

CMD [ "npm", "run", "serve-prod"]
