curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo yum install -y nodejs

curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo yum-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo yum update
sudo  yum install -y mongodb-org
sudo systemctl start mongod.service
sudo systemctl enable mongod


