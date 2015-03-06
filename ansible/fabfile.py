from fabric.api import *

env.user = 'root'
env.hosts = [<ip_to_host>]


def setup_server():
    run('pty=False')
    with cd('/tmp/errand'):
        run('git clone https://github.com/ianjuma/errand.git')
        with cd('/tmp/errand/errand'):
            run('git checkout tags/%s' % (version,))
            result = run('pip install -r requirements.txt')
            if result.failed:
                local('GUNICORN failed')


def backUp():
    run('rethinkdb-dump -a pass_to_host')


def installDeps():
    run('apt-get install redis')
    run('apt-get install rethinkdb')


def mvStatic():
    run('rm -rf /www/data/static')
    run('mv /tmp/errand/errand/app/static /www/data/')


def prepare_deploy():
    run("apt-get update && apt-get -y dist-upgrade")
    run('apt-get clean && apt-get autoremove --purge --assume-yes')


def restartNginx():
    run('service nginx restart')


def deploy(version="1.0.0"):
    setup_server(version)
    mvStatic()
    restartNginx()
