
const routes = (app) => {

    app.get('/employees', (req, res) => {
        res.send([{
            imageUrl: '',
            firstName: 'John',
            lastName: 'Doe',
            dateAdded: new Date(),
            title: 'CEO'
        },{
            imageUrl: '',
            firstName: 'Jane',
            lastName: 'Johnson',
            dateAdded: new Date(),
            title: 'CTO'
        }])
    })
};


module.exports = routes;
