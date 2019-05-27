const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;
app.listen(port, () => {
    console.log(`Environment: ${environment}`)
    console.log(`Listening on port ${port}...`);
});
