module.exports = {
	apps: [{
		name: "ep server",
		script: "server/src/index.js",
		watch: true,
	}, {
		name: "ep client",
		script: "cd client && npm run start",
		watch: true,
	}]
}
