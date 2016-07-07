node {
  git branch: 'master', url: 'git@github.com:code-troopers/website.git'
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
  docker.build('website-node').inside('-v /var/jenkins_home/.ssh:/root/.ssh') {
      sh 'rm -rf node_modules && ln -s /usr/src/app/node_modules node_modules'
      sh 'npm run jenkins.postbuild'
      sh 'npm run jenkins.deploy'
    }
}
