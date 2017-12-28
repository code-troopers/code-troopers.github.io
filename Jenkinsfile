pipeline {
  agent {
    dockerfile {
      args " -v \${PWD}/site:/usr/src/app/site -v \${PWD}/src:/usr/src/app/src -v \${PWD}/dist:/usr/src/app/dist"
    }
  }
  stages {
    stage("build") {
      steps {
        sh 'cd /usr/src/app/'
        sh 'npm run build'
        sh 'npm run lint --silent'
        sh 'npm run stylelint --silent'
      }
    }
  }
}