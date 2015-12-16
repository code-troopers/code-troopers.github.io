FROM ruby
MAINTAINER bitard [DOT] michael [AT] gmail [DOT] com

RUN apt-get update && \
    apt-get install -y ca-certificates apt-transport-https curl libfontconfig sudo && \
    apt-get clean

# ADD USER ct
#RUN export user=ct && mkdir -p /home/ct && \
    #echo "${user}:x:${UID}:${GID}:${user},,,:/home/${user}:/bin/bash" >> /etc/passwd && \
    #echo "${user}:x:${UID}:" >> /etc/group && \
    #echo "${user} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${user} && \
    #chmod 0440 /etc/sudoers.d/${user} && \
    #chown ${UID}:${GID} -R /home/${user}

RUN apt-get update && \
    apt-get install -y nodejs-legacy npm && \
    apt-get clean

RUN npm install -g gulp && \
    npm install -g grunt && \
    npm install -g grunt-cli && \
    npm install -g bower

RUN gem install jekyll rdiscount kramdown jekyll-paginate
RUN gem install jekyll-paginate

VOLUME /src
EXPOSE 9002

WORKDIR /src
#USER ct
ADD run /run.sh
CMD ["/run.sh"]
