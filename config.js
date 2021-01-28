module.exports = {
    port: process.env.PORT || 1313,
    db: process.env.MONGODB || 'mongodb://localhost:27017/shop',
    SECRET_TOKEN: 'miclavedetoken',
}