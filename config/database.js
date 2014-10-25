module.exports = {
    rethinkdb: {
        host: "localhost",
        port: 28015,
        authKey: "inkoverflow",
        db: "inkoverflow"
    },
    redis: {
      host: 'localhost',
      port: 6379,
      db: 2,
      pass: ''
    },
    elasticsearch: {
      host: 'localhost:9200',
      type: 'file',
      log: ['error', 'trace'],
      path: '/var/log/InkOverFlowElastic.log',
      keepAlive: true,
      sniffOnStart: true,
      sniffInterval: 60000
	}
};
