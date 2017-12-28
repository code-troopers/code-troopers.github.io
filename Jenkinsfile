node('dind') {
  // This displays colors using the 'xterm' ansi color map.
  ansiColor('xterm') {
    checkout scm

    sh 'mkdir dist || true'
    sh 'make build dist'
    sh 'ls -lR'
    archiveArtifacts 'dist'

//            {
//      sh 'npm run build'
//      sh 'npm run lint --silent'
//      sh 'npm run stylelint --silent'
//    }
  }
}