const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const PORT = process.env.PORT || 8000;
const DBURL  = process.env.DATABASE;

const userRoute = require('./routes/user.js');


mongoose.connect(DBURL, {
    useNewUrlParser: true,
})
.then(() => console.log('Connected to Database'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//routes middlewares
app.use('/api', userRoute);

app.get('/', (req, res) => {
    res.send('404 undefined')
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});

