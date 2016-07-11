node {
  git credentialsId: 'ca0fa128-d2af-4c9b-9f77-3a2403d46725', url: 'git@github.com:code-troopers/website.git'
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
