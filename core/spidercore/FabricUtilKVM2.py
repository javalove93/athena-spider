'''
Created on 2014. 10. 15.

@author: mwchoi
'''

from fabric.api import run, sudo, env, put, cd
from fabric.tasks import execute
import re
import json
import paramiko, time
import select
from spidercore import *



### vm list ###
def virsh_list_all():
	result = run('virsh list --all', pty=False, quiet=True)
	lines = result.split('\n')
	vms = []
	for line in lines[2:]:
		print "LINE: " + line
		words = line.strip().split()
		if (len(words)==4):
			vms.append({'id': words[0], 'name': words[1], 'state': words[2]+ ' ' + words[3]})
		else:
			vms.append({'id': words[0], 'name': words[1], 'state': words[2]})
	return vms

def getDomainList(addr, sshid, sshpw):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	results = execute(virsh_list_all, hosts=[addr])
	return results[addr]





### vm template list ###
def templatelist():
	result = run('virsh list --all | grep template', pty=False, quiet=True)
	lines = result.split('\n')
	vms = []
	for line in lines[:]:
		print "LINE: " + line
		words = line.strip().split()
		if (len(words)==4):
			vms.append({'id': words[0], 'name': words[1], 'state': words[2]+ ' ' + words[3]})
		else:
			vms.append({'id': words[0], 'name': words[1], 'state': words[2]})
			
	return vms


def getTemplatelist(addr, sshid, sshpw):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	results = execute(templatelist, hosts=[addr])
	return results[addr]




### domain info ###
def dominfo(command_):
	
	results = run('virsh dominfo ' + command_ , pty=True ,quiet=True,  timeout=5 )
	vms = []
	
	for line in results.split('\n'):
		line = line.strip()
		tmp_vms = []
		for tmpLine in line.split(':'):
			tmpLine = tmpLine.strip()
			tmp_vms.append(tmpLine)
		
		vms.append(json.dumps(tmp_vms, separators=(':',',')))
	
	return vms

def getDominfo(addr, sshid, sshpw, name):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	results = execute(dominfo, name, hosts=[addr])
	
	return results[addr]





### domstate ###
def domstate(command_):

	results = run('virsh domstate ' + command_ , pty=True ,quiet=True,  timeout=5 )
	vms = []
	vms.append({'state':results})
	
	return vms
	


def getDomstate(addr, sshid, sshpw, name):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	results = execute(domstate, name, hosts=[addr])
	
	return results[addr]





### domstart ###

def domstart(command_):

	_result = ''
	results = run('virsh start ' + command_ , pty=True ,quiet=True,  timeout=5 )
	
	matchStr = "error"
	
	_result = re.search(matchStr,results)

	vms = []	
	if (matchStr != _result.group()):
		vms.append({'state':''})
		return vms
	else:
	
		lines = results.split('\n')
		vms = []
		for line in lines[:]:
			print "LINE: " + line
			words = line.strip().split(':')
			vms.append({words[0] : words[1]})
				
		return vms
	
	
	

def getDomstart(addr, sshid, sshpw, name):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	results = execute(domstart, name, hosts=[addr])
	
	return results[addr]


### domshutdown ###

def domshutdown(command_):

	results = run('virsh shutdown ' + command_ , pty=True ,quiet=True,  timeout=5 )

	_result = ''
	matchStr = "error"
	
	_result = re.search(matchStr,results)

	vms = []	
	print _result.group()
	if (matchStr != _result.group()):
		vms.append({'state':''})
		return vms
	else:
	
		lines = results.split('\n')
		vms = []
		for line in lines[:]:
			print "LINE: " + line
			words = line.strip().split(':')
			vms.append({words[0] : words[1]})
				
		return vms


def getDomshutdown(addr, sshid, sshpw, name):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	results = execute(domshutdown, name, hosts=[addr])
	
	return results[addr]



### domdefine ###

def domdefine(command_):

	results = run('virsh define /etc/libvirt/qemu/' + command_ + '.xml', pty=True ,quiet=True,  timeout=5 )
	print results

	vms = []
	vms.append({'state':results})
	
	return vms


def getDomdefine(addr, sshid, sshpw, name):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	results = execute(domdefine, name, hosts=[addr])
	
	return results[addr]



### dom undefine ###

def domundefine(command_):

	results = run('virsh undefine ' + command_ , pty=True ,quiet=True,  timeout=5 )
	vms = []
	vms.append({'state':results})
	
	return vms


def getDomundefine(addr, sshid, sshpw, name):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	results = execute(domundefine, name, hosts=[addr])
	
	return results[addr]



### dom clone ###

def domclone(command_):

	template = command_[0]
	newvm = command_[1]

	results = run('virt-clone -o ' + template + ' -n ' + newvm + ' -f /data/libvirt/images/' + newvm + '.img > /clone.log' , 
				pty=True ,quiet=True,  timeout=None )
	vms = []
	vms.append({'state':results})
	
	return vms


