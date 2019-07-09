module.exports = {
	apps: [{
		name: "ep server",
		script: "server/src/index.js",
		watch: false,
	}, {
		name: "ep client",
		script: "cd client && npm run start",
		watch: false,
	}]
}
