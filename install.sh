curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo yum install -y nodejs

wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo yum add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/yum/sources.list.d/mongodb-org-4.2.list
sudo yum update
sudo yum install -y mongodb-org
sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl enable mongod






