const express = require('express');
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');

require('dotenv').config()

app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Just to test Api is working or not
app.get('/api/test', (req, res) => {
    res.json({ working: true });
});



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));