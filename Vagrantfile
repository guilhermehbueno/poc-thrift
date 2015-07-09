# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    v.cpus = 1
  end

  config.vm.define "ruleserver" do |ruleserver|
    ruleserver.vm.box = "chef/centos-7.0"
    ruleserver.vm.network "private_network", ip: "192.168.50.3"
    ruleserver.vm.hostname = "ruleserver"
    ruleserver.vm.synced_folder "config/", "/opt/config/"
    ruleserver.vm.synced_folder "apps/", "/opt/apps/"
    ruleserver.vm.provision "shell", path: "config/up.sh"
    ruleserver.vm.provision "shell", path: "config/thrift_install.sh"
    ruleserver.vm.provision "shell", path: "config/java_install.sh"
    ruleserver.vm.network "forwarded_port", guest: 3101, host: 3101
  end

  config.vm.define "ruleclient" do |ruleclient|
    ruleclient.vm.box = "chef/centos-7.0"
    ruleclient.vm.network "private_network", ip: "192.168.50.4"
    ruleclient.vm.hostname = "ruleclient"
    ruleclient.vm.synced_folder "config/", "/opt/config/"
    ruleclient.vm.synced_folder "apps/", "/opt/apps/"
    ruleclient.vm.provision "shell", path: "config/up.sh"
    ruleclient.vm.provision "shell", path: "config/thrift_install.sh"
    ruleclient.vm.provision "shell", path: "config/java_install.sh"
    ruleclient.vm.network "forwarded_port", guest: 3100, host: 3100
  end
end
