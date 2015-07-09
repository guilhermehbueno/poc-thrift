#!/bin/bash
file=".java_provisioned"
if [ -f "$file" ]
  then
    echo "$file found."
    echo "Java already installed"
  else
    echo "Installing Java"
    touch $file
    cd /opt/
    sudo wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u45-b14/jdk-8u45-linux-x64.tar.gz"
    sudo tar xzf jdk-8u45-linux-x64.tar.gz

    cd /opt/jdk1.8.0_45/
    sudo alternatives --install /usr/bin/java java /opt/jdk1.8.0_45/bin/java 2
    sudo alternatives --auto java

    sudo alternatives --install /usr/bin/jar jar /opt/jdk1.8.0_45/bin/jar 2
    sudo alternatives --install /usr/bin/javac javac /opt/jdk1.8.0_45/bin/javac 2
    sudo alternatives --set jar /opt/jdk1.8.0_45/bin/jar
    sudo alternatives --set javac /opt/jdk1.8.0_45/bin/javac

    sudo echo " export JAVA_HOME=/opt/jdk1.8.0_45" >> .bash_profile
    sudo echo " export JRE_HOME=/opt/jdk1.8.0_45/jre" >> .bash_profile
    sudo echo " export PATH=$PATH:/opt/jdk1.8.0_45/bin:/opt/jdk1.8.0_45/jre/bin" >> .bash_profile

    java -version
    cd ~
    pwd
    touch $file
fi