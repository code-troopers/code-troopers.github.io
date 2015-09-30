npm cache clean
npm install
bower install
grunt build
if [ -e "/home/jenkins/.ssh/id_rsa" ]
then
    echo la
    chmod 600 /home/jenkins/.ssh/id_rsa
fi
grunt gh-pages
