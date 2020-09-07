module.exports = {
    client: 'pg',
    version: '12.4',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    },
    migrations: {
        directory: "./src/database/migrations"
    }
}
