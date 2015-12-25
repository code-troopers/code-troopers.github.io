npm cache clean
npm install
bower install
if [ -e "/home/jenkins/.ssh/id_rsa" ]
then
    chmod 600 /home/jenkins/.ssh/id_rsa
fi
gulp deploy --prod
