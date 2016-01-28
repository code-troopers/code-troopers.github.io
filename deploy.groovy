docker.build('ctwebsite').inside('-v /home/jenkins/.ssh:/home/ct/.ssh') {
	  checkout scm
		sh 'git config --global user.email "jenkins@code-troopers.com" && git config --global user.name "Jenkins"'
		sh 'cd /src && gulp deploy --prod'
}
