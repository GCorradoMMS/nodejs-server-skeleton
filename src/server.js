require('dotenv').config();
const db_user = process.env.MONGODB_USER;
const db_password = process.env.MONGODB_PASSWORD;
const db_slug = process.env.MONGODB_SLUG;
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cluster = require('cluster');
const compression = require('compression');

const app = express();
app.use(express.json());
app.use(compression());


if (cluster.isMaster) {

    var cpu_count = require('os').cpus().length;

    for (var i = 0; i < cpu_count; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(, REPLACING.', worker.id);
        cluster.fork();
    });

} else {

    mongoose.connect("mongodb+srv://"+db_user+":"+db_password+db_slug, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app.use(express.json());
    app.use(routes);



    app.listen(3000);
    console.log('Worker %d on the job', cluster.worker.id);
}