CREATE DATABASE IF NOT EXISTS sampleInformation DEFAULT CHARACTER SET utf8;
create user 'dev'@'localhost' identified by 'Dev2020@';
grant all privileges on sampleInformation.* to 'dev'@'localhost';