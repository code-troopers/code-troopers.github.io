FROM alpine:3.2
MAINTAINER Cedric Gatay <c.gatay@code-troopers.com>

RUN apk upgrade --update \
 && apk add libatomic readline readline-dev libxml2 libxml2-dev \
        ncurses-terminfo-base ncurses-terminfo \
        libxslt libxslt-dev zlib-dev zlib \
        ruby ruby-dev yaml yaml-dev \
        libffi-dev build-base git curl \
        ruby-io-console ruby-irb ruby-json ruby-rake imagemagick openssh-client \
 && gem install --no-document --no-ri redcarpet kramdown maruku rdiscount RedCloth liquid pygments.rb \
 && gem install --no-document --no-ri sass safe_yaml \
 && gem install --no-document --no-ri jekyll -v 2.5 \
 && gem install --no-document --no-ri jekyll-paginate jekyll-sass-converter \
 && gem install --no-document --no-ri jekyll-sitemap jekyll-feed jekyll-redirect-from \
 && gem install --no-document --no-ri  jekyll-paginate jekyll-asciidoc asciidoctor pygmentize \
 && rm -rf /root/src /tmp/* /usr/share/man /var/cache/apk/* \
 && apk del build-base zlib-dev ruby-dev readline-dev \
            yaml-dev libffi-dev libxml2-dev \
 && apk search --update

ENV VERSION=v5.3.0 NPM_VERSION=3

RUN apk add --update curl make gcc g++ binutils-gold python linux-headers paxctl libgcc libstdc++ && \
  curl -sSL https://nodejs.org/dist/${VERSION}/node-${VERSION}.tar.gz | tar -xz && \
  cd /node-${VERSION} && \
  ./configure --prefix=/usr ${CONFIG_FLAGS} && \
  make -j$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) && \
  make install && \
  paxctl -cm /usr/bin/node && \
  cd / && \
  if [ -x /usr/bin/npm ]; then \
    npm install -g npm@${NPM_VERSION} && \
    find /usr/lib/node_modules/npm -name test -o -name .bin -type d | xargs rm -rf; \
  fi && \
  apk del curl make gcc g++ binutils-gold python linux-headers paxctl ${DEL_PKGS} && \
  rm -rf /etc/ssl /node-${VERSION} ${RM_DIRS} \
    /usr/share/man /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp \
    /usr/lib/node_modules/npm/man /usr/lib/node_modules/npm/doc /usr/lib/node_modules/npm/html


ENV TINI_VERSION v0.8.4
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static /tini
RUN chmod +x /tini

ENTRYPOINT ["/tini", "--"]

RUN adduser -S -u 1000 -h /home/ct ct

# Install Node

ENV NPM_CONFIG_LOGLEVEL info

RUN npm install -g gulp && \
    npm install -g bower

WORKDIR /src
ADD package.json /tmp/package.json
RUN cd /tmp && npm install

ADD . /src
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

RUN chown -R ct /src

USER ct
RUN bower install

RUN pygmentize -S monokai -f html -O classprefix=tok- > /home/ct/pygments.css

EXPOSE 3000
VOLUME /src/app

CMD ["gulp", "serve", "--drafts", "--prod"]
