import config from './config';
const loaders = require('./loaders');
const express = require('express');

async function startServer() {
    const app = express();

    await loaders.default({ expressApp: app });

    app.listen(config.port, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server is running in port ` + process.env.PORT);
    });
}

startServer();
