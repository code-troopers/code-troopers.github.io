node {
    ws {
        git credentialsId: 'ca0fa128-d2af-4c9b-9f77-3a2403d46725', url: 'git@github.com:code-troopers/website.git'
        docker.build('ctwebsite', 'docker').inside('-v /home/jenkins/.ssh:/home/ct/.ssh') {
            sh 'git config --global user.email "jenkins@code-troopers.com" && git config --global user.name "Jenkins"'
            sh './jenkins-install.sh'
        }
    }
}