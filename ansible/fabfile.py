from fabric.api import *

env.user = 'root'
env.hosts = ['178.62.248.203']


def setup_server():
    run('pty=False')
    with cd('/tmp/TaskWetu'):
        run('git clone https://github.com/ianjuma/taskwetu.git')
        with cd('/tmp/TaskWetu/taskwetu'):
            run('git checkout tags/%s' % (version,))
            result = run('pip install -r requirements.txt')
            if result.failed:
                local('GUNICORN failed')


def backUp():
    run('rethinkdb-dump -a taskwetu_db**//')


def installDeps():
    run('apt-get install redis')
    run('apt-get install rethinkdb')


def mvStatic():
    run('rm -rf /www/data/static')
    run('mv /tmp/TaskWetu/taskwetu/app/static /www/data/')


def prepare_deploy():
    run("apt-get update && apt-get -y dist-upgrade")
    run('apt-get clean && apt-get autoremove --purge --assume-yes')


def restartNginx():
    run('service nginx restart')


def deploy(version="1.0.0"):
    setup_server(version)
    mvStatic()
    restartNginx()
