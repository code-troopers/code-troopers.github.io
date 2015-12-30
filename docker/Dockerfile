FROM ruby
MAINTAINER bitard [DOT] michael [AT] gmail [DOT] com

RUN apt-get update && \
    apt-get install -y ca-certificates apt-transport-https curl libfontconfig sudo && \
    apt-get clean

# ADD USER ct
RUN mkdir -p /home/ct && \
    groupadd -r ct -g 1000 && \
    useradd -u 1000 -r -g ct -d /home/ct -s /sbin/nologin -c "Docker image user" ct && \
    echo "ct ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/ct && \
    chmod 0440 /etc/sudoers.d/ct && \
    chown -R ct:ct /home/ct


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

RUN gem install jekyll -v "2.5.3" \
    && gem install rdiscount kramdown jekyll-paginate jekyll-asciidoc asciidoctor pygments.rb

VOLUME /src
EXPOSE 3000

WORKDIR /src
USER ct
ADD run /run.sh
CMD ["/run.sh"]
