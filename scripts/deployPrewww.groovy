stage 'prebuild'
node {
  git branch: 'master', url: 'https://github.com/code-troopers/website'
  docker.build('website-node').inside(){
      sh 'rm -rf node_modules && ln -s /usr/src/app/node_modules node_modules'
      sh 'npm run jenkins.prebuild'
  }
}

stage 'build'
node {
    docker.image('codetroopers/hugo-asciidoctor').pull()
  docker.image('codetroopers/hugo-asciidoctor').inside(){
      sh 'hugo -D -t code-troopers -s site -b https://prewww.code-troopers.com'
  }
}

stage 'postbuild'
node {
  docker.build('website-node').inside(){
      sh 'rm -rf node_modules && ln -s /usr/src/app/node_modules node_modules'
      sh 'npm run jenkins.postbuild'
      //sh 'npm run jenkins.deploy'
      stash includes: 'site/public/**', name: 'binary'
    }
}

stage 'deploy'
node('pi') {
    unstash 'binary'
    sh 'echo "FROM nginx" >> Dockerfile && echo "COPY site/public /usr/share/nginx/html" >> Dockerfile'
    sh 'docker build -t docker.code-troopers.com/website-prewww:latest .'
    sh 'docker login -u coruscant -p DtsPtxvthape https://docker.code-troopers.com'
    sh 'docker push docker.code-troopers.com/website-prewww:latest'
    sh 'docker rm -fv website-prewww || true'
    sh 'docker run -e LETSENCRYPT_HOST="prewww.code-troopers.com" -e LETSENCRYPT_EMAIL=contact@code-troopers.com -e VIRTUAL_HOST=prewww.code-troopers.com --name website-prewww -d docker.code-troopers.com/website-prewww:latest'
}
