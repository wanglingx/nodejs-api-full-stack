const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const router = require('./router/router');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

server.use(cors());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(helmet());
server.use(express.json());
server.use(router);

server.listen(port, () => {
    console.log(`[HOST] http://localhost:${port}/`);
})