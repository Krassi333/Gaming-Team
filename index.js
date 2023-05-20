const express = require('express');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routsConfig = require('./config/routs');

const port = 5000;


async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routsConfig(app);

    app.listen(port, () => console.log(`Server starts on port ${port}!`));
}

start();