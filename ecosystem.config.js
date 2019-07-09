module.exports = {
    apps : [{
        name        : "worker",
        script      : "./server/src/index.js",
        watch      : true,
    },{
        name       : "api-app",
        script     : "cd client && npm run start",
        watch       : true,
    }]
}