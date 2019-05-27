const express = require('express');
const app = express();

const composeRoutes = require('./app/routes/route-composer');

app.get('/', (req, res) => {
    res.send('Server is running!');
});

composeRoutes(app);

// set this by running 'PORT=5000 npm run start
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;
app.listen(port, () => {
    console.log(`Environment: ${environment}`)
    console.log(`Listening on port ${port}...`);
});
