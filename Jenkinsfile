node('docker') {
  docker.image('codetroopers/jenkins-slave-dind:1.7.1').withRun('-v /var/run/docker.sock:/var/run/docker.sock').inside{ c ->
    // This displays colors using the 'xterm' ansi color map.
    ansiColor('xterm') {
      checkout scm

      sh 'env'
      sh 'pwd'
      sh 'make release'
      sh 'ls -la'
      sh 'pwd'
      sh 'env'
      sh 'ls dist'
      archiveArtifacts 'dist'
    }
  }
}