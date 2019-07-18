module.exports = {
	apps: [{
		name: "ep server",
		script: "server/src",
		max_memory_restart: '150M',
		watch: true,
		env: {
			"NODE_ENV": "production"
		}
	}],
}