def getDomclone(addr, sshid, sshpw, template, newvm):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	args = []
	args.append(template)
	args.append(newvm)
	
	results = execute(domclone, args , hosts=[addr])
	
	return results[addr]



def getDomcloneParamiko(addr, sshid, sshpw, template, newvm):

	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	args = []
	args.append(template)
	args.append(newvm)
	
	ssh = paramiko.SSHClient()
	ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy()) 
	ssh.connect(addr, username=sshid, password=sshpw)
	
	results = ''
	rl = ''
	wl = ''
	xl = ''

	# Send the command (non-blocking)
	stdin, stdout, stderr = ssh.exec_command('virt-clone -o ' + template + ' -n ' + newvm + ' -f /data/libvirt/images/' + newvm + '.img > /data/libvirt/clone.log')
	
	
	'''
	# Wait for the command to terminate
	while not stdout.channel.exit_status_ready():
	    # Only print data if there is data to read in the channel
	    if stdout.channel.recv_ready():
	        rl, wl, xl = select.select([stdout.channel], [], [], 0.0)
	        if len(rl) > 0:
	            # Print data from stdout
	            print stdout.channel.recv(1024),
	'''
	
	#
	# Disconnect from the host
	#
	print "Command done, closing SSH connection"
	ssh.close()

	






### dom clone ###

def domremove(command_):

	results = run('rm -f  /data/libvirt/images/' + command_ + '.img ' , 
				pty=True ,quiet=True,  timeout=None )
	vms = []
	vms.append({'state':results})
	
	return vms


def getDomremove(addr, sshid, sshpw, newvm):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw

	
	results = execute(domshutdown, newvm , hosts=[addr])
	print results
	
	results = execute(domundefine, newvm , hosts=[addr])
	print results
	
	results = execute(domremove, newvm , hosts=[addr])
	print results	
	
	return results[addr]








def virsh_getAllInfo():
	result = run('virsh nodeinfo', pty=False, quiet=True)
	lines = result.split('\n')
	info = []
	for line in lines:
		print "LINE: " + line
		words = line.split(':')
		info.append({'name': words[0].strip(), 'value': words[1].strip()})

	result = run('virsh version', pty=False, quiet=True)
	lines = result.split('\n')
	version = []
	for line in lines:
		print "LINE: " + line
		words = line.split(':')
		version.append({'name': words[0].strip(), 'value': words[1].strip()})

	result = run('virsh hostname', pty=False, quiet=True)
	hostname = result.strip()

	result = run('virsh iface-list', pty=False, quiet=True)
	lines = result.split('\n')
	interfaces = []
	for line in lines[2:]:
		print "LINE: " + line
		words = line.strip().split()
		interfaces.append({'name': words[0], 'state': words[1], 'macaddr': words[2]})

	return {'info': info, 'version': version, 'hostname': hostname, 'interfaces': interfaces}

def getAllInfo(addr, sshid, sshpw):
	env.hosts = [ addr ]
	env.user = sshid
	env.password = sshpw
	results = execute(virsh_getAllInfo, hosts=[addr])
	return results[addr]




if __name__ == "__main__":


	jsonData = {'vmhost':'cdf685a2-0530-4d03-87b0-0db4471fb1d6','name':'test04'}
	vmHostId = jsonData['vmhost']
	name = jsonData['name']


	newvm = 'newvm'
	template = 'template_02'


# 	Finding a VM Host designated in the JSON request
	vmhosts = read_repository("vmhosts244")
	found = False
	for vmhost in vmhosts:
		if vmhost['_id'] == vmHostId:
			jsonData['vmhostname'] = vmhost['name']


			############   Domain List All
#			vms = getDomainList(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'])
#			print vms			
			

			############   Template List All
#			vms = getTemplatelist(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'])
#			print vms					
			
			############   Domain info
			#vms = getDominfo(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'],name)
			#print vms			


			############   Domain state
			#vms = getDomstate(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'],name)
			#print vms

			############   Domain start
			#vms = getDomstart(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'],name)
			#print vms

			############   Domain shutdown
#			vms = getDomshutdown(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'],name)
#			print vms

			############   Domain undefine
#			vms = getDomundefine(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'],name)
#			print vms

			############   Domain define
#			vms = getDomdefine(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'],name)
#			print vms

			############   Domain clone
			vms = getDomcloneParamiko(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'], template, newvm)
			print vms

			############   Domain remove
#			vms = getDomremove(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'], newvm)
#			print vms


			############   Domain state
#			vms = getDomstate(vmhost['addr'], vmhost['sshid'], vmhost['sshpw'],newvm)
#			print vms

			
			
			found = True
	

    