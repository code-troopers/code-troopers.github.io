stage 'Build image'
node {
  checkout scm
  docker.build('ctwebsite').inside('-v /home/jenkins/.ssh:/home/ct/.ssh') {
    sh 'cd /src && gulp build --prod --drafts'
    sh 'cd - && tar -czvf source.tgz /src/public'
    stash includes: 'source.tgz', name: 'source'
  }
}
stage 'Copy public'
node('miko') {
  unstash 'source'
  sh 'tar -xzvf source.tgz'
}
