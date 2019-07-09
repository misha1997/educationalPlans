module.exports = {
	apps: [{
		name: "ep server",
		script: "server/src",
		max_memory_restart: '150M',
		env: {
			"NODE_ENV": "production"
		}
	}],
}
