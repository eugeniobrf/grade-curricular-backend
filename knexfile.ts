module.exports = {
    client: 'pg',
    version: '12.4',
    connection: {
        host : 'localhost',
        user : 'postgres',
        password : '1234',
        database : 'grade'
    },
    migrations: {
        directory: "./src/database/migrations"
    }
}