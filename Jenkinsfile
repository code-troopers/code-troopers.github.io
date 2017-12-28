node('dind') {
  // This displays colors using the 'xterm' ansi color map.
  ansiColor('xterm') {
    checkout scm

    sh 'make release'
    sh 'ls -lR'
    archiveArtifacts 'dist'
  }
}