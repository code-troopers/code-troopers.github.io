stage 'Build image'
node {
  git branch: "$BRANCH", credentialsId: 'ca0fa128-d2af-4c9b-9f77-3a2403d46725', url: 'git@github.com:code-troopers/website.git'
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
