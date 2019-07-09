module.exports = {
    apps : [{
        name        : "worker",
        script      : "cd server && npm run start",
        watch      : true,
    },{
        name       : "api-app",
        script     : "cd client && npm run start",
        watch       : true,
    }]
}