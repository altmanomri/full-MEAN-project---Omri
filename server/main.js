const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

let app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended : true}))
.use(bodyParser.json());

const usersController = require('./controllers/userController');
app.use('/api/users', usersController);

require('./configs/database');

app.listen(8000);