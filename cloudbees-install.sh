# prerequisites to install on jenkins before each build

export DISPLAY=:1
Xvfb :1 &

#
# Fetch node, grunt, bower, npm deps, ruby for compass...
#

#cd $1

curl -s -o ./use-node https://repository-cloudbees.forge.cloudbees.com/distributions/ci-addons/node/use-node
NODE_VERSION=0.8.4 . ./use-node

npm cache clean

npm install -g grunt-cli bower

npm install

bower install

grunt build

grunt gh-pages