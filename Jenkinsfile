node('docker') {
    docker.image('codetroopers/jenkins-slave-dind:1.7.1').withRun('-v /var/run/docker.sock:/var/run/docker.sock') { c ->
      // This displays colors using the 'xterm' ansi color map.
      ansiColor('xterm') {
        stage('Checkout sources') {
          checkout scm
        }
        stage('Build building image') {
          sh 'docker info'
          sh 'docker build -f Dockerfile -t hugo-webpack .'
        }
        stage('Build and stash results') {
          sh 'docker run --rm -v ${PWD}/site:/usr/src/app/site -v ${PWD}/src:/usr/src/app/src -v ${PWD}/dist:/usr/src/app/dist hugo-webpack npm run build'
          dir('dist') {
            stash name: 'dist', excludes: 'CNAME'
          }
        }
        stage('Cleanup') {
          //clean dist from docker once stashed to prevent uid issues
          sh 'docker run --rm -v ${PWD}:/app debian:jessie rm -rf /app/dist'
          sh 'docker rmi hugo-webpack'
        }
      }
    }
}
node{
  //TODO handle pre / prod deployment
  stage('Checkout current site') {
    git branch: 'gh-pages', credentialsId: 'bc7230d3-816a-4c7b-947b-7cf7f5806707', url: 'git@github.com:code-troopers/pre-www.git'
  }
  stage('Update site and push') {
    unstash name: 'dist'
    sh 'git add -A'
    sh 'git commit -a -m "New release"'
    sh 'git push -u origin gh-pages'
  }
}