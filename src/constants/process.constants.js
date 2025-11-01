module.exports = {
    PORT: process.env.PORT || 9000,
    db_url: process.env.DB_URL || "mongodb://localhost:27017/db",
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    EXPIRESIN: process.env.EXPIRESIN || "7d"
}
