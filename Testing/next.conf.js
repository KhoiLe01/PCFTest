require("dotenv").config()

module.exports = {
    env: {
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD,
        PORT: process.env.PORT,
        DRIVER: process.env.DRIVER,
        TCPIP: process.env.TCPIP,
        CHARSET: process.env.CHARSET,
        EU_HOST: process.env.EU_HOST,
        EU_SERVER: process.env.EU_SERVER,
        US_HOST: process.env.US_HOST,
        US_SERVER: process.env.US_SERVER
    }
}