docker.build('ctwebsite').inside('-v /home/jenkins/.ssh:/home/ct/.ssh') {
		sh 'git config --global user.email "jenkins@code-troopers.com" && git config --global user.name "Jenkins"'
		sh 'cp -a .git /src/ && cd /src && gulp deploy --prod'
}
