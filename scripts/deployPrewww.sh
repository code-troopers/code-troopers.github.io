#!/bin/sh

echo "FROM nginx" >> Dockerfile
echo "COPY site/public /usr/share/nginx/html" >> Dockerfile
docker build -t docker.code-troopers.com/website-prewww:latest .
docker login -u coruscant -p DtsPtxvthape -e dev@code-troopers.com https://docker.code-troopers.com
docker push docker.code-troopers.com/website-prewww:latest
docker run -e VIRTUAL_HOST=prewww.code-troopers.com --name website-prewww -d docker.code-troopers.com/website-prewww:latest
