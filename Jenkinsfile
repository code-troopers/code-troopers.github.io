pipeline {
  agent {
    dockerfile {
    //  args " -v \${PWD}/site:/usr/src/app/site -v \${PWD}/src:/usr/src/app/src -v \${PWD}/dist:/usr/src/app/dist"
    }
  }
  stages {
    stage("build") {
      steps {
        sh 'cd /usr/src/app && npm run build'
        sh 'cd /usr/src/app && npm run lint --silent'
        sh 'cd /usr/src/app && npm run stylelint --silent'
      }
    }
  }
}