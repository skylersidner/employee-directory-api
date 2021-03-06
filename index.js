const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const composeRoutes = require('./app/routes/route-composer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const corsOptions = {
    origin: 'http://localhost:4200' //TODO: set this up with configuration; origin can be a function
};
app.use(cors(corsOptions));


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
