const cluster = require('cluster');
const os = require('os');
const express = require('express');
const cors = require('cors');
const swagger = require('../swagger');
const usersRouter = require('./routes/users')
const mysql = require('mysql2');
require('dotenv').config();

if (cluster.isMaster) {
    // Fork worker processes for each CPU core
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    // Create an Express app
    const app = express();
    const port = process.env.ISDEV ? 8080 : process.env.PORT;
    app.use(cors());
    app.use(express.json());
    // Create a MySQL connection pool
    // const connection = mysql.createConnection({
    //     host: 'localhost',
    //     port: 3306,
    //     user: 'root',
    //     password: 'password',
    //     database: 'test'
    // });
    // Define your routes and middleware
    swagger(app);
    app.use('/api', usersRouter);

    // Start the Express server
    app.listen(port, () => {
        console.log(`worker ${cluster.worker.id} listening on port ${port}`);
    });
}
