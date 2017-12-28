node('docker') {
  // This displays colors using the 'xterm' ansi color map.
  ansiColor('xterm') {
    checkout scm

    def image = docker.build("codetroopers/website:${env.BUILD_ID}").withRun('npm run build')
    image.run('', 'npm run build'){ c ->

    }

//            {
//      sh 'npm run build'
//      sh 'npm run lint --silent'
//      sh 'npm run stylelint --silent'
//    }
  }
}