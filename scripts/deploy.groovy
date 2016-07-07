node {
  git branch: 'feature/hugoDelire', url: 'https://github.com/code-troopers/website'
  docker.build('website-node').inside(){
      sh 'rm -rf node_modules && ln -s /usr/src/app/node_modules node_modules'
      sh 'npm run jenkins.prebuild'
  }
}

node {
    docker.image('codetroopers/hugo-asciidoctor').pull()
  docker.image('codetroopers/hugo-asciidoctor').inside(){
      sh 'hugo -t code-troopers -s site -b https://code-troopers.com'
  }
}

node {
  docker.build('website-node').inside(){
      sh 'rm -rf node_modules && ln -s /usr/src/app/node_modules node_modules'
      sh 'npm run jenkins.postbuild'
      sh 'npm run jenkins.deploy'
    }
}
