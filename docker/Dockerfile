FROM ruby
MAINTAINER bitard [DOT] michael [AT] gmail [DOT] com

RUN apt-get update && \
    apt-get install -y ca-certificates apt-transport-https curl libfontconfig sudo && \
    apt-get clean

# ADD USER ct
RUN adduser --system --uid 1000 ct


# Install Node

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 5.3.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && grep " node-v$NODE_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
  && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc

RUN npm install -g gulp && \
    npm install -g bower

# Install jekyll
RUN gem install jekyll rdiscount kramdown jekyll-paginate

VOLUME /home/ct/src
EXPOSE 3000

USER ct
WORKDIR /home/ct/src
ADD run /run.sh
CMD ["/run.sh"]
