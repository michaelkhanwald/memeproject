curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo yum install -y nodejs

[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc

sudo yum install -y mongodb-org
sudo yum install -y mongodb-org-4.4.3 mongodb-org-server-4.4.3 mongodb-org-shell-4.4.3 mongodb-org-mongos-4.4.3 mongodb-org-tools-4.4.3



