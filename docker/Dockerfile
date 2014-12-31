FROM ruby:2.2.0-wheezy
MAINTAINER bitard [DOT] michael [AT] gmail [DOT] com

RUN apt-get update && \
    apt-get install -y ca-certificates apt-transport-https curl libfontconfig sudo && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# ADD USER ct
RUN export uid=1000 gid=1000 user=ct && \
    mkdir -p /home/ct && \
    echo "${user}:x:${uid}:${gid}:${user},,,:/home/${user}:/bin/bash" >> /etc/passwd && \
    echo "${user}:x:${uid}:" >> /etc/group && \
    echo "${user} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${user} && \
    chmod 0440 /etc/sudoers.d/${user} && \
    chown ${uid}:${gid} -R /home/${user}

ADD nodesource.list /etc/apt/sources.list.d/nodesource.list

RUN curl -k -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    apt-get update && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN cd /tmp && \
    wget http://www.nasm.us/pub/nasm/releasebuilds/2.11.06/nasm-2.11.06.tar.gz && \
    tar xvzf nasm-*.tar.gz && \
    cd nasm-* && \
    ./configure && \
    make && \
    sudo make install && \
    rm -rf nasm-*

RUN npm install -g gulp && \
    npm install -g grunt && \
    npm install -g grunt-cli && \
    npm install -g bower

RUN gem install jekyll rdiscount kramdown

VOLUME /src
EXPOSE 9002

WORKDIR /src
USER ct
ADD run /run.sh
CMD ["/run.sh"]
