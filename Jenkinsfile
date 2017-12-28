pipeline {
  agent {
    label 'docker'
    dockerfile {
    }
  }
  stages {
    stage("build") {
      steps {
        sh 'npm run build'
        sh 'npm run lint --silent'
        sh 'npm run stylelint --silent'
      }
    }
  }
}