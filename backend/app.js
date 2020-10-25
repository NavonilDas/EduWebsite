require('dotenv').config()

const express = require('express');
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const isDevelopment = (process.env.NODE_ENV === 'development');


app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Override Express
app.use((req, res, next) => {
    res.set('X-Powered-By', 'Edu Plus');
    next();
});

// For MONGODB
if (isDevelopment) {
    mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('DB Connected'))
        .catch(err => {
            if (err) {
                console.log("Mongo Connection Error");
            }
        });
} else {
    mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('DB Connected'))
        .catch(err => {
            if (err) {
                console.log("Mongo Connection Error");
            }
        });
}



// Just to test Api is working or not
app.get('/api/test', (req, res) => {
    res.json({ working: true });
});

app.use('/api/course', require('./routes/course'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/users', require('./routes/users'));
// Admin Endpoints
app.use('/api/admin/course', require('./routes/admin/course'));
app.use('/api/admin/media', require('./routes/admin/media'));
app.use('/api/admin/users', require('./routes/admin/users'));
app.use('/api/admin/video', require('./routes/admin/videos'));

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));